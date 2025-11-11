import { Link } from "react-router";

export const ServiceCard = ({ service }) => {

  const { name, thumbnail, category, description, _id, created_by,price } = service;

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
        <div className="flex justify-between items-center">
          <div className="badge text-xs badge-xs badge-secondary rounded-full">{category}</div>
          <div className="mt-2 text-sm font-semibold text-green-600">
            💰 Price: {price ? `$${price}` : "Not Available"}
          </div>
        </div>
        <div className="text-xs text-gray-600">{created_by}</div>
        <p className="line-clamp-1">
          {description}
        </p>
        {/* <p className="text-sm text-base-content/70">by {author}</p> */}
        <div className="card-actions justify-between items-center mt-4">

          <Link to={`/service-details/${_id}`} className="btn rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-sm">Details</Link>
        </div>
      </div>
    </div>
  );
};
