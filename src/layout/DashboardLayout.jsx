import React, { use } from 'react';
import { BsArrowLeftRight } from 'react-icons/bs';
import { MdDashboard, MdGroupAdd } from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { TbHomeHand } from 'react-icons/tb';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa6';
import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { FcAddDatabase } from "react-icons/fc";


const DashboardLayout = () => {
    const { user, signOutUser } = use(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar px-5 shadow-md w-full bg-base-300 sticky top-0 z-50">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <BsArrowLeftRight size={20} />
                    </label>
                    <div className="px-4 navbar-start text-xl font-bold">Contest <span className='font-normal text-red-600'>Hub</span> Dashboard</div>
                    {/* Profile Dropdown */}
                    <div className="navbar-end gap-3">
                        {user ? (
                            <div className="dropdown dropdown-end z-50">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" >
                                    <div className="w-9 border-2 border-pink-500 shadow rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            referrerPolicy="no-referrer"
                                            src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                    </div>
                                </div>
                                <ul tabIndex="-1" className="menu dropdown dropdown-end  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-14 w-52 p-2 shadow">
                                    <div className=" pb-3 border-b border-b-gray-200">
                                        <li className="font-bold">{user.displayName}</li>
                                        <li className="text-xs text-fuchsia-400">{user.email}</li>
                                    </div>
                                    <li className="mt-2.5 mb-1.5"><Link to={"/profile"}> <FaUser /> Profile </Link></li>
                                    <li>
                                        <button onClick={handleLogout} className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 mt-1 text-white" >
                                            <IoLogOut /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to={"/auth/login"}
                                className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white" >
                                <IoLogIn /> Login
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Page content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side shadow-md is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-54">
                    {/* Sidebar content here */}
                    <ul className="menu w-full space-y-4 grow">
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <TbHomeHand size={20} color='red' />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* user Dashboard layouts */}
                        <li>
                            <NavLink to='/dashboard/dashboard-home' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard Home">
                                <MdDashboard size={20} />
                                <span className="is-drawer-close:hidden">Dashboard Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/add-service' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Service">
                                <FcAddDatabase size={20} />
                                <span className="is-drawer-close:hidden">Add Service</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/my-services' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My-Services">
                                <MdGroupAdd size={20} />
                                <span className="is-drawer-close:hidden">My-Services</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/my-bookings' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Bookings">
                                <GiPodiumWinner size={20} />
                                <span className="is-drawer-close:hidden">My Bookings</span>
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to='/dashboard/profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                <CgProfile size={20} />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </NavLink>
                        </li> */}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;