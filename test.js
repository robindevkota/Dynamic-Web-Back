// scripts/checkDatabase.js
// Run this to see what's in your database

const mongoose = require('mongoose');
const PageConfig = require('./models/PageConfig');
const Organization = require('./models/Organization');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function checkDatabase() {
  try {
    console.log('🔍 === DATABASE CHECK ===\n');

    // 1. Check all pages
    const allPages = await PageConfig.find({ status: { $ne: 'Deleted' } });
    console.log(`📊 Total Pages: ${allPages.length}\n`);

    // 2. Group by type
    const templates = allPages.filter(p => p.isTemplate);
    const projects = allPages.filter(p => !p.isTemplate);

    console.log(`📋 Templates: ${templates.length}`);
    templates.forEach(t => {
      console.log(`  ✨ ${t.title} (${t.slug}) - org: ${t.organizationId || 'NULL'}`);
    });

    console.log(`\n🏢 Projects: ${projects.length}`);
    projects.forEach(p => {
      console.log(`  📁 ${p.title} (${p.slug}) - org: ${p.organizationId}`);
    });

    // 3. Check organizations
    console.log('\n🏢 === ORGANIZATIONS ===');
    const orgs = await Organization.find();
    console.log(`Total: ${orgs.length}\n`);
    orgs.forEach(org => {
      console.log(`  • ${org.name} (ID: ${org._id})`);
      console.log(`    Plan: ${org.pricingPlan}`);
      console.log(`    Projects: ${org.currentProjects}/${org.maxProjects}`);
    });

    console.log('\n✅ Check complete!');
    mongoose.disconnect();
    
  } catch (err) {
    console.error('❌ Error:', err);
    mongoose.disconnect();
  }
}

checkDatabase();