const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { products } = require("./data/dummyData");
const Product = require("./models/Product");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const upload = require("./middleware/uploadMiddleware");
const User = require("./models/User");

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files for upload
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//ROutes
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

//Seed Route (Run once to populate DB)
app.get("/api/seed", async (req, res) => {
  try {
    // remove products
    await Product.deleteMany();

    // insert products
    const createdProducts = await Product.insertMany(products);

    // check if admin exists
    const adminExists = await User.findOne({ email: "admin@saloni.com" });

    if (!adminExists) {
      const adminUser = new User({
        name: "Admin",
        email: "admin@saloni.com",
        password: "Admin@123",
        isAdmin: true,
      });

      await adminUser.save();
    }

    res.json({
      message: "Database seeded successfully",
      products: createdProducts.length,
      admin: "admin@saloni.com",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/health`);
  console.log(`Seed DB: http://localhost:${PORT}/api/seed`);
});
