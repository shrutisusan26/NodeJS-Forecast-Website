const path=require('path')
const express= require('express') //express here is actually a function
const hbs= require('hbs')
const forecast=require("./utils/forecast")
const app=express()
// console.log(__dirname)
// console.log(path.join(__dirname,"../public"))
//console.log(__filename)

//express configure setup
const publicDirectory=path.join(__dirname,"../public")
const pathToViews=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//views path provider
app.set('view engine','hbs')
app.set('views',pathToViews)
hbs.registerPartials(partialsPath)//config partial hbs-handler for dynamic pages


app.use(express.static(publicDirectory)) //this matches with the route so doesnt render the belliw route

// app.get('',(req,res)=>{
//     res.send('<h1>Hello There</h1>')

// })//two arguments, route for first, and second is a function that will be called 
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Shruti Mathews'
    })//first argument is the file and second is the argument to be passed to template
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Shruti Mathews'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Me",
        message:" Help Me With the following problem please!",
        name: 'Shruti Mathews'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            message:'Address Needs to be provided'
        })
    }
     forecast(req.query.address,(error,data)=>{
        if (error){
            return res.send({
                message:error
            })
        }
         res.send({
         forecast:data.forecast,
         temperature:data.temperature,
         address:data.address
        })
        
     })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
            products:[]
        })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help article not found',
        title:'404',
        name:'Shruti Mathews'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        message:'Not found',
        title:'404',
        name:'Shruti Mathews'
    })
})
app.listen(3000,()=>{
    console.log('server is up at port 3000')
}) 
//listen to the port
//starting the server is a asynchronous process
//handlebars allows us to create dynamic pages with views