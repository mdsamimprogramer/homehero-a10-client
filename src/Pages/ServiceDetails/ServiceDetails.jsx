import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FourSquare } from "react-loading-indicators";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [refetch, setRefetch] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`, {
      headers: { authorization: `Bearer ${user?.accessToken}` },
    })
      .then(res => res.json())
      .then(data => {
        setService(data.result);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [user, id, refetch]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/services/${service._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then(res => res.json())
          .then(() => {
            navigate("/all-services");
            Swal.fire("Deleted!", "Your service has been deleted.", "success");
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleBooking = () => {
    if (!user?.email) return toast.error("Please login first!");

    Swal.fire({
      title: "Confirm Booking?",
      text: `Do you want to book "${service.name}" for $${service.price}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book Now",
    }).then((result) => {
      if (result.isConfirmed) {
        const bookingData = {
          booked_by: user.email,
          serviceId: service._id,
          bookingDate: new Date(),
          price: service.price,
        };

        fetch(`http://localhost:3000/bookings/${service._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire(
              "Booked!",
              "Your service has been booked successfully.",
              "success"
            );
            setRefetch(!refetch);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Booking failed. Try again!", "error");
          });
      }
    });
  };
  const handleReviewSubmit = () => {
    if (!user?.email) return toast.error("Please login first!");

    const reviewData = {
      user: user.email,
      rating,
      review: reviewText,
      date: new Date(),
    };

    // Service DB তে রিভিউ যোগ করা
    fetch(`http://localhost:3000/services/${service._id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Review submitted!");
        setRefetch(!refetch); // পুনরায় সার্ভিস ডাটা fetch করবে
        setRating(0);
        setReviewText("");
      })
      .catch(err => {
        console.log(err);
        toast.error("Review submission failed!");
      });

    // Optional: যদি কার্টে আপডেট করতে চান
    fetch(`http://localhost:3000/cart/update-rating/${service._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
  };


  if (loading) return (<div className="text-center my-42"> <FourSquare color="#32cd32" size="100%" /> </div>);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={service.thumbnail}
              alt={service.name}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {service.name}
            </h1>
            <div className="badge badge-lg text-pink-600 bg-gray-100 font-medium">
              Price ${service.price}
            </div>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {service.category}
              </div>
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Booked: {service.bookings || 0}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {service.description}
            </p>
            <div className="flex gap-3 mt-6">
              <Link to={`/update-service/${service._id}`} className="btn btn-primary rounded-full bg-linear-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700" >
                Edit Service
              </Link>
              <button onClick={handleBooking} className="btn btn-secondary rounded-full bg-green-500 hover:bg-green-600 text-white">
                Book Now
              </button>
              <button onClick={handleDelete} className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600" >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex gap-2 mb-2">
          <span>Rating:</span>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`cursor-pointer text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            >★</span>
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your opinion..."
          className="textarea textarea-bordered w-full mb-2"
        />

        <button
          onClick={handleReviewSubmit}
          className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
        >
          Submit Review
        </button>
      </div>


    </div>
  );
};

export default ServiceDetails;
