const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

//GET comment
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST comment
router.post("/", auth, async (req, res) => {
  if (req.session) {
    try {
      const commentData = await Comment.create({
        body: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(commentData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
});


// router.delete("/:id", auth, async (req, res) => {
//     try {
//         const commentData = await Comment.destroy({
//             where: {
//               id: req.params.id,
//             },
//         })
//         if (!commentData) {
//             res.status(404).json({ message: "No comment found with this id" });
//             return;
//         }
//         res.json(commentData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }

module.exports = router;
