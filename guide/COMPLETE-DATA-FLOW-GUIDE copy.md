// ENHANCED_WIDGETS_EXAMPLES.tsx
/**
 * 🎯 READY-TO-USE ENHANCED WIDGETS
 * Copy these directly into your widgetLibrary.tsx
 */

import React from 'react';
import { renderIcon, WithIcon, WithInputIcons, getInputPaddingWithIcons } from '../utils/iconHelper';
import { resolveTemplate, hasTemplate } from '../utils/templateResolver';

// ============================================
// 1. ENHANCED HEADING WIDGET
// ============================================

heading: (config: any) => {
  const context = getTemplateContext();
  
  // ✅ Resolve template
  const rawText = config["ui:text"] || "Heading";
  const text = hasTemplate(rawText) ? resolveTemplate(rawText, context) : rawText;
  
  const level = config["ui:level"] || "h2";
  const icon = config["ui:icon"];
  const iconPosition = config["ui:iconPosition"] || "left";
  
  const defaultStyles: React.CSSProperties = {
    fontSize: level === "h1" ? "3rem" : level === "h2" ? "2.5rem" : level === "h3" ? "2rem" : "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  };
  
  const styles = config["ui:styles"]
    ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
    : defaultStyles;
  
  const Tag = level as any;
  const content = <Tag style={styles}>{text}</Tag>;
  
  // ✅ Wrap with icon if provided
  return icon ? (
    <WithIcon icon={icon} iconPosition={iconPosition}>
      {content}
    </WithIcon>
  ) : content;
}

// Usage:
/*
{
  "ui:widget": "heading",
  "ui:text": "Welcome, {{auth.user.name || 'Guest'}}!",
  "ui:icon": "👋",
  "ui:iconPosition": "left",
  "ui:level": "h1"
}
*/


// ============================================
// 2. ENHANCED TEXT WIDGET
// ============================================

text: (config: any) => {
  const context = getTemplateContext();
  
  // ✅ Resolve template
  const rawContent = config["ui:content"] || "";
  const content = hasTemplate(rawContent) ? resolveTemplate(rawContent, context) : rawContent;
  
  const icon = config["ui:icon"];
  const iconPosition = config["ui:iconPosition"] || "left";
  
  const defaultStyles: React.CSSProperties = {
    fontSize: "1rem",
    color: "#334155",
  };
  
  const styles = config["ui:styles"]
    ? { ...defaultStyles, ...applyStyles(config["ui:styles"]) }
    : defaultStyles;
  
  const textElement = <div style={styles}>{content}</div>;
  
  return icon ? (
    <WithIcon icon={icon} iconPosition={iconPosition}>
      {textElement}
    </WithIcon>
  ) : textElement;
}

// Usage:
/*
{
  "ui:widget": "text",
  "ui:content": "You have {{api.notifications | length}} new notifications",
  "ui:icon": "🔔"
}
*/


// ============================================
// 3. ENHANCED BUTTON WIDGET
// ============================================

button: (config: any) => {
  const context = getTemplateContext();
  
  // ✅ Resolve template in label
  const rawLabel = config["ui:label"] || "Button";
  const label = hasTemplate(rawLabel) ? resolveTemplate(rawLabel, context) : rawLabel;
  
  const action = config["ui:action"] || "";
  const actionParams = config["ui:actionParams"] || {};
  const variant = config["ui:variant"] || "primary";
  const size = config["ui:size"] || "medium";
  const icon = config["ui:icon"];
  const iconPosition = config["ui:iconPosition"] || "left";
  
  const defaultStyles: React.CSSProperties = {
    padding: size === "large" ? "14px 32px" : size === "small" ? "8px 16px" : "10px 24px",
    fontSize: size === "large" ? "1.1rem" : size === "small" ? "0.9rem" : "1rem",
    fontWeight: "600",
    border: variant === "outline" ? "2px solid #667eea" : variant === "danger-outline" ? "2px solid #ef4444" : "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    background: variant === "primary" ? "#667eea" : variant === "secondary" ? "#64748b" : variant === "danger" ? "#ef4444" : "transparent",
    color: variant === "outline" ? "#667eea" : variant === "danger-outline" ? "#ef4444" : "white",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };
  
  const customStyles = config["ui:styles"] ? applyStyles(config["ui:styles"]) : {};
  const mergedStyles = { ...defaultStyles, ...customStyles };
  
  // ✅ Render button content with icon
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && renderIcon(icon, { gap: "0px" })}
      <span>{label}</span>
      {icon && iconPosition === "right" && renderIcon(icon, { gap: "0px" })}
    </>
  );
  
  return (
    <button
      onClick={() => {
        if (!action) {
          console.warn("⚠️ Button has no action");
          return;
        }
        handlers?.handleAction(action, { actionParams, ...config });
      }}
      style={mergedStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = config["ui:hoverTransform"] || "translateY(-2px)";
        e.currentTarget.style.boxShadow = config["ui:hoverShadow"] || "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {buttonContent}
    </button>
  );
}

// Usage:
/*
{
  "ui:widget": "button",
  "ui:label": "Cart ({{api.cartItems | length}} items)",
  "ui:icon": "🛒",
  "ui:iconPosition": "left",
  "ui:action": "navigate",
  "ui:actionParams": { "url": "/cart" },
  "ui:variant": "primary"
}
*/


// ============================================
// 4. ENHANCED INPUT FIELD WIDGET
// ============================================

inputField: (config: any) => {
  const InputField = React.memo(() => {
    const context = getTemplateContext();
    
    // ✅ Resolve templates
    const rawLabel = config["ui:label"] || "";
    const label = hasTemplate(rawLabel) ? resolveTemplate(rawLabel, context) : rawLabel;
    
    const rawPlaceholder = config["ui:placeholder"] || "";
    const placeholder = hasTemplate(rawPlaceholder) ? resolveTemplate(rawPlaceholder, context) : rawPlaceholder;
    
    const type = config["ui:type"] || "text";
    const required = config["ui:required"] || false;
    const name = config["ui:name"] || label.toLowerCase().replace(/\s/g, "-");
    
    // ✅ Icon configuration
    const prefixIcon = config["ui:prefixIcon"];
    const suffixIcon = config["ui:suffixIcon"];
    
    // Get initial value from DataStore
    const initialValue = handlers.getFormData()?.[name] || "";
    const [localValue, setLocalValue] = React.useState(initialValue);
    
    // Get field error
    const [fieldErrors] = useDataStore("ui.errors.fields");
    const fieldError = fieldErrors?.[name];
    
    // ✅ Calculate padding based on icons
    const padding = getInputPaddingWithIcons(config, "12px");
    
    const defaultInputStyles: React.CSSProperties = {
      width: "100%",
      paddingLeft: padding.paddingLeft,
      paddingRight: padding.paddingRight,
      paddingTop: "12px",
      paddingBottom: "12px",
      fontSize: "1rem",
      border: `2px solid ${fieldError ? "#ef4444" : "#e2e8f0"}`,
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.2s",
      background: "white",
      boxSizing: "border-box",
    };
    
    const inputStyles = config["ui:inputStyles"]
      ? { ...defaultInputStyles, ...applyStyles(config["ui:inputStyles"]) }
      : defaultInputStyles;
    
    const input = (
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
          
          // Clear error on change
          if (fieldError) {
            const currentErrors = handlers?.getFieldErrors?.() || {};
            const { [name]: removed, ...rest } = currentErrors;
            handlers?.setFieldErrors?.(rest);
          }
        }}
        onFocus={(e) => (e.target.style.borderColor = fieldError ? "#ef4444" : config["ui:focusBorderColor"] || "#667eea")}
        onBlur={(e) => (e.target.style.borderColor = fieldError ? "#ef4444" : "#e2e8f0")}
      />
    );
    
    return (
      <div style={{ marginBottom: "20px" }}>
        {label && (
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#334155", fontSize: "0.95rem" }}>
            {label}
            {required && <span style={{ color: "#ef4444" }}> *</span>}
          </label>
        )}
        
        {/* ✅ Wrap with icon support */}
        <WithInputIcons prefixIcon={prefixIcon} suffixIcon={suffixIcon}>
          {input}
        </WithInputIcons>
        
        {/* Error message */}
        {fieldError && (
          <div style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span>⚠️</span>
            <span>{fieldError}</span>
          </div>
        )}
      </div>
    );
  });
  
  return <InputField key={config["ui:name"]} />;
}

// Usage:
/*
{
  "ui:widget": "inputField",
  "ui:label": "Search Products",
  "ui:placeholder": "Search {{api.products | length}} items...",
  "ui:prefixIcon": "🔍",
  "ui:suffixIcon": {
    "type": "fontawesome",
    "value": "fas fa-times",
    "color": "#94a3b8"
  },
  "ui:name": "search"
}
*/


// ============================================
// 5. ENHANCED CARD WIDGET
// ============================================

card: (config: any) => {
  const context = getTemplateContext();
  
  // ✅ Resolve all template fields
  const boundData = enhanceWidgetWithData(config, globalData);
  
  const rawTitle = boundData?.title || boundData?.name || config["ui:title"] || "Card Title";
  const title = hasTemplate(rawTitle) ? resolveTemplate(rawTitle, context) : rawTitle;
  
  const rawDescription = boundData?.description || config["ui:description"] || "";
  const description = hasTemplate(rawDescription) ? resolveTemplate(rawDescription, context) : rawDescription;
  
  const rawImage = boundData?.image || config["ui:image"];
  const image = hasTemplate(rawImage) ? resolveTemplate(rawImage, context) : rawImage;
  
  const price = boundData?.price;
  const icon = config["ui:icon"];
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
  
  const cardStyles = config["ui:styles"]
    ? { ...defaultCardStyles, ...applyStyles(config["ui:styles"]) }
    : defaultCardStyles;
  
  return (
    <div
      style={cardStyles}
      onClick={() => action && handlers?.handleAction(action)}
      onMouseEnter={(e) => {
        if (action) {
          e.currentTarget.style.transform = config["ui:hoverTransform"] || "translateY(-4px)";
          e.currentTarget.style.boxShadow = config["ui:hoverShadow"] || "0 8px 24px rgba(0,0,0,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (action) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        }
      }}
    >
      {/* ✅ Icon at top */}
      {icon && (
        <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: "16px" }}>
          {renderIcon(icon, { size: "48px" })}
        </div>
      )}
      
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "16px",
          }}
        />
      )}
      
      {/* Title */}
      <h3 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#1e293b", marginBottom: "12px" }}>
        {title}
      </h3>
      
      {/* Description */}
      <p style={{ fontSize: "1rem", color: "#64748b", lineHeight: "1.6", marginBottom: "16px" }}>
        {description}
      </p>
      
      {/* Price */}
      {price && (
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#667eea", marginBottom: "16px" }}>
          ${price}
        </div>
      )}
      
      {/* Action button */}
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
}

// Usage:
/*
{
  "ui:widget": "card",
  "ui:title": "Welcome, {{auth.user.name}}!",
  "ui:description": "You have {{api.orders | length}} pending orders",
  "ui:image": "{{auth.user.avatar || '/default-avatar.png'}}",
  "ui:icon": "⭐",
  "ui:action": "navigateToProfile"
}
*/


// ============================================
// 6. ENHANCED BADGE WIDGET
// ============================================

badge: (config: any) => {
  const context = getTemplateContext();
  
  // ✅ Resolve template
  const rawText = config["ui:text"] || "New";
  const text = hasTemplate(rawText) ? resolveTemplate(rawText, context) : rawText;
  
  const variant = config["ui:variant"] || "primary";
  const icon = config["ui:icon"];
  
  const colors: Record<string, { bg: string; color: string }> = {
    primary: { bg: "#667eea", color: "white" },
    success: { bg: "#10b981", color: "white" },
    warning: { bg: "#f59e0b", color: "white" },
    danger: { bg: "#ef4444", color: "white" },
    info: { bg: "#3b82f6", color: "white" },
  };
  
  const style = colors[variant] || colors.primary;
  
  const defaultStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
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
  
  return (
    <span style={mergedStyles}>
      {icon && renderIcon(icon, { size: "0.9em", gap: "0px" })}
      {text}
    </span>
  );
}

// Usage:
/*
{
  "ui:widget": "badge",
  "ui:text": "{{api.cartItems | length}}",
  "ui:icon": "🛒",
  "ui:variant": "danger"
}
*/


// ============================================
// 7. ENHANCED IMAGE WIDGET
// ============================================

image: (config: any) => {
  const context = getTemplateContext();
  
  // ✅ Resolve template in src
  const rawSrc = config["ui:src"] || "https://via.placeholder.com/800x400";
  const src = hasTemplate(rawSrc) ? resolveTemplate(rawSrc, context) : rawSrc;
  
  const rawAlt = config["ui:alt"] || "Image";
  const alt = hasTemplate(rawAlt) ? resolveTemplate(rawAlt, context) : rawAlt;
  
  const caption = config["ui:caption"];
  
  const defaultImageStyles: React.CSSProperties = {
    maxWidth: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  };
  
  const imageStyles = config["ui:imageStyles"]
    ? { ...defaultImageStyles, ...applyStyles(config["ui:imageStyles"]) }
    : defaultImageStyles;
  
  return (
    <figure style={{ margin: "20px 0", textAlign: "center" }}>
      <img
        src={src}
        alt={alt}
        style={imageStyles}
        onError={(e) => {
          console.warn(`⚠️ Image failed to load: ${src}`);
          e.currentTarget.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
        }}
      />
      {caption && (
        <figcaption style={{ marginTop: "12px", fontSize: "0.9rem", color: "#64748b", fontStyle: "italic" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Usage:
/*
{
  "ui:widget": "image",
  "ui:src": "{{metadata.branding.logo.url || '/default-logo.png'}}",
  "ui:alt": "{{metadata.branding.brandName}} Logo",
  "ui:caption": "Our Brand"
}
*/


// ============================================
// 8. ENHANCED NAVBAR WIDGET (With Dynamic Logo)
// ============================================

navbar: (config: any) => {
  const NavbarComponent = () => {
    const context = getTemplateContext();
    
    // ✅ Resolve logo - can be emoji, text, or image URL
    const rawLogo = config["ui:logo"] || "🛍️ MyBrand";
    const logo = hasTemplate(rawLogo) ? resolveTemplate(rawLogo, context) : rawLogo;
    
    const links = config["ui:links"] || [];
    const theme = config["ui:theme"] || "light";
    
    const bgColor = theme === "dark" ? "#1e293b" : "#ffffff";
    const textColor = theme === "dark" ? "#e2e8f0" : "#1f2937";
    
    // Determine if logo is an image URL
    const isImageLogo = logo.startsWith('http') || logo.startsWith('/') || logo.includes('.png') || logo.includes('.jpg') || logo.includes('.svg');
    
    return (
      <nav style={{ background: bgColor, borderBottom: `2px solid #e2e8f0`, padding: "20px 50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <div
          onClick={() => config["ui:logoAction"] && handlers?.handleAction(config["ui:logoAction"])}
          style={{ cursor: "pointer" }}
        >
          {isImageLogo ? (
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          ) : (
            <span style={{ fontSize: "28px", fontWeight: "800" }}>{logo}</span>
          )}
        </div>
        
        {/* Links */}
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {links.map((link: any, idx: number) => {
            // ✅ Resolve template in label
            const rawLabel = link.label;
            const label = hasTemplate(rawLabel) ? resolveTemplate(rawLabel, context) : rawLabel;
            
            if (!label || label === "undefined") return null;
            
            return (
              <button
                key={idx}
                onClick={() => handlers?.handleAction(link.action, { actionParams: link.actionParams })}
                style={{
                  background: "none",
                  border: "none",
                  color: textColor,
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {link.icon && renderIcon(link.icon, { size: "1.1em" })}
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    );
  };
  
  return <NavbarComponent />;
}

// Usage:
/*
{
  "ui:widget": "navbar",
  "ui:logo": "{{metadata.branding.logo.url || '🍵 Chiyaz'}}",
  "ui:logoAction": "navigate",
  "ui:links": [
    {
      "label": "{{auth.isAuthenticated ? 'Dashboard' : 'Home'}}",
      "action": "navigate",
      "actionParams": { "url": "/" }
    },
    {
      "label": "Cart ({{api.cartItems | length}})",
      "action": "navigate",
      "actionParams": { "url": "/cart" },
      "icon": "🛒"
    },
    {
      "label": "{{auth.user.name || 'Sign In'}}",
      "action": "navigate",
      "actionParams": { 
        "url": "{{auth.isAuthenticated ? '/profile' : '/login'}}" 
      },
      "icon": "fas fa-user"
    }
  ]
}
*/