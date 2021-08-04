//users to post in db
const { User } = require('../models');

const userData = [
    {
        username: "alexabba",
        password: "secure1"
    },
    {
        username: "johnnyboy",
        password: "secure2"
    },
    {
        username: "sammysam",
        password: "secure3"
    }
]

const users = () => User.bulkCreate(userData);

module.exports = users; 