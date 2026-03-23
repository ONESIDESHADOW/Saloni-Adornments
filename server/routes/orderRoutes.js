const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect, protectAdmin } = require("../middleware/authMiddleware");

// Create order
router.post("/", protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  try {
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (Admin)
router.get("/", protect, protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email phone");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order statistics
router.get("/stats", protect, protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    const pendingOrders = orders.filter((o) => !o.isDelivered).length;
    const deliveredOrders = orders.filter((o) => o.isDelivered).length;

    res.json({
      totalSales,
      pendingOrders,
      deliveredOrders,
      totalOrders: orders.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "id name email phone",
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put("/:id/status", protect, protectAdmin, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (status === "delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
