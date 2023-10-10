const axios = require('axios')
var start = {}

start.handler = (req,res,next) =>{
    console.log("triggered")
    var dataTosend = {
        "banner": "B00942541", 
        "ip": "34.235.169.44:3000" 
    }

    axios.post("http://129.173.67.184:8080/start",dataTosend,function(err,res){
        if(err){
            console.log(err.data)
        }
    })
}

module.exports = start