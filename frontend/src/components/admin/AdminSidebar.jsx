import { Home, FileText, Layers, PieChart, Grid, Square, Table } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const AdminSidebar = () => {
    const [pagesOpen, setPagesOpen] = useState(false);

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white px-4 py-6 space-y-6 flex flex-col overflow-y-auto 
        /* Hide scrollbar for Chrome, Safari and Opera */
        scrollbar-none 
        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */">
            {/* Logo */}
            <div className="flex items-center">
                <div>
                    <img src="/images/tritiumlogo.png" width={60} height={20} alt="" />
                </div>
                <div className="text-2xl font-bold pl-3">TRITIUM</div>
            </div>

            {/* Navigation */}
            <ul className="space-y-2 flex-1">
                <li>
                    <NavLink
                        to=""
                        end  // This ensures it only matches exactly "/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-4 rounded hover:text-purple-400 hover:bg-gray-800 ${isActive ? 'bg-gray-800 text-purple-400 font-medium' : ''
                            }`
                        }
                    >
                        <Home size={20} /> Dashboard
                    </NavLink>
                </li>
                <NavLink
                    to="course-management"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-4 rounded hover:text-purple-400 hover:bg-gray-800 ${isActive ? 'bg-gray-800 text-purple-400 font-medium' : ''
                        }`
                    }
                >
                    <Home size={20} /> Course Management
                </NavLink>
                <NavLink
                    to="user-management"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-4 rounded hover:text-purple-400 hover:bg-gray-800 ${isActive ? 'bg-gray-800 text-purple-400 font-medium' : ''
                        }`
                    }
                >
                    <Home size={20} /> User Management
                </NavLink>
                <li>
                    <Link to="#" className="flex items-center gap-2 px-3 py-4 rounded hover:bg-gray-800 hover:text-purple-400">
                        <Home size={20} /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="#" className="flex items-center gap-2 px-3 py-4 rounded hover:bg-gray-800 hover:text-purple-400">
                        <Home size={20} /> Dashboard
                    </Link>
                </li>
                {/* Other menu items... */}

                {/* Pages dropdown */}
                <li className="relative">
                    <button
                        onClick={() => setPagesOpen(!pagesOpen)}
                        className="w-full flex items-center justify-between px-3 py-4 rounded hover:bg-gray-800"
                    >
                        <span className="flex items-center gap-2">
                            <Grid size={20} /> Pages
                        </span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${pagesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {pagesOpen && (
                        <ul className="ml-4 pl-4 border-l border-gray-700 mt-1 mb-2 space-y-2">
                            <li>
                                <Link to="#" className="block px-3 py-2 rounded hover:text-purple-400 hover:bg-gray-800">Login</Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-3 py-2 rounded hover:text-purple-400 hover:bg-gray-800">Create account</Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-3 py-2 rounded hover:text-purple-400 hover:bg-gray-800">Forgot password</Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-3 py-2 rounded hover:text-purple-400 hover:bg-gray-800">404</Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <Link to="#" className="flex items-center gap-2 px-3 py-4 rounded hover:bg-gray-800 hover:text-purple-400">
                        <Home size={20} /> Dashboard
                    </Link>
                </li>
            </ul>

            {/* Create Account Button */}
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                Create account
            </button>
        </aside>
    );
}

export default AdminSidebar;