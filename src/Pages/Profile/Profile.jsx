import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!name || !photo) {
            toast.error("Name and photo URL cannot be empty!");
            return;
        }

        setLoading(true);
        toast.loading("Updating profile...", { id: "update-profile" });

        updateUserProfile(name, photo)
            .then(() => {
                toast.success("Profile updated successfully!", { id: "update-profile" });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to update profile!", { id: "update-profile" });
                setLoading(false);
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            {/* User Info */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-pink-500 shadow-md"
                />
                <h2 className="text-xl font-semibold mt-3">{user?.displayName}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                    Last Login:{" "}
                    {user?.metadata?.lastSignInTime
                        ? new Date(user.metadata.lastSignInTime).toLocaleString()
                        : "N/A"}
                </p>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    className="input input-bordered w-full rounded-full"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    className="input input-bordered w-full rounded-full"
                    placeholder="Enter photo URL"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-gradient-to-r from-pink-500 to-red-600 text-white w-full rounded-full"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default Profile;
