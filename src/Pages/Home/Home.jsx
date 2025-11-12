import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import { ServiceCard } from "../../components/ServiceCard";
import WhyChooseUs from "../../components/WhyChooseUs";

const Home = () => {
    const [services, setServices] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

  
    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                const res = await fetch("http://localhost:3000/services");
                if (!res.ok) throw new Error("Failed to fetch services");

                const data = await res.json();
                const topRated = data
                    .map((service) => {
                        const ratings = service.reviews?.map((r) => r.rating) || [];
                        const avgRating =
                            ratings.length > 0
                                ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                                : 0;
                        return { ...service, avgRating };
                    })
                    .sort((a, b) => b.avgRating - a.avgRating)
                    .slice(0, 6);

                setServices(topRated);
            } catch (error) {
                console.error("Failed to load top-rated services:", error);
            }
        };

        fetchTopRated();
    }, []);


    // Price filter handler
    const handleFilter = async () => {
        try {
            let url = "http://localhost:3000/services";

            if (minPrice || maxPrice) {
                url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch filtered services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Error fetching filtered services:", error);
        }
    };

    return (
        <div>
            <Banner />
            <WhyChooseUs />

            <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-5">
                <div className="space-x-3">
                    <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-40" />
                    <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-40"/>
                </div>
                <button onClick={handleFilter} className="bg-green-500 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg font-medium transition" > Filter </button>
            </div>

            {/* Top 6 Rated Services Section */}
            <div className="text-center text-2xl font-bold mt-10"> Top 6 Rated Services </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mb-10 px-4">
                {services.length > 0 ? (
                    services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <div className="flex justify-center items-center mt-8 px-4 md:px-10 col-span-full">
                        <p className="text-center text-gray-500 text-lg"> No top-rated services found. </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
