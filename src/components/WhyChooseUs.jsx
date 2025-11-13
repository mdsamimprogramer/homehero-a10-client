import { ShieldCheck, Clock, Star, Users } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
        title: "Trusted Professionals",
        description: "All our service providers are verified and highly skilled.",
    },
    {
        icon: <Clock className="w-8 h-8 text-green-500" />,
        title: "Fast & Reliable",
        description: "We ensure timely service without compromising quality.",
    },
    {
        icon: <Star className="w-8 h-8 text-green-500" />,
        title: "Top Rated Services",
        description: "Our services are rated highly by satisfied customers.",
    },
    {
        icon: <Users className="w-8 h-8 text-green-500" />,
        title: "Customer Support",
        description: "24/7 support to assist you with all your needs.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
                <p className="text-gray-600 mb-12">
                    We provide top-notch services that meet your needs and exceed your expectations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
