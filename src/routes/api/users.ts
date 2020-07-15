import { Router, Request, Response } from "express";

const router: Router = Router();

// @route   Get api/users
// @desc    Test route
// @access  Public
router.get("/", (req: Request, res: Response) => res.send("User Route"));

module.exports = router;
