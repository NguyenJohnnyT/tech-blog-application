// import models
const { Blog } = require("./blog");
const { User } = require("./user");
const { Comment } = require("./comment");
//Connections between tables

Blog.hasOne(User, {
    foreignKey: 'user_id',
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Comment.hasOne(User, {
    foreignKey: 'user_id',
});

Comment.hasOne(Blog, {
    foreignKey: 'blog_id',
})

module.exports = {
    //Models go here
    Blog,
    User,
    Comment
}