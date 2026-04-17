const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// 🌍 Carbon Calculation
function calculateCarbon({ travel, electricity, diet }) {
  let carbon = 0;

  carbon += travel * 0.21;
  carbon += electricity * 0.5;
  carbon += diet === "nonveg" ? 2 : 1;

  return carbon.toFixed(2);
}

// API
app.post("/calculate", (req, res) => {
  const carbon = calculateCarbon(req.body);

  let suggestion = "";
  if (carbon > 10) {
    suggestion = "Try reducing travel and electricity usage.";
  } else {
    suggestion = "Great! Keep maintaining eco-friendly habits 🌱";
  }

  res.json({ carbon, suggestion });
});

app.listen(PORT, () => console.log("Server running on port 5000"));
