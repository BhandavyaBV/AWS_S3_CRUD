const AWS = require("aws-sdk")
AWS.config.update({"region":"us-east-1"})

var deleteFile = {}

deleteFile.handler = (req,res) =>{
    var deleteUrl = req.body.s3uri;

    var splitUrl = deleteUrl.split("/");
    var fileName = splitUrl[splitUrl.length-1];
    var bucketName = deleteUrl.split('.')[0].split("//")[1];

    var deleteParams = {
        Bucket:bucketName,
        Key:fileName
    }
    
    var s3 = new AWS.S3();

    s3.deleteObject(deleteParams, (err, data) => {
        var resToSend={}
        var status = 500;
        if (err) {
          resToSend = {
            err:err
          }
        } else {
            resToSend = {
                result:data
            }
            status = 200
        }
        res.status(status).json(resToSend).end()
      });
}

module.exports = deleteFile;