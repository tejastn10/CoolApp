import { Router, Request, Response } from "express";

const router: Router = Router();

// @route   Get api/posts
// @desc    Test route
// @access  Public
router.get("/", (req: Request, res: Response) => res.send("Posts Route"));

module.exports = router;
