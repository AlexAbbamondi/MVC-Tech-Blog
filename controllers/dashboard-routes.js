const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const auth = require("../utils/auth");

//GET route to get all the posts that the user who is logged in created
router.get("/", auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body"],
      include: [
        {
          model: Comment,
          attributes: ["id", "body", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    //map over those post and render display
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-admin", { posts, loggedIn: req.session.loggedIn, layout: "dashboard.handlebars" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE a post based on the id
router.get("/edit/:id", auth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body"],
      include: [
        {
          model: Comment,
          attributes: ["id", "body", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    //if no post with that id then display this message
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("edit-post", { post, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get in order to create a new post
router.get("/new", auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body"],
      include: [
        {
          model: Comment,
          attributes: ["id", "body", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("new-post", { posts, loggedIn: req.session.loggedIn, layout: "dashboard.handlebars" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
