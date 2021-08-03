const posts = require('./post-seeds');
const users = require('./user-seeds');
const comments = require('./comment-seeds');

const sequelize = require('../config/connection');

const all = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await users();
    console.log('\n----- USERS SEEDED -----\n');
  
  await posts();
    console.log('\n----- POSTS SEEDED -----\n');

  await comments();
    console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

all();