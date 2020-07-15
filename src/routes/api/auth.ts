import { Router, Request, Response } from "express";

const router: Router = Router();

// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", (req: Request, res: Response) => res.send("Auth Route"));

module.exports = router;
