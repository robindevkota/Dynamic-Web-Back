flexLayout: (config: any) => (
  <SmartWidget config={config} context={getSmartContext()}>
    {(props) => {
      const direction = props["ui:direction"] || "row";
      const justify = props["ui:justify"] || "flex-start";
      const align = props["ui:align"] || "stretch";
      const gap = props["ui:gap"] || "20px";
      const wrap = props["ui:wrap"] || false;
      const children = props["ui:children"] || [];

      const defaultStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: direction as any,
        justifyContent: justify,
        alignItems: align,
        gap,
        flexWrap: wrap ? "wrap" : "nowrap",
        marginBottom: "30px",
      };

      const styles = props["ui:styles"]
        ? { ...defaultStyles, ...applyStyles(props["ui:styles"]) }
        : defaultStyles;

      return (
        <div style={styles}>
          {children.map((child: any, idx: number) => (
            <div key={idx}>
              {renderWidget(child)}
            </div>
          ))}
        </div>
      );
    }}
  </SmartWidget>
),# 🎨 Complete SmartWidget Guide
## Icons, Animations & Dynamic Data Binding for All Widgets

---

## 📋 Table of Contents
1. [Introduction](#introduction)
2. [SmartWidget Features Overview](#smartwidget-features-overview)
3. [Icon System](#icon-system)
4. [Animation System](#animation-system)
5. [Data Binding System](#data-binding-system)
6. [Widget-by-Widget Examples](#widget-by-widget-examples)
7. [Advanced Patterns](#advanced-patterns)
8. [Real-World Examples from demo.js](#real-world-examples)

---

## Introduction

SmartWidget is a universal enhancement system that gives ALL widgets access to:
- ✨ **Icons** (FontAwesome, Lucide, custom)
- 🎬 **Animations** (entry and hover effects)
- 🔗 **Data Binding** (template resolution and API integration)
- 🎨 **Style Enhancement** (dynamic styles)

### Currently Supported Widgets
The following 27 widgets support SmartWidget features:
- `text`, `heading`, `paragraph`
- `button`, `image`, `icon`
- `inputField`, `dateField`, `checkbox`, `radioGroup`, `fileUpload`
- `card`, `alert`, `divider`, `spacer`
- `video`, `progressBar`, `list`
- `socialIcons`, `testimonial`, `statsCounter`, `pricingCard`
- `authLinks`, `hero`, `breadcrumb`, `ratingDisplay`, `skillRadar`
- **Layout widgets**: `container`, `gridLayout`, `flexLayout`

---

## SmartWidget Features Overview

### 1. **Icon Support**
Add icons to any widget using three approaches:

```json
// Standard icon (positioned around widget)
{
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-home",
    "color": "#667eea"
  },
  "ui:iconPosition": "left",  // left, right, top, bottom
  "ui:iconGap": "10px"
}

// Input-style icons (prefix/suffix)
{
  "ui:prefixIcon": {
    "type": "lucide",
    "value": "Search"
  },
  "ui:suffixIcon": {
    "type": "fontawesome",
    "value": "fas fa-times"
  }
}

// Shorthand (string format)
{
  "ui:icon": "fas fa-star"
}
```

### 2. **Animation Support**
Add entry animations and hover effects:

```json
{
  "ui:animation": "fadeInUp",           // Entry animation
  "ui:animateOnHover": "lift"          // Hover effect
}
```

### 3. **Data Binding**
Bind to API data and use templates:

```json
{
  "ui:dataSource": "api.products",     // Bind to API data
  "ui:content": "Total: {{api.stats.total}}"  // Template resolution
}
```

---

## Icon System

### Icon Types

#### 1. FontAwesome Icons
```json
{
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-home",      // Font Awesome class
    "color": "#667eea",          // Optional: custom color
    "size": "20px"               // Optional: custom size
  }
}
```

**Popular FontAwesome Icons:**
- `fas fa-home`, `fas fa-user`, `fas fa-cog`, `fas fa-heart`
- `fas fa-star`, `fas fa-check`, `fas fa-times`, `fas fa-search`
- `fas fa-envelope`, `fas fa-phone`, `fas fa-map-marker-alt`
- `fas fa-shopping-cart`, `fas fa-credit-card`, `fas fa-money-bill`
- `fas fa-calendar`, `fas fa-clock`, `fas fa-bell`, `fas fa-comment`
- `fas fa-file`, `fas fa-folder`, `fas fa-download`, `fas fa-upload`
- `fas fa-image`, `fas fa-video`, `fas fa-music`, `fas fa-book`
- `fas fa-database`, `fas fa-server`, `fas fa-chart-bar`, `fas fa-chart-line`

#### 2. Lucide Icons
```json
{
  "ui:icon": {
    "type": "lucide",
    "value": "Home",             // Lucide component name
    "color": "#764ba2",
    "size": 24
  }
}
```

**Popular Lucide Icons:**
- `Home`, `User`, `Settings`, `Heart`, `Star`
- `Check`, `X`, `Search`, `Mail`, `Phone`
- `Calendar`, `Clock`, `Bell`, `MessageCircle`
- `ShoppingCart`, `CreditCard`, `DollarSign`
- `File`, `Folder`, `Download`, `Upload`
- `Image`, `Video`, `Music`, `Book`
- `Database`, `Server`, `BarChart`, `LineChart`

#### 3. Custom SVG Icons
```json
{
  "ui:icon": {
    "type": "custom",
    "value": "<svg>...</svg>"    // Your custom SVG
  }
}
```

### Icon Positions
```json
{
  "ui:iconPosition": "left"      // left (default)
  "ui:iconPosition": "right"     // right
  "ui:iconPosition": "top"       // top
  "ui:iconPosition": "bottom"    // bottom
}
```

### Icon Gap
```json
{
  "ui:iconGap": "8px"            // Space between icon and content
}
```

### Input Icons (Prefix/Suffix)
For input-like widgets:
```json
{
  "ui:prefixIcon": {
    "type": "lucide",
    "value": "Search"
  },
  "ui:suffixIcon": {
    "type": "fontawesome",
    "value": "fas fa-times"
  }
}
```

---

## Animation System

### Entry Animations
Animations that play when the widget first appears:

```json
{
  "ui:animation": "fadeInUp"
}
```

#### Available Entry Animations

**Fade Animations:**
- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right

**Scale Animations:**
- `scaleIn` - Scale up with fade
- `scaleUp` - Spring scale up

**Slide Animations:**
- `slideInLeft` - Slide from left
- `slideInRight` - Slide from right
- `slideInUp` - Slide from bottom
- `slideInDown` - Slide from top

**Special Animations:**
- `rotateIn` - Rotate while fading
- `bounce` - Continuous bounce
- `pulse` - Continuous pulse
- `float` - Continuous floating
- `wiggle` - Continuous wiggle

**Example:**
```json
{
  "ui:widget": "card",
  "ui:animation": "fadeInUp",
  "ui:title": "Welcome Card"
}
```

### Hover Animations
Animations that trigger on mouse hover:

```json
{
  "ui:animateOnHover": "lift"
}
```

#### Available Hover Animations

- `lift` - Moves up slightly
- `grow` - Scales up (1.05x)
- `shrink` - Scales down (0.95x)
- `tilt` - Rotates slightly
- `glow` - Adds glowing shadow
- `float` - Floats with shadow

**Example:**
```json
{
  "ui:widget": "button",
  "ui:label": "Hover Me",
  "ui:animateOnHover": "lift"
}
```

### Combining Animations
You can use both entry and hover animations:

```json
{
  "ui:widget": "card",
  "ui:animation": "fadeInUp",           // Entry: fade in from bottom
  "ui:animateOnHover": "lift",         // Hover: lift up
  "ui:title": "Interactive Card"
}
```

### Custom Animation Config
For advanced control:

```json
{
  "ui:animation": {
    "initial": { "opacity": 0, "y": 50 },
    "animate": { "opacity": 1, "y": 0 },
    "transition": { "duration": 0.8, "ease": "easeOut" }
  }
}
```

---

## Data Binding System

### 1. Template Resolution
Use `{{}}` syntax to insert dynamic data:

```json
{
  "ui:content": "Welcome {{auth.user.name}}!"
}
```

#### Available Template Variables

**Authentication Data:**
- `{{auth.user.name}}` - User's name
- `{{auth.user.email}}` - User's email
- `{{auth.user.id}}` - User's ID
- `{{auth.user.role}}` - User's role
- `{{auth.token}}` - Auth token

**API Data:**
- `{{api.RESOURCE_NAME.FIELD}}` - Any API response data
- Example: `{{api.products.length}}`, `{{api.stats.total}}`

**Form Data:**
- `{{form.FIELD_NAME}}` - Current form field value
- Example: `{{form.email}}`, `{{form.password}}`

**Modal Data:**
- `{{modal.FIELD_NAME}}` - Modal form field value

**Metadata:**
- `{{metadata.KEY}}` - Any metadata value

**UI State:**
- `{{ui.activeModal}}` - Current active modal
- `{{ui.loading.KEY}}` - Loading state
- `{{ui.errors.KEY}}` - Error state

### 2. Data Source Binding
Bind entire widgets to API data:

```json
{
  "ui:widget": "card",
  "ui:dataSource": "api.products",
  "ui:title": "{{_boundData.name}}",
  "ui:content": "Price: ${{_boundData.price}}"
}
```

When using `ui:dataSource`, access the bound data with `{{_boundData.FIELD}}`.

### 3. Data Path
Navigate nested data:

```json
{
  "ui:widget": "text",
  "ui:dataSource": "api.users",
  "ui:dataPath": "[0].profile.name",
  "ui:content": "First user: {{_boundData}}"
}
```

---

## Widget-by-Widget Examples

### 1. Text Widget

**Basic with Icon:**
```json
{
  "ui:widget": "text",
  "ui:content": "Hello World",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-info-circle"
  },
  "ui:iconPosition": "left"
}
```

**With Animation:**
```json
{
  "ui:widget": "text",
  "ui:content": "Animated Text",
  "ui:animation": "fadeInLeft",
  "ui:styles": {
    "fontSize": "18px",
    "color": "#667eea"
  }
}
```

**With Data Binding:**
```json
{
  "ui:widget": "text",
  "ui:content": "Welcome back, {{auth.user.name}}!",
  "ui:icon": "fas fa-user",
  "ui:animation": "fadeIn"
}
```

**All Features Combined:**
```json
{
  "ui:widget": "text",
  "ui:content": "Total Products: {{api.products.length}}",
  "ui:icon": {
    "type": "lucide",
    "value": "Package",
    "color": "#667eea"
  },
  "ui:iconPosition": "left",
  "ui:iconGap": "12px",
  "ui:animation": "fadeInUp",
  "ui:animateOnHover": "grow",
  "ui:styles": {
    "fontSize": "20px",
    "fontWeight": "600",
    "padding": "15px",
    "background": "#f8fafc",
    "borderRadius": "8px",
    "cursor": "pointer"
  }
}
```

---

### 2. Heading Widget

**Basic with Icon:**
```json
{
  "ui:widget": "heading",
  "ui:text": "Dashboard",
  "ui:level": "h1",
  "ui:icon": "fas fa-chart-line",
  "ui:iconPosition": "left"
}
```

**With Animation:**
```json
{
  "ui:widget": "heading",
  "ui:text": "Welcome!",
  "ui:level": "h2",
  "ui:animation": "fadeInDown",
  "ui:styles": {
    "color": "#1e293b",
    "textAlign": "center"
  }
}
```

**With Data Binding:**
```json
{
  "ui:widget": "heading",
  "ui:text": "Hello, {{auth.user.name}}",
  "ui:level": "h1",
  "ui:icon": {
    "type": "lucide",
    "value": "User",
    "color": "#667eea"
  },
  "ui:animation": "slideInDown"
}
```

---

### 3. Paragraph Widget

**Basic:**
```json
{
  "ui:widget": "paragraph",
  "ui:text": "This is a paragraph with icon support",
  "ui:icon": "fas fa-align-left",
  "ui:animation": "fadeIn"
}
```

**With Data:**
```json
{
  "ui:widget": "paragraph",
  "ui:text": "You have {{api.notifications.count}} new notifications",
  "ui:icon": "fas fa-bell",
  "ui:iconPosition": "left",
  "ui:styles": {
    "padding": "12px",
    "background": "#fef3c7",
    "borderRadius": "6px"
  }
}
```

---

### 4. Button Widget

**Basic with Icon:**
```json
{
  "ui:widget": "button",
  "ui:label": "Save",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-save",
    "color": "white"
  },
  "ui:iconPosition": "left",
  "ui:animateOnHover": "lift",
  "ui:styles": {
    "background": "#667eea",
    "color": "white",
    "padding": "12px 24px",
    "borderRadius": "8px"
  }
}
```

**With Animation:**
```json
{
  "ui:widget": "button",
  "ui:label": "Click Me",
  "ui:animation": "scaleIn",
  "ui:animateOnHover": "grow",
  "ui:icon": "fas fa-mouse-pointer"
}
```

**With Data Binding:**
```json
{
  "ui:widget": "button",
  "ui:label": "View {{api.cart.items.length}} Items",
  "ui:icon": "fas fa-shopping-cart",
  "ui:iconPosition": "left",
  "ui:animateOnHover": "lift",
  "ui:action": "navigateToCart"
}
```

**Complete Example:**
```json
{
  "ui:widget": "button",
  "ui:label": "Add to Cart",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-plus-circle",
    "color": "white"
  },
  "ui:iconPosition": "left",
  "ui:iconGap": "10px",
  "ui:animation": "fadeInUp",
  "ui:animateOnHover": "lift",
  "ui:action": "addToCart",
  "ui:actionParams": { "productId": "{{_boundData.id}}" },
  "ui:styles": {
    "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "color": "white",
    "padding": "12px 30px",
    "borderRadius": "12px",
    "border": "none",
    "fontWeight": "600",
    "cursor": "pointer"
  }
}
```

---

### 5. Card Widget

**Basic with Icon:**
```json
{
  "ui:widget": "card",
  "ui:title": "Statistics",
  "ui:content": "View your stats here",
  "ui:icon": {
    "type": "lucide",
    "value": "BarChart",
    "color": "#667eea"
  },
  "ui:iconPosition": "top",
  "ui:animation": "fadeInUp"
}
```

**With Hover Effect:**
```json
{
  "ui:widget": "card",
  "ui:title": "Interactive Card",
  "ui:content": "Hover over me!",
  "ui:animation": "scaleIn",
  "ui:animateOnHover": "lift",
  "ui:styles": {
    "padding": "24px",
    "borderRadius": "12px",
    "boxShadow": "0 4px 12px rgba(0,0,0,0.1)"
  }
}
```

**With Data Binding:**
```json
{
  "ui:widget": "card",
  "ui:dataSource": "api.products[0]",
  "ui:title": "{{_boundData.name}}",
  "ui:content": "Price: ${{_boundData.price}}",
  "ui:icon": "fas fa-box",
  "ui:animation": "fadeInUp",
  "ui:animateOnHover": "lift"
}
```

**Complete Example:**
```json
{
  "ui:widget": "card",
  "ui:dataSource": "api.stats",
  "ui:title": "Total Users",
  "ui:content": "{{_boundData.totalUsers}} active users",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-users",
    "color": "#667eea"
  },
  "ui:iconPosition": "left",
  "ui:iconGap": "15px",
  "ui:animation": "fadeInUp",
  "ui:animateOnHover": "lift",
  "ui:styles": {
    "background": "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    "padding": "30px",
    "borderRadius": "16px",
    "boxShadow": "0 8px 24px rgba(0,0,0,0.1)",
    "border": "2px solid #e2e8f0"
  }
}
```

---

### 6. Input Field Widget

**With Prefix Icon:**
```json
{
  "ui:widget": "inputField",
  "ui:label": "Search",
  "ui:name": "search",
  "ui:placeholder": "Search products...",
  "ui:prefixIcon": {
    "type": "lucide",
    "value": "Search"
  },
  "ui:animation": "fadeIn"
}
```

**With Suffix Icon:**
```json
{
  "ui:widget": "inputField",
  "ui:label": "Email",
  "ui:name": "email",
  "ui:type": "email",
  "ui:prefixIcon": "fas fa-envelope",
  "ui:suffixIcon": "fas fa-check-circle",
  "ui:animation": "fadeInUp"
}
```

**With Data Binding:**
```json
{
  "ui:widget": "inputField",
  "ui:label": "Username",
  "ui:name": "username",
  "ui:value": "{{auth.user.name}}",
  "ui:prefixIcon": {
    "type": "lucide",
    "value": "User"
  },
  "ui:animation": "fadeIn"
}
```

---

### 7. Alert Widget

**Success Alert:**
```json
{
  "ui:widget": "alert",
  "ui:type": "success",
  "ui:message": "Operation completed successfully!",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-check-circle",
    "color": "#10b981"
  },
  "ui:animation": "slideInDown"
}
```

**Error Alert:**
```json
{
  "ui:widget": "alert",
  "ui:type": "error",
  "ui:message": "An error occurred: {{api.error.message}}",
  "ui:icon": "fas fa-exclamation-triangle",
  "ui:animation": "fadeInDown",
  "ui:animateOnHover": "grow"
}
```

**Info Alert:**
```json
{
  "ui:widget": "alert",
  "ui:type": "info",
  "ui:message": "You have {{api.updates.count}} pending updates",
  "ui:icon": {
    "type": "lucide",
    "value": "Info",
    "color": "#3b82f6"
  },
  "ui:animation": "fadeIn"
}
```

---

### 8. Icon Widget

**Simple Icon:**
```json
{
  "ui:widget": "icon",
  "ui:name": "Home",
  "ui:size": "32px",
  "ui:color": "#667eea",
  "ui:animation": "pulse",
  "ui:animateOnHover": "grow"
}
```

**FontAwesome Icon:**
```json
{
  "ui:widget": "icon",
  "ui:name": "fas fa-heart",
  "ui:size": "24px",
  "ui:color": "#ef4444",
  "ui:animation": "pulse"
}
```

---

### 9. Image Widget

**With Icon Overlay:**
```json
{
  "ui:widget": "image",
  "ui:src": "{{api.product.imageUrl}}",
  "ui:alt": "Product Image",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-image",
    "color": "white"
  },
  "ui:animation": "fadeIn",
  "ui:animateOnHover": "grow"
}
```

---

### 10. Progress Bar Widget

**With Icon:**
```json
{
  "ui:widget": "progressBar",
  "ui:value": "{{api.progress.percentage}}",
  "ui:max": 100,
  "ui:icon": {
    "type": "lucide",
    "value": "TrendingUp"
  },
  "ui:animation": "fadeInLeft",
  "ui:styles": {
    "height": "20px",
    "borderRadius": "10px"
  }
}
```

---

### 11. List Widget

**With Icons:**
```json
{
  "ui:widget": "list",
  "ui:items": [
    {
      "text": "{{api.tasks[0].name}}",
      "icon": "fas fa-check-circle"
    },
    {
      "text": "{{api.tasks[1].name}}",
      "icon": "fas fa-check-circle"
    }
  ],
  "ui:animation": "fadeInUp"
}
```

---

### 12. Hero Widget

**Complete Hero:**
```json
{
  "ui:widget": "hero",
  "ui:title": "Welcome to {{api.site.name}}",
  "ui:subtitle": "The best platform for your needs",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-rocket",
    "color": "white"
  },
  "ui:iconPosition": "top",
  "ui:animation": "fadeInDown",
  "ui:ctaButton": {
    "label": "Get Started",
    "icon": "fas fa-arrow-right",
    "animateOnHover": "lift"
  }
}
```

---

### 13. Stats Counter Widget

**With Icon:**
```json
{
  "ui:widget": "statsCounter",
  "ui:value": "{{api.stats.totalUsers}}",
  "ui:label": "Total Users",
  "ui:icon": {
    "type": "lucide",
    "value": "Users",
    "color": "#667eea"
  },
  "ui:iconPosition": "left",
  "ui:animation": "scaleIn",
  "ui:animateOnHover": "lift"
}
```

---

### 14. Pricing Card Widget

**With Icons:**
```json
{
  "ui:widget": "pricingCard",
  "ui:title": "Pro Plan",
  "ui:price": "${{api.pricing.pro}}",
  "ui:features": [
    { "text": "Unlimited Projects", "icon": "fas fa-check" },
    { "text": "24/7 Support", "icon": "fas fa-check" },
    { "text": "Advanced Analytics", "icon": "fas fa-check" }
  ],
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-crown",
    "color": "#fbbf24"
  },
  "ui:animation": "fadeInUp",
  "ui:animateOnHover": "lift"
}
```

---

### 15. Testimonial Widget

**With Avatar Icon:**
```json
{
  "ui:widget": "testimonial",
  "ui:quote": "{{api.testimonials[0].text}}",
  "ui:author": "{{api.testimonials[0].author}}",
  "ui:avatar": "{{api.testimonials[0].avatarUrl}}",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-quote-left",
    "color": "#667eea"
  },
  "ui:animation": "fadeIn",
  "ui:animateOnHover": "lift"
}
```

---

### 16. Social Icons Widget

**With Animations:**
```json
{
  "ui:widget": "socialIcons",
  "ui:platforms": [
    {
      "name": "facebook",
      "url": "https://facebook.com/{{api.social.facebook}}",
      "icon": "fab fa-facebook",
      "animateOnHover": "grow"
    },
    {
      "name": "twitter",
      "url": "https://twitter.com/{{api.social.twitter}}",
      "icon": "fab fa-twitter",
      "animateOnHover": "grow"
    }
  ],
  "ui:animation": "fadeInUp"
}
```

---

### 17. Breadcrumb Widget

**With Icons:**
```json
{
  "ui:widget": "breadcrumb",
  "ui:items": [
    {
      "label": "Home",
      "icon": "fas fa-home",
      "link": "/"
    },
    {
      "label": "Products",
      "icon": "fas fa-box",
      "link": "/products"
    },
    {
      "label": "{{api.product.name}}",
      "icon": "fas fa-tag"
    }
  ],
  "ui:animation": "fadeIn"
}
```

---

### 18. Container Widget

**With Animation:**
```json
{
  "ui:widget": "container",
  "ui:direction": "column",
  "ui:gap": "20px",
  "ui:animation": "fadeInUp",
  "ui:children": [
    {
      "ui:widget": "heading",
      "ui:text": "Dashboard",
      "ui:icon": "fas fa-chart-line"
    },
    {
      "ui:widget": "text",
      "ui:content": "Welcome back, {{auth.user.name}}"
    }
  ]
}
```

**With Icon:**
```json
{
  "ui:widget": "container",
  "ui:direction": "row",
  "ui:gap": "30px",
  "ui:icon": {
    "type": "lucide",
    "value": "Layout",
    "color": "#667eea"
  },
  "ui:iconPosition": "top",
  "ui:animation": "fadeIn",
  "ui:animateOnHover": "lift",
  "ui:children": [...]
}
```

---

### 19. Grid Layout Widget

**With Animation:**
```json
{
  "ui:widget": "gridLayout",
  "ui:columns": 3,
  "ui:gap": "24px",
  "ui:animation": "scaleIn",
  "ui:children": [
    {
      "ui:widget": "card",
      "ui:title": "Card 1",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "card",
      "ui:title": "Card 2",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "card",
      "ui:title": "Card 3",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    }
  ]
}
```

**With Data Binding:**
```json
{
  "ui:widget": "gridLayout",
  "ui:columns": 4,
  "ui:gap": "20px",
  "ui:animation": "fadeIn",
  "ui:children": [
    {
      "ui:widget": "statsCounter",
      "ui:value": "{{api.stats.users}}",
      "ui:label": "Users",
      "ui:icon": "fas fa-users",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "statsCounter",
      "ui:value": "{{api.stats.orders}}",
      "ui:label": "Orders",
      "ui:icon": "fas fa-shopping-cart",
      "ui:animateOnHover": "lift"
    }
  ]
}
```

---

### 20. Flex Layout Widget

**With Animation:**
```json
{
  "ui:widget": "flexLayout",
  "ui:direction": "row",
  "ui:justify": "space-between",
  "ui:align": "center",
  "ui:gap": "20px",
  "ui:animation": "slideInLeft",
  "ui:children": [
    {
      "ui:widget": "button",
      "ui:label": "Previous",
      "ui:icon": "fas fa-arrow-left",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "button",
      "ui:label": "Next",
      "ui:icon": "fas fa-arrow-right",
      "ui:iconPosition": "right",
      "ui:animateOnHover": "lift"
    }
  ]
}
```

---

## Advanced Patterns

### 1. Combining All Features

```json
{
  "ui:widget": "card",
  "ui:dataSource": "api.products[0]",
  "ui:title": "{{_boundData.name}}",
  "ui:content": "Price: ${{_boundData.price}} | Stock: {{_boundData.stock}}",
  "ui:icon": {
    "type": "fontawesome",
    "value": "fas fa-box-open",
    "color": "#667eea"
  },
  "ui:iconPosition": "left",
  "ui:iconGap": "15px",
  "ui:animation": "fadeInUp",
  "ui:animateOnHover": "lift",
  "ui:styles": {
    "background": "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    "padding": "30px",
    "borderRadius": "16px",
    "boxShadow": "0 8px 24px rgba(0,0,0,0.1)",
    "border": "2px solid #e2e8f0",
    "cursor": "pointer"
  }
}
```

### 2. Nested Animations

```json
{
  "ui:widget": "container",
  "ui:animation": "fadeIn",
  "ui:children": [
    {
      "ui:widget": "heading",
      "ui:text": "Products",
      "ui:animation": "slideInDown",
      "ui:icon": "fas fa-shopping-bag"
    },
    {
      "ui:widget": "gridLayout",
      "ui:columns": 3,
      "ui:animation": "fadeInUp",
      "ui:children": [
        {
          "ui:widget": "card",
          "ui:animation": "scaleIn",
          "ui:animateOnHover": "lift"
        }
      ]
    }
  ]
}
```

### 3. Dynamic Icon Colors

```json
{
  "ui:widget": "alert",
  "ui:type": "{{api.notification.type}}",
  "ui:message": "{{api.notification.message}}",
  "ui:icon": {
    "type": "fontawesome",
    "value": "{{api.notification.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}}",
    "color": "{{api.notification.type === 'success' ? '#10b981' : '#ef4444'}}"
  }
}
```

### 4. Conditional Animations

```json
{
  "ui:widget": "card",
  "ui:title": "Status: {{api.status}}",
  "ui:animation": "{{api.status === 'active' ? 'fadeInUp' : 'fadeIn'}}",
  "ui:animateOnHover": "{{api.status === 'active' ? 'lift' : 'grow'}}"
}
```

---

## Real-World Examples from demo.js

### Example 1: Navigation Bar from demo.js

```json
{
  "logo": {
    "ui:widget": "text",
    "ui:content": "🎨 SmartWidget Demo",
    "ui:icon": {
      "type": "fontawesome",
      "value": "fas fa-palette"
    },
    "ui:iconPosition": "left",
    "ui:iconGap": "12px",
    "ui:animation": "fadeInDown",
    "ui:styles": {
      "fontSize": "24px",
      "fontWeight": "800",
      "color": "white",
      "cursor": "pointer"
    }
  },
  "navLinks": {
    "ui:widget": "container",
    "ui:direction": "row",
    "ui:gap": "20px",
    "ui:children": [
      {
        "ui:widget": "button",
        "ui:label": "Icons",
        "ui:icon": {
          "type": "fontawesome",
          "value": "fas fa-icons",
          "color": "white"
        },
        "ui:iconPosition": "left",
        "ui:action": "scrollToSection",
        "ui:actionParams": { "sectionId": "icons-section" },
        "ui:animateOnHover": "lift"
      }
    ]
  }
}
```

### Example 2: Stats Dashboard

```json
{
  "ui:widget": "gridLayout",
  "ui:columns": 4,
  "ui:gap": "24px",
  "ui:animation": "fadeInUp",
  "ui:children": [
    {
      "ui:widget": "card",
      "ui:dataSource": "api.stats",
      "ui:title": "Total Users",
      "ui:content": "{{_boundData.totalUsers}}",
      "ui:icon": {
        "type": "lucide",
        "value": "Users",
        "color": "#667eea"
      },
      "ui:iconPosition": "left",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "card",
      "ui:dataSource": "api.stats",
      "ui:title": "Revenue",
      "ui:content": "${{_boundData.revenue}}",
      "ui:icon": {
        "type": "fontawesome",
        "value": "fas fa-dollar-sign",
        "color": "#10b981"
      },
      "ui:iconPosition": "left",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "card",
      "ui:dataSource": "api.stats",
      "ui:title": "Orders",
      "ui:content": "{{_boundData.totalOrders}}",
      "ui:icon": {
        "type": "lucide",
        "value": "ShoppingCart",
        "color": "#f59e0b"
      },
      "ui:iconPosition": "left",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    },
    {
      "ui:widget": "card",
      "ui:dataSource": "api.stats",
      "ui:title": "Growth",
      "ui:content": "+{{_boundData.growth}}%",
      "ui:icon": {
        "type": "lucide",
        "value": "TrendingUp",
        "color": "#ef4444"
      },
      "ui:iconPosition": "left",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift"
    }
  ]
}
```

### Example 3: Product Grid

```json
{
  "ui:widget": "gridLayout",
  "ui:columns": 3,
  "ui:gap": "30px",
  "ui:animation": "fadeIn",
  "ui:styles": {
    "padding": "40px"
  },
  "ui:children": [
    {
      "ui:widget": "card",
      "ui:dataSource": "api.products[0]",
      "ui:title": "{{_boundData.name}}",
      "ui:content": "${{_boundData.price}}",
      "ui:icon": {
        "type": "fontawesome",
        "value": "fas fa-box",
        "color": "#667eea"
      },
      "ui:animation": "scaleIn",
      "ui:animateOnHover": "lift",
      "ui:styles": {
        "borderRadius": "16px",
        "padding": "24px",
        "background": "white",
        "boxShadow": "0 4px 16px rgba(0,0,0,0.1)"
      }
    }
  ]
}
```

### Example 4: Interactive Form

```json
{
  "ui:widget": "container",
  "ui:direction": "column",
  "ui:gap": "20px",
  "ui:animation": "fadeInUp",
  "ui:styles": {
    "maxWidth": "500px",
    "margin": "0 auto",
    "padding": "40px",
    "background": "white",
    "borderRadius": "16px",
    "boxShadow": "0 8px 32px rgba(0,0,0,0.1)"
  },
  "ui:children": [
    {
      "ui:widget": "heading",
      "ui:text": "Contact Us",
      "ui:level": "h2",
      "ui:icon": {
        "type": "lucide",
        "value": "Mail",
        "color": "#667eea"
      },
      "ui:iconPosition": "left",
      "ui:animation": "fadeInDown"
    },
    {
      "ui:widget": "inputField",
      "ui:label": "Your Name",
      "ui:name": "name",
      "ui:placeholder": "John Doe",
      "ui:prefixIcon": {
        "type": "lucide",
        "value": "User"
      },
      "ui:animation": "fadeInLeft"
    },
    {
      "ui:widget": "inputField",
      "ui:label": "Email Address",
      "ui:name": "email",
      "ui:type": "email",
      "ui:placeholder": "john@example.com",
      "ui:prefixIcon": {
        "type": "fontawesome",
        "value": "fas fa-envelope"
      },
      "ui:animation": "fadeInRight"
    },
    {
      "ui:widget": "button",
      "ui:label": "Send Message",
      "ui:icon": {
        "type": "fontawesome",
        "value": "fas fa-paper-plane",
        "color": "white"
      },
      "ui:iconPosition": "right",
      "ui:animation": "fadeInUp",
      "ui:animateOnHover": "lift",
      "ui:styles": {
        "width": "100%",
        "padding": "14px",
        "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "color": "white",
        "border": "none",
        "borderRadius": "8px",
        "fontWeight": "600",
        "cursor": "pointer"
      }
    }
  ]
}
```

### Example 5: Hero Section

```json
{
  "ui:widget": "container",
  "ui:direction": "column",
  "ui:align": "center",
  "ui:gap": "30px",
  "ui:animation": "fadeIn",
  "ui:styles": {
    "padding": "80px 20px",
    "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "color": "white",
    "textAlign": "center"
  },
  "ui:children": [
    {
      "ui:widget": "heading",
      "ui:text": "Welcome to {{api.site.name}}",
      "ui:level": "h1",
      "ui:icon": {
        "type": "fontawesome",
        "value": "fas fa-rocket",
        "color": "white"
      },
      "ui:iconPosition": "top",
      "ui:iconGap": "20px",
      "ui:animation": "fadeInDown",
      "ui:styles": {
        "fontSize": "3.5rem",
        "fontWeight": "800",
        "color": "white"
      }
    },
    {
      "ui:widget": "paragraph",
      "ui:text": "The ultimate platform for building amazing applications",
      "ui:animation": "fadeIn",
      "ui:styles": {
        "fontSize": "1.5rem",
        "color": "rgba(255,255,255,0.9)"
      }
    },
    {
      "ui:widget": "flexLayout",
      "ui:direction": "row",
      "ui:gap": "20px",
      "ui:animation": "fadeInUp",
      "ui:children": [
        {
          "ui:widget": "button",
          "ui:label": "Get Started",
          "ui:icon": {
            "type": "lucide",
            "value": "ArrowRight",
            "color": "#667eea"
          },
          "ui:iconPosition": "right",
          "ui:animateOnHover": "lift",
          "ui:styles": {
            "background": "white",
            "color": "#667eea",
            "padding": "16px 32px",
            "borderRadius": "12px",
            "fontWeight": "700"
          }
        },
        {
          "ui:widget": "button",
          "ui:label": "Learn More",
          "ui:icon": {
            "type": "fontawesome",
            "value": "fas fa-info-circle",
            "color": "white"
          },
          "ui:iconPosition": "left",
          "ui:animateOnHover": "lift",
          "ui:styles": {
            "background": "rgba(255,255,255,0.2)",
            "color": "white",
            "padding": "16px 32px",
            "borderRadius": "12px",
            "border": "2px solid white",
            "fontWeight": "700"
          }
        }
      ]
    }
  ]
}
```

---

## Quick Reference Tables

### Icon Types
| Type | Value Format | Example |
|------|--------------|---------|
| FontAwesome | `"fas fa-ICON"` | `"fas fa-home"` |
| Lucide | `"ComponentName"` | `"Home"` |
| Custom | `"<svg>...</svg>"` | Custom SVG code |

### Icon Positions
| Position | Description |
|----------|-------------|
| `left` | Icon on the left (default) |
| `right` | Icon on the right |
| `top` | Icon on top |
| `bottom` | Icon on bottom |

### Entry Animations
| Animation | Effect |
|-----------|--------|
| `fadeIn` | Simple fade |
| `fadeInUp` | Fade from bottom |
| `fadeInDown` | Fade from top |
| `fadeInLeft` | Fade from left |
| `fadeInRight` | Fade from right |
| `scaleIn` | Scale up with fade |
| `scaleUp` | Spring scale |
| `slideInLeft` | Slide from left |
| `slideInRight` | Slide from right |
| `slideInUp` | Slide from bottom |
| `slideInDown` | Slide from top |
| `rotateIn` | Rotate while fading |
| `bounce` | Continuous bounce |
| `pulse` | Continuous pulse |
| `float` | Continuous float |
| `wiggle` | Continuous wiggle |

### Hover Animations
| Animation | Effect |
|-----------|--------|
| `lift` | Moves up |
| `grow` | Scales up (1.05x) |
| `shrink` | Scales down (0.95x) |
| `tilt` | Rotates slightly |
| `glow` | Adds glow shadow |
| `float` | Floats with shadow |

### Template Variables
| Variable | Description |
|----------|-------------|
| `{{auth.user.name}}` | Current user's name |
| `{{auth.user.email}}` | Current user's email |
| `{{api.RESOURCE.FIELD}}` | API response data |
| `{{form.FIELD}}` | Form field value |
| `{{modal.FIELD}}` | Modal form value |
| `{{_boundData.FIELD}}` | Bound data from `ui:dataSource` |

---

## Best Practices

### 1. Performance
- Use animations sparingly on large lists
- Prefer `fadeIn` over complex animations for better performance
- Use `ui:animateOnHover` for interactive elements

### 2. Accessibility
- Always provide meaningful icon descriptions
- Ensure sufficient color contrast
- Don't rely solely on icons to convey information

### 3. Consistency
- Use consistent animation speeds across the app
- Stick to a limited icon set (FontAwesome OR Lucide)
- Use consistent icon positions for similar widgets

### 4. Data Binding
- Always validate data exists before using templates
- Use fallback values: `{{api.user.name || 'Guest'}}`
- Test with empty/null data

### 5. Styling
- Combine SmartWidget features with custom styles
- Use `ui:animateOnHover` to indicate clickable elements
- Match icon colors to your brand palette

---

## Troubleshooting

### Icons not showing?
- ✅ Check icon type matches value format
- ✅ Ensure FontAwesome/Lucide CSS is loaded
- ✅ Verify icon name spelling

### Animations not working?
- ✅ Check animation name spelling
- ✅ Ensure Framer Motion is installed
- ✅ Try a simpler animation first

### Data not binding?
- ✅ Verify `ui:dataSource` path is correct
- ✅ Check API response structure
- ✅ Use `{{_boundData.FIELD}}` for bound data
- ✅ Check browser console for errors

### Template not resolving?
- ✅ Use correct syntax: `{{auth.user.name}}`
- ✅ Verify data exists in context
- ✅ Check for typos in variable names

---

## Summary

SmartWidget gives you three powerful features:
1. **Icons** - Add visual indicators anywhere
2. **Animations** - Create engaging user experiences
3. **Data Binding** - Connect to live data effortlessly

All 27+ widgets support these features with the same consistent API. Mix and match features to create rich, interactive, data-driven interfaces with minimal code!

