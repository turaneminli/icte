const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// function performIntensiveTask() {
//   let result = 0;
//   for (let i = 0; i < 1e6; i++) {
//     result += Math.sin(i) * Math.cos(i);
//   }
//   return result;
// }

app.post("/orders", (req, res) => {
  const { userId, productId } = req.body;
  axios
    .get(`http://localhost:3001/users/${userId}`)
    .then((userRes) => {
      axios
        .get(`http://localhost:3002/products/${productId}`)
        .then((productRes) => {
          // Simulate CPU intensive task
          // const computationResult = performIntensiveTask();
          // Here, the business logic combines data from two services
          res.json({
            orderId: 1,
            user: userRes.data,
            product: productRes.data,
            // computation: computationResult, // Optionally include in response
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const port = 3003;
app.listen(port, () => {
  console.log(`Orders service running at http://localhost:${port}`);
});
