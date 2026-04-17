import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    travel: "",
    electricity: "",
    diet: "veg"
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = async () => {
    const res = await fetch("http://localhost:5000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container">
      <h1>🌍 EcoTrack AI</h1>

      <div className="card">
        <input
          name="travel"
          placeholder="Travel km/day"
          onChange={handleChange}
        />

        <input
          name="electricity"
          placeholder="Electricity kWh/day"
          onChange={handleChange}
        />

        <select name="diet" onChange={handleChange}>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
        </select>

        <button onClick={calculate}>Calculate</button>
      </div>

      {result && (
        <div className="result">
          <h2>🌱 {result.carbon} kg CO₂</h2>
          <p>{result.suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
