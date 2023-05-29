const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Define the User model
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the Post model
const Post = sequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
  {
    createdAt: 'created_at', // Customize the createdAt column name
    updatedAt: 'updated_at', // Customize the updatedAt column name
  });
 

// Define the Comment model
const Comment = sequelize.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  

}, {
  createdAt: 'created_at', // Customize the createdAt column name
  updatedAt: 'updated_at', // Customize the updatedAt column name
});




// Define associations between models
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });



sequelize.sync()
.then(() => {
  console.log('Post created successfully.');
})
.catch(err => {
  console.error('Error creating Post:', err);
});

module.exports = { User, Post, Comment };