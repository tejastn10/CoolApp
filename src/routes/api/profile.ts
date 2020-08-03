import { Router, Request, Response } from "express";
import auth from "../../middleware/auth";
import { Profile } from "../../models/Profile.model";

const router: Router = Router();

// @route   Get api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get(
  "/me",
  auth,
  async (req: Request, res: Response) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"],
      );

      if (!profile) {
        return res.status(400).json(
          { msg: "There is no Profile for this user!" },
        );
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
);

module.exports = router;
