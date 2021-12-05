var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("password", "Password must be min 5 chars").isLength({ min: 5 }),
    check("name", "name must be min 5 chars").isLength({ min: 5 }),
    check("email", "Enter valid Email ID").isEmail(),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("password", "Password must be min 5 chars").isLength({ min: 5 }),
    check("email", "Enter valid Email ID").isEmail(),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.send("Protected route");
});

module.exports = router;
