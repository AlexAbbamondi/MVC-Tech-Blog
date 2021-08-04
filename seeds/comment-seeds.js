//comments to post in db
const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        body: "I also had a great time here!"
    }, 
    {
        user_id: 2,
        post_id: 2,
        body: "They have the most amazing tiger exhibit!"
    },
    {
        user_id: 2,
        post_id: 3, 
        body: "The best minigolf I've ever been to!"
    },
    {
        user_id: 3, 
        post_id: 3,
        body: "A little scary for my little ones but so much fun!"
    },
    {
        user_id: 3,
        post_id: 4,
        body: "Amazing place!"
    }
]

const comments = () => Comment.bulkCreate(commentData);

module.exports = comments;