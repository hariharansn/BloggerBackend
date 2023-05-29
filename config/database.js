const { Sequelize } = require('sequelize');
const { Comment, Post, User } = require('../models/model');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  timezone: '+05:30',
  define: {
    // Global options for model definition
    timestamps: true,
   
  },
  dialectOptions: {
    useUTC: false,
    useIST:true,
  },
});


// Initialize tables
const initializeTables =(async()=>{
  try {
    // Check if the tables exist in the database
    const userTableExists = await User.sync({ force: false });
    const postTableExists = await Post.sync({ force: false });
    const commentTableExists = await Comment.sync({ force: false });

    if (!userTableExists) {
      console.log('User table created');
    }
    if (!postTableExists) {
      console.log('Post table created');
    }
    if (!commentTableExists) {
      console.log('Comment table created');
    }

    console.log('Models synchronized with the database');
  } catch (err) {
    console.error('Error synchronizing models:', err);
  }
}
)();


// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    initializeTables();
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = sequelize;