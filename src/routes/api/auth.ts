import { Router, Request, Response } from "express";
import auth from "../../middleware/auth";
import { User } from "../../models/User.model";
import { check } from "express-validator";
import { auth_post } from "../../controllers/authController";
import { LogErr } from "../../error/Error";

const router: Router = Router();

// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    LogErr(err, res);
  }
});

// @route   Post api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please inlcude a valid Email!").isEmail(),
    check("password", "Password is required").exists(),
  ],
  auth_post
);

module.exports = router;
