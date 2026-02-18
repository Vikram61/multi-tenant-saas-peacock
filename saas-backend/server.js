require("dotenv").config();
const express = require("express");
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const billingRoutes = require("./src/routes/billingRoutes");

const errorHandler = require("./src/middleware/errorMiddleware");
const projectRoutes = require("./src/routes/projectRoutes");
const orgRoutes = require('./src/routes/orgRoutes');
const memberRoutes = require("./src/routes/memberRoutes");
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());



connectDB();
app.set("trust proxy", 1);


app.use("/api/projects", projectRoutes);

app.use("/api/org", orgRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/users", userRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use('/api/auth', authRoutes)
app.use(errorHandler);
app.get('/',(req,res)=>{
    res.send("API running successfully")
})

app.listen(process.env.PORT || 5000, ()=>console.log("Server Running"));
