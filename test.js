

const mongoose = require('mongoose');

async function migrateEntities() {
  try {
    // Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI || 'your-mongo-connection-string';
    await mongoose.connect("mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/");
    console.log('✅ Connected to MongoDB');

    const DynamicEntity = mongoose.model('DynamicEntity', new mongoose.Schema({}, { strict: false }));

    // Count existing entities without isPublic field
    const countBefore = await DynamicEntity.countDocuments({ isPublic: { $exists: false } });
    console.log(`\n📊 Found ${countBefore} entities without isPublic flag`);

    if (countBefore === 0) {
      console.log('✅ All entities already migrated!');
      await mongoose.disconnect();
      return;
    }

    // Update all entities to have public access (current behavior)
    const result = await DynamicEntity.updateMany(
      { isPublic: { $exists: false } },
      { 
        $set: { 
          isPublic: true,
          accessControl: {
            readAccess: 'PUBLIC',
            createAccess: 'PUBLIC',
            updateAccess: 'END_USER_ADMIN',
            deleteAccess: 'END_USER_ADMIN'
          }
        } 
      }
    );

    console.log(`\n✅ Migration complete!`);
    console.log(`   Updated: ${result.modifiedCount} entities`);
    console.log(`   All entities now have:`);
    console.log(`     - isPublic: true (anyone can access)`);
    console.log(`     - readAccess: PUBLIC`);
    console.log(`     - createAccess: PUBLIC`);
    console.log(`     - updateAccess: END_USER_ADMIN`);
    console.log(`     - deleteAccess: END_USER_ADMIN`);

    // Verify
    const countAfter = await DynamicEntity.countDocuments({ isPublic: { $exists: true } });
    console.log(`\n📊 Verification: ${countAfter} entities now have isPublic flag`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  migrateEntities();
}

module.exports = migrateEntities;