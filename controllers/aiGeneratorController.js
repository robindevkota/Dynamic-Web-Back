const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * AI Generator Controller - Gemini Free Edition
 * Handles the "Magic Build" logic using Google Gemini 1.5 Flash
 */
// backend/controllers/aiGeneratorController.js

exports.generatePage = async (req, res) => {
    try {
        const { prompt = "", context = "General" } = req.body || {};

        if (!prompt) {
            return res.status(400).json({ error: "Missing prompt" });
        }

        console.log(`🧠 AI Generation Requested: "${prompt}"`);

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("⚠️ No GEMINI_API_KEY found.");
            return res.json(getMockAiResponse(prompt));
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const modelNames = [
            "gemini-2.0-flash",
            "gemini-flash-latest",
            "gemini-1.5-flash",
            "gemini-pro-latest"
        ];

        let result = null;
        let lastError = null;

        for (const modelName of modelNames) {
            try {
                console.log(`📡 Trying Gemini Model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                // ✅ UPDATED SYSTEM PROMPT - Generate correct PageConfig schema
                const systemPrompt = `You are the WebFactory AI Expert. Your task is to generate a beautiful, functional PageConfig JSON based on user requirements.

                SCHEMA RULES:
                1. ROOT: { "title": string, "slug": "generated-site", "components": { "navbar": Component, "main": Component, "footer": Component } }
                2. Component: { "uiSchema": { [id: string]: Widget }, "styles": Object }
                3. Widget: { 
                   "ui:widget": "hero" | "navbar" | "cardGrid" | "pricingCard" | "footer" | "statsCounter" | "heading" | "paragraph" | "button" | "image" | "spacer",
                   "ui:title": string,
                   "ui:subtitle": string,
                   "ui:content": string,
                   "ui:styles": Object
                }

                WIDGET GUIDELINES:
                - navbar: use "ui:logo", "ui:links" (Array<{label, action}>)
                - hero: use "ui:title", "ui:subtitle", "ui:cta" ({label, action})
                - cardGrid: use "ui:cards" (Array<{ui:title, ui:description, ui:image}>), "ui:columns" (number)
                - footer: use "ui:copyright", "ui:columns" (Array<{title, links}>)

                USER PROMPT: "${prompt}"
                CONTEXT: "${context}"

                CRITICAL: 
                - Output ONLY valid, raw JSON. 
                - NO markdown blocks (no \`\`\`json).
                - Ensure the structure is exactly as defined (ROOT -> components -> [navbar, main, footer] -> uiSchema -> widgets).
                - Use professional design sense. Colors should be harmonious.`;

                result = await model.generateContent(systemPrompt);

                if (result && result.response) {
                    const text = result.response.text();
                    if (text && text.length > 10) {
                        console.log(`✅ Success with ${modelName}`);
                        break;
                    }
                }
            } catch (err) {
                console.warn(`❌ Model ${modelName} failed:`, err.message);
                lastError = err;
            }
        }

        if (res.headersSent) return;

        if (!result) {
            console.error("❌ All Gemini models failed.");
            const mock = getMockAiResponse(prompt);
            mock.error = lastError?.message || "All models returned 404 or empty responses";
            return res.json(mock);
        }

        const responseText = result.response.text();
        try {
            const cleanJson = responseText.replace(/```json|```/g, "").trim();
            const generatedJson = JSON.parse(cleanJson);

            return res.json({
                success: true,
                data: generatedJson,
                source: 'gemini'
            });
        } catch (parseErr) {
            console.error("❌ JSON Parse Error. Raw text:", responseText);
            const mock = getMockAiResponse(prompt);
            mock.error = "AI returned invalid JSON. Try refreshing or changing the prompt.";
            return res.json(mock);
        }

    } catch (globalErr) {
        console.error("💀 CRITICAL CONTROLLER ERROR:", globalErr);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                error: "An internal error occurred while generating content.",
                details: globalErr.message
            });
        }
    }
};

// ✅ UPDATED MOCK RESPONSE - Correct PageConfig schema
function getMockAiResponse(prompt) {
    return {
        success: true,
        source: 'mock',
        data: {
            title: `Hospital Dashboard: ${prompt}`,
            slug: "generated-site",
            components: {
                navbar: {
                    uiSchema: {
                        logo: {
                            "ui:widget": "text",
                            "ui:content": "🏥 Hospital HMS",
                            "ui:styles": {
                                fontSize: "26px",
                                fontWeight: "800",
                                color: "#0047AB"
                            }
                        },
                        nav: {
                            "ui:widget": "navLinks",
                            "ui:theme": "light",
                            "ui:links": [
                                { label: "Overview", action: "navigate", actionParams: { url: "#overview" } },
                                { label: "Patients", action: "navigate", actionParams: { url: "#patients" } },
                                { label: "Staff", action: "navigate", actionParams: { url: "#staff" } }
                            ]
                        }
                    },
                    styles: {
                        background: "#ffffff",
                        borderBottom: "2px solid #e2e8f0",
                        padding: "20px 50px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                    }
                },
                main: {
                    uiSchema: {
                        header: {
                            "ui:widget": "heading",
                            "ui:text": "📊 Hospital Operations Dashboard",
                            "ui:level": "h1",
                            "ui:styles": {
                                textAlign: "center",
                                marginBottom: "40px",
                                fontSize: "2.5rem",
                                color: "#1e293b"
                            }
                        },
                        statsGrid: {
                            "ui:widget": "gridLayout",
                            "ui:columns": 3,
                            "ui:gap": "24px",
                            "ui:styles": {
                                marginBottom: "50px"
                            },
                            "ui:children": [
                                {
                                    "ui:widget": "card",
                                    "ui:title": "👥 Total Patients",
                                    "ui:description": "1,452 Active Patients\n+2.1% from yesterday",
                                    "ui:styles": {
                                        padding: "32px",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                        borderRadius: "16px",
                                        textAlign: "center"
                                    }
                                },
                                {
                                    "ui:widget": "card",
                                    "ui:title": "⚕️ Doctors Available",
                                    "ui:description": "78 Active Doctors\n95% Readiness",
                                    "ui:styles": {
                                        padding: "32px",
                                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                        color: "white",
                                        borderRadius: "16px",
                                        textAlign: "center"
                                    }
                                },
                                {
                                    "ui:widget": "card",
                                    "ui:title": "⏱️ Avg Wait Time",
                                    "ui:description": "25 minutes\n-5 mins improvement",
                                    "ui:styles": {
                                        padding: "32px",
                                        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                                        color: "white",
                                        borderRadius: "16px",
                                        textAlign: "center"
                                    }
                                }
                            ]
                        },
                        tableSection: {
                            "ui:widget": "dataTable",
                            "ui:title": "Recent Appointments",
                            "ui:description": "Latest patient consultations and upcoming schedules",
                            "ui:columns": [
                                { key: "id", title: "Patient ID", dataIndex: "id", width: "120px" },
                                { key: "name", title: "Patient Name", dataIndex: "name" },
                                { key: "doctor", title: "Doctor", dataIndex: "doctor" },
                                { key: "department", title: "Department", dataIndex: "department" },
                                { key: "time", title: "Time", dataIndex: "time" },
                                { key: "status", title: "Status", dataIndex: "status" }
                            ],
                            "ui:data": [
                                { id: "P10023", name: "Anya Sharma", doctor: "Dr. E. Reynolds", department: "Cardiology", time: "10:00 AM", status: "Scheduled" },
                                { id: "P10022", name: "Michael Chen", doctor: "Dr. K. Patel", department: "Pediatrics", time: "09:30 AM", status: "Complete" },
                                { id: "P10021", name: "David Lee", doctor: "Dr. J. Rodriguez", department: "Orthopedics", time: "11:15 AM", status: "Scheduled" },
                                { id: "P10020", name: "Sarah Smith", doctor: "Dr. A. Varma", department: "Emergency", time: "08:00 AM", status: "Cancelled" },
                                { id: "P10019", name: "Jennifer Wong", doctor: "Dr. L. Singh", department: "General Practice", time: "12:00 PM", status: "Pending" }
                            ],
                            "ui:styles": {
                                background: "white",
                                padding: "30px",
                                borderRadius: "16px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                            }
                        }
                    },
                    styles: {
                        padding: "60px 40px",
                        background: "#f8fafc",
                        minHeight: "100vh"
                    }
                },
                footer: {
                    uiSchema: {
                        copyright: {
                            "ui:widget": "text",
                            "ui:content": "© 2024 Hospital Management System. All Rights Reserved.",
                            "ui:styles": {
                                textAlign: "center",
                                color: "#94a3b8"
                            }
                        }
                    },
                    styles: {
                        background: "#1e293b",
                        padding: "30px",
                        textAlign: "center"
                    }
                }
            },
            initialization: {
                globalCSS: "",
                resources: [],
                actions: {}
            }
        }
    };
}