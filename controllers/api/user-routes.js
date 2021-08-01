const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const session = require("express-session");
const auth = require("../../utils/auth");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//GET User
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST User
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const password = dbUserData.checkPassword(req.body.password);

    if (!password) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {}
});

//Logout
router.post("/logout", auth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



// router.get("/:id", async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       attributes: { exclude: ["password"] },
//       where: {
//         id: req.params.id,
//       },
//       include: [
//         {
//           model: Post,
//           attributes: ["id", "title", "body"],
//         },
//         {
//           model: Comment,
//           attributes: ["id", "body", "post_id", "user_id"],
//           include: {
//             model: Post,
//             attributes: ["title"],
//           },
//         },
//       ],
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No user found with this id" });
//       return;
//     }
//     res.json(userData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });




// router.put("/:id", auth, async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       individualHooks: true,
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: "No user found with this id" });
//       return;
//     }
//     res.json(userData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const userData = await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No user found with this id" });
//       return;
//     }
//     res.json(userData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
