# Backend Architecture Guide - Dynamic Website Engine

## System Overview

Express + MongoDB backend for no-code platform with **dual-tier architecture**.

**Purpose**: Manages platform operations (SaaS) and website data (client sites) separately.

**Technology Stack:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken + cookie-parser)
- Bcrypt (password hashing)
- Multer (file uploads)
- Stripe (payments)
- Google Generative AI / Ollama (AI features)

---

## Architecture Philosophy

### Two-Tier Separation

#### **Platform Tier (SaaS Backend - Private Access)**
- **Users**: SUPER_ADMIN, CLIENT_ADMIN, DEVELOPER
- **Purpose**: Manage organizations, projects, templates, team members
- **Auth**: `auth_token` HTTP-only cookie
- **Routes**: `/api/auth/*`, `/api/users/*`, `/api/pages/*`, `/api/organizations/*`
- **Controllers**: `authController.js`, `userController.js`, `pageConfigController.js`
- **Middleware**: `authMiddleware.js`

#### **Website Tier (Client-Facing - Public Access)**
- **Users**: END_USER_ADMIN, END_USER
- **Purpose**: Website visitors and customer management
- **Auth**: `{websiteSlug}_auth_token` HTTP-only cookie (website-specific)
- **Routes**: `/api/enduser-auth/*`, `/api/crud/*` (with websiteSlug)
- **Controllers**: `endUserAuthController.js`, `dynamicCrudController.js`
- **Middleware**: `websiteTierAuth.js`

**Critical Rule**: Platform roles **CANNOT** access end-user data. End-user admins **CANNOT** access platform data. Enforced by middleware.

---

## Database Models

### 1. User Model

**File**: [models/User.js](models/User.js) (77 lines)

**Purpose**: All system users across both tiers

#### Five Roles:

```javascript
enum: [
  "SUPER_ADMIN",      // Platform owner (seeded)
  "CLIENT_ADMIN",     // Organization owner (B2B customer)
  "DEVELOPER",        // Builds websites (invited by CLIENT_ADMIN)
  "END_USER_ADMIN",   // Manages end users (invited by CLIENT_ADMIN)
  "END_USER"          // Website visitor (B2C customer)
]
```

#### Role Hierarchy:

```
┌─────────────────────────────────────────────────┐
│         PLATFORM TIER (SaaS Backend)           │
├─────────────────────────────────────────────────┤
│  SUPER_ADMIN (Platform Owner)                  │
│    • Full platform access                      │
│    • Can view all organizations                │
│    • Cannot access END_USER data               │
│    • No organization requirement                │
│    ↓                                            │
│  CLIENT_ADMIN (Organization Owner)             │
│    • Owns an organization                      │
│    • Invites DEVELOPER and END_USER_ADMIN      │
│    • Manages organization settings             │
│    • Must verify email + complete payment      │
│    ↓                                            │
│  DEVELOPER (Website Builder)                   │
│    • Builds PageConfig (websites)              │
│    • Creates Dynamic Entities (CRUD)           │
│    • Limited to own organization               │
│    • Invited by CLIENT_ADMIN                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│         WEBSITE TIER (Client Websites)         │
├─────────────────────────────────────────────────┤
│  END_USER_ADMIN (Website Administrator)        │
│    • Manages END_USERs within organization     │
│    • Can view/manage website visitors          │
│    • Cannot see platform data                  │
│    ↓                                            │
│  END_USER (Website Visitor)                    │
│    • Sign up on public website                 │
│    • Access website features                   │
│    • Each website has own END_USER base        │
└─────────────────────────────────────────────────┘
```

#### Schema:

```javascript
{
  email: String (unique, required),
  password: String (hashed with bcrypt, select: false),
  role: String (enum: 5 roles),
  organizationId: ObjectId (required for all except SUPER_ADMIN),
  websiteSlug: String (required for END_USER),

  firstName: String,
  lastName: String,

  emailVerified: Boolean (default: false),
  emailVerificationToken: String,
  emailVerificationExpires: Date,

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  invitationToken: String (for DEVELOPER invites),
  invitationExpires: Date,
  invitedBy: ObjectId (who invited this user),

  status: String (enum: PENDING_VERIFICATION, PENDING_PAYMENT, ACTIVE, SUSPENDED),

  assignedProjects: [ObjectId] (for DEVELOPER),

  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Status Flow:

```
CLIENT_ADMIN: PENDING_VERIFICATION → PENDING_PAYMENT → ACTIVE → SUSPENDED
DEVELOPER:    PENDING_VERIFICATION → ACTIVE → SUSPENDED
END_USER:     PENDING_VERIFICATION → ACTIVE → SUSPENDED
SUPER_ADMIN:  ACTIVE (created via seed script)
```

---

### 2. Organization Model

**File**: [models/Organization.js](models/Organization.js) (161 lines)

**Purpose**: Multi-tenant container for CLIENT_ADMIN (each organization is a separate tenant)

#### Schema:

```javascript
{
  name: String (required),
  slug: String (unique, required),

  status: String (enum: ACTIVE, INACTIVE, SUSPENDED, TRIAL),
  pricingPlan: String (enum: FREE, STARTER, PRO, ENTERPRISE),
  subscriptionStatus: String (enum: ACTIVE, PAST_DUE, CANCELED, TRIAL),
  subscriptionEndsAt: Date,
  trialEndsAt: Date,

  // Limits per plan
  maxProjects: Number,
  maxUsers: Number,
  maxStorage: Number,

  // Current usage
  currentProjects: Number (default: 0),
  currentUsers: Number (default: 0),
  currentStorage: Number (default: 0),

  // Deactivation tracking
  deactivatedAt: Date,
  deactivatedBy: ObjectId (User ref),
  deactivationReason: String (enum: PAYMENT_FAILED, TRIAL_EXPIRED, MANUAL, POLICY_VIOLATION),

  // Settings
  settings: {
    allowPublicSignup: Boolean,
    customDomain: String,
    logoUrl: String,
    brandColor: String
  },

  createdAt: Date,
  updatedAt: Date
}
```

#### Limits by Plan:

```javascript
{
  starter: {
    maxUsers: 4,
    maxProjects: 4,
    maxStorage: 1073741824 // 1GB
  },
  professional: {
    maxUsers: 8,
    maxProjects: 8,
    maxStorage: 5368709120 // 5GB
  },
  enterprise: {
    maxUsers: 10,
    maxProjects: 10,
    maxStorage: 10737418240 // 10GB
  }
}
```

#### Organization Access Control:

When organization status ≠ ACTIVE:
- Users cannot log in
- Routes return 403 with deactivation reason
- Frontend shows message ("payment failed", "trial expired", etc.)

**Middleware**: [checkOrganizationAccess.js](middleware/checkOrganizationAccess.js)

---

### 3. PageConfig Model

**File**: [models/PageConfig.js](models/PageConfig.js) (133 lines)

**Purpose**: Website/project definition (JSON-driven pages)

#### Schema:

```javascript
{
  title: String (required),
  slug: String (unique, required),

  organizationId: ObjectId (null = SUPER_ADMIN template),
  createdBy: ObjectId (User ref),

  isTemplate: Boolean (default: false - read-only starter templates),
  templateCategory: String,

  status: String (enum: Active, Draft, Deleted - publication status),

  // Project-level access control
  projectStatus: String (enum: ACTIVE, INACTIVE, ARCHIVED, MAINTENANCE),
  projectDeactivationReason: String,
  projectDeactivatedAt: Date,
  projectDeactivatedBy: ObjectId,
  maintenanceMessage: String,

  initialization: {
    globalCSS: String,
    resources: Array,
    actions: Object (JavaScript code strings)
  },

  pages: Map<String, SubPage> (multiple pages per project),

  components: {
    navbar: { uiSchema: Object },
    sidebar: { uiSchema: Object },
    main: { uiSchema: Object },
    modals: { uiSchema: Object },
    footer: { uiSchema: Object }
  },

  version: Number (default: 1),

  createdAt: Date,
  updatedAt: Date
}
```

#### Two Status Fields:

1. **`status`**: Draft/Active/Deleted (editorial workflow)
   - Controls visibility in project list
   - Soft delete functionality

2. **`projectStatus`**: ACTIVE/INACTIVE/ARCHIVED/MAINTENANCE (access control)
   - Controls end-user access to website
   - Can be deactivated independently of organization

**Templates:**
- Read-only PageConfigs with `isTemplate: true`
- Created by SUPER_ADMIN
- `organizationId: null`
- Can be cloned by clients
- Cannot be edited or deleted

---

### 4. DynamicEntity Model

**File**: [models/DynamicEntity.js](models/DynamicEntity.js) (147 lines)

**Purpose**: Runtime CRUD entities (database collections created on-demand)

#### Schema:

```javascript
{
  organizationId: ObjectId (required),
  projectUUID: String (which project created this entity),

  entityName: String (required - e.g., "hotels", "bookings"),
  slug: String (unique - used for MongoDB collection name),

  schema: Map (field definitions),
  /*
    Example schema:
    {
      "name": { "type": "String", "required": true },
      "rating": { "type": "Number", "default": 0 },
      "rooms": { "type": "Number" }
    }
  */

  operations: [String] (allowed operations: create, read, update, delete, list),

  // Global & Public Control
  isGlobal: Boolean (default: false - accessible across all orgs),
  isPublic: Boolean (default: false - no auth required for website visitors),

  // Granular Access Control (per operation)
  accessControl: {
    readAccess: String (enum: PUBLIC, END_USER, END_USER_ADMIN, PLATFORM),
    createAccess: String,
    updateAccess: String,
    deleteAccess: String
  },

  createdBy: ObjectId (User ref),
  updatedBy: ObjectId,

  createdAt: Date,
  updatedAt: Date
}
```

#### Access Levels:

- **PUBLIC**: Anyone (unauthenticated)
- **END_USER**: Logged-in website users
- **END_USER_ADMIN**: Website administrators
- **PLATFORM**: DEVELOPER/CLIENT_ADMIN/SUPER_ADMIN

#### Dynamic Collections:

When DynamicEntity is created, MongoDB collection is auto-generated:

```
Collection Name: {organizationId}_{entityName}

Example: 507f1f77bcf86cd799439011_hotels
```

**Controller**: [dynamicCrudController.js](controllers/dynamicCrudController.js) (1,200+ lines)

---

## Authentication System

### Platform Auth

**Controller**: [authController.js](controllers/authController.js) (450+ lines)

#### Signup Flow (CLIENT_ADMIN):

```
1. Receive: email, password, organizationName, pricingPlan
   ↓
2. Create Organization (status: PENDING_PAYMENT)
   ↓
3. Create User (role: CLIENT_ADMIN, status: PENDING_VERIFICATION)
   ↓
4. Send verification email with token
   ↓
5. User verifies email → GET /api/auth/verify-email?token=...
   ↓
6. Update status: PENDING_PAYMENT (NOT ACTIVE yet)
   ↓
7. Return payment info
   ↓
8. User completes payment → POST /api/auth/payment-success
   ↓
9. Activate organization (status: ACTIVE)
   ↓
10. Activate user (status: ACTIVE)
   ↓
11. Can now log in
```

#### Login Flow:

```javascript
POST /api/auth/login
{
  email: "admin@company.com",
  password: "password123"
}

// Controller logic:
1. Find user by email
2. Verify password with bcrypt
3. Check status: must be ACTIVE
4. Check organization: must be ACTIVE
5. Generate JWT token
6. Set HTTP-only cookie: auth_token
7. Return: { user: { email, role, organizationId }, token }
```

#### JWT Token Payload (Platform):

```javascript
{
  userId: ObjectId,
  email: String,
  role: String (SUPER_ADMIN, CLIENT_ADMIN, DEVELOPER),
  organizationId: ObjectId (null for SUPER_ADMIN),
  iat: number (issued at),
  exp: number (expiration - 7 days)
}
```

---

### Website Auth

**Controller**: [endUserAuthController.js](controllers/endUserAuthController.js) (400+ lines)

#### Signup Flow (END_USER):

```
1. Receive: email, password, websiteSlug
   ↓
2. Lookup organizationId from PageConfig where slug = websiteSlug
   ↓
3. Create User (role: END_USER, status: PENDING_VERIFICATION)
   ↓
4. Send verification email with token
   ↓
5. User verifies email → GET /api/enduser-auth/verify-email?token=...
   ↓
6. Update status: ACTIVE (no payment required)
   ↓
7. Can now log in
```

#### Login Flow:

```javascript
POST /api/enduser-auth/login
{
  email: "user@example.com",
  password: "password123",
  websiteSlug: "hotelhub"
}

// Controller logic:
1. Find user by email + websiteSlug
2. Verify password
3. Check status: must be ACTIVE
4. Check organization: must be ACTIVE
5. Generate JWT token with websiteSlug claim
6. Set HTTP-only cookie: {websiteSlug}_auth_token
7. Return: { user: { email, role }, token }
```

#### JWT Token Payload (Website):

```javascript
{
  userId: ObjectId,
  email: String,
  role: String (END_USER_ADMIN, END_USER),
  websiteSlug: String,
  organizationId: ObjectId,
  iat: number,
  exp: number
}
```

#### Critical Difference:

| Aspect | Platform Auth | Website Auth |
|--------|---------------|--------------|
| **Cookie Name** | `auth_token` | `{websiteSlug}_auth_token` |
| **Controller** | `authController.js` | `endUserAuthController.js` |
| **Routes** | `/api/auth/*` | `/api/enduser-auth/*` |
| **Middleware** | `authMiddleware.js` | `websiteTierAuth.js` |
| **Roles** | SUPER_ADMIN, CLIENT_ADMIN, DEVELOPER | END_USER_ADMIN, END_USER |

---

## Middleware Chain

### 1. Platform Auth Middleware

**File**: [middleware/authMiddleware.js](middleware/authMiddleware.js) (46 lines)

**Purpose**: Verify `auth_token` for platform routes

**Flow:**
```javascript
1. Check cookie: req.cookies.auth_token
2. If no token → return 401 Unauthorized
3. Verify JWT using JWT_SECRET
4. If invalid → return 401
5. Find user in database
6. If not found or status ≠ ACTIVE → return 401
7. Attach to request: req.user = { userId, email, role, organizationId }
8. Continue to next middleware
```

**Usage:**
```javascript
router.post('/api/projects/create', authMiddleware, canCreateProject, createProject);
```

---

### 2. Website Auth Middleware

**File**: [middleware/websiteTierAuth.js](middleware/websiteTierAuth.js) (208 lines)

#### `endUserAdminAuth`:

```javascript
1. Get websiteSlug from headers/query/body
2. If no websiteSlug → return 401
3. Check cookie: req.cookies[`${websiteSlug}_auth_token`]
4. If no token → return 401
5. Verify JWT
6. Get user from database
7. Verify role === 'END_USER_ADMIN'
8. Verify user.organizationId matches website's organizationId
9. Attach to request: req.user = { userId, role, organizationId, websiteSlug }
10. Continue
```

#### `optionalEndUserAuth`:

Same as above but **doesn't reject** if no token.
Used for public pages that show different content when logged in.

---

### 3. Project Permissions Middleware

**File**: [middleware/projectPermissions.js](middleware/projectPermissions.js) (217 lines)

#### `canCreateProject`:

```javascript
// SUPER_ADMIN: Always allowed
if (req.user.role === 'SUPER_ADMIN') return next();

// Others: Check organization limits
const org = await Organization.findById(req.user.organizationId);

if (org.currentProjects >= org.maxProjects) {
  return res.status(403).json({
    error: 'Project limit reached. Upgrade your plan.'
  });
}

return next();
```

#### `canEditProject`:

```javascript
const project = await PageConfig.findOne({ slug: req.params.slug });

// SUPER_ADMIN: Edit anything
if (req.user.role === 'SUPER_ADMIN') return next();

// Cannot edit templates
if (project.isTemplate) {
  return res.status(403).json({ error: 'Cannot edit templates' });
}

// Must be same organization
if (project.organizationId.toString() !== req.user.organizationId.toString()) {
  return res.status(403).json({ error: 'Access denied' });
}

return next();
```

#### `canDeleteProject`:

```javascript
// SUPER_ADMIN: Delete anything (except templates)
if (req.user.role === 'SUPER_ADMIN') {
  if (project.isTemplate) {
    return res.status(403).json({ error: 'Cannot delete templates' });
  }
  return next();
}

// Others: Only own organization's projects
if (project.organizationId.toString() !== req.user.organizationId.toString()) {
  return res.status(403).json({ error: 'Access denied' });
}

return next();
```

---

### 4. Dynamic CRUD Auth

**File**: [routes/dynamicCrudRoutes.js](routes/dynamicCrudRoutes.js)

**Smart Auth Selection** (auto-detects platform vs website tier):

```javascript
async function dynamicEntityAuth(req, res, next) {
  const websiteSlug = req.headers['x-website-slug'] || req.query.websiteSlug;

  if (!websiteSlug) {
    // Platform-tier access → require authMiddleware
    return authMiddleware(req, res, next);
  } else {
    // Website-tier access → check entity.isPublic
    const entity = await DynamicEntity.findOne({
      entityName: req.params.entityName,
      organizationId: req.params.organizationId
    });

    if (entity.isPublic) {
      // Allow unauthenticated access
      return next();
    } else {
      // Require END_USER_ADMIN
      return endUserAdminAuth(req, res, next);
    }
  }
}
```

---

## Route Structure

### Platform Routes

```javascript
// ============================================
// Auth Routes (authRoutes.js)
// ============================================
POST   /api/auth/signup              → CLIENT_ADMIN signup (authController.signup)
POST   /api/auth/login               → Platform login (authController.login)
POST   /api/auth/logout              → Clear auth_token (authController.logout)
GET    /api/auth/verify-email        → Verify email token (authController.verifyEmail)
POST   /api/auth/resend-verification → Resend verification email
POST   /api/auth/forgot-password     → Send reset email
POST   /api/auth/reset-password      → Reset password
POST   /api/auth/payment-success     → Handle Stripe callback

// ============================================
// User Routes (userRoutes.js)
// All require authMiddleware
// ============================================
GET    /api/users                    → List users (userController.getAllUsers)
                                       - SUPER_ADMIN: All users
                                       - CLIENT_ADMIN: Organization users
                                       - DEVELOPER: Denied

GET    /api/users/me                 → Get current user (userController.getCurrentUser)

GET    /api/users/my-organization    → Get org users (userController.getOrganizationUsers)
                                       - CLIENT_ADMIN: Developers + Admins
                                       - DEVELOPER: Denied

POST   /api/users/invite             → Invite DEVELOPER (userController.inviteUser)
                                       - CLIENT_ADMIN only

POST   /api/users/accept-invitation  → Accept invite (userController.acceptInvitation)

PUT    /api/users/:id                → Update user (userController.updateUser)

DELETE /api/users/:id                → Remove user (userController.deleteUser)
                                       - CLIENT_ADMIN: Own org users only

// ============================================
// Page Config Routes (pageConfigRoutes.js)
// All require authMiddleware
// ============================================
GET    /api/pages                    → List projects (pageConfigController.getAllPages)
                                       - Filtered by organization

GET    /api/pages/:slug              → Get single page (pageConfigController.getPageBySlug)
                                       - Public or own org

POST   /api/pages                    → Create page (authMiddleware + canCreateProject)
                                       - Check project limits

PUT    /api/pages/:slug              → Update page (authMiddleware + canEditProject)
                                       - Own org only

DELETE /api/pages/:slug              → Delete page (authMiddleware + canDeleteProject)
                                       - Own org only

POST   /api/pages/clone/:slug        → Clone template (authMiddleware + canCreateProject)

PATCH  /api/pages/:slug/status       → Toggle status (authMiddleware + canEditProject)

// ============================================
// Organization Routes (organizationRoutes.js)
// SUPER_ADMIN only
// ============================================
GET    /api/organizations            → List all orgs
POST   /api/organizations/deactivate → Deactivate org
PUT    /api/organizations/:id        → Update org settings

// ============================================
// Dynamic CRUD Routes (Platform Tier)
// ============================================
POST   /api/crud/:organizationId/entities         → Create entity definition
GET    /api/crud/:organizationId/entities         → List entities
POST   /api/crud/:organizationId/:entityName      → Create record
GET    /api/crud/:organizationId/:entityName      → List records
GET    /api/crud/:organizationId/:entityName/:id  → Get record
PUT    /api/crud/:organizationId/:entityName/:id  → Update record
DELETE /api/crud/:organizationId/:entityName/:id  → Delete record
```

### Website Routes

```javascript
// ============================================
// End User Auth Routes (endUserAuthRoutes.js)
// No auth required
// ============================================
POST   /api/enduser-auth/signup         → END_USER signup
POST   /api/enduser-auth/login          → END_USER login
POST   /api/enduser-auth/logout         → Clear website cookie
GET    /api/enduser-auth/verify-email   → Verify email
POST   /api/enduser-auth/forgot-password
POST   /api/enduser-auth/reset-password
GET    /api/enduser-auth/check-session  → Check if logged in

// ============================================
// Dynamic CRUD Routes (Website Tier)
// With websiteSlug query parameter
// ============================================
POST   /api/crud/:organizationId/:entityName?websiteSlug=hotelhub
GET    /api/crud/:organizationId/:entityName?websiteSlug=hotelhub
```

**Query Parameter**: `websiteSlug` tells backend to use website-tier auth

---

## Permission Matrix

| Role | Platform Routes | Create Project | Edit Project | Delete Project | Access End Users | View All Orgs |
|------|----------------|----------------|--------------|----------------|------------------|---------------|
| **SUPER_ADMIN** | Full | Yes | All | All (not templates) | No | Yes |
| **CLIENT_ADMIN** | Org-level | Yes (if limit) | Own org | Own org | No | No |
| **DEVELOPER** | Read projects | Yes (if limit) | Own org | Own org | No | No |
| **END_USER_ADMIN** | No | No | No | No | Full (own org) | No |
| **END_USER** | No | No | No | No | Own data only | No |

---

## Data Isolation & Multi-Tenancy

### Organization Boundaries

**Every query must be scoped to organizationId:**

```javascript
// ❌ WRONG - Security vulnerability
const projects = await PageConfig.find({ status: 'Active' });

// ✅ CORRECT - Scoped to organization
const projects = await PageConfig.find({
  organizationId: req.user.organizationId,
  status: 'Active'
});
```

**Exception**: SUPER_ADMIN can query across organizations

### Dynamic Entity Data Isolation

**Collection Naming Convention:**
```
{organizationId}_{entityName}

Example: 507f1f77bcf86cd799439011_hotels
```

**Auto-scoping in Controller** ([dynamicCrudController.js](controllers/dynamicCrudController.js)):

```javascript
const collectionName = `${organizationId}_${entityName}`;
const Collection = getOrCreateModel(collectionName, schemaDefinition);

// All queries are automatically scoped to that organization's collection
const records = await Collection.find({});
```

---

## Common Patterns

### 1. Creating New Protected Route (Platform)

```javascript
// routes/myRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/data', authMiddleware, async (req, res) => {
  const { userId, role, organizationId } = req.user;

  // SUPER_ADMIN: Access all
  if (role === 'SUPER_ADMIN') {
    const data = await Model.find({});
    return res.json(data);
  }

  // Others: Scoped to org
  const data = await Model.find({ organizationId });
  res.json(data);
});

module.exports = router;
```

### 2. Adding Website-Tier Endpoint

```javascript
const { endUserAdminAuth } = require('../middleware/websiteTierAuth');

router.post('/website-action', endUserAdminAuth, async (req, res) => {
  const { userId, organizationId, websiteSlug } = req.user;

  // Only END_USER_ADMIN from matching org reaches here
  // Implement your logic

  res.json({ success: true });
});
```

### 3. Creating Dynamic Entity

```javascript
POST /api/crud/:organizationId/entities
{
  "entityName": "hotels",
  "schema": {
    "name": { "type": "String", "required": true },
    "rating": { "type": "Number", "default": 0 },
    "address": { "type": "String" }
  },
  "operations": ["create", "read", "update", "delete", "list"],
  "isPublic": true,
  "accessControl": {
    "readAccess": "PUBLIC",
    "createAccess": "END_USER_ADMIN",
    "updateAccess": "END_USER_ADMIN",
    "deleteAccess": "END_USER_ADMIN"
  }
}

// This creates MongoDB collection: {organizationId}_hotels
```

### 4. Querying Dynamic Entity

```javascript
// From platform (authMiddleware)
GET /api/crud/:organizationId/hotels
Headers: Cookie: auth_token=...

// From website (endUserAdminAuth or public)
GET /api/crud/:organizationId/hotels?websiteSlug=hotelhub
Headers: Cookie: hotelhub_auth_token=...
```

---

## Security Considerations

### 1. Cookie Security

```javascript
res.cookie('auth_token', token, {
  httpOnly: true,      // Prevents XSS attacks
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
  sameSite: 'lax',     // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
});
```

### 2. Password Hashing

```javascript
const hashedPassword = await bcrypt.hash(password, 12);  // 12 rounds
const isMatch = await bcrypt.compare(password, user.password);
```

### 3. JWT Secret

**Must set in `.env`:**
```env
JWT_SECRET=your-very-long-random-secret-minimum-32-characters
```

### 4. Input Validation

Always validate:
- Email format (regex or validator library)
- Password strength (min 6 chars, recommended: 8+ with complexity)
- Role enum values (prevent role escalation)
- organizationId existence
- websiteSlug validity

---

## Key Files & Locations

### Models
- [models/User.js](models/User.js) (77 lines): User schema with 5 roles
- [models/Organization.js](models/Organization.js) (161 lines): Multi-tenant container
- [models/PageConfig.js](models/PageConfig.js) (133 lines): Website/project definition
- [models/DynamicEntity.js](models/DynamicEntity.js) (147 lines): CRUD entity schema

### Controllers
- [controllers/authController.js](controllers/authController.js) (450+ lines): Platform auth logic
- [controllers/endUserAuthController.js](controllers/endUserAuthController.js) (400+ lines): Website auth logic
- [controllers/pageConfigController.js](controllers/pageConfigController.js) (600+ lines): Project CRUD
- [controllers/dynamicCrudController.js](controllers/dynamicCrudController.js) (1,200+ lines): Dynamic entities
- [controllers/userController.js](controllers/userController.js) (250+ lines): User management

### Middleware
- [middleware/authMiddleware.js](middleware/authMiddleware.js) (46 lines): Platform token verification
- [middleware/websiteTierAuth.js](middleware/websiteTierAuth.js) (208 lines): Website token verification
- [middleware/projectPermissions.js](middleware/projectPermissions.js) (217 lines): Project access control
- [middleware/checkOrganizationAccess.js](middleware/checkOrganizationAccess.js): Organization status validation
- [middleware/publicCrudAuth.js](middleware/publicCrudAuth.js): Public CRUD access

### Routes
- [routes/authRoutes.js](routes/authRoutes.js): Platform auth endpoints
- [routes/endUserAuthRoutes.js](routes/endUserAuthRoutes.js): Website auth endpoints
- [routes/pageConfigRoutes.js](routes/pageConfigRoutes.js): Project management
- [routes/dynamicCrudRoutes.js](routes/dynamicCrudRoutes.js): Dynamic entity operations
- [routes/userRoutes.js](routes/userRoutes.js): User management

### Entry Point
- [index.js](index.js) (100 lines): Express app setup, middleware order, route mounting

---

## Status Flows

### CLIENT_ADMIN Journey

```
Signup → PENDING_VERIFICATION
  ↓ (verify email)
PENDING_PAYMENT
  ↓ (complete Stripe payment)
ACTIVE
  ↓ (subscription expires or payment fails)
SUSPENDED
```

### DEVELOPER Journey

```
Invite sent by CLIENT_ADMIN → PENDING_VERIFICATION
  ↓ (accept invite + verify email)
ACTIVE (no payment needed)
  ↓ (removed by CLIENT_ADMIN)
SUSPENDED
```

### END_USER Journey

```
Signup on website → PENDING_VERIFICATION
  ↓ (verify email)
ACTIVE (no payment needed)
  ↓ (deactivated by END_USER_ADMIN)
SUSPENDED
```

### Organization Journey

```
Created → PENDING_PAYMENT
  ↓ (CLIENT_ADMIN completes payment)
ACTIVE
  ↓ (subscription expires / payment fails)
SUSPENDED
  ↓ (manually reactivated)
ACTIVE
```

---

## Debugging Tips

### Check User Role

```javascript
const user = await User.findOne({ email }).select('+password');
console.log('Role:', user.role);
console.log('Status:', user.status);
console.log('OrgId:', user.organizationId);
console.log('Email Verified:', user.emailVerified);
```

### Verify Organization Limits

```javascript
const org = await Organization.findById(organizationId);
console.log(`Projects: ${org.currentProjects}/${org.maxProjects}`);
console.log(`Users: ${org.currentUsers}/${org.maxUsers}`);
console.log(`Status: ${org.status}`);
```

### Test Auth Middleware

```bash
# Platform
curl -X GET http://localhost:5000/api/users \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Website
curl -X GET http://localhost:5000/api/crud/ORG_ID/hotels?websiteSlug=hotelhub \
  -H "Cookie: hotelhub_auth_token=YOUR_JWT_TOKEN"
```

### Common Errors

| Error Code | Message | Cause | Solution |
|------------|---------|-------|----------|
| **401** | Unauthorized | Token missing or invalid | Check cookie exists and JWT is valid |
| **403** | Forbidden | Valid token but insufficient permissions | Check role and organization match |
| **404** | Not Found | organizationId or websiteSlug doesn't exist | Verify IDs in database |
| **409** | Conflict | Duplicate email or slug | Use unique values |
| **403** | Project limit reached | currentProjects >= maxProjects | Upgrade plan or delete old projects |

---

## Environment Setup

**File**: [.env](.env)

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/dynamicwebsites
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dynamicwebsites

# JWT
JWT_SECRET=your-super-secret-key-minimum-32-characters-long

# CORS
FRONTEND_URL=http://localhost:3000

# Email (optional - for verification/reset emails)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Stripe (optional - for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI (optional - for AI features)
GEMINI_API_KEY=your-gemini-api-key
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:14b-instruct-q5_K_M

# Super Admin (seeded on first run)
SUPER_ADMIN_EMAIL=admin@platform.com
SUPER_ADMIN_PASSWORD=SecurePassword123

# End User Admin (optional seed)
END_USER_ADMIN_EMAIL=enduseradmin@gmail.com
END_USER_ADMIN_PASSWORD=Test@1234
END_USER_ADMIN_ORG_ID=<ObjectId>
```

---

## Development Guidelines

### When Adding Features

1. **Determine Tier**: Platform or Website?
   - Platform: Uses `authMiddleware`, `auth_token` cookie
   - Website: Uses `websiteTierAuth`, `{slug}_auth_token` cookie

2. **Choose Auth Middleware**:
   - `authMiddleware` for platform routes
   - `endUserAdminAuth` or `optionalEndUserAuth` for website routes

3. **Scope Queries**: Always filter by `organizationId` (unless SUPER_ADMIN)

4. **Validate Input**: Check role, status, organization limits

5. **Test Across Roles**: Try as SUPER_ADMIN, CLIENT_ADMIN, DEVELOPER, END_USER_ADMIN, END_USER

### Role-Based Logic Template

```javascript
router.get('/resource', authMiddleware, async (req, res) => {
  const { role, organizationId, userId } = req.user;

  let query = {};

  if (role === 'SUPER_ADMIN') {
    // No filter - see all organizations
  } else if (role === 'CLIENT_ADMIN') {
    // Filter by organization
    query.organizationId = organizationId;
  } else if (role === 'DEVELOPER') {
    // Filter by organization + assigned projects
    query.organizationId = organizationId;
    query.createdBy = userId;  // If applicable
  } else {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const results = await Model.find(query);
  res.json(results);
});
```

---

## Template System

**Location**: [demo.js](demo.js) (18,873 lines)

**Structure:**
```javascript
module.exports = {
  shopzone: {
    title: "ShopZone - E-commerce",
    slug: "shopzone",
    isTemplate: true,
    templateCategory: "E-commerce",
    pages: { ... },
    resolvedAPIs: { ... }
  },
  hotelhub: {
    title: "HotelHub - Hotel Management",
    slug: "hotelhub",
    isTemplate: true,
    templateCategory: "Hospitality",
    pages: { ... }
  },
  // 10+ more templates
};
```

**Templates are:**
- Read-only (cannot edit/delete)
- Created by SUPER_ADMIN
- `organizationId: null`
- `isTemplate: true`

**Clients can:**
- Clone templates via `POST /api/pages/clone/:slug`
- Customize cloned versions (clones have `isTemplate: false`)

---

## Related Documentation

- **Frontend Architecture**: See frontend `claude.md` for routing, components, DataStore, widgets
- **Complete Data Flow**: [guide/COMPLETE-DATA-FLOW-GUIDE.md](guide/COMPLETE-DATA-FLOW-GUIDE.md)
- **Dynamic Entity Guide**: [guide/DYNAMIC_ENTITY_COMPLETE_GUIDE.md](guide/DYNAMIC_ENTITY_COMPLETE_GUIDE.md)
- **Smart Widget Guide**: [guide/SMARTWIDGET_COMPLETE_GUIDE.md](guide/SMARTWIDGET_COMPLETE_GUIDE.md)

---

**Last Updated**: 2026-02-07
**Maintained By**: Development Team
**Critical Files**: User.js, Organization.js, PageConfig.js, DynamicEntity.js, authController.js, endUserAuthController.js, authMiddleware.js, websiteTierAuth.js
