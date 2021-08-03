const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/auth");

//GET Posts
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
          attributes: [
            "id",
            "body",
            "post_id",
            "user_id",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//GET posts by id
router.get("/:id", async (req, res) => {
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

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//POST post
router.post("/", auth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.post_text,
      user_id: req.session.user_id,
    });
    res.status(201).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE post
router.put("/:id", auth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE post
router.delete("/:id", auth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(204).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
