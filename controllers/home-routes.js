const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// Render the home page with all the posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "body"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET a particular post baased on id
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    //if no post exists with that id then display this message
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("single-post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//If logged in then display the homepage else display the login page
router.get('/login', (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
          }
        
          res.render('login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

//if you are logged in you get redirected to the homepage else you have to signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;