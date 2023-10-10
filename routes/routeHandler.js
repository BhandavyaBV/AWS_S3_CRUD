var express = require('express');
var router = express.Router();
const storeData = require('./storeData')
const appendData = require('./appendData');
const searchData = require('./searchData');
const deleteFile = require('./deleteFile')
const start = require("./start")

router.get("/",function(req,res,next){
    start.handler(req,res,next)
})

router.post("/store-data",function(req,res,next){
    storeData.handler(req,res)
})

router.post("/append-data",function(req,res,next){
    appendData.handler(req,res)
})

router.post("/search-data",function(req,res,next){
    searchData.handler(req,res)
})

router.post("/delete-file",function(req,res,next){
    deleteFile.handler(req,res)
})

router.get("/ping",function(req,res,next){
    var data = {
        "msg":"Application is running"
    }
    res.status(200).json(data).end()
})

module.exports = router;