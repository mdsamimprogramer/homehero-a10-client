import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FourSquare } from "react-loading-indicators";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/my-bookings?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user, refetch]);

  // ✅ Cancel Booking
  const handleCancel = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bookings/${bookingId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Booking canceled successfully!");
            setRefetch(!refetch);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // ✅ Submit Review
  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      toast.error("Please give a rating and comment!");
      return;
    }

    const reviewData = {
      user: user?.displayName || user?.email,
      rating: parseFloat(rating),
      comment,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/services/${selectedBooking.serviceId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      if (res.ok) {
        toast.success("Review submitted successfully!");
        setSelectedBooking(null);
        setRating("");
        setComment("");
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting review.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <FourSquare color="#32cd32" size="100px" />
      </div>
    );

  if (bookings.length === 0)
    return <div className="text-center mt-10">No bookings yet.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Booking Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="px-4 py-2 border">{booking.service?.name}</td>
                <td className="px-4 py-2 border">
                  {booking.service?.category}
                </td>
                <td className="px-4 py-2 border">$ {booking.price}</td>
                <td className="px-4 py-2 border">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="btn btn-sm bg-green-500 text-white rounded-full hover:bg-green-600"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Review Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-3 text-center">
              Review for {selectedBooking.service?.name}
            </h3>

            <label className="block font-semibold mb-1">Rating (1–5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <label className="block font-semibold mb-1">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              rows="3"
              placeholder="Write your feedback..."
            />

            <div className="flex justify-between">
              <button
                onClick={handleSubmitReview}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
              >
                Submit
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
