import { Link } from "react-router";

export const ServiceCard = ({ service }) => {
  const { name, thumbnail, category, description, _id, created_by, price, reviews } = service;

  // 🟢 reviews থেকে average rating বের করা
  // 🟢 reviews থেকে average rating বের করা এবং 5 এর বেশি হলে 5 সীমাবদ্ধ করা
  const avgRating =
    reviews && reviews.length > 0
      ? Math.min(
        reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length,
        5
      )
      : 0;


  // ⭐ star বানানো
  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating - fullStars >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push("★");
  if (hasHalfStar) stars.push("☆");

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{name}</h2>

        <div className="flex justify-between items-center text-sm">
          <div className="badge badge-secondary rounded-full">{category}</div>

          {/* ⭐ avgRating */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-lg">{stars.join("")}</span>
            <span className="text-gray-600 text-xs">({avgRating.toFixed(1)})</span>
          </div>
        </div>

        <div className="mt-2 text-sm font-semibold text-green-600">
          💰 Price: {price ? `$${price}` : "Not Available"}
        </div>

        <div className="text-xs text-gray-600">{created_by}</div>

        <p className="line-clamp-1 text-gray-700 mt-1">{description}</p>

        <div className="card-actions mt-4">
          <Link
            to={`/service-details/${_id}`}
            className="btn btn-sm w-full rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
