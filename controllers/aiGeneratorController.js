// backend/controllers/aiGeneratorController.js - Ollama only (2025 realistic version)

const widgetCatalog = require("../config/widgetCatalog.json"); // if you still use it, otherwise remove

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
    const model = process.env.OLLAMA_MODEL || 'llama3.2'; // or 'qwen2.5:14b', 'mistral-nemo', etc.

    console.log(`[AI] Using Ollama → ${ollamaUrl} / model: ${model}`);

    const systemPrompt = createStrongSystemPrompt(prompt, context, pageType);

    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: systemPrompt,
        stream: false,
        options: {
          temperature: 0.65,       // lower = more structured
          top_p: 0.92,
          num_predict: 6000,       // give it room for full multi-page output
          num_ctx: 8192            // important for large prompts + examples
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama HTTP ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.response || '';

    console.log(`[AI] Ollama raw response length: ${responseText.length}`);

    // Aggressive cleaning – Ollama often wraps in ```json ... ```
    responseText = responseText
      .replace(/^```json?\s*/i, '')
      .replace(/```$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')     // remove js-style comments
      .replace(/\/\/.*$/gm, '')             // remove line comments
      .trim();

    let generatedJson;
    try {
      generatedJson = JSON.parse(responseText);
    } catch (parseErr) {
      console.error("[AI] JSON parse failed:", parseErr.message);
      console.debug("[AI] First 600 chars of cleaned response:", responseText.slice(0, 600));

      // Fallback to mock
      const mock = getImprovedMockResponse(prompt, pageType);
      return res.json({
        success: false,
        error: "Could not parse valid JSON from model – using fallback example",
        fallbackUsed: true,
        data: mock
      });
    }

    // Light normalization
    const normalized = normalizeConfig(generatedJson, prompt);

    return res.json({
      success: true,
      data: normalized,
      source: 'ollama',
      modelUsed: model
    });

  } catch (err) {
    console.error("[AI] Critical error:", err.message);
    const mock = getImprovedMockResponse(prompt || "Untitled", "single");
    return res.json({
      success: false,
      error: "Ollama generation failed",
      details: err.message,
      fallbackUsed: true,
      data: mock
    });
  }
};

// ───────────────────────────────────────────────
//   STRONG SYSTEM PROMPT – main quality lever
// ───────────────────────────────────────────────
function createStrongSystemPrompt(userPrompt, context, pageType) {
  return `
You are a professional web developer that outputs **only valid JSON** PageConfig objects for a dynamic React renderer.

────────────────────────────────────────────────────────────
MUST FOLLOW THESE RULES – VIOLATION = INVALID OUTPUT
────────────────────────────────────────────────────────────

1. Return **ONLY** clean JSON. No markdown, no \`\`\`json, no explanations, no comments inside JSON.
2. Top-level structure:
   {
     "title": string,
     "slug": string (kebab-case),
     "components": { navbar?, sidebar?, main: {...}, footer?, modals? },
     "pages"?: Map-like object { [pageKey: string]: { title: string, components: { navbar?, main, footer?, ... } } },
     "initialization": {
       "globalCSS": string (modern css with @import if needed),
       "resources": string[] (api keys like "products.list", "auth.login"),
       "actions": { [name: string]: string (javascript code) }
     }
   }
3. Every visual piece **must** have "ui:widget"
4. Use **only** these widget names (do NOT invent new ones):

   Layout: container, columns, responsiveGrid, cardGrid, flexLayout, sidebarLayout
   Content: heading, text, paragraph, button, image, icon, divider, spacer, hero, badge, alert, timeline
   Forms: formContainer, inputField, textareaField, selectField, checkbox, radioGroup, toggle, searchBar, dateField, dateRangePicker
   Data: dataTable, projectGrid, statsCounter, skillRadar, pagination, kanbanBoard, cartItemsGrid, cartSummary
   Interactive: tabs, accordion, dropdown, tooltip, rating, breadcrumb
   Navigation: navbar, footer, navLinks, authLinks, socialIcons
   Commerce: pricingCard
   Special: conditionalContent, backgroundEffect

5. Actions examples you can use in "ui:actions" or initialization.actions:
   - navigateToPage: window.location.href = context.actionParams?.url
   - api: await context.handlers.handleApiCall(context.actionParams?.apiKey, context.formData)
   - openModal: context.handlers.setActiveModal(context.actionParams?.modal)
   - validateThenApi (custom – validate fields before api call)
   - addToCart, removeFromCart (for e-commerce)

6. Put modals inside main.uiSchema.modals or components.modals
7. Use modern 2025 styles: glassmorphism, gradients, clamp(), subtle shadows, hover:scale-105, transitions

────────────────────────────────────────────────────────────
REALISTIC EXAMPLE – follow this style and structure
────────────────────────────────────────────────────────────

${JSON.stringify(getShopzoneInspiredExample(), null, 2)}

────────────────────────────────────────────────────────────
USER REQUEST
────────────────────────────────────────────────────────────

${userPrompt}

Generate complete, beautiful, responsive PageConfig JSON now:
`;
}

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

// Very simple normalization
function normalizeConfig(json, originalPrompt) {
  const safe = { ...json };
  if (!safe.title) safe.title = originalPrompt.slice(0, 60) || "Generated Page";
  if (!safe.slug) safe.slug = `gen-${Date.now().toString(36).slice(-8)}`;
  if (!safe.components?.main) safe.components = safe.components || {};
  if (!safe.initialization) safe.initialization = { globalCSS: "", actions: {} };
  return safe;
}