const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

//GET comment
router.get("/", async (req, res) => {
  //get the data and store it
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST comment
router.post("/", auth, async (req, res) => {
    //post the data and store it
    try {
      const commentData = await Comment.create({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.session.user_id, 
      });
      res.status(201).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }

});
  
module.exports = router;
