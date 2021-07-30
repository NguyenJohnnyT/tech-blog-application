//require Models //! If using JSON files for seeds, otherwise require Models in the seed.js file
const { Blog, User, Comment } = require("../models"); 
//require seeds (see MVC 07 instructor)
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");
const userData = require("./userData.json");

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    // TODO: Add bulk creates for every 
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    
    //add commentData
    //add blogData

    process.exit(0);
  };
  
seedDatabase();