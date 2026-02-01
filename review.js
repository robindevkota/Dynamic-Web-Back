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

  return { entity: reviewEntity, slug: reviewEntitySlug };  // ✅ RETURN SLUG
};

// ===================================
// STEP 2: SEED REVIEW DATA - FIXED
// ===================================
const seedReviewData = async (reviewSlug) => {  // ✅ ACCEPT SLUG PARAMETER
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

  // ✅✅✅ CRITICAL FIX: Use the slug to generate collection name
  const collectionName = `dyn_${reviewSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  
  console.log("📦 Collection name:", collectionName);
  console.log("   (generated from slug:", reviewSlug + ")");

  // Get the collection
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
    
    // ✅ VERIFY: Count documents
    const count = await ReviewModel.countDocuments();
    console.log(`📊 Verified count in DB: ${count} documents`);
    
    if (result.length > 0) {
      console.log(`   First review: ${result[0].reviewerName} - ${result[0].rating}⭐`);
      console.log(`   _id: ${result[0]._id}`);
    }
    
    console.log("📊 Average Rating:", {
      total: reviewsWithMetadata.length,
      avgRating: (
        reviewsWithMetadata.reduce((sum, r) => sum + r.rating, 0) /
        reviewsWithMetadata.length
      ).toFixed(1),
    });
    
    // ✅ DEBUG: List all review collections
    console.log("\n🔍 All collections containing 'review':");
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach(col => {
      if (col.name.includes('review')) {
        console.log(`   → ${col.name}`);
      }
    });
    
  } catch (err) {
    console.error("❌ Insert failed:", err.message);
    throw err;
  }
};

// ===================================
// STEP 3: CONFIGURE APIS
// ===================================
const configureAPIs = async () => {
  console.log("\n🔧 === STEP 3: CONFIGURING API RESOURCES ===");

  const reviewAPIConfigs = [
    // ✅ LIST REVIEWS
    {
      key: "chiyaz.reviews.list",
      name: "Get Chiyaz Reviews",
      description: "Fetches customer reviews for Chiyaz tea & coffee",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/review`,
      method: "GET",
      headers: {},

      // ✅ ADD transformResponse to extract data array
      transformResponse: `
        (response) => {
          console.log('⭐ Reviews API response:', response);
          
          // Handle different response formats
          let items = [];
          
          if (response && response.success && Array.isArray(response.data)) {
            items = response.data;
          } else if (Array.isArray(response)) {
            items = response;
          } else if (response?.data) {
            items = Array.isArray(response.data) ? response.data : [];
          }
          
          console.log('→ Extracted', items.length, 'reviews');
          return items;
        }
      `,

      successNotification: {
        type: "none",
      },

      errorNotification: {
        type: "toast",
        message: "Failed to load reviews",
        background: "#8B4513",
        duration: 3000,
      },

      storeResponse: true,
      storeKey: "chiyaz.reviews",  // Stores at api.chiyaz.reviews

      onSuccess: [],
      onError: ["console:Failed to fetch reviews"],

      tags: ["chiyaz", "reviews", "customer-feedback"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },

    // ✅ SUBMIT REVIEW
    {
      key: "chiyaz.reviews.submit",
      name: "Submit Chiyaz Review",
      description: "Submit a new customer review",
      url: `http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/review`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      transformPayload: `
        (payload) => ({
          reviewerName: payload.reviewerName || "Anonymous",
          reviewerAvatar: payload.reviewerAvatar || "",
          rating: parseInt(payload.rating) || 5,
          title: payload.title || "",
          comment: payload.comment || "",
          productName: payload.productName || "",
          verifiedPurchase: payload.verifiedPurchase || false,
          helpfulCount: 0,
          date: new Date().toISOString()
        })
      `,

      successNotification: {
        type: "toast",
        message: "✅ Thank you for your review!",
        background: "#2E7D32",
        duration: 3000,
      },

      errorNotification: {
        type: "toast",
        message: "❌ Failed to submit review",
        background: "#8B4513",
        duration: 3000,
      },

      storeResponse: true,
      storeKey: "chiyaz.reviews.submitted",

      onSuccess: [
        {
          action: "closeModal",
          actionParams: {},
        },
        {
          action: "api",
          actionParams: {
            apiKey: "chiyaz.reviews.list",
            payload: {},
          },
        },
      ],

      onError: ["console:Failed to submit review"],

      tags: ["chiyaz", "reviews", "submit"],
      projectUUID: "chiyaz-tea-coffee",
      organizationId: new mongoose.Types.ObjectId(CHIYAZ_ORG_ID),
      isActive: true,
    },
  ];

  for (const config of reviewAPIConfigs) {
    await APIConfig.findOneAndUpdate(
      { key: config.key },
      {
        ...config,
        isActive: true,
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${config.key} configured → stores at ${config.storeKey}`);
  }

  console.log(`\n✅ Configured ${reviewAPIConfigs.length} API resources`);
};

// ===================================
// MAIN EXECUTION
// ===================================
const main = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");

    await mongoose.connect(
      "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Connected to MongoDB successfully!");
    console.log("=".repeat(60));

    // ✅ Run all steps WITH SLUG PASSING
    const reviewResult = await createReviewsEntity();
    await seedReviewData(reviewResult.slug);  // ✅ PASS THE SLUG
    await configureAPIs();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 CHIYAZ REVIEWS SETUP COMPLETED!");
    console.log("=".repeat(60));
    console.log("\n🔗 Test your API:");
    console.log(`   curl http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/review`);
    console.log(`   GET http://localhost:5000/api/crud/${CHIYAZ_ORG_ID}/review`);
    console.log("\n💡 Expected response:");
    console.log("   { success: true, data: [... 6 reviews ...] }");
    console.log("\n🎨 In frontend config, use:");
    console.log(`   "ui:dataSource": "chiyaz.reviews.list"`);
    console.log("\n🌐 Reviews will appear on:");
    console.log("   http://localhost:3000/chiyaz");
    console.log("=".repeat(60) + "\n");

    mongoose.disconnect();
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run it!
main();