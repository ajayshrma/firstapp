import React, { useState } from "react";
import "./SubmitForm.css";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const seatId = urlParams.get("seatId");

    const userFormData = {
      userName,
      userNumber,
      startDate,
      endDate,
      seatId,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/updateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userFormData),
        }
      );

      if (response.ok) {
        console.log("User form submitted successfully.");

        window.alert("User Added"); // Show an alert
        // Navigate to /homepage
        navigate("/homepage");
      } else {
        console.error("Failed to submit user form.");
      }
    } catch (error) {
      console.error("Error submitting user form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>User Global Form</h2>
      <form>
        <label htmlFor="userName">Enter Student Name:</label>
        <br />
        <input
          type="text"
          id="userName"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="userNumber">Enter Student Number:</label>
        <br />
        <input
          type="text"
          id="userNumber"
          name="userNumber"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
          required
        />
        <br />
        <label htmlFor="startDate">Subscription Start Date:</label>
        <br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <br />
        <label htmlFor="endDate">Subscription End Date:</label>
        <br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
