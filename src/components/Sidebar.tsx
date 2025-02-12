    import { NavLink } from "react-router-dom";
    import { ClipboardList, History, LogOut } from "lucide-react";

    const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg h-screen p-5 fixed">
        {/* Logo */}
        <div className="mb-6 text-center">
            <img src="/logo.png" alt="GMAHK Logo" className="w-20 mx-auto" />
            <h2 className="text-lg font-bold text-gray-700 mt-2">Dashboard Pendeta</h2>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
        <NavLink
            to="/dashboard"
            end 
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
            }
            >
            <ClipboardList className="mr-3" size={20} />
            Dashboard
            </NavLink>
            <NavLink
            to="/dashboard/laporan"
            end
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
            }
            >
            <ClipboardList className="mr-3" size={20} />
            Laporan
            </NavLink>

            <NavLink
            to="/dashboard/history"
            end
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
            }
            >
            <History className="mr-3" size={20} />
            History
            </NavLink>

            {/* Logout Button */}
            <button
            onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}
            className="flex items-center p-3 rounded-lg text-red-600 hover:bg-gray-200 w-full"
            >
            <LogOut className="mr-3" size={20} />
            Logout
            </button>
        </nav>
        </aside>
    );
    };

    export default Sidebar;
