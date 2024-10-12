import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // Retrieve user from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        if (storedUser) {
            // Fetch bookings for the logged-in user
            axios.get(`/api/bookings?user_id=${storedUser.id}`)
                .then(response => {
                    setBookings(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

            // Fetch donations for the logged-in user
            axios.get(`/api/donations?user_id=${storedUser.id}`)
                .then(response => {
                    setDonations(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-y-scroll">
            <header className="bg-gray-800 py-4 px-6">
                <h1 className="text-3xl text-white">Temple Trek Dashboard</h1>
            </header>
            <main className="flex-1 overflow-y-scroll">
                <section className="bg-white py-4 px-6">
                    <h2 className="text-2xl">User Information</h2>
                    {user ? (
                        <div>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Address:</strong> {user.address}</p>
                        </div>
                    ) : (
                        <p>User not logged in</p>
                    )}
                </section>
                <section className="bg-white py-4 px-6">
                    <h2 className="text-2xl">Booking List</h2>
                    <ul className="list-none">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="flex justify-between py-2">
                                <span className="text-lg">{booking.temple}</span>
                                <span className="text-lg">{booking.bookingType}</span>
                                <span className="text-lg">{booking.checkIn} - {booking.checkOut}</span>
                                <span className="text-lg">{booking.timeSlot}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="bg-white py-4 px-6">
                    <h2 className="text-2xl">Donation List</h2>
                    <ul className="list-none">
                        {donations.map((donation) => (
                            <li key={donation.id} className="flex justify-between py-2">
                                <span className="text-lg">{donation.name}</span>
                                <span className="text-lg">{donation.phone}</span>
                                <span className="text-lg">{donation.address}</span>
                                <span className="text-lg">{donation.donationType}</span>
                                <span className="text-lg">{donation.donationAmount}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
