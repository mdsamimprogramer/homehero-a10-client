import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddService = () => {
  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      providerName: e.target.providerName.value,
      created_at: new Date(),
      boo: 0,
      created_by: user?.email,
    };

    fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Service added successfully!");
        console.log(data);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-lg mx-auto shadow-xl rounded-2xl mt-8">
      <div className="card-body p-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* name and provider */}
          <div className="flex gap-4 items-center">
            <div>
              <label className="label font-semibold text-gray-700">Service Name</label>
              <input type="text" name="name" required className="input input-bordered w-full rounded-full focus:border-pink-500" placeholder="Enter service name" />
            </div>
            <div>
              <label className="label font-semibold text-gray-700">Provider Name</label>
              <input type="text" name="providerName" required className="input input-bordered w-full rounded-full focus:border-pink-500" placeholder="Enter service name" />
            </div>
          </div>
          {/* Category */}
          <div>
            <label className="label font-semibold text-gray-700">Category</label>
            <select defaultValue="" name="category" required className="select select-bordered w-full rounded-full focus:border-pink-500" >
              <option value="" disabled>
                Select category
              </option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Woodwork">Woodwork</option>
              <option value="Repair">Repair</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="label font-semibold text-gray-700">Price ($)</label>
            <input type="number" name="price" required min="0" className="input input-bordered w-full rounded-full focus:border-pink-500" placeholder="Enter price" />
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold text-gray-700">Description</label>
            <textarea name="description" required rows="4" className="textarea textarea-bordered w-full rounded-2xl focus:border-pink-500" placeholder="Enter service details" ></textarea>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="label font-semibold text-gray-700">Thumbnail URL</label>
            <input type="url" name="thumbnail" required className="input input-bordered w-full rounded-full focus:border-pink-500" placeholder="https://example.com/image.jpg" />
          </div>

          {/* Submit */}
          <button type="submit" className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
