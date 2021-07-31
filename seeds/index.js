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
    //users is generated as an array of user objects
    const users = await User.bulkCreate(userData, {
                    individualHooks: true,
                    returning: true,
                  });

    //blogs is generated as an array of blog objects
    const blogs = []

    //Create blogs that belong to random users
    for (let i = 0; i < 10; i++) {
      const { id: randomUserId } = users[Math.floor(Math.random() * users.length)]

      let newBlog = await Blog.create({
        user_id: randomUserId
      }).catch((err) => {
        console.log(err)
      });
      blogs.push(newBlog);
    };

    //Create comments that belong to random users
    for (let i=0; i< 10; i++) {
      const { id: randomUserId } = users[Math.floor(Math.random() * users.length)]
      const { id: randomBlogId } = blogs[Math.floor(math.random() * blogs.length)]
      
      await Comment.create({
        user_id: randomUserId,
        blog_id: randomBlogId,
      }).catch((err) => {
        console.log(err);
      })
    }

    process.exit(0);
  };
  
seedDatabase();