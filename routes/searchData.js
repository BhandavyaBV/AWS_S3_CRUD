var searchData = {}
const AWS = require("aws-sdk")
AWS.config.update({"region":"us-east-1"})

searchData.handler = (req,res) =>{
    var regex = req.body.regex;
    const BUCKET_NAME = "csci5409-assignment2";
    const FILE_NAME = "file.txt"
    const S3 = new AWS.S3();

    var getFile = {
        Bucket: BUCKET_NAME,
        Key: FILE_NAME,
    };

      // Referenced from - https://stackoverflow.com/questions/27299139/read-file-from-aws-s3-bucket-using-node-fs
    // How to read a file from s3 nodejs
    S3.getObject(getFile,(err,data)=>{
        if (err) {
            res.status(200).json({"error":"Unable to download the file"}).end()
        }

        var fileDataInArray = data.Body.toString().split("\n");
        var regexToMatch = new RegExp(regex);
        var result = fileDataInArray.find(item=>{
            var index = item.search(regexToMatch);
            var status = index==-1?false:true;
            return status
        })
        var resToSend={};
        // var status = 500;
        if(result){
            resToSend = { 
                "found": true,
                "result": result
               }
        }
        else{
            resToSend = { 
                "found": false,
                "result": ""
               }
        }
        res.status(200).json(resToSend).end()
    })
  
}

module.exports= searchData