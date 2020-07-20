import { Router } from "express";
import { check } from "express-validator";
import { user_post } from "../../controllers/userController";

const router: Router = Router();

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Please inlcude a valid Email!").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  user_post
);

module.exports = router;
