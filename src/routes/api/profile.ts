import { Router, Request, Response } from "express";

const router: Router = Router();

// @route   Get api/profile
// @desc    Test route
// @access  Public
router.get("/", (req: Request, res: Response) => res.send("Profile Route"));

module.exports = router;
