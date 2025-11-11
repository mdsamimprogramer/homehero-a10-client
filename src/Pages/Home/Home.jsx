import { useLoaderData } from "react-router";
import { useState } from "react";
import Banner from "../../components/Banner";
import { ServiceCard } from "../../components/ServiceCard";

const Home = () => {
    const initialData = useLoaderData();
    const [services, setServices] = useState(initialData);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleFilter = async () => {
        try {
            let url = "http://localhost:3000/services";

            // query parameter
            if (minPrice || maxPrice) {
                url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Error fetching filtered services:", error);
        }
    };

    return (
        <div>
            <Banner />

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <div className=" space-x-3">
                    <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-40" />
                    <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-40" />
                </div>
                <button onClick={handleFilter} className="bg-green-500 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg font-medium transition" >
                    Filter
                </button>
            </div>

            {/* Services Section */}
            <div className="text-center text-2xl font-bold mt-10">Latest Services</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {services.length > 0 ? (
                    services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <div className="flex justify-center items-center mt-8 px-4 md:px-10 col-span-full">
                        <p className="text-center text-gray-500 text-lg">
                            No services found in this price range.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
