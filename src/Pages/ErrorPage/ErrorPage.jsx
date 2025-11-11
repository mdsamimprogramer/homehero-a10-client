import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 text-gray-800 px-6">
            <motion.h1
                className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-600 drop-shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}>
                404
            </motion.h1>

            <motion.p
                className="text-2xl md:text-3xl font-semibold mt-4 text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                Oops! Page Not Found 😢
            </motion.p>

            <p className="text-gray-500 mt-2 mb-8 text-center max-w-md">
                The page you’re looking for may have been removed or never existed.
            </p>

            <Link to="/" className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300" >
                <Home className="w-5 h-5" />
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
