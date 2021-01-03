const request=require('request')

const forecast= (location,callback)=>{
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ location+ "&APPID=dbd3b02d8958d62185d02e944cd5f522"
    request({url,json:true},(error,{body} )=>{
        // console.log(message)
        if (error){//if theres going to be error response is going to be empty. //lower level os things
            callback('Unable to connect to the network!!',undefined)
        }
        else if (body.message){
            callback('Unable to find location',undefined)
        }
        else{//if response is going to be populated then error will be empty
            
            callback(undefined, { address : body.name, temperature : body.main.temp,forecast: body.weather[0].description,temp_min: body.main.temp_min,
            temp_max: body.main.temp_max})
        }
    })
}
module.exports=forecast