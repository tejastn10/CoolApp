"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogErr = void 0;
exports.LogErr = (err, res) => {
    console.error(err.message);
    res.status(500).send("Server Error!");
};
