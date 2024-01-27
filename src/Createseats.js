// createseat.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Createseats.css'
const Createseat = () => {
  const [totalSeats, setTotalSeats] = useState("");
  const navigate = useNavigate();
  const handleCreateSeats = async () => {
    // Construct the data object for creating seats
    const seatFormData = {
      totalSeats: parseInt(totalSeats),
    };

    try {
      // Send the data to the backend for creating seats
      const response = await fetch(`/api/createSeats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seatFormData),
      });

      if (response.ok) {
        console.log(`Successfully created ${totalSeats} seats.`);
        alert(`Successfully created ${totalSeats} seats.`);
        navigate("/homepage");
      } else {
        console.error("Failed to send data to the server");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
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
  );
};

export default Createseat;
