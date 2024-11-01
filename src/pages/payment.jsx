import React from "react";
import { useCart } from "../components/cartcontext";

function Payment() {
  const { cartItems, clearCart } = useCart();

  // Calculate total amount from cart items
  const totalAmount = cartItems.reduce((total, item) => {
    const donationAmount = Number(item.donationAmount) || 0; 
    const bookingAmount = Number(item.amount) || 0; // Use item.amount for bookings
    return total + donationAmount + bookingAmount;
  }, 0);

  const handlePayment = async () => {
    // Here you might want to call your payment API
    alert(`Proceeding with payment of ₹${totalAmount}`);
    // Clear the cart after payment processing
    clearCart();
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
              <p>Amount: ₹{item.donationAmount || item.amount || "N/A"}</p> {/* Use item.amount for bookings */}
            </li>
          ))}
        </ul>
        <p className="text-2xl font-bold mt-4">Total: ₹{totalAmount}</p>
        <button
          onClick={handlePayment}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  );
}

export default Payment;
