const mongoose = require("mongoose");
const DynamicEntity = require("./models/DynamicEntity");
const APIConfig = require("./models/APIConfig");

const CHIYAZ_ORG_ID = "696fd6f8a216cc192d63b84a";
const DEMO_USER_ID = "000000000000000000000000";

// ===================================
// STEP 1: CREATE REVIEWS ENTITY
// ===================================
const createReviewsEntity = async () => {
  console.log("\n⭐ === STEP 1: CREATING CHIYAZ REVIEWS ENTITY ===");

  const reviewEntitySlug = `${CHIYAZ_ORG_ID}-chiyaz-tea-coffee-review`;

  // Check if entity already exists
  const existingEntity = await DynamicEntity.findOne({ slug: reviewEntitySlug });

  if (existingEntity) {
    console.log("⚠️  Reviews entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: reviewEntitySlug });
  }

  const reviewEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    entityName: "review",
    isPublic: true,  // ✅ CRITICAL: Must be true for public access
    slug: reviewEntitySlug,
    schema: {
      reviewerName: {
        type: "string",
        required: true,
        validation: { minLength: 2, maxLength: 100 },
      },
      reviewerAvatar: {
        type: "string",
        required: false,
      },
      rating: {
        type: "number",
        required: true,
        validation: { min: 1, max: 5 },
      },
      title: {
        type: "string",
        required: false,
        validation: { maxLength: 200 },
      },
      comment: {
        type: "string",
        required: true,
        validation: { minLength: 10, maxLength: 1000 },
      },
      productName: {
        type: "string",
        required: false,
      },
      verifiedPurchase: {
        type: "boolean",
        required: false,
      },
      helpfulCount: {
        type: "number",
        required: false,
        validation: { min: 0 },
      },
      date: {
        type: "date",
        required: true,
      },
    },
    operations: ["create", "read", "update", "delete", "list"],
    isTemplate: false,
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
  });

  console.log("✅ Reviews entity created:", reviewEntity.entityName);
  console.log("🔑 Slug:", reviewEntity.slug);
  console.log("🔗 API Endpoint:", `/api/crud/${CHIYAZ_ORG_ID}/review`);
  console.log("🌐 isPublic:", reviewEntity.isPublic);

  return { entity: reviewEntity, slug: reviewEntitySlug };
};

// ===================================
// STEP 2: SEED REVIEW DATA
// ===================================
const seedReviewData = async (reviewSlug) => {
  console.log("\n💬 === STEP 2: SEEDING REVIEW DATA ===");
  console.log("🔑 Using slug:", reviewSlug);

  const dummyReviews = [
    {
      reviewerName: "Sarah Mitchell",
      reviewerAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      title: "Absolutely Divine Darjeeling!",
      comment: "The Premium Darjeeling tea from Chiyaz is simply exceptional. The delicate floral notes and smooth finish make every cup a luxurious experience. I've been a tea enthusiast for 20 years, and this is hands down one of the finest I've tasted.",
      productName: "Premium Darjeeling Tea",
      verifiedPurchase: true,
      helpfulCount: 24,
      date: new Date("2024-01-15"),
    },
    {
      reviewerName: "James Rodriguez",
      reviewerAvatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      title: "Coffee Perfection in Every Sip",
      comment: "As a coffee connoisseur, I'm extremely picky about my beans. The Ethiopian Yirgacheffe from Chiyaz exceeded all expectations. Bright, fruity notes with a clean finish. The roasting is perfect, and you can tell these are premium beans. Will definitely be ordering again!",
      productName: "Ethiopian Yirgacheffe Coffee",
      verifiedPurchase: true,
      helpfulCount: 18,
      date: new Date("2024-01-10"),
    },
    {
      reviewerName: "Emily Chen",
      reviewerAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      title: "Beautiful Matcha, Authentic Taste",
      comment: "The Japanese Matcha powder is vibrant green and has that authentic, slightly sweet taste I remember from my trip to Kyoto. Great for both traditional tea ceremonies and modern lattes. Only giving 4 stars because the price is a bit high, but the quality justifies it.",
      productName: "Japanese Matcha Powder",
      verifiedPurchase: true,
      helpfulCount: 15,
      date: new Date("2024-01-20"),
    },
    {
      reviewerName: "Michael Thompson",
      reviewerAvatar: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      title: "Subscription Box is Amazing!",
      comment: "I subscribed to the monthly tea & coffee discovery box and it's been incredible! Every month brings new flavors from around the world. The curation is thoughtful, and the information cards about each origin are educational. This makes a perfect gift too!",
      productName: "Monthly Subscription Box",
      verifiedPurchase: true,
      helpfulCount: 32,
      date: new Date("2024-01-05"),
    },
    {
      reviewerName: "Priya Sharma",
      reviewerAvatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      title: "Assam Tea - Bold and Beautiful",
      comment: "The Assam black tea is robust and malty, perfect for my morning chai. It has a deep color and strong flavor that holds up beautifully with milk and spices. This is now my go-to tea for breakfast. Highly recommend for anyone who loves a strong cup!",
      productName: "Assam Black Tea",
      verifiedPurchase: true,
      helpfulCount: 21,
      date: new Date("2024-01-12"),
    },
    {
      reviewerName: "David Kim",
      reviewerAvatar: "https://i.pravatar.cc/150?img=14",
      rating: 4,
      title: "Colombian Coffee - Smooth & Rich",
      comment: "The Colombian Supreme beans are fantastic. Smooth, well-balanced with hints of caramel and nuts. Makes an excellent espresso. I've been buying from Chiyaz for 6 months now and the consistency in quality is impressive. Fast shipping too!",
      productName: "Colombian Supreme Beans",
      verifiedPurchase: true,
      helpfulCount: 19,
      date: new Date("2024-01-18"),
    },
  ];

  const collectionName = `dyn_${reviewSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  
  console.log("📦 Collection name:", collectionName);

  const ReviewModel = mongoose.connection.collection(collectionName);

  // Clear existing data
  const deleteResult = await ReviewModel.deleteMany({});
  console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing reviews`);

  // Insert dummy reviews
  const reviewsWithMetadata = dummyReviews.map((review) => ({
    ...review,
    organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
    projectUUID: "chiyaz-tea-coffee",
    projectId: null,
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  try {
    const result = await ReviewModel.insertMany(reviewsWithMetadata);
    console.log(`✅ Inserted ${result.length} reviews`);
    
    const count = await ReviewModel.countDocuments();
    console.log(`📊 Verified count in DB: ${count} documents`);
    
  } catch (err) {
    console.error("❌ Insert failed:", err.message);
    throw err;
  }
};

// ===================================
// STEP 3: CONFIGURE APIS (UPDATED & FIXED)
// ===================================
const configureAPIs = async () => {
  console.log("\n🔧 === STEP 3: CONFIGURING API RESOURCES ===");

  const CRUD_PATH = `/api/crud/${CHIYAZ_ORG_ID}/review`;

  const reviewAPIConfigs = [
    // ✅ LIST REVIEWS (Public read)
    {
      key: "chiyaz.reviews.list",
      name: "Get Chiyaz Reviews",
      description: "Fetches all customer reviews (public)",
      type: "crud",
      url: CRUD_PATH,
      method: "GET",
      authRequired: false, // Public
      storeResponse: true,
      storeKey: "chiyaz.reviews.list",
      successNotification: { type: "none" },
      errorNotification: {
        type: "toast",
        message: "Failed to load reviews",
        background: "#8B4513",
      },
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      projectUUID: "chiyaz-tea-coffee",
      isActive: true,
    },

    // ✅ SUBMIT REVIEW (Public create + auto avatar + refresh list on success)
    {
      key: "chiyaz.reviews.submit",
      name: "Submit Chiyaz Review",
      description: "Submit a new public customer review",
      type: "crud",
      url: CRUD_PATH,
      method: "POST",
      authRequired: false, // Public submission
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => {
          console.log("📝 Transforming review payload:", payload);
          
          // Auto-generate random avatar if none provided
          const avatarIndex = Math.floor(Math.random() * 70) + 1;
          const reviewerAvatar = payload.reviewerAvatar || \`https://i.pravatar.cc/150?img=\${avatarIndex}\`;
          
          return {
            reviewerName: payload.reviewerName?.trim() || "Anonymous",
            reviewerAvatar,
            rating: parseInt(payload.rating) || 5,
            title: payload.title?.trim() || "",
            comment: payload.comment?.trim() || "",
            productName: payload.productName?.trim() || "",
            verifiedPurchase: payload.verifiedPurchase || false,
            helpfulCount: 0,
            date: new Date().toISOString()
          };
        }
      `,
      storeResponse: true,
      storeKey: "chiyaz.reviews.submitted",
      successNotification: {
        type: "toast",
        message: "✅ Thank you! Your review has been submitted.",
        background: "#2E7D32",
        duration: 5000,
      },
      errorNotification: {
        type: "toast",
        message: "❌ Failed to submit review. Please try again.",
        background: "#D32F2F",
        duration: 5000,
      },
      onSuccess: [
        {
          action: "closeReviewModal",  // This matches the registered action in initialization.actions
          actionParams: {},
        },
        { 
          action: "api",
          actionParams: { apiKey: "chiyaz.reviews.list" }
        },
      ],
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      projectUUID: "chiyaz-tea-coffee",
      isActive: true,
    },
  ];

  for (const config of reviewAPIConfigs) {
    const updated = await APIConfig.findOneAndUpdate(
      { key: config.key },
      config,
      { upsert: true, new: true }
    );
    console.log(`✅ ${config.key} → configured & active`);
  }

  console.log(`\n✅ All ${reviewAPIConfigs.length} API resources ready`);
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

    const { slug } = await createReviewsEntity();
    await seedReviewData(slug);
    await configureAPIs();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 CHIYAZ REVIEWS FULLY SETUP & FIXED!");
    console.log("=".repeat(60));
    console.log("\n🔗 Test endpoints (relative URLs now work everywhere):");
    console.log(`   GET /api/crud/${CHIYAZ_ORG_ID}/review`);
    console.log(`   POST /api/crud/${CHIYAZ_ORG_ID}/review`);
    console.log("\n👉 Next steps:");
    console.log("   1. Hard refresh http://localhost:3000/chiyaz (Ctrl+Shift+R)");
    console.log("   2. Submit a review with ≥10 char comment");
    console.log("   3. It should now work perfectly!");
    console.log("=".repeat(60));

    mongoose.disconnect();
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err);
    mongoose.disconnect();
    process.exit(1);
  }
};

main();