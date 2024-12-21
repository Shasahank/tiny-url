const {nanoid} = require("nanoid");
const URL = require('../models/url')

async function handleGenerateShortNewURL(req,res){
    const body = req.body;
    console.log(req)
    if(!req.body?.url) return res.status(400).json({error:"URL si require"})
    const shortId = nanoid(10);
    await URL.create({
        shortId: shortId,
        redirectURL: body?.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    return res.render('home',{
        id: shortId,
    })
    // return res.json({id: shortId})

}

async function handleAnalytics(req,res){
    const shortId = req.params.shortId
    const data = await URL.findOne({shortId})
    res.json({
        totalCLiscks: data.visitHistory.length,
        anayltics: data.visitHistory
    })
}

module.exports = {
    handleGenerateShortNewURL,
    handleAnalytics
}