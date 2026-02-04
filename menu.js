// universal-menu-seed.js - WORKS FOR ANY ORGANIZATION
const mongoose = require("mongoose");
const DynamicEntity = require("./models/DynamicEntity");
const APIConfig = require("./models/APIConfig");
const PageConfig = require("./models/PageConfig");

// ✅ CONFIGURABLE: Change these based on which website you're setting up
const WEBSITE_SLUG = "chiyaz"; // Change to your website slug
const PROJECT_UUID = "chiyaz-tea-coffee"; // Change to your project UUID

// ===================================
// GET ORGANIZATION ID FROM WEBSITE SLUG
// ===================================
async function getOrgFromWebsite(slug) {
  console.log(`🔍 Looking up organization for website: ${slug}`);
  
  const page = await PageConfig.findOne({ slug }).select('organizationId title');
  
  if (!page) {
    throw new Error(`❌ Website "${slug}" not found in PageConfig`);
  }
  
  if (!page.organizationId) {
    throw new Error(`❌ Website "${slug}" has no organizationId`);
  }
  
  console.log(`✅ Found: ${page.title} → Org: ${page.organizationId}`);
  return page.organizationId.toString();
}

// ===================================
// STEP 1: CREATE MENU ENTITY
// ===================================
const createMenuEntity = async (orgId, userId) => {
  console.log("\n🍵 === STEP 1: CREATING MENU ENTITY ===");
  console.log(`   Organization: ${orgId}`);
  console.log(`   Project: ${PROJECT_UUID}`);

  const menuEntitySlug = `${orgId}-menu`;

  const existingEntity = await DynamicEntity.findOne({ slug: menuEntitySlug });
  if (existingEntity) {
    console.log("⚠️  Menu entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: menuEntitySlug });
  }

  const menuEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(orgId),
    projectUUID: PROJECT_UUID,
    entityName: "menu",
    isGlobal: false,
    slug: menuEntitySlug,
    schema: {
      productName: { 
        type: "string", 
        required: true, 
        validation: { minLength: 2, maxLength: 100 } 
      },
      category: { 
        type: "enum", 
        required: true, 
        validation: { 
          enum: ["Tea", "Coffee", "Specialty", "Blend"] 
        } 
      },
      type: { 
        type: "string", 
        required: true,
        validation: { minLength: 2, maxLength: 50 }
      },
      price: { 
        type: "number", 
        required: true, 
        validation: { min: 0 } 
      },
      origin: { 
        type: "string", 
        required: true 
      },
      description: { 
        type: "string", 
        required: false,
        validation: { maxLength: 1000 }
      },
      imageUrl: { 
        type: "string", 
        required: false 
      },
      inStock: { 
        type: "boolean", 
        required: false 
      },
      featured: { 
        type: "boolean", 
        required: false 
      },
      brewingTemp: { 
        type: "string", 
        required: false 
      },
      brewingTime: { 
        type: "string", 
        required: false 
      },
      roastLevel: { 
        type: "string", 
        required: false 
      },
      caffeineLevel: { 
        type: "string", 
        required: false 
      },
      tastingNotes: { 
        type: "array",
        items: { type: "string" },
        required: false 
      },
      weight: { 
        type: "string", 
        required: false 
      }
    },
    operations: ["create", "read", "update", "delete", "list"],
    createdBy: new mongoose.Types.ObjectId(userId),
  });

  console.log("✅ Menu entity created:", menuEntity.entityName);
  console.log("   Slug:", menuEntity.slug);
  return { entity: menuEntity, slug: menuEntitySlug };
};

// ===================================
// STEP 2: SEED MENU DATA
// ===================================
const seedMenuData = async (menuSlug, orgId, userId) => {
  console.log("\n🍵☕ === STEP 2: SEEDING MENU DATA ===");

  const dummyMenuItems = [
    // TEA ITEMS
    {
      productName: "Premium Darjeeling First Flush",
      category: "Tea",
      type: "Black Tea",
      price: 24.99,
      origin: "Darjeeling, India",
      description: "Delicate and floral with a light golden color.",
      imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2070",
      inStock: true,
      featured: true,
      brewingTemp: "85-90°C",
      brewingTime: "3-4 minutes",
      tastingNotes: ["Muscatel", "Floral", "Light"],
      weight: "100g"
    },
    {
      productName: "Japanese Matcha Ceremonial Grade",
      category: "Tea",
      type: "Green Tea",
      price: 34.99,
      origin: "Uji, Japan",
      description: "Vibrant green powder with umami richness.",
      imageUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2071",
      inStock: true,
      featured: true,
      brewingTemp: "70-80°C",
      brewingTime: "Whisk until frothy",
      tastingNotes: ["Umami", "Sweet", "Grassy"],
      weight: "50g"
    },
    {
      productName: "Dragon Well (Longjing)",
      category: "Tea",
      type: "Green Tea",
      price: 29.99,
      origin: "Hangzhou, China",
      description: "One of China's most famous green teas.",
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2070",
      inStock: true,
      featured: true,
      brewingTemp: "75-80°C",
      brewingTime: "2-3 minutes",
      tastingNotes: ["Chestnut", "Sweet", "Mellow"],
      weight: "100g"
    },
    {
      productName: "Silver Needle White Tea",
      category: "Tea",
      type: "White Tea",
      price: 39.99,
      origin: "Fujian, China",
      description: "The finest white tea made only from unopened buds.",
      imageUrl: "https://images.unsplash.com/photo-1597318112605-6f03c196f0ca?q=80&w=2070",
      inStock: true,
      featured: false,
      brewingTemp: "70-75°C",
      brewingTime: "4-5 minutes",
      tastingNotes: ["Honey", "Melon", "Delicate"],
      weight: "50g"
    },
    {
      productName: "Assam Bold Breakfast",
      category: "Tea",
      type: "Black Tea",
      price: 18.99,
      origin: "Assam, India",
      description: "Robust, malty, and full-bodied.",
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fcf?q=80&w=2070",
      inStock: true,
      featured: false,
      brewingTemp: "95-100°C",
      brewingTime: "4-5 minutes",
      tastingNotes: ["Malty", "Bold", "Full-bodied"],
      weight: "200g"
    },
    // COFFEE ITEMS
    {
      productName: "Ethiopian Yirgacheffe",
      category: "Coffee",
      type: "Arabica Coffee",
      price: 22.99,
      origin: "Yirgacheffe, Ethiopia",
      description: "Bright, floral, and fruity.",
      imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061",
      inStock: true,
      featured: true,
      roastLevel: "Light",
      caffeineLevel: "Medium",
      tastingNotes: ["Blueberry", "Jasmine", "Lemon"],
      weight: "250g"
    },
    {
      productName: "Colombian Supremo",
      category: "Coffee",
      type: "Arabica Coffee",
      price: 19.99,
      origin: "Huila, Colombia",
      description: "Smooth and well-balanced.",
      imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2074",
      inStock: true,
      featured: true,
      roastLevel: "Medium",
      caffeineLevel: "Medium",
      tastingNotes: ["Caramel", "Hazelnut", "Cocoa"],
      weight: "250g"
    },
    {
      productName: "Brazilian Santos",
      category: "Coffee",
      type: "Arabica Coffee",
      price: 17.99,
      origin: "Minas Gerais, Brazil",
      description: "Rich, smooth, and chocolatey.",
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070",
      inStock: true,
      featured: true,
      roastLevel: "Medium-Dark",
      caffeineLevel: "Medium",
      tastingNotes: ["Dark Chocolate", "Almond", "Caramel"],
      weight: "500g"
    },
    {
      productName: "Guatemalan Antigua",
      category: "Coffee",
      type: "Arabica Coffee",
      price: 21.99,
      origin: "Antigua, Guatemala",
      description: "Complex and spicy.",
      imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071",
      inStock: true,
      featured: false,
      roastLevel: "Medium-Dark",
      caffeineLevel: "High",
      tastingNotes: ["Cocoa", "Spice", "Smoke"],
      weight: "250g"
    },
    {
      productName: "Sumatra Mandheling",
      category: "Coffee",
      type: "Arabica Coffee",
      price: 20.99,
      origin: "Sumatra, Indonesia",
      description: "Earthy and full-bodied.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2067",
      inStock: true,
      featured: false,
      roastLevel: "Dark",
      caffeineLevel: "High",
      tastingNotes: ["Earth", "Cedar", "Dark Chocolate"],
      weight: "250g"
    },
  ];

  const collectionName = `dyn_${menuSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  console.log(`→ Using collection: ${collectionName}`);

  const MenuModel = mongoose.connection.collection(collectionName);
  await MenuModel.deleteMany({});
  console.log(`🗑️  Cleared existing menu items`);

  const menuItemsWithMetadata = dummyMenuItems.map(item => ({
    ...item,
    organizationId: new mongoose.Types.ObjectId(orgId),
    projectUUID: PROJECT_UUID,
    createdBy: new mongoose.Types.ObjectId(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const result = await MenuModel.insertMany(menuItemsWithMetadata);
  console.log(`✅ Inserted ${result.length} menu items`);
  
  const teaCount = menuItemsWithMetadata.filter(i => i.category === "Tea").length;
  const coffeeCount = menuItemsWithMetadata.filter(i => i.category === "Coffee").length;
  
  console.log(`   📊 Tea items: ${teaCount}`);
  console.log(`   📊 Coffee items: ${coffeeCount}`);
};

// ===================================
// STEP 3: CONFIGURE APIS
// ===================================
const configureAPIs = async (orgId, userId) => {
  console.log("\n🔧 === STEP 3: CONFIGURING API RESOURCES ===");

  const menuAPIConfigs = [
    {
      key: `${WEBSITE_SLUG}.menu.schema`,
      name: "Get Menu Schema",
      description: "Fetches the schema definition for the menu entity",
      url: `/api/crud/${orgId}/menu/schema`,
      method: "GET",
      headers: {},
      successNotification: { type: "none" },
      errorNotification: { 
        type: "toast", 
        message: "Failed to load menu schema", 
        background: "#8B4513" 
      },
      storeResponse: true,
      storeKey: "schema.menu",
      onSuccess: [],
      onError: ["console:Failed to fetch menu schema"],
      tags: [WEBSITE_SLUG, "menu", "schema"],
      projectUUID: PROJECT_UUID,
      organizationId: new mongoose.Types.ObjectId(orgId),
      isActive: true,
    },
    {
      key: `${WEBSITE_SLUG}.menu.api`,
      name: "Get All Menu Items",
      description: "Fetches all menu items",
      url: `/api/crud/${orgId}/menu`,
      method: "GET",
      headers: {},
      successNotification: { type: "none" },
      errorNotification: { 
        type: "toast", 
        message: "Failed to load menu", 
        background: "#8B4513" 
      },
      storeResponse: true,
      storeKey: `${WEBSITE_SLUG}.menu.api`,
      onSuccess: [],
      onError: ["console:Failed to fetch menu"],
      tags: [WEBSITE_SLUG, "menu"],
      projectUUID: PROJECT_UUID,
      organizationId: new mongoose.Types.ObjectId(orgId),
      isActive: true,
    },
    {
      key: `${WEBSITE_SLUG}.menu.list`,
      name: "List Menu Items with Filters",
      description: "Fetches menu items with pagination and filters",
      url: `/api/crud/${orgId}/menu`,
      method: "GET",
      headers: {},
      successNotification: { type: "none" },
      errorNotification: {
        type: "toast",
        message: "Failed to load menu items",
        background: "#8B4513"
      },
      storeResponse: true,
      storeKey: `${WEBSITE_SLUG}.menu.api`,
      onSuccess: [],
      onError: ["console:Failed to list menu items"],
      tags: [WEBSITE_SLUG, "menu", "list"],
      projectUUID: PROJECT_UUID,
      organizationId: new mongoose.Types.ObjectId(orgId),
      isActive: true,
    },
    {
      key: `${WEBSITE_SLUG}.menu.create`,
      name: "Create Menu Item",
      description: "Creates a new menu item",
      url: `/api/crud/${orgId}/menu`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => ({
          productName: payload.productName,
          category: payload.category,
          type: payload.type,
          price: parseFloat(payload.price),
          origin: payload.origin,
          description: payload.description || "",
          imageUrl: payload.imageUrl || "",
          inStock: payload.inStock === 'true' || payload.inStock === true,
          featured: payload.featured === 'true' || payload.featured === true,
          brewingTemp: payload.brewingTemp || "",
          brewingTime: payload.brewingTime || "",
          roastLevel: payload.roastLevel || "",
          caffeineLevel: payload.caffeineLevel || "",
          tastingNotes: Array.isArray(payload.tastingNotes) 
            ? payload.tastingNotes 
            : (payload.tastingNotes || "").split(",").map(n => n.trim()).filter(Boolean),
          weight: payload.weight || ""
        })
      `,
      successNotification: {
        type: "toast",
        message: "✅ Menu item created!",
        background: "#2E7D32"
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to create item",
        background: "#8B4513"
      },
      closeModalOnSuccess: true,
      storeResponse: true,
      storeKey: `${WEBSITE_SLUG}.menu.created`,
      onSuccess: ["closeModal", { action: "reloadMenuData", actionParams: {} }],
      onError: ["console:Failed to create menu item"],
      tags: [WEBSITE_SLUG, "menu", "create"],
      projectUUID: PROJECT_UUID,
      organizationId: new mongoose.Types.ObjectId(orgId),
      isActive: true,
    },
    {
      key: `${WEBSITE_SLUG}.menu.update`,
      name: "Update Menu Item",
      description: "Updates an existing menu item",
      url: `/api/crud/${orgId}/menu`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => {
          const itemId = payload._id || payload.id;
          if (!itemId) throw new Error("Menu item ID is required");
          return \`/api/crud/${orgId}/menu/\${itemId}\`;
        }
      `,
      successNotification: {
        type: "toast",
        message: "✅ Menu item updated!",
        background: "#2E7D32"
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to update item",
        background: "#8B4513"
      },
      storeResponse: true,
      storeKey: `${WEBSITE_SLUG}.menu.updated`,
      onSuccess: ["closeModal", { action: "reloadMenuData", actionParams: {} }],
      onError: ["console:Failed to update menu item"],
      tags: [WEBSITE_SLUG, "menu", "update"],
      projectUUID: PROJECT_UUID,
      organizationId: new mongoose.Types.ObjectId(orgId),
      isActive: true,
    },
    {
      key: `${WEBSITE_SLUG}.menu.delete`,
      name: "Delete Menu Item",
      description: "Deletes a menu item",
      url: `/api/crud/${orgId}/menu`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => {
          const itemId = payload._id || payload.id;
          if (!itemId) throw new Error("Menu item ID is required");
          return \`/api/crud/${orgId}/menu/\${itemId}\`;
        }
      `,
      successNotification: {
        type: "toast",
        message: "✅ Menu item deleted!",
        background: "#2E7D32"
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to delete item",
        background: "#8B4513"
      },
      storeResponse: false,
      onSuccess: [{ action: "reloadMenuData", actionParams: {} }],
      onError: ["console:Failed to delete menu item"],
      tags: [WEBSITE_SLUG, "menu", "delete"],
      projectUUID: PROJECT_UUID,
      organizationId: new mongoose.Types.ObjectId(orgId),
      isActive: true,
    },
  ];

  for (const config of menuAPIConfigs) {
    await APIConfig.findOneAndUpdate(
      { key: config.key },
      { ...config, isActive: true },
      { upsert: true, new: true }
    );
    console.log(`✅ Configured ${config.key}`);
  }
};

// ===================================
// MAIN EXECUTION
// ===================================
const main = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(
      "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/"
    );
    console.log("✅ Connected!");

    // Get org ID dynamically from website slug
    const orgId = await getOrgFromWebsite(WEBSITE_SLUG);
    const userId = "000000000000000000000000"; // System user for seeding

    const menuResult = await createMenuEntity(orgId, userId);
    await seedMenuData(menuResult.slug, orgId, userId);
    await configureAPIs(orgId, userId);

    console.log("\n" + "=".repeat(60));
    console.log("🎉 MENU SETUP COMPLETED!");
    console.log("=".repeat(60));
    console.log(`✅ Website: ${WEBSITE_SLUG}`);
    console.log(`✅ Organization: ${orgId}`);
    console.log(`✅ Menu entity created`);
    console.log(`✅ 10 items seeded`);
    console.log(`✅ 6 APIs configured`);
    console.log("\n📝 Remember to:");
    console.log("1. Replace dynamicCrudRoutes.js with DYNAMIC version");
    console.log("2. Restart backend server");
    console.log("3. Clear browser cache");
    console.log("4. Test at: http://localhost:3000/" + WEBSITE_SLUG);
    console.log("=".repeat(60));

  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

main();