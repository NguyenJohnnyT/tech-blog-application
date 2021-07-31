// import models
const Blog = require("./blog");
const User = require("./user");
const Comment = require("./comment");
// const { UserComment } = require("./userComment");
//Connections between tables

// //Blog belongsto User
Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

//Blog hasMany comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

//User hasMany blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//User has many comments
User.hasMany(Comment, {
   foreignKey: "user_id"
});

// //User belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// //comment belongsTo Blog
// Comment.belongsTo(Blog, {
//     foreignKey: 'blog_id',
// })

module.exports = { Blog, User, Comment }