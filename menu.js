const mongoose = require("mongoose");
const DynamicEntity = require("./models/DynamicEntity");
const APIConfig = require("./models/APIConfig");

const CHIYAZ_ORG_ID = "696fd6f8a216cc192d63b84a";
const DEMO_USER_ID = "000000000000000000000000";

// ===================================
// STEP 1: CREATE TEA ENTITY
// ===================================
const createTeaEntity = async () => {
  console.log("\n🍵 === STEP 1: CREATING CHIYAZ TEA ENTITY ===");

  const teaEntitySlug = `${CHIYAZ_ORG_ID}-chiyaz-tea-coffee-tea`;

  const existingEntity = await DynamicEntity.findOne({ slug: teaEntitySlug });
  if (existingEntity) {
    console.log("⚠️ Tea entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: teaEntitySlug });
  }

  const teaEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    entityName: "tea",
    isPublic: true,
    slug: teaEntitySlug,
    schema: {
      name: { type: "string", required: true, validation: { minLength: 2, maxLength: 100 } },
      description: { type: "string", required: true, validation: { minLength: 10, maxLength: 500 } },
      origin: { type: "string", required: true },
      price: { type: "number", required: true, validation: { min: 0 } },
      image: { type: "string", required: true },
      type: { type: "enum", required: true, validation: { enum: ["Black", "Green", "White", "Oolong", "Herbal", "Matcha"] } },
      brewTime: { type: "string", required: false },
      temperature: { type: "string", required: false },
      featured: { type: "boolean", required: false },
      inStock: { type: "boolean", required: false },
    },
    operations: ["create", "read", "update", "delete", "list"],
    isTemplate: false,
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
  });

  console.log("✅ Tea entity created:", teaEntity.entityName);
  return { entity: teaEntity, slug: teaEntitySlug };
};

// ===================================
// STEP 2: CREATE COFFEE ENTITY
// ===================================
const createCoffeeEntity = async () => {
  console.log("\n☕ === STEP 2: CREATING CHIYAZ COFFEE ENTITY ===");

  const coffeeEntitySlug = `${CHIYAZ_ORG_ID}-chiyaz-tea-coffee-coffee`;

  const existingEntity = await DynamicEntity.findOne({ slug: coffeeEntitySlug });
  if (existingEntity) {
    console.log("⚠️ Coffee entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: coffeeEntitySlug });
  }

  const coffeeEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    entityName: "coffee",
    isPublic: true,
    slug: coffeeEntitySlug,
    schema: {
      name: { type: "string", required: true, validation: { minLength: 2, maxLength: 100 } },
      description: { type: "string", required: true, validation: { minLength: 10, maxLength: 500 } },
      origin: { type: "string", required: true },
      price: { type: "number", required: true, validation: { min: 0 } },
      image: { type: "string", required: true },
      roastLevel: { type: "enum", required: true, validation: { enum: ["Light", "Medium", "Medium-Dark", "Dark"] } },
      flavorNotes: { type: "string", required: false },
      featured: { type: "boolean", required: false },
      inStock: { type: "boolean", required: false },
    },
    operations: ["create", "read", "update", "delete", "list"],
    isTemplate: false,
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
  });

  console.log("✅ Coffee entity created:", coffeeEntity.entityName);
  return { entity: coffeeEntity, slug: coffeeEntitySlug };
};

// ===================================
// STEP 3: SEED TEA DATA – USING SLUG-BASED COLLECTION
// ===================================
const seedTeaData = async (teaSlug) => {
  console.log("\n🌿 === STEP 3: SEEDING TEA DATA ===");

  const dummyTeas = [
    { name: "Premium Darjeeling First Flush", description: "Delicate and floral with a light golden color. Harvested in spring from the finest estates in Darjeeling. Notes of muscatel grape and fresh flowers.", origin: "Darjeeling, India", price: 24.99, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2070&auto=format&fit=crop", type: "Black", brewTime: "3-4 minutes", temperature: "85-90°C", featured: true, inStock: true },
    { name: "Japanese Matcha Ceremonial Grade", description: "Vibrant green powder from Uji, Japan. Smooth, slightly sweet with umami richness. Perfect for traditional tea ceremonies or modern lattes.", origin: "Uji, Japan", price: 34.99, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2071&auto=format&fit=crop", type: "Matcha", brewTime: "Whisk until frothy", temperature: "70-80°C", featured: true, inStock: true },
    { name: "Dragon Well (Longjing) Green Tea", description: "One of China's most famous green teas. Pan-fired for a distinctive flat shape. Sweet, mellow with notes of chestnut and fresh vegetables.", origin: "Hangzhou, China", price: 29.99, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2070&auto=format&fit=crop", type: "Green", brewTime: "2-3 minutes", temperature: "75-80°C", featured: true, inStock: true },
    { name: "Silver Needle White Tea", description: "The finest white tea made only from unopened buds. Delicate, naturally sweet with subtle honey and melon notes. Minimal processing preserves antioxidants.", origin: "Fujian, China", price: 39.99, image: "https://images.unsplash.com/photo-1597318112605-6f03c196f0ca?q=80&w=2070&auto=format&fit=crop", type: "White", brewTime: "4-5 minutes", temperature: "70-75°C", featured: false, inStock: true },
    { name: "Assam Bold Breakfast Black Tea", description: "Robust, malty, and full-bodied. Perfect morning tea that stands up beautifully to milk. Deep amber color with rich, satisfying flavor.", origin: "Assam, India", price: 18.99, image: "https://images.unsplash.com/photo-1576092768241-dec231879fcf?q=80&w=2070&auto=format&fit=crop", type: "Black", brewTime: "4-5 minutes", temperature: "95-100°C", featured: false, inStock: true },
  ];

  const collectionName = `dyn_${teaSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  console.log(`→ Using correct collection: ${collectionName}`);

  const TeaModel = mongoose.connection.collection(collectionName);

  await TeaModel.deleteMany({});
  console.log(`🗑️ Cleared existing teas`);

  const teasWithMetadata = dummyTeas.map(tea => ({
    ...tea,
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  try {
    const result = await TeaModel.insertMany(teasWithMetadata);
    console.log(`✅ Inserted ${result.length} teas`);
    const count = await TeaModel.countDocuments();
    console.log(`   Verified count: ${count}`);
    if (result.length > 0) {
      console.log(`   First record name: ${result[0].name}`);
    }
  } catch (err) {
    console.error("❌ Tea insert failed:", err.message);
  }
};

// ===================================
// STEP 4: SEED COFFEE DATA – USING SLUG-BASED COLLECTION
// ===================================
const seedCoffeeData = async (coffeeSlug) => {
  console.log("\n☕ === STEP 4: SEEDING COFFEE DATA ===");

  const dummyCoffees = [
    { name: "Ethiopian Yirgacheffe", description: "Bright, floral, and fruity. Notes of blueberry, jasmine, and citrus.", origin: "Yirgacheffe, Ethiopia", price: 22.99, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061&auto=format&fit=crop", roastLevel: "Light", flavorNotes: "Blueberry, Jasmine, Lemon", featured: true, inStock: true },
    { name: "Colombian Supremo", description: "Smooth and well-balanced. Medium body with sweet caramel and nutty notes.", origin: "Huila, Colombia", price: 19.99, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2074&auto=format&fit=crop", roastLevel: "Medium", flavorNotes: "Caramel, Hazelnut, Cocoa", featured: true, inStock: true },
    { name: "Brazilian Santos", description: "Rich, smooth, and chocolatey. Low acidity with full body.", origin: "Minas Gerais, Brazil", price: 17.99, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop", roastLevel: "Medium-Dark", flavorNotes: "Dark Chocolate, Almond, Caramel", featured: true, inStock: true },
    { name: "Guatemalan Antigua", description: "Complex and spicy. Full-bodied with chocolate, spice, and smoky undertones.", origin: "Antigua, Guatemala", price: 21.99, image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop", roastLevel: "Medium-Dark", flavorNotes: "Cocoa, Spice, Smoke", featured: false, inStock: true },
    { name: "Sumatra Mandheling", description: "Earthy and full-bodied. Heavy body with low acidity.", origin: "Sumatra, Indonesia", price: 20.99, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2067&auto=format&fit=crop", roastLevel: "Dark", flavorNotes: "Earth, Cedar, Dark Chocolate", featured: false, inStock: true },
  ];

  const collectionName = `dyn_${coffeeSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  console.log(`→ Using correct collection: ${collectionName}`);

  const CoffeeModel = mongoose.connection.collection(collectionName);

  await CoffeeModel.deleteMany({});
  console.log(`🗑️ Cleared existing coffees`);

  const coffeesWithMetadata = dummyCoffees.map(coffee => ({
    ...coffee,
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  try {
    const result = await CoffeeModel.insertMany(coffeesWithMetadata);
    console.log(`✅ Inserted ${result.length} coffees`);
    const count = await CoffeeModel.countDocuments();
    console.log(`   Verified count: ${count}`);
    if (result.length > 0) {
      console.log(`   First record name: ${result[0].name}`);
    }
  } catch (err) {
    console.error("❌ Coffee insert failed:", err.message);
  }
};

// ===================================
// STEP 5: CONFIGURE APIS
// ===================================
const configureAPIs = async () => {
  console.log("\n🔧 === STEP 5: CONFIGURING API RESOURCES ===");

  const menuAPIConfigs = [
    {
      key: "chiyaz.tea.list",
      name: "Get Chiyaz Teas",
      description: "Fetches all tea varieties",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/tea`,
      method: "GET",
      headers: {},
      transformResponse: `
        (response) => {
          console.log('🍵 Tea API raw response:', response);
          let items = [];
          if (response && response.success && Array.isArray(response.data)) {
            items = response.data;
          } else if (Array.isArray(response)) {
            items = response;
          } else if (response?.data) {
            items = Array.isArray(response.data) ? response.data : [];
          }
          console.log('→ Extracted', items.length, 'tea items');
          return items;
        }
      `,
      successNotification: { type: "none" },
      errorNotification: { type: "toast", message: "Failed to load teas", background: "#8B4513", duration: 3000 },
      storeResponse: true,
      storeKey: "api.tea",
      onSuccess: [],
      onError: ["console:Failed to fetch teas"],
      tags: ["chiyaz", "tea", "menu"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },
    {
      key: "chiyaz.coffee.list",
      name: "Get Chiyaz Coffees",
      description: "Fetches all coffee varieties",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/coffee`,
      method: "GET",
      headers: {},
      transformResponse: `
        (response) => {
          console.log('☕ Coffee API raw response:', response);
          let items = [];
          if (response && response.success && Array.isArray(response.data)) {
            items = response.data;
          } else if (Array.isArray(response)) {
            items = response;
          } else if (response?.data) {
            items = Array.isArray(response.data) ? response.data : [];
          }
          console.log('→ Extracted', items.length, 'coffee items');
          return items;
        }
      `,
      successNotification: { type: "none" },
      errorNotification: { type: "toast", message: "Failed to load coffees", background: "#8B4513", duration: 3000 },
      storeResponse: true,
      storeKey: "api.coffee",
      onSuccess: [],
      onError: ["console:Failed to fetch coffees"],
      tags: ["chiyaz", "coffee", "menu"],
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
    console.log(`✅ Configured ${config.key} → stores at ${config.storeKey}`);
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

    const teaResult = await createTeaEntity();
    const coffeeResult = await createCoffeeEntity();

    await seedTeaData(teaResult.slug);
    await seedCoffeeData(coffeeResult.slug);

    await configureAPIs();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 CHIYAZ MENU SETUP COMPLETED!");
    console.log("=".repeat(60));
    console.log("Next steps:");
    console.log("1. Visit: http://localhost:5000/api/crud/696fd6f8a216cc192d63b84a/tea");
    console.log("   → Should now show 5 items in 'data'");
    console.log("2. Clear browser localStorage + hard refresh http://localhost:3000/chiyaz");
    console.log("3. In console: window.__dataStore.get('api.tea')");
    console.log("=".repeat(60));

  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

main();