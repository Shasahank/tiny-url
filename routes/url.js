const express = require('express')
const router = express.Router();

const {handleGenerateShortNewURL, handleAnalytics} = require("../controller/url")

router.post('/', handleGenerateShortNewURL)
router.get('/analytics/:shortId', handleAnalytics)

module.exports = router;