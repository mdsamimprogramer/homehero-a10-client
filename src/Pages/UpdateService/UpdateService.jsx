import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateService = () => {
  const data = useLoaderData();
  const service = data.result;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      price: parseFloat(e.target.price.value),
    };

    fetch(`https://home-hero-server-sigma.vercel.app/services/${service._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Service updated successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Service Name</label>
            <input type="text" defaultValue={service.name} name="name" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter service name" />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select defaultValue={service.category} name="category" required className="select w-full rounded-full focus:border-0 focus:outline-gray-200" >
              <option value="" disabled>Select category</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
              <option value="AC Repair">AC Repair</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Price Field */}
          <div>
            <label className="label font-medium">Price (BDT)</label>
            <input type="number" name="price" defaultValue={service.price || 0} min="0" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter price in BDT" />
          </div>

          {/* Description*/}
          <div>
            <label className="label font-medium">Description</label>
            <textarea defaultValue={service.description} name="description" required rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[130px]"
              placeholder="Enter service description"
            ></textarea>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input type="url" name="thumbnail" defaultValue={service.thumbnail} required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="https://example.com/image.jpg" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700" >
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
