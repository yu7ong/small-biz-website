import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import session from "express-session";
import MongoStore from "connect-mongo";

// App config

const app = express();
app.disable("x-powered-by"); // Disables the X-Powered-By HTTP header that Express sends by default
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()); // Have Express to automatically parse incoming JSON request bodies
app.use(cors());
app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false, // Don't create empty sessions
    resave: false, // Reduces unnecessary writes to MongoDB
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGODB_URI}/small-biz-website`,
      collectionName: "sessions",
      ttl: parseInt(process.env.SESS_LIFETIME) / 1000, // Controls server side expiration
    }),
    cookie: {
      httpOnly: true, // Prevents JS from accessing the cookie
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Settings might be changed during production
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESS_LIFETIME), // Controls client side expiration
    },
  })
);

// api endpoints
app.use("/api/product", productRouter);
app.use('/api/session', sessionRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT: " + port));
