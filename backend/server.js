const express = require('express')
const connectdb = require('./config/connect')
const app = express()
require("dotenv").config()
const port = process.env.PORT
connectdb()
const cors = require("cors");

const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}

app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(cors(corsOptions))
app.use(express.json())

//routes
app.use("/api/product", require("./routes/ProductRoutes"))
app.use("/api/user", require("./routes/UserRoutes"))
app.use("/api", require("./routes/InvoicesRoutes"));
app.use((req,res) => {
   res.status(404).send( 'Not found' );
 });

app.listen(port, (err) => err ? console.log(err) : console.log(`app listening on port ${port}!`))