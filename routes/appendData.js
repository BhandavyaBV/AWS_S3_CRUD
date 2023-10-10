var appendData = {};
var AWS = require('aws-sdk');
var fs = require('fs')
AWS.config.update({region: 'us-east-1'});

appendData.handler = (req,res) =>{
    var data = req.body.data
    // console.log(data)
    s3 = new AWS.S3();

    const fileName = 'file.txt';
    const bucketName = 'csci5409-assignment2';
    var newData = data;

    var getFile = {
    Bucket: bucketName,
    Key: fileName,
    };

    // Referenced from - https://stackoverflow.com/questions/27299139/read-file-from-aws-s3-bucket-using-node-fs
    // How to read a file from s3 nodejs
    s3.getObject(getFile, (err, data) => {
        if (err) {
            res.status(200).json({"error":"Unable to download the file"}).end()
        }

        var existingFileContents = data.Body.toString();
        var updatedFileContents = existingFileContents + newData;
        fs.writeFileSync('updated-file.txt', updatedFileContents);
      
      
        var uploadParams = {
          Bucket: bucketName,
          Key: fileName,
          Body: fs.createReadStream('updated-file.txt'),
        };

        //Referenced from - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
        // How to upload a file to S3

        s3.upload(uploadParams, (uploadErr, uploadData) => {
            if (uploadErr) {
                var result = {
                    "error":"Issue accessing s3 bucket"
                }
                res.status(200).json(result).end()
            } else {
                var result = {
                    "s3uri": uploadData.Location
                }
                res.status(200).json(result).end()
            }
        });
    })
}

module.exports = appendData