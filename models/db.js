const Sequelize = require('sequelize');

const NewSequelize = new Sequelize('Database name', 'root', 'Your Password', {
    host: 'localhost',
    dialect: 'mysql',
    query:{raw:true}
});

module.exports = {
    Sequelize: Sequelize,
    NewSequelize: NewSequelize
}