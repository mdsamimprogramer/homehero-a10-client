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

  if (loading) return (
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
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="px-4 py-2 border">{booking.service?.name}</td>
                <td className="px-4 py-2 border">{booking.service?.category}</td>
                <td className="px-4 py-2 border">$ {booking.price}</td>
                <td className="px-4 py-2 border">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-sm bg-red-500 text-white rounded-full hover:bg-red-600">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
