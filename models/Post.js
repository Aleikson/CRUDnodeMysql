const db = require('./db');

const Post = db.NewSequelize.define('posts', {
    tittle: {
        type: db.Sequelize.STRING
    },
    content: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Post;