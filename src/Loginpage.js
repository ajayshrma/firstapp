// Loginpage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./Loginpage.css";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic login logic (replace this with actual authentication logic)
    if (username === "admin" && password === "123") {
      console.log("Login successful!");
      // Navigate to the homepage
      navigate("/homepage");
    } else {
      // console.log("Login failed. Please check your credentials.");
      alert("Incorrect login & pass");
      // You might want to show an error message to the user here
    }
  };

  const handleCreateSeats = async () => {
    // Construct the data object for creating seats
    const seatFormData = {
      totalSeats: parseInt(totalSeats),
    };

    try {
      // Send the data to the backend for creating seats
      const response = await fetch(`/createSeats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seatFormData),
      });

      if (response.ok) {
        console.log(`Successfully created ${totalSeats} seats.`);
        alert(`Successfully created ${totalSeats} seats.`);
      } else {
        console.error("Failed to send data to the server");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login Page</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>

      <div className="createSeatsForm">
        <h2>Create Library Seats</h2>
        <label htmlFor="totalSeats">Enter the number of seats:</label>
        <input
          type="number"
          id="totalSeats"
          name="totalSeats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          required
        />
        <br />
        <button
          id="createButton"
          style={{ backgroundColor: "rgb(226, 42, 17)" }}
          onClick={handleCreateSeats}
        >
          Create Seats
        </button>
      </div>
    </>
  );
};

export default Loginpage;
