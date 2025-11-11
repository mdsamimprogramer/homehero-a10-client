
import { useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { ServiceCard } from "../../components/ServiceCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner />

            <div className="text-center text-xl font-bold mt-10">Latest Service</div>

            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
                {data.map(service => <ServiceCard key={service._id} service={service} />)}
            </div>

        </div>
    );
};

export default Home;