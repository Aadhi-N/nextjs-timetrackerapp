const express = require("express");
const router = express.Router();

router.post("/subscribe", (req, res) => {
    console.log('apiRoutes', req.body);
    res.send({hello: req.body});
}) 

module.exports = router;