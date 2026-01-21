// widgets/widgetLibrary.tsx
import React, { useEffect, useRef, useState } from "react";
import { applyStyles } from "../utils/styleHelpers";
import { enhanceWidgetWithData } from "../utils/dataHelpers/enhanceWidgetWithData";
import { useDataStore } from "../utils/DataStore";

// Define the widget function type
export type WidgetFunction = (config: any, data?: any) => React.ReactNode;
export type WidgetLibraryType = Record<string, WidgetFunction>;

// Create the widget library
export const createWidgetLibrary = (handlers: any): WidgetLibraryType => {
  const { globalData = {} } = handlers;
  console.log(globalData, "glob");

  const renderWidget = (config: any, data?: any): React.ReactNode => {
    if (!config) return null;

    // If it's a widget config object with "ui:widget"
    if (typeof config === "object" && config["ui:widget"]) {
      const widgetType = config["ui:widget"];
      const widgetRenderer = widgets[widgetType];

      if (!widgetRenderer) {
        return (
          <div
            style={{
              padding: "10px",
              background: "#fee",
              border: "1px dashed #f88",
              borderRadius: "4px",
              margin: "5px 0",
            }}
          >
            Unknown widget: {widgetType}
          </div>
        );
      }

      return widgetRenderer(config, data);
    }

    // If it's already a React element or string, return as-is
    return config;
  };
  const widgets: WidgetLibraryType = {
    columns: (config: any) => {
      const columns = config["ui:columns"] || [];
      const ratio =
        config["ui:ratio"] || "1".repeat(columns.length).split("").join(":");
      const gap = config["ui:gap"] || "30px";
      const verticalAlign = config["ui:verticalAlign"] || "top";
      const responsive = config["ui:responsive"] || { tablet: 2, mobile: 1 };

      // Calculate widths based on ratio
      const ratios = ratio.split(":").map(Number);
      const total = ratios.reduce((sum: any, val: any) => sum + val, 0);
      const widths = ratios.map((ratio: any) => `${(ratio / total) * 100}%`);

      const defaultStyles: React.CSSProperties = {
        display: "flex",
        gap: gap,
        alignItems: verticalAlign,
        marginBottom: "40px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <>
          <div style={styles}>
            {columns.map((content: any, index: number) => (
              <div
                key={index}
                style={{
                  width: widths[index] || `${100 / columns.length}%`,
                  minWidth: 0,
                }}
              >
                {renderWidget(content)}
              </div>
            ))}
          </div>

          {/* Responsive styles */}
          <style>{`
        @media (max-width: 1024px) {
          div {
            flex-wrap: wrap;
          }
          div > div {
            width: calc(${100 / (responsive.tablet || 2)}% - ${gap} * ${
            (responsive.tablet || 2) - 1
          } / ${responsive.tablet || 2}) !important;
            min-width: 0;
          }
        }
        @media (max-width: 768px) {
          div > div {
            width: 100% !important;
          }
        }
      `}</style>
        </>
      );
    },
    cardGrid: (config: any) => {
      const cards = config["ui:cards"] || [];
      const columns = config["ui:columns"] || 3;
      const gap = config["ui:gap"] || "24px";

      const defaultStyles: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
        marginBottom: "40px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={styles}>
          {cards.map((cardConfig: any, index: number) => (
            <div key={index}>{widgets.card(cardConfig)}</div>
          ))}
        </div>
      );
    },

    // 38. CONTAINER (For nesting multiple widgets in columns)
    container: (config: any) => {
      const children = config["ui:children"] || [];
      const direction = config["ui:direction"] || "column";
      const gap = config["ui:gap"] || "20px";
      const align = config["ui:align"] || "flex-start";
      const justify = config["ui:justify"] || "flex-start";
      const id = config["ui:id"]; // ✅ ADD THIS LINE

      const defaultStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: direction as any,
        gap: gap,
        alignItems: align,
        justifyContent: justify,
        width: "100%",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div id={id} style={styles}>
          {" "}
          {/* ✅ ADD ID PROP */}
          {children.map((child: any, index: number) => (
            <div key={index} style={{ width: "100%" }}>
              {renderWidget(child)}
            </div>
          ))}
        </div>
      );
    },

    // 39. SIDEBAR LAYOUT (Special case for sidebar + main content)
    sidebarLayout: (config: any) => {
      const sidebarContent = config["ui:sidebar"] || "";
      const mainContent = config["ui:main"] || "";
      const sidebarWidth = config["ui:sidebarWidth"] || "300px";
      const gap = config["ui:gap"] || "40px";
      const sidebarPosition = config["ui:sidebarPosition"] || "left";

      const defaultStyles: React.CSSProperties = {
        display: "flex",
        gap: gap,
        alignItems: "flex-start",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      const sidebarStyles: React.CSSProperties = {
        width: sidebarWidth,
        minWidth: sidebarWidth,
        flexShrink: 0,
      };

      const mainStyles: React.CSSProperties = {
        flex: 1,
        minWidth: 0,
      };

      return (
        <div style={styles}>
          {sidebarPosition === "left" ? (
            <>
              <div style={sidebarStyles}>{renderWidget(sidebarContent)}</div>
              <div style={mainStyles}>{renderWidget(mainContent)}</div>
            </>
          ) : (
            <>
              <div style={mainStyles}>{renderWidget(mainContent)}</div>
              <div style={sidebarStyles}>{renderWidget(mainContent)}</div>
            </>
          )}
        </div>
      );
    },

    // 40. RESPONSIVE GRID (For card grids and uniform items)
    responsiveGrid: (config: any) => {
      const items = config["ui:items"] || [];
      const columns = config["ui:columns"] || {
        desktop: 3,
        tablet: 2,
        mobile: 1,
      };
      const gap = config["ui:gap"] || "24px";

      const defaultStyles: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns.desktop || 3}, 1fr)`,
        gap: gap,
        marginBottom: "40px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <>
          <div style={styles}>
            {items.map((item: any, index: number) => (
              <div key={index}>{renderWidget(item)}</div>
            ))}
          </div>
          <style>{`
        @media (max-width: 1024px) {
          div {
            grid-template-columns: repeat(${
              columns.tablet || 2
            }, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          div {
            grid-template-columns: repeat(${
              columns.mobile || 1
            }, 1fr) !important;
          }
        }
      `}</style>
        </>
      );
    },

    // Add this to your widgetLibrary.tsx - REPLACE the existing dataTable widget

    dataTable: (config: any, sourceData: any) => {
      // ✅ Create a component that uses hooks properly
      const DataTableComponent = () => {
        const {
          globalData = {},
          setData,
          setActiveModal,
          handleAction,
        } = handlers;

        console.log(globalData, "jdd");

        // ✅ Get data from DataStore
        const dataSourceKey = config["ui:dataSource"];

        console.log("rendered");
        let data = [];
        // Now properly resolves nested path products → api_filtered
        if (dataSourceKey) {
          const keys = dataSourceKey.split(".");
          let resolved: any = globalData;

          for (const key of keys) {
            if (resolved && typeof resolved === "object") {
              resolved = resolved[key];
            } else {
              resolved = undefined;
              break;
            }
          }

          if (Array.isArray(resolved)) {
            data = resolved;
          }
        } else if (Array.isArray(sourceData)) {
          data = sourceData;
        }

        const columns = config["ui:columns"] || [];
        const pagination = config["ui:pagination"] || { enabled: false };
        const pageSize = pagination.pageSize || 10;

        // ✅ PAGINATION WITH DATASTORE - Like projectGrid
        const tableId = config["ui:id"] || "dataTable";

        // Get current page from DataStore
        const [currentPage, setCurrentPage] = useDataStore(
          `ui.table.${tableId}.page`
        );

        // Initialize to page 1 if undefined
        const page = currentPage || 1;

        const total = data.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));

        // Calculate pagination
        const start = (page - 1) * pageSize;
        const end = Math.min(start + pageSize, total);
        const pageData = data.slice(start, end);
        console.log(pageData, "ren");

        // ✅ Page change handler
        const goToPage = (newPage: number) => {
          if (newPage >= 1 && newPage <= totalPages) {
            console.log(`📄 Changing to page ${newPage}`);
            setCurrentPage(newPage);
          }
        };

        // Reset to page 1 if current page is invalid
        useEffect(() => {
          if (page > totalPages && totalPages > 0) {
            console.log(
              `⚠️ Page ${page} exceeds total ${totalPages}, resetting to 1`
            );
            setCurrentPage(1);
          }
        }, [page, totalPages]);

        // ✅ ACTION HANDLER
        const handleActionClick = (action: any, row: any) => {
          console.log("🎬 Action clicked:", { action: action.action, row });

          // Handle modal opening
          if (action.action?.startsWith("openModal:")) {
            const modalName = action.action.replace("openModal:", "");
            console.log(`🎭 Opening modal: ${modalName}`);

            // Store selected product in DataStore
            setData("selectedProduct", row);

            // Open modal after short delay
            setTimeout(() => {
              if (setActiveModal) {
                setActiveModal(modalName);
              }
            }, 50);
            return;
          }

          // Handle confirmation dialogs
          if (action.confirm) {
            const confirmMessage = action.confirmMessage || "Are you sure?";
            if (!window.confirm(confirmMessage)) {
              console.log("❌ Action cancelled by user");
              return;
            }
          }

          // Execute action
          if (handleAction) {
            handleAction(action.action, {
              row,
              ...action.actionParams,
            });
          }
        };

        // ✅ RENDER ACTIONS
        const renderActions = (actions: any[], row: any) => (
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            {actions.map((act: any, i: number) => {
              // Conditional visibility
              if (act.condition) {
                try {
                  // Evaluate condition function
                  const conditionFn = new Function(
                    "row",
                    `return ${act.condition}`
                  );
                  if (!conditionFn(row)) return null;
                } catch (error) {
                  console.error("❌ Condition evaluation error:", error);
                  return null;
                }
              }

              // Button styles
              const variantStyles = {
                primary: { bg: "#3b82f6", color: "white" },
                danger: { bg: "#ef4444", color: "white" },
                secondary: { bg: "#e5e7eb", color: "#374151" },
              } as const;

              const variant = act.variant || "secondary";
              const style =
                variantStyles[variant as keyof typeof variantStyles] ??
                variantStyles.secondary;

              return (
                <button
                  key={i}
                  onClick={() => handleActionClick(act, row)}
                  style={{
                    padding: "6px 14px",
                    background: style.bg,
                    color: style.color,
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {act.label}
                </button>
              );
            })}
          </div>
        );

        // Empty state
        if (data.length === 0) {
          return (
            <div
              style={{
                padding: "100px 40px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              <p style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
                {config["ui:emptyText"] || "No data available"}
              </p>
              <p style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>
                Try adjusting your filters or search criteria
              </p>
            </div>
          );
        }

        return (
          <section
            style={{
              padding: "60px 0",
              background: config["ui:sectionBg"] || "#f8fafc",
            }}
          >
            <div
              style={{
                maxWidth: config["ui:maxWidth"] || "1400px",
                margin: "0 auto",
                padding: "0 40px",
              }}
            >
              {/* Header */}
              {(config["ui:title"] || config["ui:description"]) && (
                <div style={{ marginBottom: "40px" }}>
                  {config["ui:title"] && (
                    <h2
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: 700,
                        color: "#1e293b",
                        margin: "0 0 12px",
                      }}
                    >
                      {config["ui:title"]}
                    </h2>
                  )}
                  {config["ui:description"] && (
                    <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
                      {config["ui:description"]}
                    </p>
                  )}
                </div>
              )}

              {/* Table */}
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {columns.map((col: any) => (
                          <th
                            key={col.key}
                            style={{
                              padding: "20px 16px",
                              textAlign: col.align || "left",
                              fontWeight: 600,
                              color: "#374151",
                              fontSize: "0.95rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              ...(col.width && { width: col.width }),
                            }}
                          >
                            {col.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((row, i) => (
                        <tr
                          key={row.id || i}
                          style={{
                            borderBottom: "1px solid #f3f4f6",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f9fafb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "white")
                          }
                        >
                          {columns.map((col: any) => {
                            // Render action buttons
                            if (col.type === "actions" || col.actions) {
                              return (
                                <td
                                  key={col.key}
                                  style={{
                                    padding: "20px 16px",
                                    textAlign: "center",
                                  }}
                                >
                                  {renderActions(col.actions, row)}
                                </td>
                              );
                            }

                            // Render regular cell
                            return (
                              <td
                                key={col.key}
                                style={{
                                  padding: "20px 16px",
                                  color: "#1e293b",
                                  fontSize: "0.95rem",
                                  textAlign: col.align || "left",
                                }}
                              >
                                {row[col.dataIndex] ?? "-"}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ✅ PAGINATION - DATASTORE VERSION */}
                {pagination.enabled && totalPages > 1 && (
                  <div
                    style={{
                      padding: "24px 32px",
                      background: "#f9fafb",
                      borderTop: "1px solid #e5e7eb",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ color: "#64748b", fontSize: "0.95rem" }}>
                      Showing <strong>{start + 1}</strong> to{" "}
                      <strong>{end}</strong> of <strong>{total}</strong> items
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      {/* Previous Button */}
                      <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        style={{
                          padding: "10px 18px",
                          background: page === 1 ? "#f3f4f6" : "#3b82f6",
                          color: page === 1 ? "#9ca3af" : "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: page === 1 ? "not-allowed" : "pointer",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          transition: "all 0.2s",
                        }}
                      >
                        ← Previous
                      </button>

                      {/* Page Numbers */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (page <= 3) {
                              pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = page - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                style={{
                                  padding: "8px 14px",
                                  background:
                                    page === pageNum ? "#3b82f6" : "white",
                                  color: page === pageNum ? "white" : "#374151",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontWeight: page === pageNum ? 600 : 400,
                                  fontSize: "0.9rem",
                                  minWidth: "40px",
                                  transition: "all 0.2s",
                                }}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        style={{
                          padding: "10px 18px",
                          background:
                            page === totalPages ? "#f3f4f6" : "#3b82f6",
                          color: page === totalPages ? "#9ca3af" : "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor:
                            page === totalPages ? "not-allowed" : "pointer",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          transition: "all 0.2s",
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      };

      return <DataTableComponent key={config["ui:id"] || "dataTable"} />;
    },

    // 35. TABS
    tabs: (config: any) => {
      const tabs = config.tabs || [];

      return (
        <div>
          <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
            {tabs.map((tab: any, index: number) => (
              <button
                key={index}
                onClick={() => handlers?.setActiveTab(index)}
                style={{
                  padding: "12px 24px",
                  background:
                    handlers?.activeTab === index ? "#667eea" : "transparent",
                  color: handlers?.activeTab === index ? "white" : "#64748b",
                  border: "none",
                  borderBottom:
                    handlers?.activeTab === index
                      ? "2px solid #667eea"
                      : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "20px 0" }}>
            {tabs[handlers?.activeTab]?.content}
          </div>
        </div>
      );
    },

    // 36. SIMPLE KANBAN
    kanbanBoard: (config: any) => {
      const columns = config.columns || [];

      return (
        <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          {columns.map((column: any, index: number) => (
            <div
              key={index}
              style={{
                minWidth: "300px",
                background: "#f8fafc",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h3 style={{ marginBottom: "16px" }}>{column.title}</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {column.cards?.map((card: any, cardIndex: number) => (
                  <div
                    key={cardIndex}
                    style={{
                      background: "white",
                      padding: "16px",
                      borderRadius: "6px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    },
    // ========== FORM ROW (LAYOUT) ==========
    formRow: (config: any) => {
      const fields = config["ui:fields"] || [];
      const gap = config["ui:gap"] || "20px";

      const defaultStyles: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${fields.length}, 1fr)`,
        gap: gap,
        marginBottom: "20px",
        width: "100%",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      // Create a simple mapping for common form field widgets
      const renderFormField = (field: any) => {
        const widgetType = field["ui:widget"];
        const styles = applyStyles(field["ui:styles"]);

        switch (widgetType) {
          case "inputField":
            return (
              <div key={field["ui:name"]} style={{ minWidth: 0 }}>
                <input
                  type={field["ui:type"] || "text"}
                  placeholder={field["ui:placeholder"] || ""}
                  style={styles}
                  onChange={(e) =>
                    handlers.setModalFormData?.({
                      [field["ui:name"]]: e.target.value,
                    })
                  }
                />
              </div>
            );

          case "selectField":
            return (
              <div key={field["ui:name"]} style={{ minWidth: 0 }}>
                <select
                  style={styles}
                  onChange={(e) =>
                    handlers.setModalFormData?.({
                      [field["ui:name"]]: e.target.value,
                    })
                  }
                >
                  <option value="">
                    {field["ui:placeholder"] || "Select..."}
                  </option>
                  {(field["ui:options"] || []).map((opt: any, idx: number) => (
                    <option key={idx} value={opt.value || opt}>
                      {opt.label || opt}
                    </option>
                  ))}
                </select>
              </div>
            );

          default:
            return (
              <div key={field["ui:name"]} style={{ minWidth: 0 }}>
                <div
                  style={{
                    padding: "10px",
                    background: "#fee",
                    border: "1px dashed #f88",
                  }}
                >
                  Unknown field: {widgetType}
                </div>
              </div>
            );
        }
      };

      return (
        <div style={containerStyles}>
          {fields.map((field: any, idx: number) => renderFormField(field))}
        </div>
      );
    },

    // 1. TEXT WIDGET
    text: (config: any) => {
      const content = config["ui:content"] || "";
      const defaultStyles: React.CSSProperties = {
        fontSize: "1rem",
        color: "#334155",
      };
      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;
      return <div style={styles}>{content}</div>;
    },

    // 2. HEADING WIDGET
    heading: (config: any) => {
      const boundData = enhanceWidgetWithData(config, globalData);
      const text = boundData || config["ui:text"] || "Heading";
      const level = config["ui:level"] || "h2";

      const defaultStyles: React.CSSProperties = {
        fontSize:
          level === "h1"
            ? "3rem"
            : level === "h2"
            ? "2.5rem"
            : level === "h3"
            ? "2rem"
            : "1.5rem",
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: "20px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      const Tag = level as any;
      return <Tag style={styles}>{text}</Tag>;
    },

    // 3. PARAGRAPH WIDGET
    paragraph: (config: any) => {
      const text = config["ui:text"] || "";

      const defaultStyles: React.CSSProperties = {
        fontSize: "1rem",
        lineHeight: "1.8",
        color: "#64748b",
        marginBottom: "16px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return <p style={styles}>{text}</p>;
    },

    // In widgetLibrary.tsx - REPLACE the button widget with this:

    button: (config: any) => {
      const label = config["ui:label"] || "Button";
      const action = config["ui:action"] || "";
      const actionParams = config["ui:actionParams"] || {};
      const variant = config["ui:variant"] || "primary";
      const size = config["ui:size"] || "medium";

      const defaultStyles: React.CSSProperties = {
        padding:
          size === "large"
            ? "14px 32px"
            : size === "small"
            ? "8px 16px"
            : "10px 24px",
        fontSize:
          size === "large" ? "1.1rem" : size === "small" ? "0.9rem" : "1rem",
        fontWeight: "600",
        border:
          variant === "outline"
            ? "2px solid #667eea"
            : variant === "danger-outline"
            ? "2px solid #ef4444"
            : "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
        background:
          variant === "primary"
            ? "#667eea"
            : variant === "secondary"
            ? "#64748b"
            : variant === "danger"
            ? "#ef4444"
            : "transparent",
        color:
          variant === "outline"
            ? "#667eea"
            : variant === "danger"
            ? "white"
            : variant === "danger-outline"
            ? "#ef4444"
            : "white",
      };

      const customStyles = config["ui:styles"]
        ? applyStyles(config["ui:styles"])
        : {};
      const mergedStyles = { ...defaultStyles, ...customStyles };

      return (
        <button
          onClick={() => {
            if (!action) {
              console.warn("⚠️ Button has no action");
              return;
            }

            console.log("🔘 Button clicked:", {
              action: action,
              actionParams: actionParams,
              label: label,
            });

            // ✅ CORRECT: Pass complete config with actionParams
            handlers?.handleAction(action, {
              actionParams: actionParams,
              ...config, // Include other config if needed
            });
          }}
          style={mergedStyles}
          onMouseEnter={(e) => {
            const hoverTransform =
              config["ui:hoverTransform"] || "translateY(-2px)";
            const hoverShadow =
              config["ui:hoverShadow"] || "0 4px 12px rgba(0,0,0,0.15)";
            e.currentTarget.style.transform = hoverTransform;
            e.currentTarget.style.boxShadow = hoverShadow;
            if (variant === "danger") {
              e.currentTarget.style.background = "#dc2626";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            if (variant === "danger") {
              e.currentTarget.style.background = "#ef4444";
            }
          }}
        >
          {label}
        </button>
      );
    },

    // 5. IMAGE WIDGET
    image: (config: any) => {
      const src = config["ui:src"] || "https://via.placeholder.com/800x400";
      const alt = config["ui:alt"] || "Image";
      const caption = config["ui:caption"];

      const defaultImageStyles: React.CSSProperties = {
        maxWidth: "100%",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      };

      const defaultFigureStyles: React.CSSProperties = {
        margin: "20px 0",
        textAlign: "center",
      };

      const defaultCaptionStyles: React.CSSProperties = {
        marginTop: "12px",
        fontSize: "0.9rem",
        color: "#64748b",
        fontStyle: "italic",
      };

      const imageStyles = config["ui:imageStyles"]
        ? { ...defaultImageStyles, ...applyStyles(config["ui:imageStyles"]) }
        : defaultImageStyles;

      const figureStyles = config["ui:styles"]
        ? { ...defaultFigureStyles, ...applyStyles(config["ui:styles"]) }
        : defaultFigureStyles;

      const captionStyles = config["ui:captionStyles"]
        ? {
            ...defaultCaptionStyles,
            ...applyStyles(config["ui:captionStyles"]),
          }
        : defaultCaptionStyles;

      return (
        <figure style={figureStyles}>
          <img src={src} alt={alt} style={imageStyles} />
          {caption && <figcaption style={captionStyles}>{caption}</figcaption>}
        </figure>
      );
    },

    // 6. VIDEO WIDGET
    video: (config: any) => {
      const url = config["ui:url"] || "";
      const autoplay = config["ui:autoplay"] || false;

      let embedUrl = url;
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId =
          url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
        embedUrl = `https://www.youtube.com/embed/${videoId}${
          autoplay ? "?autoplay=1" : ""
        }`;
      }

      const defaultContainerStyles: React.CSSProperties = {
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        borderRadius: "12px",
        margin: "20px 0",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;

      return (
        <div style={containerStyles}>
          <iframe
            src={embedUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },

    // 7. CARD WIDGET
    card: (config: any) => {
      const boundData = enhanceWidgetWithData(config, globalData);

      // ✅ MODIFY: Use boundData if available, otherwise use config
      const title =
        boundData?.title ||
        boundData?.name ||
        config["ui:title"] ||
        "Card Title";
      const description =
        boundData?.description || config["ui:description"] || "";
      const image = boundData?.image || config["ui:image"];
      const price = boundData?.price;

      const action = config["ui:action"];
      const buttonLabel = config["ui:buttonLabel"] || "Learn More";

      const defaultCardStyles: React.CSSProperties = {
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        transition: "all 0.3s",
        cursor: action ? "pointer" : "default",
      };

      const defaultImageStyles: React.CSSProperties = {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "12px",
        marginBottom: "16px",
      };

      const defaultTitleStyles: React.CSSProperties = {
        fontSize: "1.4rem",
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: "12px",
      };

      const defaultDescStyles: React.CSSProperties = {
        fontSize: "1rem",
        color: "#64748b",
        lineHeight: "1.6",
        marginBottom: "16px",
      };

      const cardStyles = config["ui:styles"]
        ? { ...defaultCardStyles, ...applyStyles(config["ui:styles"]) }
        : defaultCardStyles;

      const imageStyles = config["ui:imageStyles"]
        ? { ...defaultImageStyles, ...applyStyles(config["ui:imageStyles"]) }
        : defaultImageStyles;

      const titleStyles = config["ui:titleStyles"]
        ? { ...defaultTitleStyles, ...applyStyles(config["ui:titleStyles"]) }
        : defaultTitleStyles;

      const descStyles = config["ui:descriptionStyles"]
        ? {
            ...defaultDescStyles,
            ...applyStyles(config["ui:descriptionStyles"]),
          }
        : defaultDescStyles;

      return (
        <div
          style={cardStyles}
          onClick={() => action && handlers?.handleAction(action)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              config["ui:hoverTransform"] || "translateY(-4px)";
            e.currentTarget.style.boxShadow =
              config["ui:hoverShadow"] || "0 8px 24px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
          }}
        >
          {image && <img src={image} alt={title} style={imageStyles} />}
          <h3 style={titleStyles}>{title}</h3>
          <p style={descStyles}>{description}</p>
          {price && (
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#667eea",
              }}
            >
              ${price}
            </div>
          )}
          {action && (
            <button
              style={{
                padding: "8px 16px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {buttonLabel}
            </button>
          )}
        </div>
      );
    },

    // 8. ICON WIDGET
    // Enhanced icon widget in widgetLibrary.tsx
    icon: (config: any) => {
      const emoji = config["ui:emoji"] || "⭐";
      const fontAwesome = config["ui:fontAwesome"] || "";
      const materialIcon = config["ui:materialIcon"] || "";
      const size = config["ui:size"] || "medium";

      const iconSize =
        size === "large" ? "3rem" : size === "small" ? "1rem" : "2rem";

      const defaultStyles: React.CSSProperties = {
        fontSize: iconSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      // Font Awesome icons
      if (fontAwesome) {
        return <i className={fontAwesome} style={styles} />;
      }

      // Material Icons
      if (materialIcon) {
        return (
          <span className="material-icons" style={styles}>
            {materialIcon}
          </span>
        );
      }

      // Fallback to emoji
      return <span style={styles}>{emoji}</span>;
    },

    // 9. DIVIDER WIDGET
    divider: (config: any) => {
      const variant = config["ui:variant"] || "solid";
      const color = config["ui:color"] || "#e2e8f0";
      const spacing = config["ui:spacing"] || "medium";

      const defaultStyles: React.CSSProperties = {
        border: "none",
        borderTop:
          variant === "dashed" ? `2px dashed ${color}` : `1px solid ${color}`,
        margin:
          spacing === "large"
            ? "40px 0"
            : spacing === "small"
            ? "16px 0"
            : "24px 0",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return <hr style={styles} />;
    },

    // 10. SPACER WIDGET
    spacer: (config: any) => {
      const height = config["ui:height"] || 40;
      return <div style={{ height: `${height}px` }} />;
    },

    // 11. CONTAINER WIDGET
    // container: (config: any) => {
    //   const maxWidth = config["ui:maxWidth"] || "1200px";
    //   const padding = config["ui:padding"] || "20px";
    //   const children = config["ui:content"] || "";

    //   const defaultStyles: React.CSSProperties = {
    //     maxWidth,
    //     margin: "0 auto",
    //     padding,
    //   };

    //   const styles = config["ui:styles"]
    //     ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
    //     : defaultStyles;

    //   return <div style={styles}>{children}</div>;
    // },

    // 12. BADGE WIDGET
    badge: (config: any) => {
      const text = config["ui:text"] || "New";
      const variant = config["ui:variant"] || "primary";

      const colors: Record<string, { bg: string; color: string }> = {
        primary: { bg: "#667eea", color: "white" },
        success: { bg: "#10b981", color: "white" },
        warning: { bg: "#f59e0b", color: "white" },
        danger: { bg: "#ef4444", color: "white" },
        info: { bg: "#3b82f6", color: "white" },
      };

      const style = colors[variant] || colors.primary;

      const defaultStyles: React.CSSProperties = {
        display: "inline-block",
        padding: "4px 12px",
        fontSize: "0.85rem",
        fontWeight: "600",
        borderRadius: "12px",
        background: style.bg,
        color: style.color,
      };

      const mergedStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return <span style={mergedStyles}>{text}</span>;
    },

    // 13. ALERT WIDGET
    alert: (config: any) => {
      const message = config["ui:message"] || "Alert message";
      const type = config["ui:type"] || "info";
      const dismissible = config["ui:dismissible"] !== false;
      const alertId = config["ui:id"] || `alert-${Math.random()}`;

      if (handlers?.dismissedAlerts.has(alertId)) return null;

      const types: Record<
        string,
        { bg: string; border: string; color: string }
      > = {
        success: { bg: "#d1fae5", border: "#10b981", color: "#065f46" },
        warning: { bg: "#fef3c7", border: "#f59e0b", color: "#92400e" },
        danger: { bg: "#fee2e2", border: "#ef4444", color: "#991b1b" },
        info: { bg: "#dbeafe", border: "#3b82f6", color: "#1e40af" },
      };

      const style = types[type] || types.info;

      const defaultStyles: React.CSSProperties = {
        padding: "16px 20px",
        borderRadius: "8px",
        background: style.bg,
        borderLeft: `4px solid ${style.border}`,
        color: style.color,
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      };

      const alertStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={alertStyles}>
          <span>{message}</span>
          {dismissible && (
            <button
              onClick={() =>
                handlers?.setDismissedAlerts(
                  (prev: any) => new Set([...prev, alertId])
                )
              }
              style={{
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                color: style.color,
                padding: "0 8px",
              }}
            >
              ×
            </button>
          )}
        </div>
      );
    },

    // 14. PROGRESS BAR WIDGET
    progressBar: (config: any) => {
      const value = config["ui:value"] || 0;
      const max = config["ui:max"] || 100;
      const label = config["ui:label"];
      const color = config["ui:color"] || "#667eea";
      const showPercentage = config["ui:showPercentage"] !== false;

      const percentage = (value / max) * 100;

      const defaultContainerStyles: React.CSSProperties = {
        marginBottom: "20px",
      };

      const defaultBarContainerStyles: React.CSSProperties = {
        width: "100%",
        height: "12px",
        background: "#e2e8f0",
        borderRadius: "6px",
        overflow: "hidden",
      };

      const defaultBarStyles: React.CSSProperties = {
        width: `${percentage}%`,
        height: "100%",
        background: color,
        transition: "width 0.3s ease",
        borderRadius: "6px",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;

      const barContainerStyles = config["ui:barContainerStyles"]
        ? {
            ...defaultBarContainerStyles,
            ...applyStyles(config["ui:barContainerStyles"]),
          }
        : defaultBarContainerStyles;

      const barStyles = config["ui:barStyles"]
        ? { ...defaultBarStyles, ...applyStyles(config["ui:barStyles"]) }
        : defaultBarStyles;

      return (
        <div style={containerStyles}>
          {label && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "0.9rem",
                color: "#64748b",
              }}
            >
              <span>{label}</span>
              {showPercentage && <span>{percentage.toFixed(0)}%</span>}
            </div>
          )}
          <div style={barContainerStyles}>
            <div style={barStyles} />
          </div>
        </div>
      );
    },

    // 15. LIST WIDGET
    list: (config: any) => {
      const items = config["ui:items"] || [];
      const ordered = config["ui:ordered"] || false;
      const icon = config["ui:icon"] || "•";

      const Tag = ordered ? "ol" : ("ul" as any);

      const defaultListStyles: React.CSSProperties = {
        listStyle: ordered ? "decimal" : "none",
        padding: ordered ? "0 0 0 24px" : 0,
        margin: "20px 0",
      };

      const defaultItemStyles: React.CSSProperties = {
        padding: "8px 0",
        fontSize: "1rem",
        color: "#64748b",
        lineHeight: "1.6",
        display: "flex",
        alignItems: "start",
        gap: "12px",
      };

      const listStyles = config["ui:styles"]
        ? { ...defaultListStyles, ...applyStyles(config["ui:styles"]) }
        : defaultListStyles;

      const itemStyles = config["ui:itemStyles"]
        ? { ...defaultItemStyles, ...applyStyles(config["ui:itemStyles"]) }
        : defaultItemStyles;

      return (
        <Tag style={listStyles}>
          {(Array.isArray(items) ? items : []).map(
            (item: string, idx: number) => (
              <li key={idx} style={itemStyles}>
                {!ordered && (
                  <span style={{ color: "#667eea", fontWeight: "bold" }}>
                    {icon}
                  </span>
                )}
                <span>{item}</span>
              </li>
            )
          )}
        </Tag>
      );
    },

    // Replace the existing icon widget with this enhanced version:

    // 16. FORM CONTAINER
    formContainer: (config: any) => {
      const title = config["ui:title"];
      const description = config["ui:description"];
      const actions = config["ui:actions"] || [];
      const fields = config["ui:fields"] || [];

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Collect form data
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const data: Record<string, any> = {};

        formData.forEach((value, key) => {
          data[key] = value;
        });

        console.log("📦 Form data collected:", data);

        // ✅ Find the primary action
        const primaryAction = actions.find((a: any) => a.variant === "primary");
        if (primaryAction) {
          // ✅ Pass data as the THIRD parameter (payload)
          await handlers?.handleAction(
            primaryAction.action,
            primaryAction,
            data
          );
        }
      };

      return (
        <form
          onSubmit={handleSubmit}
          style={applyStyles(config["ui:styles"] || {})}
        >
          {title && <h2 style={{ marginBottom: "12px" }}>{title}</h2>}
          {description && (
            <p style={{ marginBottom: "24px", color: "#64748b" }}>
              {description}
            </p>
          )}

          {fields.map((field: any, idx: number) => {
            const widgetType = field["ui:widget"];
            const renderWidget = widgets[widgetType];
            if (renderWidget) {
              return <div key={idx}>{renderWidget(field)}</div>;
            }
            return null;
          })}

          <div
            style={applyStyles(
              config["ui:actionsContainerStyles"] || {
                display: "flex",
                gap: "12px",
                marginTop: "24px",
              }
            )}
          >
            {actions.map((action: any, idx: number) => (
              <button
                key={idx}
                type={action.variant === "primary" ? "submit" : "button"}
                style={applyStyles(action.styles || {})}
              >
                {action.label}
              </button>
            ))}
          </div>
        </form>
      );
    },
    // ✅ FIXED dateField
    dateField: (config: any) => {
      // ✅ Create a separate component that won't be recreated
      const DateField = React.memo(() => {
        const label = config["ui:label"] || "";
        const placeholder = config["ui:placeholder"] || "";
        const required = config["ui:required"] || false;
        const name =
          config["ui:name"] || label.toLowerCase().replace(/\s/g, "-");

        // ✅ Use local state for immediate updates
        const [localValue, setLocalValue] = React.useState(() => {
          const formData = handlers.getFormData();
          return formData?.[name] || "";
        });

        // ✅ Sync with DataStore on blur
        const handleBlur = () => {
          handlers.setFormField(name, localValue);
        };

        const defaultContainerStyles: React.CSSProperties = {
          marginBottom: "16px",
        };
        const defaultLabelStyles: React.CSSProperties = {
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#334155",
          fontSize: "0.95rem",
        };
        const defaultInputStyles: React.CSSProperties = {
          width: "100%",
          padding: "12px 16px",
          fontSize: "1rem",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          outline: "none",
          background: "white",
          boxSizing: "border-box",
        };

        const containerStyles = config["ui:styles"]
          ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
          : defaultContainerStyles;
        const labelStyles = config["ui:labelStyles"]
          ? { ...defaultLabelStyles, ...applyStyles(config["ui:labelStyles"]) }
          : defaultLabelStyles;
        const inputStyles = config["ui:inputStyles"]
          ? { ...defaultInputStyles, ...applyStyles(config["ui:inputStyles"]) }
          : defaultInputStyles;

        return (
          <div style={containerStyles}>
            {label && (
              <label style={labelStyles}>
                {label}{" "}
                {required && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
            )}
            <input
              type="date"
              name={name}
              value={localValue} // ✅ Local state
              placeholder={placeholder}
              required={required}
              onChange={(e) => {
                setLocalValue(e.target.value); // ✅ Update local state immediately
              }}
              onBlur={handleBlur} // ✅ Sync to DataStore on blur
              style={inputStyles}
              onFocus={(e) =>
                (e.target.style.borderColor =
                  config["ui:focusBorderColor"] || "#667eea")
              }
            />
          </div>
        );
      });

      return <DateField key={config["ui:name"]} />;
    },

    // ✅ FIXED textareaField
    textareaField: (config: any) => {
      // ✅ Create a separate component that won't be recreated
      const TextareaField = React.memo(() => {
        const label = config["ui:label"] || "";
        const placeholder = config["ui:placeholder"] || "";
        const rows = config["ui:rows"] || 5;
        const required = config["ui:required"] || false;
        const name =
          config["ui:name"] || label.toLowerCase().replace(/\s/g, "-");

        // ✅ Use local state for immediate updates
        const [localValue, setLocalValue] = React.useState(() => {
          const formData = handlers.getFormData();
          return formData?.[name] || "";
        });

        // ✅ Sync with DataStore on blur (not on every keystroke)
        const handleBlur = () => {
          handlers.setFormField(name, localValue);
        };

        const defaultContainerStyles: React.CSSProperties = {
          marginBottom: "20px",
        };
        const defaultLabelStyles: React.CSSProperties = {
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#334155",
          fontSize: "0.95rem",
        };
        const defaultTextareaStyles: React.CSSProperties = {
          width: "100%",
          padding: "12px 16px",
          fontSize: "1rem",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          outline: "none",
          transition: "border-color 0.2s",
          resize: "vertical",
          fontFamily: "inherit",
          background: "white",
          boxSizing: "border-box",
        };

        const containerStyles = config["ui:styles"]
          ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
          : defaultContainerStyles;
        const labelStyles = config["ui:labelStyles"]
          ? { ...defaultLabelStyles, ...applyStyles(config["ui:labelStyles"]) }
          : defaultLabelStyles;
        const textareaStyles = config["ui:textareaStyles"]
          ? {
              ...defaultTextareaStyles,
              ...applyStyles(config["ui:textareaStyles"]),
            }
          : defaultTextareaStyles;

        return (
          <div style={containerStyles}>
            {label && (
              <label style={labelStyles}>
                {label}{" "}
                {required && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
            )}
            <textarea
              name={name}
              placeholder={placeholder}
              required={required}
              rows={rows}
              value={localValue} // ✅ Local state
              onChange={(e) => {
                setLocalValue(e.target.value); // ✅ Update local state immediately
              }}
              onBlur={handleBlur} // ✅ Sync to DataStore on blur
              style={textareaStyles}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  config["ui:focusBorderColor"] || "#667eea")
              }
            />
          </div>
        );
      });

      return <TextareaField key={config["ui:name"]} />;
    },

    filterWidget: (config: any) => {
      const FilterComponent = () => {
        const formRef = useRef<HTMLFormElement>(null);

        const handleApply = (e: React.FormEvent) => {
          e.preventDefault();

          // ✅ Use FormData to collect values directly from form elements
          const formData = new FormData(e.currentTarget as HTMLFormElement);
          const data: Record<string, any> = {};

          formData.forEach((value, key) => {
            if (value) data[key] = value;
          });

          console.log("📦 FormData collected:", data);

          const applyAction = config["ui:actions"]?.find(
            (a: any) => a.variant === "filter"
          );
          if (applyAction) {
            console.log("🚀 Executing filter action with data:", data);
            handlers?.handleAction(applyAction.action, applyAction, data);
          }
        };

        const handleReset = () => {
          console.log("🔄 Resetting filters");
          if (formRef.current) {
            formRef.current.reset();
          }

          // ✅ Clear form data from DataStore
          handlers?.setFormData?.({});

          const resetAction = config["ui:actions"]?.find(
            (a: any) => a.variant === "reset"
          );
          if (resetAction) {
            handlers?.handleAction(resetAction.action, resetAction, {});
          }

          // Reset filtered data using DataStore
          handlers?.setData?.(
            "products.api_filtered",
            handlers?.globalData?.["products.api"] || []
          );
        };

        const handleRefresh = () => {
          console.log("🔄 Refreshing data");
          const refreshAction = config["ui:actions"]?.find(
            (a: any) => a.variant === "refresh"
          );
          if (refreshAction) {
            handlers?.handleAction(refreshAction.action, refreshAction, {});
          }
        };

        return (
          <div style={applyStyles(config["ui:styles"] || {})}>
            {config["ui:title"] && (
              <h3
                style={{
                  marginBottom: "20px",
                  color: "#1f2937",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                {config["ui:title"]}
              </h3>
            )}

            {/* ✅ Add form ref and remove controlled components */}
            <form ref={formRef} onSubmit={handleApply}>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {config["ui:fields"]?.map((field: any, idx: number) => {
                  const widgetType = field["ui:widget"];
                  const renderWidget = widgets[widgetType];
                  if (renderWidget) {
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: field["ui:flex"] || 1,
                          minWidth: field["ui:minWidth"] || "auto",
                        }}
                      >
                        {/* ✅ Pass the field config directly - child widgets will handle their own state */}
                        {renderWidget(field)}
                      </div>
                    );
                  }
                  return null;
                })}

                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {config["ui:actions"]?.map((action: any, idx: number) => (
                    <button
                      key={idx}
                      type={action.variant === "filter" ? "submit" : "button"}
                      style={applyStyles(action.styles || {})}
                      onClick={
                        action.variant === "reset"
                          ? handleReset
                          : action.variant === "refresh"
                          ? handleRefresh
                          : undefined
                      }
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        );
      };

      return <FilterComponent />;
    },

    // 17. INPUT FIELD
    // widgetLibrary.tsx - ALTERNATIVE SOLUTION
    inputField: (config: any) => {
      const InputField = React.memo(() => {
        const label = config["ui:label"] || "";
        const placeholder = config["ui:placeholder"] || "";
        const type = config["ui:type"] || "text";
        const required = config["ui:required"] || false;
        const name =
          config["ui:name"] || label.toLowerCase().replace(/\s/g, "-");

        // ✅ Get initial value from DataStore
        const initialValue = handlers.getFormData()?.[name] || "";
        const [localValue, setLocalValue] = React.useState(initialValue);

        // ✅ Get field error from DataStore
        const [fieldErrors] = useDataStore("ui.errors.fields");
        const fieldError = fieldErrors?.[name];

        // Sync local state with DataStore
        React.useEffect(() => {
          const currentValue = handlers.getFormData()?.[name] || "";
          if (currentValue !== localValue) {
            setLocalValue(currentValue);
          }
        }, [handlers.getFormData()]);

        const defaultContainerStyles: React.CSSProperties = {
          marginBottom: "20px",
        };
        const defaultLabelStyles: React.CSSProperties = {
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#334155",
          fontSize: "0.95rem",
        };
        const defaultInputStyles: React.CSSProperties = {
          width: "100%",
          padding: "12px 16px",
          fontSize: "1rem",
          border: `2px solid ${fieldError ? "#ef4444" : "#e2e8f0"}`, // ✅ Red border if error
          borderRadius: "8px",
          outline: "none",
          transition: "border-color 0.2s",
          background: "white",
          boxSizing: "border-box",
        };

        const containerStyles = config["ui:styles"]
          ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
          : defaultContainerStyles;
        const labelStyles = config["ui:labelStyles"]
          ? { ...defaultLabelStyles, ...applyStyles(config["ui:labelStyles"]) }
          : defaultLabelStyles;
        const inputStyles = config["ui:inputStyles"]
          ? { ...defaultInputStyles, ...applyStyles(config["ui:inputStyles"]) }
          : defaultInputStyles;

        return (
          <div style={containerStyles}>
            {label && (
              <label style={labelStyles}>
                {label}{" "}
                {required && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
            )}
            <input
              type={type}
              name={name}
              value={localValue}
              placeholder={placeholder}
              required={required}
              style={inputStyles}
              onChange={(e) => {
                const newValue = e.target.value;
                setLocalValue(newValue);
                handlers.setFormField(name, newValue);

                // ✅ Clear field error when user starts typing
                if (fieldError) {
                  const currentErrors = handlers?.getFieldErrors?.() || {};
                  const { [name]: removed, ...rest } = currentErrors;
                  handlers?.setFieldErrors?.(rest);
                }
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = fieldError
                  ? "#ef4444"
                  : config["ui:focusBorderColor"] || "#667eea")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = fieldError
                  ? "#ef4444"
                  : config["ui:blurBorderColor"] || "#e2e8f0")
              }
            />

            {/* ✅ Show field-level error message */}
            {fieldError && (
              <div
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>⚠️</span>
                <span>{fieldError}</span>
              </div>
            )}
          </div>
        );
      });

      return <InputField key={config["ui:name"]} />;
    },

    // ✅ FIXED selectField - No hooks, uses handlers
    selectField: (config: any) => {
      // ✅ Create a separate component with React.memo and local state
      const SelectField = React.memo(() => {
        const label = config["ui:label"] || "";
        const options = config["ui:options"] || [];
        const placeholder = config["ui:placeholder"] || "Select an option";
        const required = config["ui:required"] || false;
        const name =
          config["ui:name"] ||
          label.toLowerCase().replace(/\s/g, "-") ||
          `select-${Math.random().toString(36).substr(2, 9)}`;

        // ✅ Use local state for immediate updates
        const [localValue, setLocalValue] = React.useState(() => {
          const formData = handlers.getFormData();
          return formData?.[name] || "";
        });

        // ✅ Sync with DataStore on change (for selects, we usually update immediately)
        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value;
          setLocalValue(value); // ✅ Update local state immediately

          console.log("🔄 SelectField changed:", { name, value });

          // ✅ Use handlers to update form data
          handlers.setFormField(name, value);

          // ✅ Trigger handling (if needed for filtering, etc.)
          const changeTrigger = config["ui:triggers"]?.find(
            (t: any) => t.event === "change"
          );
          if (changeTrigger && handlers?.handleTrigger) {
            handlers.handleTrigger(changeTrigger, value);
          }
        };

        const defaultContainerStyles: React.CSSProperties = {
          marginBottom: "20px",
        };
        const defaultLabelStyles: React.CSSProperties = {
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#334155",
          fontSize: "0.95rem",
        };
        const defaultSelectStyles: React.CSSProperties = {
          width: "100%",
          padding: "12px 16px",
          fontSize: "1rem",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          outline: "none",
          cursor: "pointer",
          background: "white",
          color: "#334155",
          boxSizing: "border-box",
        };

        const containerStyles = config["ui:styles"]
          ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
          : defaultContainerStyles;
        const labelStyles = config["ui:labelStyles"]
          ? { ...defaultLabelStyles, ...applyStyles(config["ui:labelStyles"]) }
          : defaultLabelStyles;
        const selectStyles = config["ui:selectStyles"]
          ? {
              ...defaultSelectStyles,
              ...applyStyles(config["ui:selectStyles"]),
            }
          : defaultSelectStyles;

        return (
          <div style={containerStyles}>
            {label && (
              <label style={labelStyles}>
                {label}{" "}
                {required && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
            )}
            <select
              name={name}
              value={localValue} // ✅ Use local state
              required={required}
              onChange={handleChange} // ✅ Handle change with local state update
              style={selectStyles}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  config["ui:focusBorderColor"] || "#667eea")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  config["ui:blurBorderColor"] || "#e2e8f0")
              }
            >
              <option value="">{placeholder}</option>
              {options.map((opt: any, idx: number) => (
                <option key={idx} value={opt.value || opt}>
                  {opt.label || opt}
                </option>
              ))}
            </select>
          </div>
        );
      });

      return <SelectField key={config["ui:name"]} />;
    },
    // 18. TEXTAREA FIELD

    // 19. FILE UPLOAD
    fileUpload: (config: any) => {
      const label = config["ui:label"] || "Upload File";
      const accept = config["ui:accept"] || "*";
      const multiple = config["ui:multiple"] || false;
      const name = config["ui:name"] || "file";

      const defaultUploadAreaStyles: React.CSSProperties = {
        border: "2px dashed #cbd5e1",
        borderRadius: "8px",
        padding: "30px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        background: "#f8fafc",
      };

      const uploadAreaStyles = config["ui:uploadAreaStyles"]
        ? {
            ...defaultUploadAreaStyles,
            ...applyStyles(config["ui:uploadAreaStyles"]),
          }
        : defaultUploadAreaStyles;

      return (
        <div style={{ marginBottom: "20px" }}>
          {label && (
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
                fontSize: "0.95rem",
              }}
            >
              {label}
            </label>
          )}
          <div
            style={uploadAreaStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.background = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.background = "#f8fafc";
            }}
          >
            <input
              type="file"
              name={name}
              accept={accept}
              multiple={multiple}
              onChange={(e) => {
                const files = e.target.files;
                if (files)
                  handlers?.setFormData((prev: any) => ({
                    ...prev,
                    [name]: Array.from(files),
                  }));
              }}
              style={{ display: "none" }}
              id={`file-${name}`}
            />
            <label htmlFor={`file-${name}`} style={{ cursor: "pointer" }}>
              <div style={{ fontSize: "3rem", marginBottom: "10px" }}>📁</div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1rem",
                  marginBottom: "8px",
                }}
              >
                Click to upload or drag and drop
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                {accept === "*" ? "Any file type" : accept}
              </p>
            </label>
          </div>
        </div>
      );
    },

    // 20. SELECT DROPDOWN
    // REPLACE selectField widget in widgetLibrary.tsx

    // 21. CHECKBOX
    checkbox: (config: any) => {
      const label = config["ui:label"] || "";
      const name = config["ui:name"] || label.toLowerCase().replace(/\s/g, "-");
      const required = config["ui:required"] || false;

      const defaultContainerStyles: React.CSSProperties = {
        marginBottom: "16px",
      };
      const defaultLabelStyles: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        fontSize: "1rem",
        color: "#334155",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;
      const labelStyles = config["ui:labelStyles"]
        ? { ...defaultLabelStyles, ...applyStyles(config["ui:labelStyles"]) }
        : defaultLabelStyles;

      return (
        <div style={containerStyles}>
          <label style={labelStyles}>
            <input
              type="checkbox"
              name={name}
              required={required}
              onChange={(e) => {
                handlers?.setFormData((prev: any) => ({
                  ...prev,
                  [name]: e.target.value,
                }));

                // ✅ ADD: Execute change trigger
                const changeTrigger = config["ui:triggers"]?.find(
                  (t: any) => t.event === "change"
                );
                if (changeTrigger && handlers?.handleTrigger) {
                  handlers.handleTrigger(changeTrigger, e);
                }
              }}
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: config["ui:accentColor"] || "#667eea",
              }}
            />
            <span>
              {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
            </span>
          </label>
        </div>
      );
    },

    // 22. RADIO GROUP
    radioGroup: (config: any) => {
      const label = config["ui:label"] || "";
      const options = config["ui:options"] || [];
      const name = config["ui:name"] || label.toLowerCase().replace(/\s/g, "-");
      const required = config["ui:required"] || false;

      const defaultContainerStyles: React.CSSProperties = {
        marginBottom: "20px",
      };
      const defaultLabelStyles: React.CSSProperties = {
        display: "block",
        marginBottom: "12px",
        fontWeight: "600",
        color: "#334155",
        fontSize: "0.95rem",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;
      const labelStyles = config["ui:labelStyles"]
        ? { ...defaultLabelStyles, ...applyStyles(config["ui:labelStyles"]) }
        : defaultLabelStyles;

      return (
        <div style={containerStyles}>
          {label && (
            <label style={labelStyles}>
              {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
            </label>
          )}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {options.map((opt: any, idx: number) => (
              <label
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#334155",
                }}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value || opt}
                  required={required && idx === 0}
                  onChange={(e) =>
                    handlers?.setFormData((prev: any) => ({
                      ...prev,
                      [name]: e.target.value,
                    }))
                  }
                  style={{
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                    accentColor: config["ui:accentColor"] || "#667eea",
                  }}
                />
                <span>{opt.label || opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    },

    // ========== LAYOUT WIDGETS ==========

    // 23. GRID LAYOUT
    gridLayout: (config: any) => {
      const columns = config["ui:columns"] || 2;
      const gap = config["ui:gap"] || "30px";
      const children = config["ui:children"] || [];

      const defaultStyles: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        marginBottom: "40px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={styles}>
          {children.map((child: any, idx: number) => (
            <div key={idx}>
              {renderWidget(child)}{" "}
              {/* ✅ Use renderWidget instead of rendering child directly */}
            </div>
          ))}
        </div>
      );
    },

    // 24. FLEX LAYOUT
    flexLayout: (config: any) => {
      const direction = config["ui:direction"] || "row";
      const justify = config["ui:justify"] || "flex-start";
      const align = config["ui:align"] || "stretch";
      const gap = config["ui:gap"] || "20px";
      const wrap = config["ui:wrap"] || false;
      const children = config["ui:children"] || [];

      const defaultStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: direction as any,
        justifyContent: justify,
        alignItems: align,
        gap,
        flexWrap: wrap ? "wrap" : "nowrap",
        marginBottom: "30px",
      };

      const styles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={styles}>
          {children.map((child: any, idx: number) => (
            <div key={idx}>
              {renderWidget(child)} {/* ✅ Use renderWidget here too */}
            </div>
          ))}
        </div>
      );
    },

    // 25. ACCORDION
    accordion: (config: any) => {
      const items = config["ui:items"] || [];
      const allowMultiple = config["ui:allowMultiple"] || false;
      const accordionId = config["ui:id"] || `accordion-${Math.random()}`;

      const toggleItem = (itemId: string) => {
        handlers?.setExpandedAccordions((prev: any) => {
          const newSet = new Set(prev);
          if (newSet.has(itemId)) {
            newSet.delete(itemId);
          } else {
            if (!allowMultiple) newSet.clear();
            newSet.add(itemId);
          }
          return newSet;
        });
      };

      const defaultContainerStyles: React.CSSProperties = {
        marginBottom: "30px",
      };
      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;

      return (
        <div style={containerStyles}>
          {items.map((item: any, idx: number) => {
            const itemId = `${accordionId}-${idx}`;
            const isExpanded = handlers?.expandedAccordions.has(itemId);

            return (
              <div
                key={idx}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggleItem(itemId)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    background: isExpanded ? "#f8fafc" : "white",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f8fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = isExpanded
                      ? "#f8fafc"
                      : "white")
                  }
                >
                  <span>{item.title || `Item ${idx + 1}`}</span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      transition: "transform 0.3s",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▼
                  </span>
                </button>
                {isExpanded && (
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                      borderTop: "1px solid #e2e8f0",
                      animation: "slideDown 0.3s ease-out",
                    }}
                  >
                    <p
                      style={{ margin: 0, color: "#64748b", lineHeight: "1.6" }}
                    >
                      {item.content || "No content"}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        </div>
      );
    },

    // ========== SOCIAL & ENGAGEMENT ==========

    // 26. SOCIAL ICONS
    socialIcons: (config: any) => {
      const icons = config["ui:icons"] || [];
      const size = config["ui:size"] || "medium";
      const variant = config["ui:variant"] || "colored";

      const iconSize =
        size === "large" ? "50px" : size === "small" ? "35px" : "45px";
      const fontSize =
        size === "large" ? "24px" : size === "small" ? "16px" : "20px";

      const socialColors: Record<string, string> = {
        facebook: "#1877f2",
        twitter: "#1da1f2",
        instagram: "#e4405f",
        linkedin: "#0a66c2",
        youtube: "#ff0000",
        github: "#333",
        tiktok: "#000",
        email: "#667eea",
        website: "#667eea",
      };

      // Font Awesome icon mapping
      const socialIcons: Record<string, string> = {
        facebook: "fab fa-facebook-f",
        twitter: "fab fa-twitter",
        instagram: "fab fa-instagram",
        linkedin: "fab fa-linkedin-in",
        youtube: "fab fa-youtube",
        github: "fab fa-github",
        tiktok: "fab fa-tiktok",
        email: "fas fa-envelope",
        website: "fas fa-globe",
        default: "fas fa-link",
      };

      const defaultContainerStyles: React.CSSProperties = {
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        marginBottom: "30px",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;

      return (
        <div style={containerStyles}>
          {icons.map((icon: any, idx: number) => {
            const platform = icon.platform?.toLowerCase() || "link";
            const url = icon.url || "#";
            const color =
              variant === "colored"
                ? socialColors[platform] || "#667eea"
                : "#64748b";

            // Determine what to display (priority: fontAwesome > emoji)
            let iconContent: React.ReactNode;

            if (icon.fontAwesome) {
              // Use Font Awesome icon
              iconContent = <i className={icon.fontAwesome} />;
            } else if (icon.emoji) {
              // Use emoji as fallback
              iconContent = icon.emoji;
            } else {
              // Use platform-based Font Awesome icon
              const faClass = socialIcons[platform] || socialIcons.default;
              iconContent = <i className={faClass} />;
            }

            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: iconSize,
                  height: iconSize,
                  borderRadius: "50%",
                  background: variant === "colored" ? color : "transparent",
                  border: variant === "outline" ? `2px solid ${color}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize,
                  color: variant === "colored" ? "white" : color,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {iconContent}
              </a>
            );
          })}
        </div>
      );
    },

    // 27. TESTIMONIAL
    testimonial: (config: any) => {
      const quote = config["ui:quote"] || "";
      const author = config["ui:author"] || "Anonymous";
      const role = config["ui:role"] || "";
      const avatar = config["ui:avatar"] || "";
      const rating = config["ui:rating"] || 5;

      const defaultContainerStyles: React.CSSProperties = {
        background: "white",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: "30px",
        border: "1px solid #e2e8f0",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;

      return (
        <div style={containerStyles}>
          <div
            style={{
              fontSize: "1.2rem",
              color: "#fbbf24",
              marginBottom: "16px",
            }}
          >
            {"⭐".repeat(rating)}
          </div>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#334155",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            "{quote}"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {avatar && (
              <img
                src={avatar}
                alt={author}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <div>
              <div
                style={{
                  fontWeight: "600",
                  color: "#1e293b",
                  fontSize: "1rem",
                }}
              >
                {author}
              </div>
              {role && (
                <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {role}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },

    // 28. STATS COUNTER
    statsCounter: (config: any) => {
      const value = config["ui:value"] || "0";
      const label = config["ui:label"] || "";
      const suffix = config["ui:suffix"] || "";
      const color = config["ui:color"] || "#667eea";

      const defaultStyles: React.CSSProperties = {
        textAlign: "center",
        padding: "30px 20px",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={containerStyles}>
          <div
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              color,
              marginBottom: "12px",
              lineHeight: "1",
            }}
          >
            {value}
            {suffix}
          </div>
          <div
            style={{ fontSize: "1.1rem", color: "#64748b", fontWeight: "500" }}
          >
            {label}
          </div>
        </div>
      );
    },

    // 29. PRICING CARD
    pricingCard: (config: any) => {
      const title = config["ui:title"] || "Plan";
      const price = config["ui:price"] || "$0";
      const period = config["ui:period"] || "/month";
      const features = config["ui:features"] || [];
      const highlighted = config["ui:highlighted"] || false;
      const action = config["ui:action"] || "";
      const buttonLabel = config["ui:buttonLabel"] || "Choose Plan";

      const defaultCardStyles: React.CSSProperties = {
        background: "white",
        borderRadius: "16px",
        padding: "40px 30px",
        boxShadow: highlighted
          ? "0 8px 30px rgba(102,126,234,0.25)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        border: highlighted ? "3px solid #667eea" : "1px solid #e2e8f0",
        textAlign: "center",
        position: "relative",
        transform: highlighted ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s",
      };

      const cardStyles = config["ui:styles"]
        ? { ...defaultCardStyles, ...applyStyles(config["ui:styles"]) }
        : defaultCardStyles;

      return (
        <div style={cardStyles}>
          {highlighted && (
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#667eea",
                color: "white",
                padding: "6px 20px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              POPULAR
            </div>
          )}
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            {title}
          </h3>
          <div style={{ marginBottom: "30px" }}>
            <span
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                color: highlighted ? "#667eea" : "#1e293b",
              }}
            >
              {price}
            </span>
            <span style={{ fontSize: "1.1rem", color: "#64748b" }}>
              {period}
            </span>
          </div>
          <div style={{ textAlign: "left", marginBottom: "30px" }}>
            {features.map((feature: string, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: "12px 0",
                  borderBottom:
                    idx < features.length - 1 ? "1px solid #f1f5f9" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "1rem",
                  color: "#334155",
                }}
              >
                <span style={{ color: "#10b981", fontSize: "1.2rem" }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => action && handlers?.handleAction(action)}
            style={{
              width: "100%",
              padding: "14px 24px",
              fontSize: "1rem",
              fontWeight: "600",
              background: highlighted ? "#667eea" : "white",
              color: highlighted ? "white" : "#667eea",
              border: highlighted ? "none" : "2px solid #667eea",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (highlighted) {
                e.currentTarget.style.background = "#5568d3";
              } else {
                e.currentTarget.style.background = "#667eea";
                e.currentTarget.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (highlighted) {
                e.currentTarget.style.background = "#667eea";
              } else {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#667eea";
              }
            }}
          >
            {buttonLabel}
          </button>
        </div>
      );
    },

    // ========== CUSTOM WIDGETS ==========
    // Add to your widgetLibrary.tsx - Auth Links Widget
    authLinks: (config: any) => {
      const links = config["ui:links"] || [];
      const alignment = config["ui:alignment"] || "center";
      const direction = config["ui:direction"] || "row";

      const defaultContainerStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: direction as any,
        gap: "16px",
        justifyContent: alignment,
        alignItems: "center",
        margin: "20px 0",
        flexWrap: "wrap",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
        : defaultContainerStyles;

      const defaultLinkStyles: React.CSSProperties = {
        color: "#667eea",
        fontWeight: 600,
        textDecoration: "none",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "color 0.2s",
      };

      const linkStyles = config["ui:linkStyles"]
        ? { ...defaultLinkStyles, ...applyStyles(config["ui:linkStyles"]) }
        : defaultLinkStyles;

      return (
        <div style={containerStyles}>
          {links.map((link: any, index: number) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              {link.prefix && (
                <span
                  style={{
                    color: "#64748b",
                    marginRight: "8px",
                    fontSize: "0.95rem",
                  }}
                >
                  {link.prefix}
                </span>
              )}
              <a
                onClick={() => {
                  console.log("🔗 AuthLink clicked:", {
                    action: link.action,
                    actionParams: link.actionParams,
                    label: link.label,
                  });

                  // ✅ FIX: Pass actionParams to handleAction
                  const actionConfig = {
                    actionParams: link.actionParams || {},
                    ...link,
                  };

                  handlers?.handleAction(link.action, actionConfig);
                }}
                style={linkStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#5568d3";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#667eea";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      );
    },
    // 30. NAV LINKS
    navLinks: (config: any) => {
      const links = config["ui:links"] || [];
      const theme = config["ui:theme"] || "light";

      return (
        <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {links.map((link: any, idx: number) => {
            let label = link.label;
            let action = link.action;
            let actionParams = link.actionParams || {};

            // Resolve templates
            const authData = handlers?.getAuthData() || {};
            const templateContext = {
              auth: authData,
              data: handlers?.globalData || {},
            };

            if (label?.includes("{{")) {
              label = handlers?.resolveTemplate(label, templateContext);
            }
            if (action?.includes("{{")) {
              action = handlers?.resolveTemplate(action, templateContext);
            }

            // Skip empty labels
            if (!label || label.trim() === "" || label === "undefined")
              return null;

            // Display-only text if no action
            if (!action || action.trim() === "" || action === "undefined") {
              return (
                <span
                  key={idx}
                  style={{
                    color: theme === "dark" ? "#e2e8f0" : "#1f2937",
                    padding: "8px 16px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {label}
                </span>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  console.log("🔗 NavLink clicked:", {
                    action,
                    actionParams,
                    label,
                  });

                  // ✅ FIX: Pass actionParams in correct format
                  handlers?.handleAction(action, { actionParams });
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: theme === "dark" ? "#e2e8f0" : "#1f2937",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      );
    },
navbar: (config: any) => {
  const NavbarComponent = () => {
    const logo = config["ui:logo"] || "🛍️ MyBrand";
    const links = config["ui:links"] || [];
    const theme = config["ui:theme"] || "light";
    const searchEnabled = config["ui:searchEnabled"] !== false;
    const cartEnabled = config["ui:cartEnabled"] || false;
    const authEnabled = config["ui:authEnabled"] || false;

    const bgColor = theme === "dark" ? "#1e293b" : "#ffffff";
    const textColor = theme === "dark" ? "#e2e8f0" : "#1f2937";
    const borderColor = theme === "dark" ? "#334155" : "#e2e8f0";

    return (
      <nav
        style={{
          background: bgColor,
          borderBottom: `2px solid ${borderColor}`,
          padding: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
          ...applyStyles(config["ui:styles"] || {}),
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => {
            if (config["ui:logoAction"]) {
              handlers?.handleAction(config["ui:logoAction"]);
            }
          }}
        >
          {logo}
        </div>

        {/* Center: Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {links.map((link: any, idx: number) => {
            // Template resolution for label and action
            const authData = handlers?.getAuthData() || {};
            const globalData = handlers?.globalData || {};
            const templateContext = {
              auth: authData,
              data: globalData,
            };

            let label = link.label;
            let action = link.action;
            let actionParams = link.actionParams || {};

            if (label?.includes("{{")) {
              label = handlers?.resolveTemplate?.(label, templateContext) ?? label;
            }
            if (action?.includes("{{")) {
              action = handlers?.resolveTemplate?.(action, templateContext) ?? action;
            }

            // Skip empty labels
            if (!label || label.trim() === "" || label === "undefined") {
              return null;
            }

            // Display-only text if no action
            if (!action || action.trim() === "" || action === "undefined") {
              return (
                <span
                  key={idx}
                  style={{
                    color: textColor,
                    padding: "8px 16px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {label}
                </span>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  console.log("🔗 Navbar link clicked:", {
                    action,
                    actionParams,
                    label,
                  });
                  handlers?.handleAction?.(action, { actionParams });
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: textColor,
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                {link.icon && <span style={{ marginRight: "8px" }}>{link.icon}</span>}
                {label}
              </button>
            );
          })}
        </div>

        {/* Right: Actions (Search, Cart, Auth) */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {searchEnabled && (
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: `2px solid ${borderColor}`,
                outline: "none",
                width: "200px",
                fontSize: "14px",
              }}
              onChange={(e) => {
                if (config["ui:onSearch"]) {
                  handlers?.handleAction(config["ui:onSearch"], {}, { query: e.target.value });
                }
              }}
            />
          )}

          {cartEnabled && (
            <button
              onClick={() => {
                handlers?.handleAction(config["ui:cartAction"] || "navigate", {
                  actionParams: { url: "/cart" },
                });
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              🛒
              {config["ui:cartCount"] > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {config["ui:cartCount"]}
                </span>
              )}
            </button>
          )}

          {authEnabled && (
            <button
              onClick={() => {
                const isLoggedIn = handlers?.getAuthData?.()?.isAuthenticated;
                if (isLoggedIn) {
                  handlers?.handleAction("clearAuth");
                } else {
                  handlers?.handleAction("navigate", {
                    actionParams: { url: "/login" },
                  });
                }
              }}
              style={{
                padding: "8px 16px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {handlers?.getAuthData?.()?.isAuthenticated ? "Logout" : "Login"}
            </button>
          )}
        </div>
      </nav>
    );
  };

  return <NavbarComponent />;
},

    // Add this to your widgets object in widgetLibrary.tsx

// Add/replace this in your widgets object inside createWidgetLibrary
footer: (config: any) => {
  const FooterComponent = () => {
    const theme = config["ui:theme"] || "dark";
    const columns = config["ui:columns"] || [];
    const socialIcons = config["ui:socialIcons"] || [];
    const copyright = config["ui:copyright"] || "";
    const newsletter = config["ui:newsletter"];

    // Now it's SAFE to use hooks
    const [hoveredLink, setHoveredLink] = React.useState<number>(-1);

    // Get auth data for template resolution
    const authData = handlers?.getAuthData() || {
      token: null,
      user: { email: null },
      isAuthenticated: false,
    };
    const globalData = handlers?.globalData || {};

    const defaultContainerStyles: React.CSSProperties = {
      background:
        theme === "dark"
          ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
          : "#f8fafc",
      color: theme === "dark" ? "#e2e8f0" : "#1e293b",
      padding: "60px 40px 30px",
      marginTop: "80px",
    };

    const defaultColumnContainerStyles: React.CSSProperties = {
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      maxWidth: "1400px",
      margin: "0 auto 40px",
    };

    const defaultColumnStyles: React.CSSProperties = {
      flex: 1,
      minWidth: "200px",
    };

    const defaultLinkStyles: React.CSSProperties = {
      color: theme === "dark" ? "#cbd5e1" : "#64748b",
      textDecoration: "none",
      fontSize: "0.95rem",
      display: "block",
      padding: "8px 0",
      transition: "color 0.2s",
      cursor: "pointer",
    };

    const containerStyles = config["ui:styles"]
      ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
      : defaultContainerStyles;

    const columnContainerStyles = config["ui:columnContainerStyles"]
      ? { ...defaultColumnContainerStyles, ...applyStyles(config["ui:columnContainerStyles"]) }
      : defaultColumnContainerStyles;

    const columnStyles = config["ui:columnStyles"]
      ? { ...defaultColumnStyles, ...applyStyles(config["ui:columnStyles"]) }
      : defaultColumnStyles;

    const linkStyles = config["ui:linkStyles"]
      ? { ...defaultLinkStyles, ...applyStyles(config["ui:linkStyles"]) }
      : defaultLinkStyles;

    const linkHoverStyles = config["ui:linkHoverStyles"]
      ? applyStyles(config["ui:linkHoverStyles"])
      : { color: "#ffffff" };

    return (
      <footer style={containerStyles}>
        <div style={columnContainerStyles}>
          {/* Footer Columns */}
          {columns.map((column: any, colIdx: number) => (
            <div key={colIdx} style={columnStyles}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
                }}
              >
                {column.title}
              </h3>
              <div>
                {column.links?.map((link: any, linkIdx: number) => {
                  const uniqueId = `${colIdx}-${linkIdx}`;

                  // Template resolution for label and action
                  const templateContext = {
                    auth: authData,
                    data: globalData,
                  };

                  let label = link.label;
                  let action = link.action;
                  let actionParams = link.actionParams || {};

                  if (label && label.includes("{{")) {
                    label = handlers?.resolveTemplate?.(label, templateContext) ?? label;
                  }
                  if (action && action.includes("{{")) {
                    action = handlers?.resolveTemplate?.(action, templateContext) ?? action;
                  }

                  // Skip empty/invalid links
                  if (!label || label.trim() === "" || label === "undefined") {
                    return null;
                  }

                  // Display-only text if no action
                  if (!action || action.trim() === "" || action === "undefined") {
                    return (
                      <span
                        key={uniqueId}
                        style={{
                          ...linkStyles,
                          cursor: "default",
                        }}
                      >
                        {label}
                      </span>
                    );
                  }

                  return (
                    <a
                      key={uniqueId}
                      onClick={() => {
                        console.log("🔗 Footer link clicked:", {
                          action,
                          actionParams,
                          label,
                        });
                        handlers?.handleAction?.(action, actionParams);
                      }}
                      style={{
                        ...linkStyles,
                        ...(hoveredLink === parseInt(uniqueId.split("-")[1])
                          ? linkHoverStyles
                          : {}),
                      }}
                      onMouseEnter={() =>
                        setHoveredLink(parseInt(uniqueId.split("-")[1]))
                      }
                      onMouseLeave={() => setHoveredLink(-1)}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Newsletter Section */}
          {newsletter?.enabled && (
            <div style={{ ...columnStyles, minWidth: "300px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
                }}
              >
                {newsletter.title || "Newsletter"}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "16px",
                  color: theme === "dark" ? "#cbd5e1" : "#64748b",
                  lineHeight: "1.5",
                }}
              >
                {newsletter.description}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder={newsletter.placeholder || "Enter your email"}
                  onChange={(e) => {
                    handlers?.setFormField?.("newsletterEmail", e.target.value);
                  }}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: theme === "dark" ? "2px solid #334155" : "2px solid #e2e8f0",
                    background: theme === "dark" ? "#0f172a" : "white",
                    color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) =>
                    (e.target.style.borderColor =
                      theme === "dark" ? "#334155" : "#e2e8f0")
                  }
                />
                <button
                  onClick={() => {
                    const email = handlers?.getFormData?.()?.newsletterEmail;
                    if (newsletter.action) {
                      handlers?.handleAction?.(newsletter.action, {}, { email });
                    }
                  }}
                  style={{
                    padding: "10px 20px",
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#5568d3";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#667eea";
                  }}
                >
                  {newsletter.buttonLabel || "Subscribe"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Social Icons */}
        {socialIcons.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "30px",
              paddingTop: "20px",
              borderTop:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #e2e8f0",
            }}
          >
            {socialIcons.map((icon: any, idx: number) => {
              const platform = icon.platform?.toLowerCase() || "link";
              const url = icon.url || "#";

              const socialColors: Record<string, string> = {
                facebook: "#1877f2",
                twitter: "#1da1f2",
                instagram: "#e4405f",
                linkedin: "#0a66c2",
                youtube: "#ff0000",
                github: "#333",
              };

              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: theme === "dark" ? "#334155" : "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: theme === "dark" ? "#e2e8f0" : "#64748b",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      socialColors[platform] || "#667eea";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      theme === "dark" ? "#334155" : "#f1f5f9";
                    e.currentTarget.style.color =
                      theme === "dark" ? "#e2e8f0" : "#64748b";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i className={icon.fontAwesome || "fas fa-link"} />
                </a>
              );
            })}
          </div>
        )}

        {/* Copyright */}
        {copyright && (
          <div
            style={{
              textAlign: "center",
              paddingTop: "20px",
              borderTop:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #e2e8f0",
              fontSize: "0.9rem",
              color: theme === "dark" ? "#94a3b8" : "#64748b",
            }}
          >
            {copyright}
          </div>
        )}
      </footer>
    );
  };

  // Return the component (React will render it properly)
  return <FooterComponent />;
},
    // 31. HERO
    hero: (config: any) => {
      const title = config["ui:title"] || "Welcome";
      const subtitle = config["ui:subtitle"] || "";
      const cta = config["ui:cta"];

      const defaultStyles: React.CSSProperties = {
        textAlign: "center",
        padding: "120px 40px 80px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      };

      const heroStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <section id="hero" style={heroStyles}>
          <h1
            style={{
              fontSize: "3.5rem",
              marginBottom: "24px",
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              marginBottom: "40px",
              opacity: 0.95,
              maxWidth: "700px",
              lineHeight: "1.6",
            }}
          >
            {subtitle}
          </p>
          {cta && (
            <button
              onClick={() => handlers?.handleAction(cta.action)}
              style={{
                padding: "14px 36px",
                fontSize: "1.1rem",
                background: "white",
                color: "#667eea",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              {cta.label}
            </button>
          )}
        </section>
      );
    },

    // 32. PROJECT GRID
    // REPLACE the existing projectGrid widget in widgetLibrary.tsx with this:

    // REPLACE the projectGrid widget in widgetLibrary.tsx with this complete version:

    // REPLACE projectGrid in widgetLibrary.tsx with this SIMPLER version:

    projectGrid: (config: any, sourceData: any) => {
      const boundData = enhanceWidgetWithData(config, globalData);

      console.log(boundData, "bound");
      const items = Array.isArray(boundData)
        ? boundData.slice(0, 9)
        : Array.isArray(sourceData)
        ? sourceData.slice(0, 9)
        : [];

      const animated = config["ui:animated"];

      console.log("🎯 ProjectGrid:", {
        itemsCount: items.length,
        hasHandlers: !!handlers,
        hasSetData: !!handlers?.setData,
        hasSetActiveModal: !!handlers?.setActiveModal,
      });

      if (items.length === 0) {
        return (
          <div
            style={{
              padding: "80px 40px",
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            <p style={{ fontSize: "18px" }}>📦 No items to display</p>
          </div>
        );
      }

      const defaultSectionStyles: React.CSSProperties = {
        padding: "80px 40px",
        background: "#f8fafc",
      };

      const sectionStyles = config["ui:styles"]
        ? { ...defaultSectionStyles, ...applyStyles(config["ui:styles"]) }
        : defaultSectionStyles;

      // ✅ SIMPLE CLICK HANDLER
      // Updated click handler using DataStore
      const handleItemClick = (item: any) => {
        console.log("🎯 Product clicked:", item);

        if (!handlers) {
          console.error("❌ No handlers available");
          return;
        }

        // ✅ Use DataStore set method directly
        handlers.setData("selectedProduct", item);

        const modalName = config["ui:modalName"] || "productDetail";
        setTimeout(() => {
          if (handlers.setActiveModal) {
            console.log("🎭 Opening productDetail modal");
            handlers.setActiveModal(modalName);
          } else {
            console.error("❌ setActiveModal not available");
          }
        }, 50);
      };

      return (
        <section id="projects" style={sectionStyles}>
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {items.map((item: any, idx: number) => (
              <article
                key={item.id || idx}
                onClick={() => handleItemClick(item)}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #e2e8f0",
                  transition: animated ? "all 0.3s ease" : "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (animated) {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(0,0,0,0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (animated) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.08)";
                  }
                }}
              >
                {/* Product Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      marginBottom: "16px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      padding: "10px",
                    }}
                  />
                )}

                {/* Category Badge */}
                {item.category && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "4px 8px",
                      background: "#e0e7ff",
                      color: "#667eea",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      display: "inline-block",
                      marginBottom: "12px",
                    }}
                  >
                    {item.category}
                  </span>
                )}

                {/* Product Title */}
                <h3
                  style={{
                    marginBottom: "16px",
                    color: "#1e293b",
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    lineHeight: "1.4",
                  }}
                >
                  {item.name || item.title || `Item ${idx + 1}`}
                </h3>

                {/* Product Description */}
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description || item.body || "No description available"}
                </p>

                {/* Product Price */}
                {item.price && (
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#667eea",
                      marginTop: "auto",
                    }}
                  >
                    ${item.price}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      );
    },

    dropdown: (config: any) => {
      const DropdownComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        const dropdownRef = React.useRef<HTMLDivElement>(null);
        const buttonRef = React.useRef<HTMLButtonElement>(null);

        const label = config["ui:label"] || "Menu";
        const icon = config["ui:icon"] || "▼";
        const items = config["ui:items"] || [];
        const position = config["ui:position"] || "bottom-right";
        const width = config["ui:width"] || "280px";

        // Close dropdown when clicking outside
        React.useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
            if (
              dropdownRef.current &&
              !dropdownRef.current.contains(event.target as Node) &&
              buttonRef.current &&
              !buttonRef.current.contains(event.target as Node)
            ) {
              setIsOpen(false);
            }
          };

          if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
          }

          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [isOpen]);

        // Close on escape key
        React.useEffect(() => {
          const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          };

          if (isOpen) {
            document.addEventListener("keydown", handleEscape);
          }

          return () => {
            document.removeEventListener("keydown", handleEscape);
          };
        }, [isOpen]);

        // ✅ Container styles with full customization support
        const defaultContainerStyles: React.CSSProperties = {
          position: "relative",
          display: "inline-block",
        };

        const containerStyles = config["ui:styles"]
          ? { ...defaultContainerStyles, ...applyStyles(config["ui:styles"]) }
          : defaultContainerStyles;

        // ✅ Button styles with full customization support
        const defaultButtonStyles: React.CSSProperties = {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: "white",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          color: "#1e293b",
          transition: "all 0.2s",
        };

        const buttonStyles = config["ui:buttonStyles"]
          ? {
              ...defaultButtonStyles,
              ...applyStyles(config["ui:buttonStyles"]),
            }
          : defaultButtonStyles;

        // ✅ Dropdown menu styles
        const defaultDropdownStyles: React.CSSProperties = {
          position: "absolute",
          width: width,
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          border: "1px solid #e2e8f0",
          zIndex: 10000,
          marginTop: "8px",
          padding: "8px",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transform: isOpen ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.2s ease",
        };

        // Position the dropdown
        const getDropdownPosition = (): React.CSSProperties => {
          const baseStyles = { ...defaultDropdownStyles };

          switch (position) {
            case "bottom-right":
              return { ...baseStyles, top: "100%", right: 0 };
            case "bottom-left":
              return { ...baseStyles, top: "100%", left: 0 };
            case "top-right":
              return {
                ...baseStyles,
                bottom: "100%",
                right: 0,
                marginTop: 0,
                marginBottom: "8px",
              };
            case "top-left":
              return {
                ...baseStyles,
                bottom: "100%",
                left: 0,
                marginTop: 0,
                marginBottom: "8px",
              };
            default:
              return { ...baseStyles, top: "100%", right: 0 };
          }
        };

        const dropdownStyles = config["ui:dropdownStyles"]
          ? {
              ...getDropdownPosition(),
              ...applyStyles(config["ui:dropdownStyles"]),
            }
          : getDropdownPosition();

        // ✅ Item styles support
        const defaultItemStyles: React.CSSProperties = {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.2s",
          fontSize: "15px",
          background: "transparent",
          border: "none",
          width: "100%",
          textAlign: "left",
        };

        const getItemStyles = (item: any): React.CSSProperties => {
          const baseStyles = {
            ...defaultItemStyles,
            color: item.variant === "danger" ? "#ef4444" : "#1e293b",
            fontWeight: item.variant === "danger" ? "600" : "500",
          };

          // Apply custom item styles if provided
          return item.styles
            ? { ...baseStyles, ...applyStyles(item.styles) }
            : baseStyles;
        };

        const handleItemClick = (item: any) => {
          console.log("🎯 Dropdown item clicked:", item);

          if (item.action) {
            handlers?.handleAction(
              item.action,
              item.actionParams || item,
              item
            );
          }

          // Close dropdown after action unless specified
          if (item.keepOpen !== true) {
            setIsOpen(false);
          }
        };

        return (
          <div style={containerStyles}>
            {/* Trigger Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              style={{
                ...buttonStyles,
                borderColor: isOpen
                  ? "#667eea"
                  : buttonStyles.borderColor || "#e2e8f0",
                background: isOpen
                  ? "#f8fafc"
                  : buttonStyles.background || "white",
              }}
              onMouseEnter={(e) => {
                if (!isOpen && config["ui:buttonHoverStyles"]) {
                  const hoverStyles = applyStyles(
                    config["ui:buttonHoverStyles"]
                  );
                  Object.assign(e.currentTarget.style, hoverStyles);
                } else if (!isOpen) {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.borderColor =
                    buttonStyles.borderColor || "#e2e8f0";
                  e.currentTarget.style.background =
                    buttonStyles.background || "white";
                }
              }}
            >
              <span>{label}</span>
              {icon && (
                <span
                  style={{
                    fontSize: config["ui:iconSize"] || "12px",
                    transition: "transform 0.2s",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {icon}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            <div ref={dropdownRef} style={dropdownStyles}>
              {items.map((item: any, idx: number) => {
                // Divider
                if (item.type === "divider") {
                  return (
                    <div
                      key={idx}
                      style={{
                        height: "1px",
                        background: "#e2e8f0",
                        margin: "8px 0",
                        ...(item.styles ? applyStyles(item.styles) : {}),
                      }}
                    />
                  );
                }

                // Header
                if (item.type === "header") {
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: "8px 12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        ...(item.styles ? applyStyles(item.styles) : {}),
                      }}
                    >
                      {item.label}
                    </div>
                  );
                }

                // Menu Item
                const itemStyles = getItemStyles(item);

                return (
                  <button
                    key={idx}
                    onClick={() => handleItemClick(item)}
                    style={itemStyles}
                    onMouseEnter={(e) => {
                      if (item.hoverStyles) {
                        Object.assign(
                          e.currentTarget.style,
                          applyStyles(item.hoverStyles)
                        );
                      } else {
                        e.currentTarget.style.background =
                          item.variant === "danger" ? "#fef2f2" : "#f8fafc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      if (item.styles) {
                        Object.assign(
                          e.currentTarget.style,
                          applyStyles(item.styles)
                        );
                      }
                    }}
                  >
                    {item.icon && (
                      <span
                        style={{
                          fontSize: item.iconSize || "18px",
                          ...(item.iconStyles
                            ? applyStyles(item.iconStyles)
                            : {}),
                        }}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          background: "#ef4444",
                          color: "white",
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: "600",
                          ...(item.badgeStyles
                            ? applyStyles(item.badgeStyles)
                            : {}),
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      };

      return <DropdownComponent />;
    },

    // Add these widgets to your widgetLibrary.tsx widgets object:
    searchBar: (config: any) => {
      const placeholder = config["ui:placeholder"] || "Search...";
      const value = config["ui:value"] || "";
      const size = config["ui:size"] || "medium";

      return (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => handlers?.handleSearch?.(e.target.value)}
            style={{
              width: "100%",
              padding:
                size === "large"
                  ? "14px 48px 14px 16px"
                  : size === "small"
                  ? "8px 40px 8px 12px"
                  : "12px 44px 12px 14px",
              fontSize: "1rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              outline: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              cursor: "pointer",
            }}
          >
            🔍
          </div>
        </div>
      );
    },

    breadcrumb: (config: any) => {
      const items = config["ui:items"] || [];

      return (
        <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {items.map((item: any, idx: number) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span style={{ color: "#cbd5e1" }}>/</span>}
              {item.url ? (
                <a
                  href={item.url}
                  style={{
                    color: idx === items.length - 1 ? "#1e293b" : "#64748b",
                    textDecoration: "none",
                    fontWeight: idx === items.length - 1 ? "600" : "400",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  style={{
                    color: idx === items.length - 1 ? "#1e293b" : "#64748b",
                    fontWeight: idx === items.length - 1 ? "600" : "400",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      );
    },
    tooltip: (config: any) => {
      const content = config["ui:content"] || "";
      const text = config["ui:text"] || "";
      const position = config["ui:position"] || "top";

      return (
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{ cursor: "pointer" }}>{content}</div>
          <div
            style={{
              position: "absolute",
              background: "#1e293b",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
              zIndex: 1000,
              opacity: 0,
              visibility: "hidden",
              transition: "opacity 0.2s",
              ...(position === "top" && {
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%)",
              }),
              ...(position === "bottom" && {
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
              }),
              ...(position === "left" && {
                right: "100%",
                top: "50%",
                transform: "translateY(-50%)",
              }),
              ...(position === "right" && {
                left: "100%",
                top: "50%",
                transform: "translateY(-50%)",
              }),
            }}
          >
            {text}
          </div>
        </div>
      );
    },
    dateRangePicker: (config: any) => {
      const label = config["ui:label"] || "Date Range";
      const startDate = config["ui:startDate"] || "";
      const endDate = config["ui:endDate"] || "";

      return (
        <div>
          {label && <label>{label}</label>}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                handlers?.setFormField("startDate", e.target.value)
              }
              style={{ flex: 1 }}
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                handlers?.setFormField("endDate", e.target.value)
              }
              style={{ flex: 1 }}
            />
          </div>
        </div>
      );
    },
    rating: (config: any) => {
      const value = config["ui:value"] || 0;
      const max = config["ui:max"] || 5;
      const size = config["ui:size"] || "medium";
      const editable = config["ui:editable"] || false;

      const starSize =
        size === "large" ? "28px" : size === "small" ? "16px" : "20px";

      return (
        <div style={{ display: "flex", gap: "4px" }}>
          {Array.from({ length: max }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => editable && handlers?.setRating?.(idx + 1)}
              style={{
                fontSize: starSize,
                color: idx < value ? "#fbbf24" : "#e2e8f0",
                cursor: editable ? "pointer" : "default",
                transition: "color 0.2s",
              }}
            >
              ★
            </span>
          ))}
        </div>
      );
    },
    toggle: (config: any) => {
      const ToggleComponent = () => {
        const label = config["ui:label"] || "";
        const size = config["ui:size"] || "medium";
        const lightIcon = config["ui:lightIcon"] || "☀️";
        const darkIcon = config["ui:darkIcon"] || "🌙";
        const onChangeAction = config["ui:onChange"] || config["ui:action"];

        // ✅ Use DataStore for theme state
        const [theme, setTheme] = useDataStore("local.theme");
        const checked = theme === "dark";

        const toggleSize = size === "large" ? 70 : size === "small" ? 45 : 60;
        const circleSize = toggleSize * 0.45;

        const handleToggle = () => {
          const newTheme = checked ? "light" : "dark";

          console.log("🌓 Toggle clicked:", { from: theme, to: newTheme });

          // ✅ Update DataStore immediately
          setTheme(newTheme);

          // ✅ Apply to body immediately for instant visual feedback
          if (newTheme === "dark") {
            document.body.classList.add("dark-mode");
            console.log("🌙 Dark mode applied");
          } else {
            document.body.classList.remove("dark-mode");
            console.log("☀️ Light mode applied");
          }

          // ✅ Execute action if provided (for additional logic)
          if (onChangeAction && handlers?.handleAction) {
            handlers.handleAction(
              onChangeAction,
              {},
              {
                checked: newTheme === "dark",
                theme: newTheme,
              }
            );
          }
        };

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              userSelect: "none",
            }}
          >
            <div
              onClick={handleToggle}
              role="switch"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggle();
                }
              }}
              style={{
                width: toggleSize,
                height: toggleSize * 0.5,
                borderRadius: toggleSize * 0.25,
                background: checked ? "#10b981" : "#cbd5e1",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.3s ease",
                outline: "none",
                display: "flex",
                alignItems: "center",
                padding: "0 4px",
              }}
            >
              {/* ✅ Toggle circle with icon */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: checked ? `calc(100% - ${circleSize}px - 4px)` : "4px",
                  transform: "translateY(-50%)",
                  width: circleSize,
                  height: circleSize,
                  borderRadius: "50%",
                  background: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  transition: "left 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: circleSize * 0.55 + "px",
                }}
              >
                {checked ? darkIcon : lightIcon}
              </div>
            </div>

            {label && <span style={{ fontSize: "0.95rem" }}>{label}</span>}
          </div>
        );
      };

      return <ToggleComponent key={config["ui:id"] || "toggle"} />;
    },
    timeline: (config: any) => {
      const items = config["ui:items"] || [];
      const orientation = config["ui:orientation"] || "vertical";

      return (
        <div style={{ position: "relative" }}>
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "24px",
                position: "relative",
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: item.color || "#667eea",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 2,
                }}
              />

              {/* Timeline line */}
              {idx < items.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "20px",
                    bottom: "-24px",
                    width: "2px",
                    background: "#e2e8f0",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", color: "#1e293b" }}>
                  {item.title}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>
                  {item.date}
                </div>
                <div style={{ color: "#475569", marginTop: "8px" }}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
    pagination: (config: any) => {
      const currentPage = config["ui:currentPage"] || 1;
      const totalPages = config["ui:totalPages"] || 1;
      const showNumbers = config["ui:showNumbers"] !== false;

      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
          pages.push(i);
        } else if (
          pages[pages.length - 1] !== "..." &&
          (i === currentPage - 2 || i === currentPage + 2)
        ) {
          pages.push("...");
        }
      }

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() =>
              currentPage > 1 && handlers?.setPage?.(currentPage - 1)
            }
            disabled={currentPage === 1}
          >
            ←
          </button>

          {showNumbers &&
            pages.map((page, idx) =>
              page === "..." ? (
                <span key={idx}>...</span>
              ) : (
                <button
                  key={idx}
                  onClick={() => handlers?.setPage?.(page)}
                  style={{
                    background:
                      page === currentPage ? "#667eea" : "transparent",
                    color: page === currentPage ? "white" : "#334155",
                  }}
                >
                  {page}
                </button>
              )
            )}

          <button
            onClick={() =>
              currentPage < totalPages && handlers?.setPage?.(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      );
    },
    // ✅ CART ITEMS GRID WIDGET
    cartItemsGrid: (config: any) => {
      const CartItemsGridComponent = () => {
        // ✅ Always call hooks at the top level
        const dataKey = config["ui:dataKey"] || "cartItems";

        // Get data from global store
        const [storeData] = useDataStore(`api.${dataKey}`);

        // Handle both array format and object with cartItems property
        let items: any[] = [];

        if (Array.isArray(storeData)) {
          items = storeData;
        } else if (
          storeData &&
          typeof storeData === "object" &&
          storeData.cartItems
        ) {
          items = storeData.cartItems;
        }

        // If you want to fallback to globalData as backup
        if (items.length === 0 && globalData && globalData[dataKey]) {
          items = Array.isArray(globalData[dataKey]) ? globalData[dataKey] : [];
        }

        if (items.length === 0) {
          return null; // Empty cart message will show instead
        }

        const defaultStyles: React.CSSProperties = {
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        };

        const containerStyles = config["ui:styles"]
          ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
          : defaultStyles;

        return (
          <div style={containerStyles}>
            {items.map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "flex",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                {/* Product Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      padding: "10px",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title || item.name || `Product ${idx + 1}`}
                  </h3>
                  {item.category && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#64748b",
                        marginBottom: "12px",
                      }}
                    >
                      {item.category}
                    </p>
                  )}
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#667eea",
                    }}
                  >
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    {item.quantity > 1 && (
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#94a3b8",
                          marginLeft: "8px",
                          fontWeight: "normal",
                        }}
                      >
                        (${(item.price || 0).toFixed(2)} each)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      background: "#f8fafc",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    <button
                      onClick={() => {
                        const newQty = (item.quantity || 1) - 1;
                        if (newQty <= 0) {
                          handlers?.handleAction?.(
                            "api:cart.remove",
                            {},
                            { id: item.id }
                          );
                        } else {
                          handlers?.handleAction?.(
                            "api:cart.updateQuantity",
                            {},
                            {
                              id: item.id,
                              quantity: newQty,
                            }
                          );
                        }
                      }}
                      style={{
                        background: "white",
                        border: "2px solid #e2e8f0",
                        borderRadius: "6px",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        minWidth: "30px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => {
                        handlers?.handleAction?.(
                          "api:cart.updateQuantity",
                          {},
                          {
                            id: item.id,
                            quantity: (item.quantity || 1) + 1,
                          }
                        );
                      }}
                      style={{
                        background: "white",
                        border: "2px solid #e2e8f0",
                        borderRadius: "6px",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      handlers?.handleAction?.(
                        "api:cart.remove",
                        {},
                        { id: item.id }
                      );
                    }}
                    style={{
                      background: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      };

      return <CartItemsGridComponent />;
    },
    // ✅ CART SUMMARY WIDGET
    cartSummary: (config: any) => {
      const boundData = enhanceWidgetWithData(config, globalData);
      const items = Array.isArray(boundData) ? boundData : [];

      // Calculate totals
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shipping = subtotal > 0 ? 15.0 : 0;
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + shipping + tax;

      const defaultStyles: React.CSSProperties = {
        textAlign: "center",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      if (items.length === 0) {
        return null;
      }

      return (
        <div style={containerStyles}>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Order Summary
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "24px",
              fontSize: "1.1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "2px solid white",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.5rem",
                fontWeight: "700",
              }}
            >
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() =>
              handlers?.handleAction("navigate:/shopzone/checkout")
            }
            style={{
              width: "100%",
              padding: "16px 0",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout 💳
          </button>
        </div>
      );
    },


// In widgetLibrary.tsx - Add this to your widgets object:

backgroundEffect: (config: any) => {
  // ✅ Create a proper React component that uses hooks
  const BackgroundEffect = React.memo(() => {
    const effectType = config["ui:effect"] || "snowfall";
    const intensity = config["ui:intensity"] || "high";
    const color = config["ui:color"] || "#ffffff";
    const speed = config["ui:speed"] || "medium";
    const animationMode = config["ui:animationMode"] || "both";
    
    // ✅ NOW hooks are safe because we're in a component
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // Convert color to array if it's a single string
    const colorArray = Array.isArray(color) ? color : [color];
    
    // Helper function to get random color from array
    const getRandomColor = () => {
      if (colorArray.length === 0) return "#ffffff";
      return colorArray[Math.floor(Math.random() * colorArray.length)];
    };
    
    // Helper function to get color by index (cycling through array)
    const getColorByIndex = (index: number) => {
      if (colorArray.length === 0) return "#ffffff";
      return colorArray[index % colorArray.length];
    };

    // ✅ Check dark mode
    useEffect(() => {
      const checkTheme = () => {
        const bodyHasDark = document.body.classList.contains('dark-mode');
        const storedTheme = localStorage.getItem('theme');
        setIsDarkMode(bodyHasDark || storedTheme === 'dark');
      };
      
      checkTheme();
      
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }, []);
    
    const shouldRender = () => {
      if (animationMode === "both") return true;
      if (animationMode === "dark") return isDarkMode;
      if (animationMode === "light") return !isDarkMode;
      return true;
    };
    
    if (!shouldRender()) {
      return null;
    }

    useEffect(() => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      const particleCount = intensity === "high" ? 200 : intensity === "medium" ? 100 : 50;
      const particleSpeed = speed === "fast" ? 3 : speed === "medium" ? 2 : 1;
      
      let particles: any[] = [];
      
      const initParticles = () => {
        particles = [];
        
        if (effectType === "snowfall") {
          for (let i = 0; i < particleCount; i++) {
            const particleColor = colorArray.length > 1 ? getRandomColor() : colorArray[0];
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.random() * 4 + 1,
              speed: Math.random() * particleSpeed + 1,
              opacity: Math.random() * 0.8 + 0.2,
              sway: Math.random() * 0.5 - 0.25,
              color: particleColor,
              originalColor: particleColor,
              colorChangeSpeed: Math.random() * 0.005 + 0.001,
              colorPhase: Math.random() * Math.PI * 2
            });
          }
        } else if (effectType === "stars") {
          for (let i = 0; i < particleCount; i++) {
            const particleColor = colorArray.length > 1 ? getColorByIndex(i) : colorArray[0];
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.random() * 2 + 0.5,
              opacity: Math.random() * 0.8 + 0.2,
              twinkleSpeed: Math.random() * 0.05 + 0.01,
              phase: Math.random() * Math.PI * 2,
              color: particleColor,
              originalColor: particleColor,
              colorPulseSpeed: Math.random() * 0.02 + 0.01,
              colorPulsePhase: Math.random() * Math.PI * 2
            });
          }
        } else if (effectType === "shootingStars") {
          for (let i = 0; i < particleCount; i++) {
            const particleColor = colorArray.length > 1 ? getColorByIndex(i) : colorArray[0];
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              length: Math.random() * 50 + 20,
              speed: Math.random() * 10 + 5,
              angle: Math.random() * Math.PI * 2,
              active: Math.random() > 0.5,
              timer: Math.random() * 300,
              color: particleColor,
              originalColor: particleColor,
              trailColors: colorArray.length > 1 ? 
                [...colorArray].sort(() => Math.random() - 0.5).slice(0, 3) : 
                [particleColor]
            });
          }
        } else if (effectType === "confetti") {
          for (let i = 0; i < particleCount; i++) {
            const particleColor = colorArray.length > 1 ? getRandomColor() : colorArray[0];
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height * 0.5,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              speedX: Math.random() * 4 - 2,
              speedY: Math.random() * 4 + 2,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: Math.random() * 0.1 - 0.05,
              color: particleColor,
              shape: Math.random() > 0.5 ? 'rectangle' : 'circle',
              gravity: 0.1,
              opacity: Math.random() * 0.8 + 0.2
            });
          }
        } else if (effectType === "bubbles") {
          for (let i = 0; i < particleCount; i++) {
            const particleColor = colorArray.length > 1 ? getRandomColor() : colorArray[0];
            particles.push({
              x: Math.random() * canvas.width,
              y: canvas.height + Math.random() * 100,
              radius: Math.random() * 20 + 5,
              speed: Math.random() * particleSpeed + 1,
              opacity: Math.random() * 0.5 + 0.2,
              sway: Math.random() * 0.3 - 0.15,
              color: particleColor,
              pulseSpeed: Math.random() * 0.02 + 0.01,
              pulsePhase: Math.random() * Math.PI * 2
            });
          }
        }
      };
      
      const drawSnow = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
          // Color animation for multiple colors
          if (colorArray.length > 1) {
            const colorPulse = Math.sin(Date.now() * p.colorChangeSpeed + p.colorPhase) * 0.5 + 0.5;
            const r = parseInt(p.originalColor.slice(1, 3), 16);
            const g = parseInt(p.originalColor.slice(3, 5), 16);
            const b = parseInt(p.originalColor.slice(5, 7), 16);
            
            // Get next color in array
            const currentIndex = colorArray.indexOf(p.originalColor);
            const nextColor = colorArray[(currentIndex + 1) % colorArray.length];
            const nextR = parseInt(nextColor.slice(1, 3), 16);
            const nextG = parseInt(nextColor.slice(3, 5), 16);
            const nextB = parseInt(nextColor.slice(5, 7), 16);
            
            // Interpolate between colors
            const interpolatedR = Math.round(r + (nextR - r) * colorPulse);
            const interpolatedG = Math.round(g + (nextG - g) * colorPulse);
            const interpolatedB = Math.round(b + (nextB - b) * colorPulse);
            
            p.color = `rgb(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`;
          }
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
          
          p.y += p.speed;
          p.x += p.sway;
          
          if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
            if (colorArray.length > 1) {
              p.originalColor = getRandomColor();
            }
          }
          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
        });
      };
      
      const drawStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
          const opacity = p.opacity * (0.7 + 0.3 * Math.sin(Date.now() * p.twinkleSpeed + p.phase));
          
          // Color animation for stars
          if (colorArray.length > 1) {
            const colorPulse = Math.sin(Date.now() * p.colorPulseSpeed + p.colorPulsePhase) * 0.5 + 0.5;
            const r = parseInt(p.originalColor.slice(1, 3), 16);
            const g = parseInt(p.originalColor.slice(3, 5), 16);
            const b = parseInt(p.originalColor.slice(5, 7), 16);
            
            const currentIndex = colorArray.indexOf(p.originalColor);
            const nextColor = colorArray[(currentIndex + 1) % colorArray.length];
            const nextR = parseInt(nextColor.slice(1, 3), 16);
            const nextG = parseInt(nextColor.slice(3, 5), 16);
            const nextB = parseInt(nextColor.slice(5, 7), 16);
            
            const interpolatedR = Math.round(r + (nextR - r) * colorPulse);
            const interpolatedG = Math.round(g + (nextG - g) * colorPulse);
            const interpolatedB = Math.round(b + (nextB - b) * colorPulse);
            
            p.color = `rgb(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`;
          }
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
        });
      };
      
      const drawShootingStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        particles.forEach(p => {
          p.timer--;
          
          if (p.timer <= 0) {
            p.active = true;
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height * 0.3;
            p.length = Math.random() * 50 + 20;
            p.speed = Math.random() * 10 + 5;
            p.angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
            p.timer = Math.random() * 500 + 200;
            
            // Randomize color for next appearance
            if (colorArray.length > 1) {
              p.color = getRandomColor();
              p.trailColors = [...colorArray]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            }
          }
          
          if (p.active) {
            // Create multi-color gradient for shooting star trail
            const gradient = ctx.createLinearGradient(
              p.x, p.y,
              p.x + Math.cos(p.angle) * p.length,
              p.y + Math.sin(p.angle) * p.length
            );
            
            if (p.trailColors.length === 1) {
              gradient.addColorStop(0, p.trailColors[0]);
              gradient.addColorStop(1, 'rgba(255,255,255,0)');
            } else {
              const step = 1 / (p.trailColors.length - 1);
              p.trailColors.forEach((color: string, index: number) => {
                gradient.addColorStop(index * step, color);
              });
              gradient.addColorStop(1, 'rgba(255,255,255,0)');
            }
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(
              p.x + Math.cos(p.angle) * p.length,
              p.y + Math.sin(p.angle) * p.length
            );
            ctx.stroke();
            
            // Add glow effect
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.8;
            ctx.fill();
            ctx.globalAlpha = 1;
            
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            
            if (p.x < 0 || p.x > canvas.width || p.y > canvas.height) {
              p.active = false;
              p.timer = Math.random() * 300 + 100;
            }
          }
        });
      };
      
      const drawConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
          ctx.save();
          ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
          ctx.rotate(p.rotation);
          
          if (p.shape === 'rectangle') {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
          }
          
          ctx.restore();
          
          // Update position
          p.x += p.speedX;
          p.y += p.speedY;
          p.speedY += p.gravity;
          p.rotation += p.rotationSpeed;
          
          // Reset if out of bounds
          if (p.y > canvas.height) {
            p.y = Math.random() * canvas.height * 0.5;
            p.x = Math.random() * canvas.width;
            p.speedY = Math.random() * 4 + 2;
            p.speedX = Math.random() * 4 - 2;
            
            // Change color for new confetti
            if (colorArray.length > 1) {
              p.color = getRandomColor();
            }
          }
        });
      };
      
      const drawBubbles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
          // Pulse animation for bubbles
          const pulse = Math.sin(Date.now() * p.pulseSpeed + p.pulsePhase) * 0.2 + 1;
          const currentRadius = p.radius * pulse;
          
          // Create gradient for bubble
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, currentRadius
          );
          
          if (colorArray.length > 1) {
            // Use multiple colors for gradient
            const baseColor = p.color;
            const lighterColor = lightenColor(baseColor, 30);
            
            gradient.addColorStop(0, lighterColor + 'FF');
            gradient.addColorStop(0.7, baseColor + 'CC');
            gradient.addColorStop(1, baseColor + '00');
          } else {
            gradient.addColorStop(0, p.color + 'FF');
            gradient.addColorStop(0.7, p.color + 'CC');
            gradient.addColorStop(1, p.color + '00');
          }
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Update position
          p.y -= p.speed;
          p.x += p.sway;
          
          if (p.y < -p.radius * 2) {
            p.y = canvas.height + Math.random() * 100;
            p.x = Math.random() * canvas.width;
            
            // Change color for new bubble
            if (colorArray.length > 1) {
              p.color = getRandomColor();
            }
          }
        });
      };
      
      // Helper function to lighten colors
      const lightenColor = (color: string, percent: number) => {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
      };
      
      // Animation loop
      let animationId: number;
      
      const animate = () => {
        if (effectType === "snowfall") drawSnow();
        else if (effectType === "stars") drawStars();
        else if (effectType === "shootingStars") drawShootingStars();
        else if (effectType === "confetti") drawConfetti();
        else if (effectType === "bubbles") drawBubbles();
        
        animationId = requestAnimationFrame(animate);
      };
      
      initParticles();
      animate();
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationId);
      };
    }, [effectType, intensity, speed, isDarkMode]); // ✅ Add isDarkMode to dependencies
    
    return (
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden"
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block"
          }}
        />
      </div>
    );
  });
  
  // ✅ Return the component with a stable key
  return <BackgroundEffect key={`bg-effect-${config["ui:effect"]}-${config["ui:animationMode"]}`} />;
},
// Add this as another widget or alternative


    // ✅ CONDITIONAL CONTENT WIDGET
    conditionalContent: (config: any) => {
      const condition = config["ui:condition"] || "";
      const content = config["ui:content"];

      // Resolve condition template
      const shouldShow = handlers?.resolveTemplate
        ? handlers.resolveTemplate(condition, {
            auth: handlers.getAuthData(),
            data: globalData,
          })
        : false;

      // Convert string to boolean
      const isVisible =
        shouldShow === true || shouldShow === "true" || shouldShow === 1;

      if (!isVisible) return null;

      // Render the content widget
      return renderWidget(content);
    },
    // 33. SKILL RADAR
    skillRadar: (config: any) => {
      const skills = config["ui:skills"] || [];

      const defaultStyles: React.CSSProperties = {
        padding: "32px 24px",
      };

      const containerStyles = config["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={containerStyles}>
          <h3
            style={{
              marginBottom: "28px",
              color: "#1e293b",
              fontSize: "1.4rem",
              fontWeight: "600",
            }}
          >
            Skills
          </h3>
          {skills.map((skill: any, idx: number) => (
            <div key={idx} style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#334155",
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#64748b",
                    fontWeight: "600",
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#e2e8f0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #667eea, #764ba2)",
                    borderRadius: "4px",
                    transition: "width 1.2s ease-out",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    },
    
  };
  return widgets;
};
