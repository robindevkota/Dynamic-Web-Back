const mongoose = require("mongoose");
const DynamicEntity = require("./models/DynamicEntity");
const APIConfig = require("./models/APIConfig");

const DEMO_ORG_ID = "000000000000000000000001";
const DEMO_USER_ID = "000000000000000000000000";

// ===================================
// STEP 1: CREATE ENTITY
// ===================================
const createRoomEntity = async () => {
  console.log("\n🏨 === STEP 1: CREATING ROOM ENTITY ===");

  const roomEntitySlug = `${DEMO_ORG_ID}-hotel-hotelhub-room`;

  // Check if entity already exists
  const existingEntity = await DynamicEntity.findOne({ slug: roomEntitySlug });

  if (existingEntity) {
    console.log("⚠️  Room entity already exists, deleting old one...");
    await DynamicEntity.deleteOne({ slug: roomEntitySlug });
  }

  const roomEntity = await DynamicEntity.create({
    organizationId: new mongoose.Types.ObjectId(DEMO_ORG_ID),
    projectUUID: "hotel-hotelhub",
    entityName: "room",
    slug: roomEntitySlug,
    schema: {
      roomNumber: {
        type: "string",
        required: true,
        validation: {
          minLength: 1,
          maxLength: 10,
        },
      },
      roomType: {
        type: "enum",
        required: true,
        validation: {
          enum: ["Standard", "Deluxe", "Suite", "Presidential"],
        },
      },
      price: {
        type: "number",
        required: true,
        validation: {
          min: 0,
        },
      },
      status: {
        type: "enum",
        required: true,
        validation: {
          enum: ["Available", "Occupied", "Maintenance", "Reserved"],
        },
      },
      description: {
        type: "string",
        required: false,
      },
      capacity: {
        type: "number",
        required: true,
        validation: {
          min: 1,
          max: 10,
        },
      },
      amenities: {
        type: "array",
        items: {
          type: "string",
        },
        required: false,
      },
      floor: {
        type: "number",
        required: true,
      },
    },
    operations: ["create", "read", "update", "delete", "list"],
    isTemplate: true,
    templateCategory: "Hotel",
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
  });

  console.log("✅ Room entity created:", roomEntity.entityName);
  console.log("📝 Slug:", roomEntity.slug);
  console.log("🔗 API Endpoint:", `/api/crud/${DEMO_ORG_ID}/room`);

  return roomEntity;
};

// ===================================
// STEP 2: SEED ROOM DATA
// ===================================
const seedRoomData = async () => {
  console.log("\n🛏️  === STEP 2: SEEDING ROOM DATA ===");

  const dummyRooms = [
    {
      roomNumber: "101",
      roomType: "Standard",
      price: 99,
      status: "Available",
      description: "Comfortable standard room with city view",
      capacity: 2,
      amenities: ["WiFi", "TV", "Air Conditioning"],
      floor: 1,
    },
    {
      roomNumber: "102",
      roomType: "Standard",
      price: 99,
      status: "Occupied",
      description: "Cozy standard room with garden view",
      capacity: 2,
      amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar"],
      floor: 1,
    },
    {
      roomNumber: "201",
      roomType: "Deluxe",
      price: 149,
      status: "Available",
      description: "Spacious deluxe room with balcony",
      capacity: 3,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Coffee Maker"],
      floor: 2,
    },
    {
      roomNumber: "202",
      roomType: "Deluxe",
      price: 149,
      status: "Available",
      description: "Deluxe room with king-size bed and ocean view",
      capacity: 2,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Balcony"],
      floor: 2,
    },
    {
      roomNumber: "203",
      roomType: "Deluxe",
      price: 159,
      status: "Maintenance",
      description: "Premium deluxe room with premium amenities",
      capacity: 3,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Jacuzzi"],
      floor: 2,
    },
    {
      roomNumber: "301",
      roomType: "Suite",
      price: 249,
      status: "Available",
      description: "Luxury suite with separate living area",
      capacity: 4,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Kitchen", "Balcony"],
      floor: 3,
    },
    {
      roomNumber: "302",
      roomType: "Suite",
      price: 269,
      status: "Reserved",
      description: "Executive suite with panoramic views",
      capacity: 4,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Full Bar", "Kitchen", "Jacuzzi", "Balcony"],
      floor: 3,
    },
    {
      roomNumber: "401",
      roomType: "Presidential",
      price: 499,
      status: "Available",
      description: "Luxurious presidential suite with premium services",
      capacity: 6,
      amenities: ["WiFi", "Multiple Smart TVs", "Climate Control", "Full Bar", "Full Kitchen", "Private Jacuzzi", "Private Terrace", "Butler Service"],
      floor: 4,
    },
    {
      roomNumber: "103",
      roomType: "Standard",
      price: 99,
      status: "Available",
      description: "Standard room near elevator",
      capacity: 2,
      amenities: ["WiFi", "TV", "Air Conditioning"],
      floor: 1,
    },
    {
      roomNumber: "104",
      roomType: "Standard",
      price: 109,
      status: "Available",
      description: "Renovated standard room with modern decor",
      capacity: 2,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Coffee Maker"],
      floor: 1,
    },
    {
      roomNumber: "204",
      roomType: "Deluxe",
      price: 149,
      status: "Occupied",
      description: "Deluxe room with twin beds",
      capacity: 2,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar"],
      floor: 2,
    },
    {
      roomNumber: "205",
      roomType: "Deluxe",
      price: 159,
      status: "Available",
      description: "Corner deluxe room with extra space",
      capacity: 3,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Balcony"],
      floor: 2,
    },
    {
      roomNumber: "303",
      roomType: "Suite",
      price: 249,
      status: "Available",
      description: "Family suite with connecting rooms",
      capacity: 5,
      amenities: ["WiFi", "2 Smart TVs", "Air Conditioning", "Mini Bar", "Kitchen"],
      floor: 3,
    },
    {
      roomNumber: "304",
      roomType: "Suite",
      price: 279,
      status: "Available",
      description: "Honeymoon suite with romantic setup",
      capacity: 2,
      amenities: ["WiFi", "Smart TV", "Air Conditioning", "Full Bar", "Jacuzzi", "Rose Petals", "Champagne"],
      floor: 3,
    },
    {
      roomNumber: "105",
      roomType: "Standard",
      price: 89,
      status: "Available",
      description: "Budget-friendly standard room",
      capacity: 1,
      amenities: ["WiFi", "TV", "Air Conditioning"],
      floor: 1,
    },
  ];

  const collectionName = `dyn_${DEMO_ORG_ID}_hotel_hotelhub_room`.replace(
    /[^a-zA-Z0-9_]/g,
    "_"
  );

  console.log("📦 Collection name:", collectionName);

  // Get the collection
  const RoomModel = mongoose.connection.collection(collectionName);

  // Clear existing data
  const deleteResult = await RoomModel.deleteMany({});
  console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing rooms`);

  // Insert dummy rooms
  const roomsWithMetadata = dummyRooms.map((room) => ({
    ...room,
    organizationId: new mongoose.Types.ObjectId(DEMO_ORG_ID),
    projectUUID: "hotel-hotelhub",
    projectId: null,
    createdBy: new mongoose.Types.ObjectId(DEMO_USER_ID),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const result = await RoomModel.insertMany(roomsWithMetadata);

  console.log(`✅ Inserted ${result.length} rooms`);
  console.log("📊 Room Types:", {
    Standard: roomsWithMetadata.filter((r) => r.roomType === "Standard").length,
    Deluxe: roomsWithMetadata.filter((r) => r.roomType === "Deluxe").length,
    Suite: roomsWithMetadata.filter((r) => r.roomType === "Suite").length,
    Presidential: roomsWithMetadata.filter((r) => r.roomType === "Presidential").length,
  });
  console.log("📊 Status:", {
    Available: roomsWithMetadata.filter((r) => r.status === "Available").length,
    Occupied: roomsWithMetadata.filter((r) => r.status === "Occupied").length,
    Maintenance: roomsWithMetadata.filter((r) => r.status === "Maintenance").length,
    Reserved: roomsWithMetadata.filter((r) => r.status === "Reserved").length,
  });
};

// ===================================
// STEP 3: CONFIGURE APIS
// ===================================
const configureAPIs = async () => {
  console.log("\n🔧 === STEP 3: CONFIGURING API RESOURCES ===");

  const roomsAPIConfigs = [
    // ✅ GET ENTITY SCHEMA (dynamic for any entity)
{
  key: "entity.schema",
  name: "Get Entity Schema",
  description: "Fetches schema for any dynamic entity (e.g., enums for dropdowns)",
  url: "http://localhost:5000/api/dynamic/entities",
  method: "GET",
  headers: {},

  transformPayload: `
    (payload) => {
      const entityName = payload.entityName || "room";
      return \`http://localhost:5000/api/dynamic/entities/\${entityName}\`;
    }
  `,

  successNotification: { type: "none" },
  errorNotification: { type: "none" },
  storeResponse: true,
  storeKey: "entity.schema",  // Store as entity.schema
  onSuccess: [],
  onError: ["console:Failed to fetch schema"],
  tags: ["dynamic", "schema", "crud"],
  projectUUID: "hotel-hotelhub",
  isActive: true
},
// ✅ GET SINGLE ROOM (for editing)
// ✅ DELETE ROOM - FIXED
// ✅ DELETE ROOM - FIXED with better logging
// ✅ DELETE ROOM - FIXED with better logging

{
  key: "rooms.getOne",
  name: "Get Single Room",
  description: "Fetches a single room by ID for editing",
  url: "http://localhost:5000/api/crud/000000000000000000000001/room",
  method: "GET",
  headers: {},
  
  transformPayload: `
    (payload) => {
      const roomId = payload._id || payload.id;
      if (!roomId) {
        throw new Error("Room ID is required");
      }
      return \`http://localhost:5000/api/crud/000000000000000000000001/room/\${roomId}\`;
    }
  `,
  
  successNotification: { type: "none" },
  errorNotification: {
    type: "toast",
    message: "Failed to load room details",
    background: "#ef4444",
    duration: 3000
  },
  
  storeResponse: true,
  storeKey: "selectedRoom",
  
  onSuccess: [
    {
      action: "openModal",
      actionParams: { modal: "editRoom" }
    }
  ],
  
  tags: ["hotel", "rooms", "crud", "read"],
  projectUUID: "hotel-hotelhub",
  isActive: true
},
    // ✅ AUTH LOGIN
    {
      key: "auth.login",
      name: "Login",
      description: "User login endpoint",
      url: "local://auth/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      transformPayload: `
        (payload) => {
          console.log("🔐 Login attempt:", payload.email);
          
          // Mock login - store in localStorage
          localStorage.setItem('auth_token', 'mock-jwt-' + Date.now());
          localStorage.setItem('auth_user', payload.email);
          
          return {
            success: true,
            token: 'mock-jwt-' + Date.now(),
            user: { email: payload.email }
          };
        }
      `,
      successNotification: {
        type: "toast",
        message: "✅ Login successful! Redirecting...",
        background: "#10b981",
        duration: 2000
      },
      errorNotification: {
        type: "toast",
        message: "❌ Login failed",
        background: "#ef4444",
        duration: 3000
      },
      storeResponse: false,
      onSuccess: [
        "setAuthToken",
        "setAuthUser",
        {
          action: "navigateToPage",
          actionParams: { url: "/hotelhub/dashboard" }
        }
      ],
      tags: ["auth", "login"],
      projectUUID: "hotel-hotelhub",
      isActive: true
    },
    
    // ✅ AUTH SIGNUP
    {
      key: "auth.signup",
      name: "Sign Up",
      description: "User registration endpoint",
      url: "local://auth/signup",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      transformPayload: `
        (payload) => {
          console.log("📝 Signup attempt:", payload.email);
          
          // Mock signup - store in localStorage
          localStorage.setItem('auth_token', 'mock-jwt-' + Date.now());
          localStorage.setItem('auth_user', payload.email);
          
          return {
            success: true,
            token: 'mock-jwt-' + Date.now(),
            user: { 
              email: payload.email,
              name: payload.name
            }
          };
        }
      `,
      successNotification: {
        type: "toast",
        message: "✅ Account created! Redirecting...",
        background: "#10b981",
        duration: 2000
      },
      errorNotification: {
        type: "toast",
        message: "❌ Signup failed",
        background: "#ef4444",
        duration: 3000
      },
      storeResponse: false,
      onSuccess: [
        "setAuthToken",
        "setAuthUser",
        {
          action: "navigateToPage",
          actionParams: { url: "/hotelhub/dashboard" }
        }
      ],
      tags: ["auth", "signup"],
      projectUUID: "hotel-hotelhub",
      isActive: true
    },

    // ✅ ROOMS.API (Simple list - fallback)
    {
      key: "rooms.api",
      name: "Get All Rooms (Simple)",
      description: "Simple endpoint to get all rooms without pagination",
      url: "http://localhost:5000/api/crud/000000000000000000000001/room",
      method: "GET",
      headers: {},
      
      successNotification: {
        type: "none"
      },
      
      errorNotification: {
        type: "toast",
        message: "Failed to load rooms",
        background: "#ef4444",
        duration: 3000
      },
      
      storeResponse: true,
      storeKey: "rooms.api",
      
      onSuccess: [],
      onError: ["console:Failed to fetch rooms"],
      
      tags: ["hotel", "rooms", "crud"],
      projectUUID: "hotel-hotelhub",
      isActive: true
    },

    // ✅ ROOMS.LIST (With pagination, search, sort, filter)
    {
      key: "rooms.list",
      name: "Get Rooms with Pagination",
      description: "Fetches rooms with pagination, search, filters, and sorting",
      url: "http://localhost:5000/api/crud/000000000000000000000001/room",
      method: "GET",
      headers: {},
      
      transformPayload: `
        (payload) => {
          console.log("🔍 rooms.list transformPayload:", payload);
          
          const baseUrl = "http://localhost:5000/api/crud/000000000000000000000001/room";
          const params = new URLSearchParams();
          
          // Pagination
          if (payload.page) {
            params.append('page', payload.page);
          }
          if (payload.limit) {
            params.append('limit', payload.limit);
          }
          
          // Search
          if (payload.search && payload.search.trim()) {
            params.append('search', payload.search.trim());
          }
          
          // Filters
          if (payload.roomType && payload.roomType !== '') {
            params.append('roomType', payload.roomType);
          }
          if (payload.status && payload.status !== '') {
            params.append('status', payload.status);
          }
          if (payload.minPrice) {
            params.append('minprice', payload.minPrice);
          }
          if (payload.maxPrice) {
            params.append('maxprice', payload.maxPrice);
          }
          
          // Sorting
          if (payload.sort) {
            params.append('sort', payload.sort);
          }
          if (payload.order) {
            params.append('order', payload.order);
          }
          
          const queryString = params.toString();
          const finalUrl = queryString ? \`\${baseUrl}?\${queryString}\` : baseUrl;
          
          console.log("🔗 Final URL:", finalUrl);
          return finalUrl;
        }
      `,
      
      successNotification: {
        type: "none"
      },
      
      errorNotification: {
        type: "toast",
        message: "Failed to load rooms",
        background: "#ef4444",
        duration: 3000
      },
      
      storeResponse: true,
      storeKey: "rooms.api",
      
      onSuccess: [],
      onError: ["console:Failed to fetch rooms"],
      
      tags: ["hotel", "rooms", "crud", "list", "pagination"],
      projectUUID: "hotel-hotelhub",
      isActive: true
    },
    
    // ✅ CREATE ROOM
    {
      key: "rooms.create",
      name: "Create Room",
      description: "Creates a new room via dynamic CRUD",
      url: "http://localhost:5000/api/crud/000000000000000000000001/room",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      transformPayload: `
        (payload) => ({
          roomNumber: payload.roomNumber,
          roomType: payload.roomType,
          price: parseFloat(payload.price),
          status: payload.status || "Available",
          description: payload.description || "",
          capacity: parseInt(payload.capacity) || 2,
          amenities: payload.amenities ? 
            (Array.isArray(payload.amenities) ? payload.amenities : payload.amenities.split(",").map(a => a.trim())) 
            : [],
          floor: parseInt(payload.floor) || 1
        })
      `,
      
      successNotification: {
        type: "toast",
        message: "✅ Room created successfully!",
        background: "#10b981",
        duration: 3000
      },
      
      errorNotification: {
        type: "toast",
        message: "❌ Failed to create room",
        background: "#ef4444",
        duration: 3000
      },
      
      closeModalOnSuccess: true,
      storeResponse: true,
      storeKey: "rooms.created",
      
      onSuccess: [
        {
          action: "closeModal",
          actionParams: {}
        },
        {
          action: "api",
          actionParams: {
            apiKey: "rooms.list",
            payload: { page: 1, limit: 10 }
          }
        }
      ],
      
      onError: ["console:Failed to create room"],
      
      tags: ["hotel", "rooms", "crud", "create"],
      projectUUID: "hotel-hotelhub",
      isActive: true
    },
    
    // ✅ UPDATE ROOM
    {
      key: "rooms.update",
      name: "Update Room",
      description: "Updates an existing room",
      url: "http://localhost:5000/api/crud/000000000000000000000001/room",
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      
      transformPayload: `
        (payload) => {
          const roomId = payload._id || payload.id;
          if (!roomId) {
            throw new Error("Room ID is required");
          }
          
          const url = \`http://localhost:5000/api/crud/000000000000000000000001/room/\${roomId}\`;
          
          return {
            url: url,
            body: {
              roomNumber: payload.roomNumber,
              roomType: payload.roomType,
              price: parseFloat(payload.price),
              status: payload.status,
              description: payload.description || "",
              capacity: parseInt(payload.capacity) || 2,
              amenities: Array.isArray(payload.amenities) 
                ? payload.amenities 
                : (payload.amenities ? payload.amenities.split(",").map(a => a.trim()) : []),
              floor: parseInt(payload.floor) || 1
            }
          };
        }
      `,
      
      successNotification: {
        type: "toast",
        message: "✅ Room updated successfully!",
        background: "#10b981",
        duration: 3000
      },
      
      errorNotification: {
        type: "toast",
        message: "❌ Failed to update room",
        background: "#ef4444",
        duration: 3000
      },
      
      closeModalOnSuccess: true,
      storeResponse: true,
      storeKey: "rooms.updated",
      
      onSuccess: [
        {
          action: "closeModal",
          actionParams: {}
        },
        {
          action: "api",
          actionParams: {
            apiKey: "rooms.list",
            payload: { page: 1, limit: 10 }
          }
        }
      ],
      
      onError: ["console:Failed to update room"],
      
      tags: ["hotel", "rooms", "crud", "update"],
      projectUUID: "hotel-hotelhub",
      isActive: true
    },
  
   
  ];

  for (const config of roomsAPIConfigs) {
    await APIConfig.findOneAndUpdate(
      { key: config.key },
      { 
        ...config, 
        isActive: true, 
        organizationId: new mongoose.Types.ObjectId(DEMO_ORG_ID) 
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${config.key} configured`);
  }

  console.log(`\n✅ Configured ${roomsAPIConfigs.length} API resources`);
};

// ===================================
// MAIN EXECUTION
// ===================================
const main = async () => {
  try {
    console.log("📌 Connecting to MongoDB...");

    await mongoose.connect(
      "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Connected to MongoDB successfully!");
    console.log("=".repeat(60));

    // Run all steps in sequence
    await createRoomEntity();
    await seedRoomData();
    await configureAPIs();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 ALL STEPS COMPLETED SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n🔗 Test your API:");
    console.log(`   GET http://localhost:5000/api/crud/${DEMO_ORG_ID}/room`);
    console.log(`   GET http://localhost:5000/api/crud/${DEMO_ORG_ID}/room?page=1&limit=5`);
    console.log(`   GET http://localhost:5000/api/crud/${DEMO_ORG_ID}/room?search=deluxe`);
    console.log(`   GET http://localhost:5000/api/crud/${DEMO_ORG_ID}/room?roomType=Suite`);
    console.log(`   GET http://localhost:5000/api/crud/${DEMO_ORG_ID}/room?status=Available`);
    console.log(`   GET http://localhost:5000/api/crud/${DEMO_ORG_ID}/room?sort=price&order=asc`);
    console.log("\n🌐 View in frontend:");
    console.log("   http://localhost:3000/hotelhub/rooms");
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