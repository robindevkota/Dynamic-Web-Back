# 🗃️ Dynamic Entity System - Complete Documentation

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Entity Structure](#entity-structure)
4. [Field Types & Validation](#field-types--validation)
5. [Organization & Permission System](#organization--permission-system)
6. [API Endpoints](#api-endpoints)
7. [Usage Examples](#usage-examples)
8. [File Upload Support](#file-upload-support)
9. [Global vs Organization Entities](#global-vs-organization-entities)
10. [Best Practices](#best-practices)

---

## System Overview

The Dynamic Entity system allows you to create custom database tables (entities) at runtime without modifying code. Each organization can create their own entities, and the system automatically:

- ✅ Creates MongoDB collections
- ✅ Generates CRUD API endpoints
- ✅ Handles validation and type conversion
- ✅ Manages file uploads
- ✅ Enforces organization-level permissions
- ✅ Supports both global and organization-specific entities

### Key Features

1. **No Code Deployment** - Create entities via API, no server restart needed
2. **Type Safety** - Automatic type conversion and validation
3. **Multi-Tenancy** - Complete data isolation between organizations
4. **File Support** - Built-in file upload handling (single & multiple)
5. **Flexible Schema** - Support for string, number, boolean, date, file, array, object, enum, and relation types
6. **Global Entities** - Share entities across all organizations (SUPER_ADMIN only)

---

## Architecture

### Database Models

#### 1. DynamicEntity Model
Stores entity definitions (schemas):

```javascript
{
  organizationId: ObjectId,        // Which organization owns this
  projectId: ObjectId,             // Optional: project association
  projectUUID: String,             // Optional: project UUID
  entityName: String,              // e.g., "products", "customers"
  slug: String,                    // Unique identifier (e.g., "org123-products")
  schema: Map<String, Mixed>,      // Field definitions
  operations: [String],            // ['create', 'read', 'update', 'delete', 'list']
  params: Mixed,                   // Query parameters configuration
  isGlobal: Boolean,               // If true, accessible by all orgs
  createdBy: ObjectId,
  updatedBy: ObjectId,
  timestamps: true
}
```

#### 2. Dynamic Collections
Each entity creates its own MongoDB collection:

```javascript
{
  organizationId: ObjectId,        // Auto-added to every record
  projectId: ObjectId,             // Optional
  projectUUID: String,             // Optional
  ...customFields,                 // Your defined schema fields
  createdBy: ObjectId,
  updatedBy: ObjectId,
  timestamps: true
}
```

### Slug Format

Entities are uniquely identified by slugs:

```
Organization Entity: {organizationId}-{projectUUID}-{entityName}
Example: "673b5f8a123456-proj-uuid-products"

Global Entity: global-{entityName}
Example: "global-products"
```

---

## Entity Structure

### Creating an Entity

```javascript
POST /api/crud/entity

Headers:
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

Body:
{
  "entityName": "products",
  "projectId": "optional-project-id",
  "projectUUID": "optional-project-uuid",
  "isGlobal": false,  // SUPER_ADMIN only
  "schema": {
    "name": {
      "type": "string",
      "required": true,
      "validation": {
        "minLength": 3,
        "maxLength": 100
      }
    },
    "price": {
      "type": "number",
      "required": true,
      "validation": {
        "min": 0,
        "max": 999999
      }
    },
    "category": {
      "type": "enum",
      "required": true,
      "validation": {
        "enum": ["Electronics", "Clothing", "Food"]
      }
    },
    "description": {
      "type": "string",
      "required": false
    },
    "inStock": {
      "type": "boolean",
      "default": true
    },
    "releaseDate": {
      "type": "date",
      "required": false
    },
    "thumbnail": {
      "type": "file",
      "required": false
    },
    "gallery": {
      "type": "array",
      "items": {
        "type": "file"
      }
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "metadata": {
      "type": "object",
      "required": false
    }
  },
  "operations": ["create", "read", "update", "delete", "list"]
}
```

---

## Field Types & Validation

### 1. String Type

```javascript
{
  "fieldName": {
    "type": "string",
    "required": true,
    "default": "default value",
    "validation": {
      "minLength": 3,
      "maxLength": 100,
      "pattern": "^[a-zA-Z0-9]+$"  // Optional regex
    }
  }
}
```

**Use Cases:**
- Names, titles, descriptions
- Email addresses, URLs
- Text content

---

### 2. Number Type

```javascript
{
  "fieldName": {
    "type": "number",
    "required": true,
    "default": 0,
    "validation": {
      "min": 0,
      "max": 999999
    }
  }
}
```

**Use Cases:**
- Prices, quantities, ratings
- Ages, counts, scores
- Measurements

---

### 3. Boolean Type

```javascript
{
  "fieldName": {
    "type": "boolean",
    "required": false,
    "default": false
  }
}
```

**Use Cases:**
- Flags (active/inactive, published/draft)
- Yes/No questions
- Feature toggles

---

### 4. Date Type

```javascript
{
  "fieldName": {
    "type": "date",
    "required": false,
    "default": null
  }
}
```

**Use Cases:**
- Birth dates, deadlines
- Event dates, timestamps
- Expiry dates

---

### 5. Enum Type

```javascript
{
  "fieldName": {
    "type": "enum",
    "required": true,
    "validation": {
      "enum": ["Option1", "Option2", "Option3"]
    },
    "default": "Option1"
  }
}
```

**Use Cases:**
- Status fields (pending, approved, rejected)
- Categories, types
- Priority levels (low, medium, high)

---

### 6. File Type (Single)

```javascript
{
  "fieldName": {
    "type": "file",
    "required": false
  }
}
```

**Stored Structure:**
```javascript
{
  "url": "/uploads/dynamic/file-123456.jpg",
  "filename": "file-123456.jpg",
  "originalName": "product.jpg",
  "mimetype": "image/jpeg",
  "size": 102400,
  "uploadedAt": "2025-02-04T10:00:00Z"
}
```

**Use Cases:**
- Profile pictures, avatars
- Document uploads (PDF, DOC)
- Single images

---

### 7. File Array Type

```javascript
{
  "fieldName": {
    "type": "array",
    "items": {
      "type": "file"
    }
  }
}
```

**Stored Structure:**
```javascript
[
  {
    "url": "/uploads/dynamic/file-1.jpg",
    "filename": "file-1.jpg",
    "originalName": "image1.jpg",
    "mimetype": "image/jpeg",
    "size": 102400,
    "uploadedAt": "2025-02-04T10:00:00Z"
  },
  {
    "url": "/uploads/dynamic/file-2.jpg",
    "filename": "file-2.jpg",
    "originalName": "image2.jpg",
    "mimetype": "image/jpeg",
    "size": 98304,
    "uploadedAt": "2025-02-04T10:00:00Z"
  }
]
```

**Use Cases:**
- Image galleries
- Multiple document uploads
- Attachment lists

---

### 8. Array Type (Non-File)

```javascript
{
  "fieldName": {
    "type": "array",
    "items": {
      "type": "string"  // or "number", "object", etc.
    },
    "required": false,
    "default": []
  }
}
```

**Use Cases:**
- Tags, keywords
- List of IDs
- Multiple selections

---

### 9. Object Type

```javascript
{
  "fieldName": {
    "type": "object",
    "required": false,
    "default": {}
  }
}
```

**Use Cases:**
- Metadata, settings
- Nested data structures
- JSON configuration

---

### 10. Relation Type

```javascript
{
  "fieldName": {
    "type": "relation",
    "ref": "users",  // Reference to another entity
    "required": false
  }
}
```

**Use Cases:**
- Foreign keys
- References to other entities
- Relationships between entities

---

## Organization & Permission System

### Permission Levels

#### 1. SUPER_ADMIN
- ✅ Create/edit/delete ANY entity (including global)
- ✅ Create global entities
- ✅ Access all organizations' entities
- ✅ Modify entity operations and schemas

#### 2. ORG_ADMIN
- ✅ Create/edit/delete entities in their organization
- ✅ Manage entity access within their org
- ❌ Cannot create global entities
- ❌ Cannot access other orgs' entities

#### 3. ORG_MEMBER
- ✅ Use entities in their organization
- ✅ CRUD operations on records
- ❌ Cannot create/modify entity schemas
- ❌ Cannot delete entities

#### 4. PUBLIC_USER / DEMO_USER
- ✅ Read-only access to public entities
- ❌ No schema access
- ❌ Limited to specific organizations

### Organization Model

```javascript
{
  name: String,
  slug: String,
  status: Enum['ACTIVE', 'INACTIVE', 'SUSPENDED', 'TRIAL'],
  pricingPlan: Enum['FREE', 'STARTER', 'PRO', 'ENTERPRISE'],
  subscriptionStatus: Enum['ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIAL'],
  
  // Limits
  maxProjects: Number,
  maxUsers: Number,
  maxStorage: Number,
  
  // Current Usage
  currentProjects: Number,
  currentUsers: Number,
  currentStorage: Number
}
```

---

## API Endpoints

### Entity Management Endpoints

#### 1. List All Entities
```http
GET /api/crud/entities

Headers:
  Authorization: Bearer YOUR_JWT_TOKEN

Response:
{
  "success": true,
  "entities": [
    {
      "_id": "entity-id",
      "entityName": "products",
      "slug": "org-id-products",
      "schema": { ... },
      "operations": ["create", "read", "update", "delete", "list"],
      "isGlobal": false,
      "createdAt": "2025-02-04T10:00:00Z"
    }
  ]
}
```

#### 2. Create Entity
```http
POST /api/crud/entity

Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body: (see Entity Structure section above)
```

#### 3. Update Entity
```http
PUT /api/crud/entity/:entityId

Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "entityName": "updated_products",  // Optional
  "schema": { ... },                 // Optional
  "operations": ["read", "list"]     // Optional
}
```

#### 4. Delete Entity
```http
DELETE /api/crud/entity/:entityId

Headers:
  Authorization: Bearer YOUR_JWT_TOKEN

Note: Entity must have 0 records to be deleted
```

#### 5. Get Entity Schema
```http
GET /api/crud/:organizationId/:entityName/schema

Response:
{
  "success": true,
  "entityName": "products",
  "schema": {
    "name": { "type": "string", "required": true },
    "price": { "type": "number", "required": true }
  },
  "operations": ["create", "read", "update", "delete", "list"],
  "isGlobal": false
}
```

---

### CRUD Endpoints (Auto-Generated)

Once an entity is created, these endpoints become available:

#### 1. List Records
```http
GET /api/crud/:organizationId/:entityName

Query Parameters:
  - page: Number (default: 1)
  - limit: Number (default: 10, max: 100)
  - sort: String (e.g., "-createdAt" for descending)
  - search: String (searches all string fields)
  - [fieldName]: Any (filter by field value)

Example:
GET /api/crud/673b5f8a123456/products?page=1&limit=20&category=Electronics&sort=-price

Response:
{
  "success": true,
  "data": [
    {
      "_id": "record-id",
      "name": "Product 1",
      "price": 99.99,
      "category": "Electronics",
      "createdAt": "2025-02-04T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

#### 2. Create Record
```http
POST /api/crud/:organizationId/:entityName

Headers:
  Content-Type: multipart/form-data  // For file uploads
  OR
  Content-Type: application/json     // For non-file data

Body (JSON):
{
  "name": "New Product",
  "price": 99.99,
  "category": "Electronics",
  "inStock": true,
  "tags": ["gadget", "tech"]
}

Body (FormData with files):
  name: "New Product"
  price: 99.99
  thumbnail: [File]
  gallery: [File, File, File]

Response:
{
  "success": true,
  "data": {
    "_id": "new-record-id",
    "name": "New Product",
    "price": 99.99,
    "thumbnail": {
      "url": "http://localhost:5000/uploads/dynamic/file-123.jpg",
      "filename": "file-123.jpg",
      "originalName": "product.jpg",
      "mimetype": "image/jpeg",
      "size": 102400
    }
  }
}
```

#### 3. Get Single Record
```http
GET /api/crud/:organizationId/:entityName/:recordId

Response:
{
  "success": true,
  "data": {
    "_id": "record-id",
    "name": "Product 1",
    "price": 99.99
  }
}
```

#### 4. Update Record
```http
PUT /api/crud/:organizationId/:entityName/:recordId

Headers:
  Content-Type: multipart/form-data  // For file uploads
  OR
  Content-Type: application/json     // For non-file data

Body:
{
  "price": 89.99,
  "inStock": false
}

Response:
{
  "success": true,
  "data": {
    "_id": "record-id",
    "name": "Product 1",
    "price": 89.99,
    "inStock": false
  }
}
```

#### 5. Delete Record
```http
DELETE /api/crud/:organizationId/:entityName/:recordId

Response:
{
  "success": true,
  "message": "Record deleted successfully"
}
```

---

## Usage Examples

### Example 1: Creating a Products Entity

**Step 1: Define the Entity**
```bash
curl -X POST http://localhost:5000/api/crud/entity \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "entityName": "products",
    "schema": {
      "name": {
        "type": "string",
        "required": true,
        "validation": { "minLength": 3 }
      },
      "price": {
        "type": "number",
        "required": true,
        "validation": { "min": 0 }
      },
      "category": {
        "type": "enum",
        "validation": {
          "enum": ["Electronics", "Clothing", "Food"]
        }
      },
      "image": {
        "type": "file"
      }
    }
  }'
```

**Step 2: Create a Record**
```bash
curl -X POST http://localhost:5000/api/crud/673b5f8a123456/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Laptop" \
  -F "price=999.99" \
  -F "category=Electronics" \
  -F "image=@/path/to/laptop.jpg"
```

**Step 3: List Products**
```bash
curl -X GET "http://localhost:5000/api/crud/673b5f8a123456/products?category=Electronics&sort=-price" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Example 2: Blog Posts with Multiple Images

**Entity Schema:**
```json
{
  "entityName": "blog_posts",
  "schema": {
    "title": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "string",
      "required": true
    },
    "author": {
      "type": "string",
      "required": true
    },
    "status": {
      "type": "enum",
      "validation": {
        "enum": ["draft", "published", "archived"]
      },
      "default": "draft"
    },
    "coverImage": {
      "type": "file"
    },
    "gallery": {
      "type": "array",
      "items": {
        "type": "file"
      }
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "publishDate": {
      "type": "date"
    }
  }
}
```

**Create Post:**
```javascript
const formData = new FormData();
formData.append('title', 'My First Blog Post');
formData.append('content', 'This is the content...');
formData.append('author', 'John Doe');
formData.append('status', 'published');
formData.append('coverImage', coverImageFile);
formData.append('gallery', galleryImage1);
formData.append('gallery', galleryImage2);
formData.append('gallery', galleryImage3);
formData.append('tags', JSON.stringify(['tech', 'tutorial']));
formData.append('publishDate', new Date().toISOString());

fetch('/api/crud/673b5f8a123456/blog_posts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: formData
});
```

---

### Example 3: Customer Management

**Entity Schema:**
```json
{
  "entityName": "customers",
  "schema": {
    "firstName": {
      "type": "string",
      "required": true
    },
    "lastName": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "string",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      }
    },
    "phone": {
      "type": "string"
    },
    "dateOfBirth": {
      "type": "date"
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "customerType": {
      "type": "enum",
      "validation": {
        "enum": ["individual", "business"]
      },
      "default": "individual"
    },
    "address": {
      "type": "object"
    },
    "loyaltyPoints": {
      "type": "number",
      "default": 0,
      "validation": {
        "min": 0
      }
    }
  }
}
```

---

## File Upload Support

### Supported File Types
- Images: `.jpeg`, `.jpg`, `.png`, `.gif`, `.webp`
- Documents: `.pdf`, `.doc`, `.docx`
- Max size: 5MB per file

### Single File Upload

```javascript
// Schema
{
  "avatar": {
    "type": "file"
  }
}

// Upload
const formData = new FormData();
formData.append('avatar', fileInput.files[0]);

// Stored as:
{
  "avatar": {
    "url": "http://localhost:5000/uploads/dynamic/avatar-123456.jpg",
    "filename": "avatar-123456.jpg",
    "originalName": "profile.jpg",
    "mimetype": "image/jpeg",
    "size": 102400,
    "uploadedAt": "2025-02-04T10:00:00Z"
  }
}
```

### Multiple File Upload

```javascript
// Schema
{
  "gallery": {
    "type": "array",
    "items": {
      "type": "file"
    }
  }
}

// Upload
const formData = new FormData();
for (let file of fileInput.files) {
  formData.append('gallery', file);
}

// Stored as:
{
  "gallery": [
    {
      "url": "http://localhost:5000/uploads/dynamic/file-1.jpg",
      "filename": "file-1.jpg",
      "originalName": "image1.jpg",
      "mimetype": "image/jpeg",
      "size": 102400,
      "uploadedAt": "2025-02-04T10:00:00Z"
    },
    {
      "url": "http://localhost:5000/uploads/dynamic/file-2.jpg",
      "filename": "file-2.jpg",
      "originalName": "image2.jpg",
      "mimetype": "image/jpeg",
      "size": 98304,
      "uploadedAt": "2025-02-04T10:00:00Z"
    }
  ]
}
```

---

## Global vs Organization Entities

### Organization Entities (Default)

```javascript
{
  "entityName": "products",
  "isGlobal": false,  // or omit this field
  "organizationId": "673b5f8a123456"
}
```

**Characteristics:**
- ✅ Created by ORG_ADMIN or SUPER_ADMIN
- ✅ Data isolated to the organization
- ✅ Slug format: `{orgId}-{projectUUID}-{entityName}`
- ✅ Only accessible by members of that organization

**Access:**
```http
GET /api/crud/673b5f8a123456/products
```

---

### Global Entities (SUPER_ADMIN Only)

```javascript
{
  "entityName": "countries",
  "isGlobal": true,
  "organizationId": null
}
```

**Characteristics:**
- ✅ Created by SUPER_ADMIN only
- ✅ Accessible by ALL organizations
- ✅ Slug format: `global-{entityName}`
- ✅ Useful for shared reference data

**Access:**
```http
GET /api/crud/global/countries
```

**Example Use Cases:**
- Countries, states, cities
- Categories, tags
- System-wide configurations
- Reference tables

---

## Best Practices

### 1. Entity Naming
✅ **DO:**
- Use lowercase with underscores: `blog_posts`, `customer_orders`
- Keep names descriptive but concise
- Use singular form for entity name: `product` not `products`

❌ **DON'T:**
- Use spaces or special characters
- Use camelCase or PascalCase
- Use reserved keywords

### 2. Schema Design
✅ **DO:**
- Set `required: true` for essential fields
- Use appropriate field types
- Add validation rules
- Provide default values where appropriate

❌ **DON'T:**
- Make everything required
- Over-nest objects
- Store large binary data directly

### 3. Validation
✅ **DO:**
```javascript
{
  "email": {
    "type": "string",
    "required": true,
    "validation": {
      "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    }
  },
  "age": {
    "type": "number",
    "validation": {
      "min": 0,
      "max": 120
    }
  }
}
```

### 4. File Uploads
✅ **DO:**
- Use `file` type for single uploads
- Use `array` with `items: { type: "file" }` for multiple
- Handle file size limits
- Validate file types

❌ **DON'T:**
- Store files directly in the database
- Forget to handle upload errors
- Allow unlimited file sizes

### 5. Querying
✅ **DO:**
- Use pagination for large datasets
- Add appropriate filters
- Use sorting for better UX
- Implement search functionality

```http
GET /api/crud/org-id/products?page=1&limit=20&category=Electronics&sort=-price&search=laptop
```

### 6. Security
✅ **DO:**
- Always authenticate requests (except demo/public)
- Validate user permissions
- Sanitize user input
- Use HTTPS in production

❌ **DON'T:**
- Expose sensitive data
- Allow unlimited record creation
- Skip authentication
- Trust client-side validation only

### 7. Performance
✅ **DO:**
- Index frequently queried fields
- Use pagination
- Limit response sizes
- Cache entity schemas

❌ **DON'T:**
- Fetch all records at once
- Create too many indexes
- Store large objects in arrays
- Make nested queries too deep

---

## Summary

The Dynamic Entity system provides a powerful, flexible way to create custom data structures without code deployment:

✅ **Multi-tenant by design** - Complete organization isolation
✅ **Type-safe** - Automatic validation and conversion
✅ **File upload ready** - Built-in file handling
✅ **Permission-based** - Role-based access control
✅ **Production-ready** - Includes pagination, search, filtering
✅ **Global entities** - Share data across organizations when needed

### Quick Start Checklist

1. ✅ Create your organization
2. ✅ Define your entity schema
3. ✅ POST to `/api/crud/entity`
4. ✅ Start using CRUD endpoints
5. ✅ Add records via POST
6. ✅ Query via GET with filters
7. ✅ Update via PUT
8. ✅ Delete via DELETE

### Common Patterns

**E-commerce:**
- `products`, `orders`, `customers`, `categories`, `reviews`

**Blog:**
- `posts`, `authors`, `categories`, `tags`, `comments`

**CRM:**
- `contacts`, `companies`, `deals`, `tasks`, `notes`

**Project Management:**
- `projects`, `tasks`, `milestones`, `teams`, `time_entries`

Each pattern follows the same structure and API conventions!
