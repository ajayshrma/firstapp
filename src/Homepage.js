import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const [seats, setSeats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getSeats");

        if (response.ok) {
          const seatsData = await response.json();
          setSeats(seatsData);
        } else {
          console.error("Failed to fetch seats");
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchData();
  }, []);

  const isSubscriptionExpired = (endDate) => {
    const currentDate = new Date();
    const subscriptionEndDate = new Date(endDate);
    return currentDate > subscriptionEndDate;
  };

  const handleEditButtonClick = (seatId) => {
    navigate(`/submitform?seatId=${seatId}`);
  };

  const handleViewButtonClick = (seat) => {
    const startDate = seat.assignedTo.startDate ? new Date(seat.assignedTo.startDate) : null;
    const endDate = seat.assignedTo.endDate ? new Date(seat.assignedTo.endDate) : null;
  
    const userDetails = `
      Name: ${seat.assignedTo.userName}
      Number: ${seat.assignedTo.userNumber}
      Start Date: ${startDate ? formatDate(startDate) : 'N/A'}
      End Date: ${endDate ? formatDate(endDate) : 'N/A'}
    `;
  
    alert(userDetails);
  };
  

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const displaySeats = () => {
    return seats.map((seat, index) => {
      const isBooked = seat.isBooked;
      const isExpired = isSubscriptionExpired(seat.assignedTo.endDate);

      const statusText = isBooked && isExpired ? 'Expired' : isBooked ? 'Booked' : 'Left';
      const statusColor = isBooked && isExpired ? 'blue' : isBooked ? 'green' : 'red';

      return (
        <tr key={index}>
          <td>{seat.seatNumber}</td>
          <td
            style={{
              color: statusColor,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {statusText}
          </td>
          <td style={{ textAlign: "center" }}>
            <button
              className="view-button"
              onClick={() => handleViewButtonClick(seat)}
            >
              View
            </button>
            <button
              className="edit-button"
              onClick={() => handleEditButtonClick(seat._id)}
            >
              Edit Seat
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      {/* Seats List */}
      <div className="seats-list">
        <table className="seats-table">
          <thead>
            <tr>
              <th>Seat No.</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{displaySeats()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Homepage;
