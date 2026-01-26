//  * @file aiGeneratorController.js
//   * @copyright(c) 2026 Robin Devkota.All Rights Reserved.
//  * @license Proprietary - No unauthorized copying or distribution.
//  * For inquiries, contact: robindevkta0 @gmail.com
//  */

// backend/controllers/aiGeneratorController.js
// Updated 2026 – more reliable Ollama JSON generation

const widgetCatalog = require("../config/widgetCatalog.json"); // remove if unused

/**
 * AI Generator Controller – Ollama only
 * Generates complete multi-page website configurations using local model
 */
exports.generatePage = async (req, res) => {
  try {
    const { prompt = "", context = "General", pageType = "single" } = req.body || {};

    if (!prompt.trim()) {
      return res.status(400).json({ error: "Missing or empty prompt" });
    }

    console.log(`[AI] Generation requested: "${prompt}" | context: ${context}`);

    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    let primaryModel = process.env.OLLAMA_MODEL || 'qwen2.5:14b-instruct-q5_K_M';
    const fallbackModel = process.env.OLLAMA_FALLBACK_MODEL || 'qwen2.5:7b-instruct-q6_K';

    console.log(`[AI] Primary model: ${primaryModel} @ ${ollamaUrl}`);

    // ─── 1. Warm-up the model (critical for avoiding empty responses) ───
    console.log("[AI] Warming up model...");
    await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: primaryModel,
        prompt: "Output a tiny JSON: {\"status\":\"warm\"}",
        stream: false,
        options: { temperature: 0.8, num_predict: 64 }
      })
    }).catch(err => console.log("[warmup] ignored:", err.message));

    await new Promise(r => setTimeout(r, 1200)); // give it ~1.2s to actually load

    // ─── 2. Prepare strong (but shorter) system prompt ───
    const systemPrompt = createStrongSystemPrompt(prompt, context, pageType);

    // ─── 3. Generation attempt (with one retry on fallback model) ───
    let attempt = 0;
    let modelUsed = primaryModel;
    let generatedJson = null;
    let duration = null;

    while (attempt < 2 && !generatedJson) {
      attempt++;
      if (attempt === 2) {
        console.warn(`[AI] Primary model failed → falling back to ${fallbackModel}`);
        modelUsed = fallbackModel;
      }

      console.log(`[AI] Attempt ${attempt}/${modelUsed} ⏳`);

      const startTime = Date.now();

      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelUsed,
          prompt: systemPrompt,
          stream: false,
          // format: "json",           // ← DO NOT enable unless you tested it works reliably
          options: {
            temperature: attempt === 1 ? 0.75 : 0.45,   // slightly more creative on retry
            top_p: 0.92,
            top_k: 45,
            num_predict: 3200,
            num_ctx: 12288,
            // stop: ["```"]          // removed — often truncates too early
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama HTTP ${response.status}`);
      }

      const data = await response.json();
      duration = ((Date.now() - startTime) / 1000).toFixed(1);

      console.log(`[AI] Ollama replied in ${duration}s | raw length: ${data.response?.length ?? 0}`);

      // ─── Very important: full raw dump for debugging ───
      console.log("[RAW OLLAMA RESPONSE]");
      console.log(data.response || "[EMPTY RESPONSE FIELD]");
      console.log("[END RAW]");

      let cleanedText = (data.response || '').trim();

      // Your excellent cleaning pipeline (slightly optimized)
      cleanedText = cleanedText.replace(/[-\u001F\u007F-\u009F\uFEFF]/g, '');

      const firstBrace = cleanedText.indexOf('{');
      const lastBrace = cleanedText.lastIndexOf('}');

      if (firstBrace !== -1 && lastBrace > firstBrace) {
        const jsonBlockMatch = cleanedText.match(/```json\s*([\s\S]*?)\s*```/i) ||
          cleanedText.match(/```\s*([\s\S]*?)\s*```/);
        cleanedText = jsonBlockMatch ? jsonBlockMatch[1] : cleanedText.slice(firstBrace, lastBrace + 1);
      }

      cleanedText = cleanedText
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^\:])\/\/.*$/gm, '$1')
        .replace(/,\s*([}\]])/g, '$1')
        .trim();

      // Char code debug
      const preview = cleanedText.slice(0, 120);
      const charCodes = Array.from(preview).map(c => c.charCodeAt(0));
      console.log(`[AI] Cleaned preview starts: ${preview.replace(/\n/g, '↵')}`);
      console.log(`[AI] Char codes: [${charCodes.join(', ')}]`);

      try {
        generatedJson = JSON.parse(cleanedText);
        console.log("[AI] ✓ JSON parsed successfully");
      } catch (parseErr) {
        console.error("[AI] Parse failed:", parseErr.message);
        console.debug("[AI] Error near:", cleanedText.slice(Math.max(0, parseErr.index - 40), parseErr.index + 40));
      }
    }

    if (!generatedJson) {
      console.error("[AI] All attempts failed to produce valid JSON");
      const mock = getImprovedMockResponse(prompt, pageType);
      return res.json({
        success: false,
        error: "Could not generate valid JSON after retries",
        fallbackUsed: true,
        data: mock,
        debug: { lastModel: modelUsed, duration }
      });
    }

    // Normalize & respond
    const normalized = normalizeConfig(generatedJson, prompt);

    const finalResponse = {
      success: true,
      data: normalized,
      source: 'ollama',
      modelUsed,
      generationTime: `${duration}s`
    };

    console.log("[AI] ✓ Success – sending to frontend");
    res.status(200).json(finalResponse);

  } catch (err) {
    console.error("[AI] Critical error:", err);
    const mock = getImprovedMockResponse(req.body?.prompt || "Untitled", "single");
    res.status(500).json({
      success: false,
      error: "Ollama generation crashed",
      details: err.message,
      fallbackUsed: true,
      data: mock
    });
  }
};

// ───────────────────────────────────────────────
// Updated – shorter, less aggressive, higher success rate
// ───────────────────────────────────────────────
function createStrongSystemPrompt(userPrompt, context, pageType) {
  return `
You are a JSON-only web layout generator. Output **nothing** except valid JSON.

Rules:
- Start directly with {
- End exactly with }
- No explanations, no markdown, no fences, no comments
- Use only these widgets: hero, heading, text, button, image, container, columns, card, formContainer, inputField, navLinks, navbar, footer
- Make modern, responsive designs with nice gradients / shadows / glassmorphism when appropriate

Required structure:
{
  "title": "short catchy title",
  "slug": "kebab-case-unique-slug",
  "components": {
    "navbar": { "uiSchema": {...}, "styles": {...} },
    "main":   { "uiSchema": {...}, "styles": {...} },
    "footer": { "uiSchema": {...}, "styles": {...} }
  },
  "initialization": {
    "globalCSS": "body{font-family:'Inter',sans-serif} ...",
    "actions": {
      "navigateToPage": "window.location.href = context.actionParams?.url;"
    }
  }
}

USER REQUEST: ${userPrompt}

Output JSON now:`;
}

// Keep your existing getImprovedMockResponse(), getShopzoneInspiredExample(), normalizeConfig()
// ───────────────────────────────────────────────
// (they are already good – no changes needed here)
// ───────────────────────────────────────────────

// ───────────────────────────────────────────────
//  Better fallback than your original mock
// ───────────────────────────────────────────────
function getImprovedMockResponse(prompt, pageType) {
  return {
    title: `Fallback: ${prompt.slice(0, 50)}...`,
    slug: `fallback-${Date.now().toString(36).slice(-6)}`,
    components: {
      navbar: {
        uiSchema: {
          logo: { "ui:widget": "heading", "ui:text": "MyApp", "ui:level": "h2" },
          links: { "ui:widget": "navLinks", "ui:links": [{ label: "Home", action: "navigateToPage", actionParams: { url: "/" } }] }
        },
        styles: { padding: "16px 32px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
      },
      main: {
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": prompt || "Welcome",
            "ui:subtitle": "Generated fallback layout",
            "ui:styles": { padding: "120px 40px", textAlign: "center", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white" }
          }
        }
      },
      footer: {
        uiSchema: {
          text: { "ui:widget": "text", "ui:content": "© 2026 My Company" }
        },
        styles: { padding: "40px", background: "#1e293b", color: "#94a3b8", textAlign: "center" }
      }
    },
    initialization: {
      globalCSS: "body { font-family: 'Inter', system-ui; margin:0; } button:hover { transform: scale(1.04); }",
      actions: {
        navigateToPage: "window.location.href = context.actionParams?.url;"
      }
    }
  };
}

// ───────────────────────────────────────────────
//  Very compact but realistic ShopZone-like example
// ───────────────────────────────────────────────
function getShopzoneInspiredExample() {
  return {
    title: "TechStore – Modern E-commerce",
    slug: "techstore",
    components: {
      navbar: {
        uiSchema: {
          logo: { "ui:widget": "heading", "ui:text": "TechStore", "ui:level": "h3", "ui:styles": { fontWeight: "800", color: "#6366f1" } },
          links: {
            "ui:widget": "navLinks", "ui:links": [
              { label: "Home", action: "navigateToPage", actionParams: { url: "/" } },
              { label: "Shop", action: "navigateToPage", actionParams: { url: "/products" } },
              { label: "Cart", action: "navigateToPage", actionParams: { url: "/cart" } }
            ]
          }
        },
        styles: { padding: "16px 40px", background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }
      },
      main: {
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Discover Premium Gadgets",
            "ui:subtitle": "Latest • Fast • Affordable",
            "ui:styles": { padding: "140px 40px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", textAlign: "center" }
          }
        }
      }
    },
    pages: {
      products: {
        title: "Products",
        components: {
          main: {
            uiSchema: {
              grid: { "ui:widget": "projectGrid", "ui:dataKey": "products", "ui:columns": 4 }
            }
          }
        }
      },
      cart: {
        title: "Cart",
        components: {
          main: {
            uiSchema: {
              items: { "ui:widget": "cartItemsGrid", "ui:dataKey": "cartItems" }
            }
          }
        }
      }
    },
    initialization: {
      globalCSS: "body{font-family:'Inter',sans-serif} .card:hover{transform:scale(1.03);transition:0.2s}",
      actions: {
        navigateToPage: "window.location.href=context.actionParams?.url"
      }
    }
  };
}

// Comprehensive normalization to match PageConfig model and demo.js quality
function normalizeConfig(json, originalPrompt) {
  // 🛡️ Extra defense: Ensure we have an object
  let safe = {};
  try {
    if (Array.isArray(json)) {
      safe = { ...json[0] }; // Use first item if AI returned an array
    } else if (typeof json === 'object' && json !== null) {
      safe = { ...json };
    } else {
      console.warn("[AI] Input is not an object or array, using empty object");
    }
  } catch (e) {
    console.error("[AI] Normalization spread error:", e.message);
  }

  // Metadata
  safe.title = safe.title || originalPrompt.slice(0, 60) || "Generated Page";
  safe.slug = safe.slug || `gen-${Date.now().toString(36).slice(-8)}`;
  safe.status = safe.status || "Draft";
  safe.isTemplate = safe.isTemplate ?? false;
  safe.templateCategory = safe.templateCategory || "Other";

  // Ensure components structure
  if (!safe.components || typeof safe.components !== 'object') {
    safe.components = {};
  }

  if (!safe.components.main || typeof safe.components.main !== 'object') {
    safe.components.main = { uiSchema: {}, styles: { padding: "40px 20px" } };
  }

  // Ensure initialization structure
  if (!safe.initialization || typeof safe.initialization !== 'object') {
    safe.initialization = {
      globalCSS: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'); body { font-family: 'Inter', sans-serif; margin: 0; }",
      resources: [],
      actions: {
        navigateToPage: "window.location.href = context.actionParams?.url;"
      }
    };
  } else {
    safe.initialization.actions = safe.initialization.actions || {};
    if (!safe.initialization.actions.navigateToPage) {
      safe.initialization.actions.navigateToPage = "window.location.href = context.actionParams?.url;";
    }
  }

  return safe;
}