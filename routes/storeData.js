var storeData = {};
var AWS = require('aws-sdk');
var fs = require('fs')
AWS.config.update({region: 'us-east-1'});

storeData.handler = (req,res,next) =>{
    var body = req.body.data
    
    // console.log()
    // Define the file name, contents, and bucket name
    const fileName = 'file.txt';
    const fileContents = body;
    const bucketName = 'csci5409-assignment2';


    // Create a writable stream to write the contents to a local file
    const fileStream = fs.createWriteStream(fileName);
    fileStream.write(fileContents);
    fileStream.on('finish',()=>{
         // Create an S3 object and specify the file name and bucket
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fs.createReadStream(fileName),
        };

        //Referenced from - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
        // How to upload a file to S3

        // Create S3 service object
        s3 = new AWS.S3({apiVersion: '2006-03-01'});

        // Upload the file to Amazon S3
        s3.upload(params, (err, data) => {
            if (err) {
                var result = {
                    "error":"Issue accessing s3 bucket"
                }
                res.status(200).json(result).end()
            } else {
                var result = {
                    "s3uri": data.Location
                }
                res.status(200).json(result).end()
            }
        });
    })
    fileStream.end();

   
    
}

module.exports = storeData;