import React, { useState } from "react";
import { useCart } from "../components/cartcontext";

function Payment() {
  const { cartItems, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card"); // Default payment method
  const [paymentStatus, setPaymentStatus] = useState(""); // Track payment status message
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  // Calculate total amount from cart items
  const totalAmount = cartItems.reduce((total, item) => {
    const donationAmount = Number(item.donationAmount) || 0;
    const bookingAmount = Number(item.amount) || 0; // Use item.amount for bookings
    return total + donationAmount + bookingAmount;
  }, 0);

  const handlePaymentClick = () => {
    setShowConfirm(true); // Show the confirmation modal
  };

  const confirmPayment = async () => {
    try {
      const user_id = 1; // Replace with actual logged-in user id
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, payment_method: paymentMethod, totalAmount })
      });

      if (response.ok) {
        setPaymentStatus("Payment successful! Redirecting to feedback...");
        clearCart(); // Clear the cart after successful payment
        setShowConfirm(true); // Keep the popup open

        // Show the feedback form after a brief delay
        setTimeout(() => {
          setShowFeedback(true);
          setPaymentStatus(""); // Clear the payment status message
        }, 2000); // 2-second delay
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentStatus("An error occurred during payment.");
    }
  };

  const submitFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comments })
      });

      if (response.ok) {
        setShowFeedback(false);
        setPaymentStatus("Thank you for your feedback!");
        setShowConfirm(false); // Close payment confirmation modal after feedback submission
        alert("Feedback submitted successfully!"); // Show success alert
        setTimeout(() => {
          setPaymentStatus(""); // Hide message after 2 seconds
        }, 2000);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred during feedback submission.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100 text-blue-800 p-10">
      <h2 className="text-5xl font-bold mb-6">Payment</h2>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold mb-4">Your Cart</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="border-b py-4">
              <h4 className="text-xl font-semibold">{item.type === 'donation' ? 'Donation' : 'Booking'}</h4>
              <p>Details: {item.donationType || item.bookingType}</p>
              <p>Amount: ₹{item.donationAmount || item.amount || "N/A"}</p>
            </li>
          ))}
        </ul>
        <p className="text-2xl font-bold mt-4">Total: ₹{totalAmount}</p>
        <button
          onClick={handlePaymentClick}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Proceed to Payment
        </button>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md text-center w-96">
              {paymentStatus ? (
                <p className="text-xl text-green-600 mb-4">{paymentStatus}</p>
              ) : showFeedback ? (
                <>
                  <h3 className="text-xl font-bold mb-4">Feedback</h3>
                  <label className="block mb-4">
                    <span className="text-lg">Rating:</span>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="border rounded p-2 w-full"
                    />
                  </label>
                  <label className="block mb-4">
                    <span className="text-lg">Comments:</span>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="border rounded p-2 w-full"
                    />
                  </label>
                  <button
                    onClick={submitFeedback}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Submit Feedback
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xl mb-4">Confirm Payment of ₹{totalAmount}?</p>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-4 border rounded p-2 w-full"
                  >
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Netbanking">Netbanking</option>
                  </select>
                  <button
                    onClick={confirmPayment}
                    className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Payment;
