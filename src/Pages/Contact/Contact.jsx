import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-base-100 text-base-content py-10 rounded-xl px-4 md:px-14">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-2">Contact Us</h1>
                    <p className="text-base-content/70 text-lg">
                        Have questions or feedback? Fill out the form and we’ll get back to you shortly.
                    </p>
                </div>

                {/* Form + Info Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-base-200 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full text-base-content"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered w-full text-base-content"
                                    required
                                />
                            </div>

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full text-base-content"
                                rows={6}
                                required
                            />

                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-red-500 hover:to-pink-500 transition text-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info + Social + Map */}
                    <div className="flex flex-col justify-between gap-6">
                        {/* Contact Info */}
                        <div className="bg-base-200 shadow-xl rounded-2xl p-6 flex flex-col gap-4 hover:shadow-2xl transition">
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-pink-500 text-2xl" />
                                <p>Level-4, 34, Awal Centre, Banani, Dhaka</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-pink-500 text-2xl" />
                                <p>mdsamimhossen827@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-pink-500 text-2xl" />
                                <p>01743282144, 01840519750</p>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-base-200 shadow-xl rounded-2xl p-6 flex justify-around items-center hover:shadow-2xl transition">
                            <a href="https://www.facebook.com/md.samim.khan.22906" className="btn btn-circle btn-outline btn-sm text-pink-500 hover:bg-pink-500 hover:text-white transition"><FaFacebookF size={18} /></a>
                            <a href="https://www.linkedin.com/in/samim01/" className="btn btn-circle btn-outline btn-sm text-pink-500 hover:bg-pink-500 hover:text-white transition"><FaLinkedinIn size={18} /></a>
                            <a href="https://github.com/mdsamimprogramer" className="btn btn-circle btn-outline btn-sm text-pink-500 hover:bg-pink-500 hover:text-white transition"><FaGithub size={18} /></a>
                        </div>

                        {/* Map */}
                        <div className="bg-base-200 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition">
                            <iframe
                                title="Office Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.39862731543246!3d23.780887594699284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7bb1a123456%3A0xabcdef123456789!2sAwal%20Centre%2C%20Banani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                                className="w-full h-60 md:h-80 border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
