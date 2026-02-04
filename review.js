// universal-review-seed.js - WORKS FOR ANY ORGANIZATION
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
// STEP 1: CREATE REVIEWS ENTITY
// ===================================
const createReviewsEntity = async (orgId, userId) => {
  console.log("\n⭐ === STEP 1: CREATING REVIEWS ENTITY ===");
  console.log(`   Organization: ${orgId}`);
  console.log(`   Project: ${PROJECT_UUID}`);

  const reviewEntitySlug = `${orgId}-review`;

  const existingEntity = await DynamicEntity.findOne({ slug: reviewEntitySlug });

  if (existingEntity) {
    console.log("⚠️  Reviews entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: reviewEntitySlug });
  }

  const reviewEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(orgId),
    projectUUID: PROJECT_UUID,
    entityName: "review",
    isGlobal: false,
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
    createdBy: new mongoose.Types.ObjectId(userId),
  });

  console.log("✅ Reviews entity created:", reviewEntity.entityName);
  console.log("   Slug:", reviewEntity.slug);
  return { entity: reviewEntity, slug: reviewEntitySlug };
};

// ===================================
// STEP 2: SEED REVIEW DATA
// ===================================
const seedReviewData = async (reviewSlug, orgId, userId) => {
  console.log("\n💬 === STEP 2: SEEDING REVIEW DATA ===");

  const dummyReviews = [
    {
      reviewerName: "Sarah Mitchell",
      reviewerAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      title: "Absolutely Divine Darjeeling!",
      comment: "The Premium Darjeeling tea is simply exceptional. The delicate floral notes and smooth finish make every cup a luxurious experience.",
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
      comment: "As a coffee connoisseur, I'm extremely picky. The Ethiopian Yirgacheffe exceeded all expectations. Bright, fruity notes with a clean finish.",
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
      comment: "The Japanese Matcha powder is vibrant green and has that authentic taste. Great for traditional ceremonies and modern lattes.",
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
      comment: "I subscribed to the monthly discovery box and it's been incredible! Every month brings new flavors. This makes a perfect gift too!",
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
      comment: "The Assam black tea is robust and malty, perfect for my morning chai. Deep color and strong flavor. Highly recommend!",
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
      comment: "The Colombian Supreme beans are fantastic. Smooth, well-balanced with hints of caramel and nuts. The consistency is impressive.",
      productName: "Colombian Supreme Beans",
      verifiedPurchase: true,
      helpfulCount: 19,
      date: new Date("2024-01-18"),
    },
  ];

  const collectionName = `dyn_${reviewSlug.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  console.log(`→ Using collection: ${collectionName}`);

  const ReviewModel = mongoose.connection.collection(collectionName);

  const deleteResult = await ReviewModel.deleteMany({});
  console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing reviews`);

  const reviewsWithMetadata = dummyReviews.map((review) => ({
    ...review,
    organizationId: new mongoose.Types.ObjectId(orgId),
    projectUUID: PROJECT_UUID,
    createdBy: new mongoose.Types.ObjectId(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const result = await ReviewModel.insertMany(reviewsWithMetadata);
  console.log(`✅ Inserted ${result.length} reviews`);
  
  const count = await ReviewModel.countDocuments();
  console.log(`📊 Verified count: ${count} documents`);
};

// ===================================
// STEP 3: CONFIGURE APIS
// ===================================
const configureAPIs = async (orgId, userId) => {
  console.log("\n🔧 === STEP 3: CONFIGURING API RESOURCES ===");

  const CRUD_PATH = `/api/crud/${orgId}/review`;

  const reviewAPIConfigs = [
    {
      key: `${WEBSITE_SLUG}.reviews.list`,
      name: "Get Reviews",
      description: "Fetches all customer reviews (public)",
      type: "crud",
      url: CRUD_PATH,
      method: "GET",
      storeResponse: true,
      storeKey: `${WEBSITE_SLUG}.reviews.list`,
      successNotification: { type: "none" },
      errorNotification: {
        type: "toast",
        message: "Failed to load reviews",
        background: "#8B4513",
      },
      organizationId: new mongoose.Types.ObjectId(orgId),
      projectUUID: PROJECT_UUID,
      isActive: true,
    },
    {
      key: `${WEBSITE_SLUG}.reviews.submit`,
      name: "Submit Review",
      description: "Submit a new public customer review",
      type: "crud",
      url: CRUD_PATH,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      transformPayload: `
        (payload) => {
          console.log("📝 Transforming review payload:", payload);
          
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
      storeKey: `${WEBSITE_SLUG}.reviews.submitted`,
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
          action: "closeReviewModal",
          actionParams: {},
        },
        { 
          action: "api",
          actionParams: { apiKey: `${WEBSITE_SLUG}.reviews.list` }
        },
      ],
      organizationId: new mongoose.Types.ObjectId(orgId),
      projectUUID: PROJECT_UUID,
      isActive: true,
    },
  ];

  for (const config of reviewAPIConfigs) {
    await APIConfig.findOneAndUpdate(
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
      "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/"
    );
    console.log("✅ Connected!");

    // Get org ID dynamically from website slug
    const orgId = await getOrgFromWebsite(WEBSITE_SLUG);
    const userId = "000000000000000000000000"; // System user for seeding

    const { slug } = await createReviewsEntity(orgId, userId);
    await seedReviewData(slug, orgId, userId);
    await configureAPIs(orgId, userId);

    console.log("\n" + "=".repeat(60));
    console.log("🎉 REVIEWS SETUP COMPLETED!");
    console.log("=".repeat(60));
    console.log(`✅ Website: ${WEBSITE_SLUG}`);
    console.log(`✅ Organization: ${orgId}`);
    console.log(`✅ Review entity created`);
    console.log(`✅ 6 reviews seeded`);
    console.log(`✅ 2 APIs configured`);
    console.log("\n📝 Test endpoints:");
    console.log(`   GET /api/crud/${orgId}/review`);
    console.log(`   POST /api/crud/${orgId}/review`);
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