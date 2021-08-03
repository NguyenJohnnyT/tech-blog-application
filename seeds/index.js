//require Models //! If using JSON files for seeds, otherwise require Models in the seed.js file
// const { Blog } = require("../models/blog.js"); 
// const { User } = require("../models/user.js");
// const { Comment } = require("../models/comment.js")

const {Blog, User, Comment } = require('../models')

//require seeds (see MVC 07 instructor)
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");
const userData = require("./userData.json");

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Blog.bulkCreate(blogData);
    
    await Comment.bulkCreate(commentData);
    
    process.exit(0);
  };
  
seedDatabase();