const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Webhook endpoint
app.post("/payment-status", (req, res) => {
  const paymentData = req.body; // Get the payment data from the request

  // Log the payment data
  console.log("Payment Status:", paymentData);

  // Check the payment status
  if (paymentData.status === "SUCCESS") {
    // Handle successful payment
    console.log("Payment was successful!");
  } else {
    // Handle failed payment
    console.log("Payment failed:", paymentData.reason);
  }

  // Send response back to the payment gateway
  res.status(200).send("Received");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
