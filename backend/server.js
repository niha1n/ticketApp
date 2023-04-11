const path = require('path')
const express = require("express");
const colors = require("colors");
const cors = require('cors');
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

//DB connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//serve frontend

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Support Desk API" });
});
app.use(cors({
  origin: 'https://peppy-marigold-86aa2f.netlify.app'
}));

// if(process.env.NODE_ENV === 'production'){

//   app.use(express.path.join(__dirname, '../frontend/build'))
//   app.get('*', (req,res) => res.sendFile(__dirname,'../','frontend','build','index.html'))
// } else {
//   app.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the Support Desk API" });
//   });
// }

app.use(errorHandler);

app.listen(PORT, () => console.log("Server started"));
