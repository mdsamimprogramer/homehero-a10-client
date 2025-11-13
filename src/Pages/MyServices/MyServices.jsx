import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ServiceCard } from "../../components/ServiceCard";
import { FourSquare } from "react-loading-indicators";

const MyServices = () => {
    const { user } = use(AuthContext);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://home-hero-server-sigma.vercel.app/my-services?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [user]);

    if (loading) {
        return <div className="items-center text-center my-42">
            <FourSquare color="#32cd32" size="100%" text="" textColor="" />
        </div>
    }

    return (
        <div className="">
            <h2 className="text-2xl text-center my-5 md:my-8 font-bold mb-4 text-gray-700">
                My Added Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.length > 0 ? (
                    services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p className="text-gray-500">No services added yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyServices;
