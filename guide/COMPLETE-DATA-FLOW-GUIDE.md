# 📚 Dynamic Page System - Complete Data Flow Documentation

## 🎯 Overview
This documentation explains how data flows from **API → DataStore → Widgets** in your dynamic page system.

---

## 🔄 The Complete Flow

```
┌─────────────────┐
│  1. menu.js     │  Define entities & seed data
│  (Backend Setup)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. API Config  │  Configure API endpoints
│  (APIConfig.js) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. Page Config │  Reference APIs in initialization.resources
│  (chiyaz.json)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  4. Triggers    │  Load data on page load
│  (load event)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. DataStore   │  Store data at api.{key}
│  (window store) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  6. Widget      │  Access via ui:dataSource
│  (projectGrid)  │
└─────────────────┘
```

---

## 📋 Step-by-Step Guide

### **STEP 1: Backend Setup (menu.js)**

#### A. Create Entity
```javascript
const createTeaEntity = async () => {
  const teaEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    entityName: "tea",  // ← This becomes part of the URL
    slug: `${CHIYAZ_ORG_ID}-chiyaz-tea-coffee-tea`,
    schema: {
      name: { type: "string", required: true },
      price: { type: "number", required: true },
      // ... other fields
    }
  });
  
  return { entity: teaEntity, slug: teaEntitySlug };
};
```

**Key Points:**
- `entityName: "tea"` → Creates endpoint: `/api/crud/{orgId}/tea`
- `slug` → Used internally for collection naming

#### B. Seed Data
```javascript
const seedTeaData = async (teaSlug) => {
  const collectionName = `dyn_${teaSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  const TeaModel = mongoose.connection.collection(collectionName);
  
  const teas = [
    { name: "Darjeeling", price: 24.99, ... },
    { name: "Matcha", price: 34.99, ... }
  ];
  
  await TeaModel.insertMany(teas);
};
```

**Key Points:**
- Use the **slug** (not entityName) for collection naming
- Data goes into MongoDB collection

---

### **STEP 2: API Configuration**

```javascript
const configureAPIs = async () => {
  const menuAPIConfigs = [
    {
      key: "chiyaz.tea.list",  // ← IMPORTANT: This is your API key
      name: "Get Chiyaz Teas",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/tea`,
      method: "GET",
      
      // ✅ CRITICAL: Transform response to extract data
      transformResponse: `
        (response) => {
          let items = [];
          if (response?.success && Array.isArray(response.data)) {
            items = response.data;
          } else if (Array.isArray(response)) {
            items = response;
          }
          return items;
        }
      `,
      
      storeResponse: true,
      storeKey: "api.tea",  // ← Where it's stored in DataStore
      
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    }
  ];
  
  for (const config of menuAPIConfigs) {
    await APIConfig.findOneAndUpdate(
      { key: config.key },
      { ...config },
      { upsert: true, new: true }
    );
  }
};
```

**Key Points:**
- `key`: How you reference this API in page config
- `url`: The actual endpoint (uses `entityName` from Step 1)
- `storeKey`: Where data is saved in DataStore (can be different from key)
- `transformResponse`: Extract the actual array from API response

---

### **STEP 3: Page Config - Resources**

```javascript
{
  initialization: {
    resources: [
      "chiyaz.tea.list",     // ← Matches API config "key"
      "chiyaz.coffee.list",
      "chiyaz.reviews.list"
    ]
  }
}
```

**What This Does:**
- Tells DynamicRenderer to fetch these APIs
- Happens automatically when page loads
- Each resource gets fetched and stored in DataStore

---

### **STEP 4: Page Config - Triggers**

```javascript
{
  components: {
    main: {
      triggers: [
        {
          event: "load",
          source: "chiyaz.tea.list"  // ← Matches API config "key"
        },
        {
          event: "load",
          source: "chiyaz.coffee.list"
        }
      ]
    }
  }
}
```

**What This Does:**
- Executes when component loads
- Calls the API specified in `source`
- Stores response in DataStore

**Key Points:**
- `source` must match the API `key` from Step 2
- Can also use in `initialization.resources` (auto-loads all)

---

### **STEP 5: DataStore Structure**

After APIs are loaded, DataStore looks like this:

```javascript
window.__dataStore.state = {
  api: {
    chiyaz: {
      tea: {
        list: [...],           // Original data
        list_filtered: [...]   // Filtered copy (created by DataStore)
      },
      coffee: {
        list: [...],
        list_filtered: [...]
      },
      reviews: {
        list: [...],
        list_filtered: [...]
      }
    }
  },
  form: {},
  modal: {},
  auth: {},
  ui: {}
}
```

**Key Points:**
- APIs store at `api.{key}` (e.g., `api.chiyaz.tea.list`)
- `storeKey` in API config can override this
- DataStore auto-creates `{key}_filtered` copies

---

### **STEP 6: Widget Data Binding**

```javascript
{
  "ui:widget": "projectGrid",
  "ui:dataSource": "chiyaz.tea.list_filtered.data"  // ← Path to data
}
```

#### How DataSource Works:

**A. DataSource Path Resolution**
```
"chiyaz.tea.list_filtered.data"
       ↓
Split by dots: ["chiyaz", "tea", "list_filtered", "data"]
       ↓
Navigate through globalData (which is store.get("api")):
globalData.chiyaz.tea.list_filtered.data
       ↓
Returns the array: [{...}, {...}, ...]
```

**B. Common Mistakes**

❌ **WRONG:**
```javascript
"ui:dataSource": "api.chiyaz.tea.list"  
// Tries: globalData.api.chiyaz...
// But globalData IS api, so this fails!
```

✅ **CORRECT:**
```javascript
"ui:dataSource": "chiyaz.tea.list"
// Tries: globalData.chiyaz.tea.list
// This works! ✓
```

---

## 🎯 Quick Reference Table

| Step | File | Key Field | Value Example | Purpose |
|------|------|-----------|---------------|---------|
| 1 | menu.js | `entityName` | `"tea"` | Creates API endpoint `/api/crud/{orgId}/tea` |
| 1 | menu.js | `slug` | `"{orgId}-chiyaz-tea-coffee-tea"` | Internal collection name |
| 2 | APIConfig | `key` | `"chiyaz.tea.list"` | How to reference API in config |
| 2 | APIConfig | `url` | `"http://.../api/crud/{orgId}/tea"` | Actual endpoint (uses entityName) |
| 2 | APIConfig | `storeKey` | `"api.tea"` | Where to save in DataStore |
| 3 | Page Config | `resources` | `["chiyaz.tea.list"]` | Auto-load on page init |
| 4 | Page Config | `trigger.source` | `"chiyaz.tea.list"` | Load on component mount |
| 6 | Widget | `ui:dataSource` | `"chiyaz.tea.list"` | Path to data (no "api." prefix!) |

---

## 🔍 Common Patterns

### Pattern 1: Simple List
```javascript
// API Config
{
  key: "products.list",
  storeKey: "api.products"
}

// Widget
{
  "ui:dataSource": "products"
}
```

### Pattern 2: Nested Organization
```javascript
// API Config
{
  key: "chiyaz.tea.list",
  storeKey: "api.tea"  // Shorthand
}

// Widget
{
  "ui:dataSource": "chiyaz.tea.list"  // Full path
}
```

### Pattern 3: With Filters
```javascript
// Widget
{
  "ui:dataSource": "products.list_filtered",
  "ui:dataFilter": {
    "category": "electronics",
    "inStock": true
  }
}
```

---

## 🐛 Debugging Checklist

### 1. Check API Response
```javascript
// In browser console
fetch('http://localhost:5000/api/crud/{orgId}/tea')
  .then(r => r.json())
  .then(console.log);
```

### 2. Check DataStore
```javascript
// In browser console
console.log(window.__dataStore.state);
console.log(window.__dataStore.get('api.chiyaz.tea.list'));
```

### 3. Check Widget Binding
```javascript
// Look for these logs in console
"🎯 enhanceWidgetWithData → { dataKey: '...', found: true/false }"
```

### 4. Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "No data" | Wrong path | Remove "api." prefix from dataSource |
| "undefined" | API not loaded | Check trigger.source matches API key |
| "Not an array" | Wrong nesting | Check if data is at `.data` or direct |
| Empty array | Wrong collection | Verify slug matches in menu.js |

---

## 📝 Complete Example

### Backend (menu.js)
```javascript
// 1. Create entity
const entity = await DynamicEntity.create({
  organizationId: CHIYAZ_ORG_ID,
  entityName: "tea",  // → /api/crud/{orgId}/tea
  slug: `${CHIYAZ_ORG_ID}-chiyaz-tea-coffee-tea`
});

// 2. Seed data
const TeaModel = mongoose.connection.collection(
  `dyn_${entity.slug.replace(/[^a-zA-Z0-9_]/g, "_")}`
);
await TeaModel.insertMany([...]);

// 3. Configure API
await APIConfig.create({
  key: "chiyaz.tea.list",  // Reference name
  url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/tea`,
  storeKey: "api.tea"  // Storage location
});
```

### Frontend (Page Config)
```javascript
{
  initialization: {
    resources: ["chiyaz.tea.list"]  // Auto-load
  },
  components: {
    main: {
      triggers: [
        { event: "load", source: "chiyaz.tea.list" }  // Manual load
      ],
      uiSchema: {
        teaGrid: {
          "ui:widget": "projectGrid",
          "ui:dataSource": "chiyaz.tea.list"  // ← No "api." prefix!
        }
      }
    }
  }
}
```

---

## 🎓 Key Takeaways

1. **API Key vs Entity Name**
   - Entity name → URL endpoint
   - API key → Reference in config

2. **DataStore Paths**
   - APIs store at `api.{key}`
   - Widgets use path WITHOUT "api." prefix
   - globalData = store.get("api")

3. **Data Flow**
   - menu.js → Creates endpoint & seeds DB
   - APIConfig → Defines how to fetch
   - Page Config → Triggers the fetch
   - DataStore → Stores the result
   - Widget → Displays from DataStore

4. **Debugging**
   - Check API response structure
   - Verify DataStore contents
   - Match keys exactly
   - Remove "api." from dataSource

---

## 🚀 Next Steps

1. Always check DataStore structure first:
   ```javascript
   console.log(window.__dataStore.state);
   ```

2. Match your dataSource to the actual path:
   ```javascript
   // If data is at: api.chiyaz.tea.list
   // Use: "chiyaz.tea.list"
   ```

3. Use transformResponse to normalize API responses:
   ```javascript
   transformResponse: `(response) => response.data || response`
   ```

4. Test each step independently:
   - ✓ API returns data
   - ✓ Data in DataStore
   - ✓ Widget path correct
   - ✓ Data renders

---

**Remember:** The "api" in `api.chiyaz.tea.list` is the DataStore namespace. Your widget dataSource starts AFTER "api." because globalData IS the api object!
