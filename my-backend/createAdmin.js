// createAdmin.js - Simple script to create admin user
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lostanimal');
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin2004@gmail.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists:', existingAdmin.email);
      return;
    }

    // Create admin with hardcoded credentials
    const hashedPassword = await bcrypt.hash('sayan40028050', 10);
    
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin2004@gmail.com',
      password: hashedPassword
    });

    console.log('✅ Admin created successfully:', admin.email);
    console.log('📧 Login with: admin2004@gmail.com');
    console.log('🔑 Password: sayan40028050');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
