const express= require("express"); 
const bodyParser= require("body-parser"); 
const cors = require("cors"); 
const mongoose= require("mongoose");

require("dotenv").config(); 

const app= express(); 
const port= process.env.PORT || 5000; 

app.use(cors()); 

app.use(bodyParser.json()); 




const uri= process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection=mongoose.connection.once('open', () => {
    console.log('Connected');
}).on('error',function (error) {
    console.log('CONNECTION ERROR:',error);
});

mongoose.set('useCreateIndex', true);

const exerciseRouter= require("./routes/exercises");
const usersRouter= require("./routes/users");

app.use("/exercises",exerciseRouter);
app.use("/users", usersRouter);



app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})


