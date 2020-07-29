import { Router, Request, Response } from "express";
import auth from "../../middleware/auth";
import { User } from "../../models/User.model";

const router: Router = Router();

// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.messade);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
