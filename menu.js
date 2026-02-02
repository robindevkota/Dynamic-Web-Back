const mongoose = require("mongoose");
const DynamicEntity = require("./models/DynamicEntity");
const APIConfig = require("./models/APIConfig");

const CHIYAZ_ORG_ID = "696fd6f8a216cc192d63b84a";
const DEMO_USER_ID = "000000000000000000000000";

// ===================================
// STEP 1: CREATE MENU ENTITY (Single entity with category field)
// ===================================
const createMenuEntity = async () => {
  console.log("\n🍵 === STEP 1: CREATING CHIYAZ MENU ENTITY ===");

  const menuEntitySlug = `${CHIYAZ_ORG_ID}-chiyaz-tea-coffee-menu`;

  const existingEntity = await DynamicEntity.findOne({ slug: menuEntitySlug });
  if (existingEntity) {
    console.log("⚠️ Menu entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: menuEntitySlug });
  }

  const menuEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    entityName: "menu",
    isPublic: true,
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
      // Tea-specific fields
      brewingTemp: { 
        type: "string", 
        required: false 
      },
      brewingTime: { 
        type: "string", 
        required: false 
      },
      // Coffee-specific fields
      roastLevel: { 
        type: "string", 
        required: false 
      },
      caffeineLevel: { 
        type: "string", 
        required: false 
      },
      // Common fields
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
    isTemplate: false,
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
  });

  console.log("✅ Menu entity created:", menuEntity.entityName);
  return { entity: menuEntity, slug: menuEntitySlug };
};

// ===================================
// STEP 2: SEED MENU DATA (Both Tea & Coffee)
// ===================================
const seedMenuData = async (menuSlug) => {
  console.log("\n🍵☕ === STEP 2: SEEDING MENU DATA ===");

  const dummyMenuItems = [
    // === TEA ITEMS ===
    {
      productName: "Premium Darjeeling First Flush",
      category: "Tea",
      type: "Black Tea",
      price: 24.99,
      origin: "Darjeeling, India",
      description: "Delicate and floral with a light golden color. Harvested in spring from the finest estates in Darjeeling.",
      imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2070&auto=format&fit=crop",
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
      description: "Vibrant green powder from Uji, Japan. Smooth, slightly sweet with umami richness.",
      imageUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2071&auto=format&fit=crop",
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
      description: "One of China's most famous green teas. Pan-fired for a distinctive flat shape.",
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2070&auto=format&fit=crop",
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
      description: "The finest white tea made only from unopened buds. Delicate, naturally sweet.",
      imageUrl: "https://images.unsplash.com/photo-1597318112605-6f03c196f0ca?q=80&w=2070&auto=format&fit=crop",
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
      description: "Robust, malty, and full-bodied. Perfect morning tea that stands up beautifully to milk.",
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fcf?q=80&w=2070&auto=format&fit=crop",
      inStock: true,
      featured: false,
      brewingTemp: "95-100°C",
      brewingTime: "4-5 minutes",
      tastingNotes: ["Malty", "Bold", "Full-bodied"],
      weight: "200g"
    },

    // === COFFEE ITEMS ===
    {
      productName: "Ethiopian Yirgacheffe",
      category: "Coffee",
      type: "Arabica Coffee",
      price: 22.99,
      origin: "Yirgacheffe, Ethiopia",
      description: "Bright, floral, and fruity. Notes of blueberry, jasmine, and citrus.",
      imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061&auto=format&fit=crop",
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
      description: "Smooth and well-balanced. Medium body with sweet caramel and nutty notes.",
      imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2074&auto=format&fit=crop",
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
      description: "Rich, smooth, and chocolatey. Low acidity with full body.",
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
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
      description: "Complex and spicy. Full-bodied with chocolate, spice, and smoky undertones.",
      imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
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
      description: "Earthy and full-bodied. Heavy body with low acidity.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2067&auto=format&fit=crop",
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
  console.log(`🗑️ Cleared existing menu items`);

  const menuItemsWithMetadata = dummyMenuItems.map(item => ({
    ...item,
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  try {
    const result = await MenuModel.insertMany(menuItemsWithMetadata);
    console.log(`✅ Inserted ${result.length} menu items`);
    
    const teaCount = menuItemsWithMetadata.filter(i => i.category === "Tea").length;
    const coffeeCount = menuItemsWithMetadata.filter(i => i.category === "Coffee").length;
    
    console.log(`   📊 Tea items: ${teaCount}`);
    console.log(`   📊 Coffee items: ${coffeeCount}`);
    console.log(`   Verified count: ${await MenuModel.countDocuments()}`);
  } catch (err) {
    console.error("❌ Menu insert failed:", err.message);
  }
};

// ===================================
// STEP 3: CONFIGURE APIS
// ===================================
const configureAPIs = async () => {
  console.log("\n🔧 === STEP 3: CONFIGURING API RESOURCES ===");

  const menuAPIConfigs = [
    // ✅ MAIN API

   {
      key: "chiyaz.menu.schema",
      name: "Get Menu Schema",
      description: "Fetches the schema definition for the menu entity",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu/schema`,
      method: "GET",
      headers: {},
      
      successNotification: { type: "none" },
      errorNotification: { 
        type: "toast", 
        message: "Failed to load menu schema", 
        background: "#8B4513" 
      },
      
      storeResponse: true,
      storeKey: "schema.menu", // ✅ This will store at api.schema.menu
      
      onSuccess: [],
      onError: ["console:Failed to fetch menu schema"],
      
      tags: ["chiyaz", "menu", "schema"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },
    {
      key: "chiyaz.menu.api",
      name: "Get All Menu Items",
      description: "Fetches all menu items",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu`,
      method: "GET",
      headers: {},
      transformResponse: `
        (response) => {
          console.log('🍵 Menu API raw response:', response);
          let items = [];
          if (response && response.success && Array.isArray(response.data)) {
            items = response.data;
          } else if (Array.isArray(response)) {
            items = response;
          }
          console.log('→ Menu items loaded:', items.length);
          return items;
        }
      `,
      successNotification: { type: "none" },
      errorNotification: { 
        type: "toast", 
        message: "Failed to load menu", 
        background: "#8B4513", 
        duration: 3000 
      },
      storeResponse: true,
      storeKey: "chiyaz.menu.api",
      onSuccess: [],
      onError: ["console:Failed to fetch menu"],
      tags: ["chiyaz", "menu"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },

    // ... LIST API (unchanged)

    // ✅ CREATE API (fixed onSuccess)
    {
      key: "chiyaz.menu.create",
      name: "Create Menu Item",
      description: "Creates a new menu item",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu`,
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
        background: "#2E7D32",
        duration: 3000
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to create item",
        background: "#8B4513",
        duration: 3000
      },
      closeModalOnSuccess: true,
      storeResponse: true,
      storeKey: "chiyaz.menu.created",
     onSuccess: [
    "closeModal",
    { 
      action: "reloadMenuData",  // ✅ Use the new reload action
      actionParams: {} 
    }
  ],
      onError: ["console:Failed to create menu item"],
      tags: ["chiyaz", "menu", "create"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },

    // ✅ UPDATE API (fixed onSuccess)
    {
      key: "chiyaz.menu.update",
      name: "Update Menu Item",
      description: "Updates an existing menu item",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => {
          const itemId = payload._id || payload.id;
          if (!itemId) {
            throw new Error("Menu item ID is required");
          }
          console.log("🔄 Updating menu item:", itemId);
          return \`http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu/\${itemId}\`;
        }
      `,
      successNotification: {
        type: "toast",
        message: "✅ Menu item updated!",
        background: "#2E7D32",
        duration: 3000
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to update item",
        background: "#8B4513",
        duration: 3000
      },
      storeResponse: true,
      storeKey: "chiyaz.menu.updated",
      onSuccess: [
    "closeModal",
    { 
      action: "reloadMenuData",  // ✅ Use the new reload action
      actionParams: {} 
    }
  ],
      onError: ["console:Failed to update menu item"],
      tags: ["chiyaz", "menu", "update"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },

    // ✅ DELETE API (fixed onSuccess)
    {
      key: "chiyaz.menu.delete",
      name: "Delete Menu Item",
      description: "Deletes a menu item",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => {
          const itemId = payload._id || payload.id;
          if (!itemId) {
            throw new Error("Menu item ID is required");
          }
          console.log("🗑️ Deleting menu item:", itemId);
          return \`http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu/\${itemId}\`;
        }
      `,
      successNotification: {
        type: "toast",
        message: "✅ Menu item deleted!",
        background: "#2E7D32",
        duration: 3000
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to delete item",
        background: "#8B4513",
        duration: 3000
      },
      storeResponse: false,
      onSuccess: [
    { 
      action: "reloadMenuData",  // ✅ Use the new reload action
      actionParams: {} 
    }
  ],
      onError: ["console:Failed to delete menu item"],
      tags: ["chiyaz", "menu", "delete"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
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
      "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("✅ Connected!");

    const menuResult = await createMenuEntity();
    await seedMenuData(menuResult.slug);
    await configureAPIs();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 CHIYAZ MENU SETUP COMPLETED!");
    console.log("=".repeat(60));
    console.log("Next steps:");
    console.log(`1. Visit: http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu`);
    console.log("   → Should show all menu items");
    console.log(`2. Visit: http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/menu?category=Tea`);
    console.log("   → Should show only tea items");
    console.log("3. Clear browser cache + visit http://localhost:3000/chiyaz");
    console.log("=".repeat(60));

  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

main();