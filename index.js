const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
const connect = require("./config/db")
require('dotenv').config()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const jobRoutes = require("./routes/jobRoutes")
const messagesRoutes = require("./routes/messagesRoutes")
var cors = require('cors')

const corsOptions = {
    origin: "*",
    method: ["GET", "POST"]
}

app.use(cors(corsOptions))

connect();
app.use(express.json());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", jobRoutes);
app.use("/", messagesRoutes);

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(port, () => {
    console.log(`Connected on port ${port}`)
})

// user: jobportaluser
// password: jobportalpassword
// cluster: jobportalcluster

// 1. where to use {} while using findbyIdAndUpdate or findOne
// 2. req.body is working in sendMessage controller on line number 6 which is called using same method from UserProfileView component
// on line number 20 but its not working in fetchRecruiterMessages controller on line number 47 which is also called using same method
// from UserProfileView component on line number 24