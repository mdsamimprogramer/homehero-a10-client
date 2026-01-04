import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    const [topRatedServices, setTopRatedServices] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(true);

    // Fetch Top Rated Services
    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                const res = await fetch("https://home-hero-server-sigma.vercel.app/services/top-rated");
                const data = await res.json();
                setTopRatedServices(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingServices(false);
            }
        };
        fetchTopRated();
    }, []);

    // Fetch All Services (for bookings chart)
    useEffect(() => {
        const fetchAllServices = async () => {
            try {
                const res = await fetch("https://home-hero-server-sigma.vercel.app/services");
                const data = await res.json();
                setAllServices(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllServices();
    }, []);

    // Fetch My Bookings
    useEffect(() => {
        if (!user?.email) return;
        const fetchMyBookings = async () => {
            try {
                const res = await fetch(`https://home-hero-server-sigma.vercel.app/my-bookings?email=${user.email}`);
                const data = await res.json();
                setMyBookings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingBookings(false);
            }
        };
        fetchMyBookings();
    }, [user?.email]);

    // Chart data
    const chartData = {
        labels: allServices.map((s) => s.name),
        datasets: [
            {
                label: "Bookings",
                data: allServices.map((s) => s.bookings || 0),
                backgroundColor: "rgba(239, 68, 68, 0.8)",
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Bookings per Service", font: { size: 18 } },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div className="p-6 space-y-10">
            {/* Welcome */}
            <div className="text-2xl md:text-3xl font-bold">
                Welcome back, <span className="text-red-600">{user?.displayName || "User"}!</span>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: "Total Services", value: allServices.length },
                    { title: "Top Rated Service", value: topRatedServices[0]?.name || "N/A" },
                    { title: "Total Bookings", value: myBookings.length },
                    {
                        title: "Pending Bookings",
                        value: myBookings.filter((b) => new Date(b.bookingDate) >= new Date()).length,
                    },
                ].map((card, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-gray-500 font-semibold">{card.title}</h3>
                        <p className="text-3xl font-bold mt-2">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Bookings Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-lg font-bold mb-4">Bookings Overview</h2>
                <div className="h-64 md:h-80">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Top Rated Services Section */}
            <div>
                <h2 className="text-xl font-bold mb-6">Top Rated Services</h2>
                {loadingServices ? (
                    <p>Loading services...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {topRatedServices.map((service) => (
                            <div
                                key={service._id}
                                className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={service.image || "https://via.placeholder.com/300"}
                                    alt={service.name}
                                    className="h-44 w-full object-cover rounded mb-3"
                                />
                                <h3 className="font-bold text-lg">{service.name}</h3>
                                <p className="text-gray-500">{service.category}</p>
                                <p className="mt-1">Rating: {service.avgRating?.toFixed(1) || 0}</p>
                                <p className="mt-1 font-semibold text-red-600">Price: ${service.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Bookings */}
            <div>
                <h2 className="text-xl font-bold mb-4">My Recent Bookings</h2>
                {loadingBookings ? (
                    <p>Loading bookings...</p>
                ) : myBookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 table-auto rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Service</th>
                                    <th className="border px-4 py-2 text-left">Category</th>
                                    <th className="border px-4 py-2 text-left">Booking Date</th>
                                    <th className="border px-4 py-2 text-left">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBookings.map((b) => (
                                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="border px-4 py-2">{b.service.name}</td>
                                        <td className="border px-4 py-2">{b.service.category}</td>
                                        <td className="border px-4 py-2">
                                            {new Date(b.bookingDate).toLocaleDateString()}
                                        </td>
                                        <td className="border px-4 py-2">${b.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
