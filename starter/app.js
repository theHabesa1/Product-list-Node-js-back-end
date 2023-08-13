require ('dotenv').config()
// async error

const express = require ('express')
const app = express();

const connectDB = require("./db/connect")

const productRouter = require('./routes/products')






//import middlewares

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


//middleware

app.use(express.json())

app.use('/api/v1/products', productRouter )
//ROOTS

app.get('/',(req,res) => {
    res.send('<h1>Store api </h1> <a href ="/api/v1/products">Products route</a>')
})


//

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000


const start =async () =>{
    try{
        //db connect
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`port is listening to ${port}...`))


    }catch(error){
        console.log(error)

    }
}

start()
