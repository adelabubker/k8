// backend/utils/seed.js — Seed initial fullAdmin user and sample services
// Run: node utils/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/k8automation';

const userSchema = new mongoose.Schema({
  name: String, email: String, password: String,
  role: { type: String, default: 'user' }, token: String,
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  title: String, description: String, category: { type: String, default: 'Workflow' },
  location: { type: String, default: 'services' },
  icon: { type: String, default: 'zap' }, isActive: { type: Boolean, default: true },
  createdBy: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Service = mongoose.model('Service', serviceSchema);

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Service.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create fullAdmin
  const hashedPassword = await bcrypt.hash('admin123456', 12);
  const admin = await User.create({
    name: 'K8 Super Admin',
    email: 'admin@k8automation.io',
    password: hashedPassword,
    role: 'fullAdmin',
  });
  console.log('👑 Created fullAdmin:', admin.email);

  // Create sample services
  const services = [
    { title: 'Workflow Automation', description: 'Connect your tools and automate repetitive tasks using n8n — no code required.', category: 'Workflow', location: 'home', icon: 'workflow', createdBy: admin._id },
    { title: 'API Integration', description: 'Seamlessly connect hundreds of apps and services with powerful API automation pipelines.', category: 'Workflow', location: 'home', icon: 'code2', createdBy: admin._id },
    { title: 'AI-Powered Bots', description: 'Deploy intelligent bots that handle customer service, data processing, and complex decisions.', category: 'AI Services', location: 'featured', icon: 'bot', createdBy: admin._id },
    { title: 'Data Pipelines', description: 'Build robust data pipelines that transform, sync, and distribute your business data automatically.', category: 'Workflow', location: 'services', icon: 'trending', createdBy: admin._id },
    { title: 'Security & Compliance', description: 'Enterprise-grade security built into every automation — GDPR compliant by design.', category: 'Workflow', location: 'services', icon: 'shield', createdBy: admin._id },
    { title: 'Global Deployment', description: 'Deploy automations globally with multi-region support and 99.9% uptime SLA guarantee.', category: 'Workflow', location: 'services', icon: 'globe', createdBy: admin._id },
  ];

  await Service.insertMany(services);
  console.log(`⚡ Created ${services.length} sample services`);

  console.log('\n═══════════════════════════════════════');
  console.log('✅ Seed complete!');
  console.log('─────────────────────────────────────');
  console.log('📧 Admin Email:    admin@k8automation.io');
  console.log('🔑 Admin Password: admin123456');
  console.log('═══════════════════════════════════════\n');

  process.exit(0);
};

seed().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});