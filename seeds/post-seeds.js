const { Post } = require('../models');

const postData = [
    {
        title: "Adventure Zone",
        body: "Adventure Zone is so much fun for the whole family! definitely go there!",
        user_id: 1
    },
    {
        title: "The Philadelphia Zoo",
        body: "They have amazing animals and so much to offer!",
        user_id: 2
    },
    {
        title: "Monster Minigolf",
        body: "All the lights were amazing! fun filled family day!",
        user_id: 2

    },
    {
        title: "Lazer Dome Lasertag",
        body: "I haven't been to laser tag in years! this was perfect",
        user_id: 3 
    }
]

const posts = () => Post.bulkCreate(postData);

module.exports = posts;