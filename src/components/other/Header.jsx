import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../context/Authprovider";
import { IconLogOut, IconSparkles } from "../common/Icons";
import Avatar from "../common/Avatar";

const Header = ({ data, subtitle }) => {
  const { handleLogout, userRole, handleResetData } = useContext(Authcontext);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const displayName = data?.name || (userRole === "admin" ? "Alex Morgan" : "Team Member");
  const userRoleText = data?.role || (userRole === "admin" ? "System Administrator" : "Employee");
  const department = data?.department || (userRole === "admin" ? "Executive" : "General");
  const avatarUrl = data?.avatar || "";

  return (
    <header className="w-full bg-gray-900 rounded-xl p-4 sm:p-5 mb-6 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
      {/* Left side: Profile */}
      <div className="flex items-center gap-3.5">
        <Avatar name={displayName} src={avatarUrl} className="w-12 h-12 text-base" />

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-bold text-white tracking-tight">
              {displayName}
            </h1>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                userRole === "admin"
                  ? "bg-purple-950/40 border-purple-800/40 text-purple-300"
                  : "bg-indigo-950/40 border-indigo-800/40 text-indigo-300"
              }`}
            >
              {userRole === "admin" ? "Admin" : "Employee"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>{userRoleText}</span>
            <span>•</span>
            <span className="text-gray-300">{department}</span>
            {subtitle && (
              <>
                <span>•</span>
                <span className="text-gray-400">{subtitle}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right side: Clock, Reset, Logout */}
      <div className="flex items-center gap-2.5 self-end md:self-auto flex-wrap">
        {timeStr && (
          <div className="hidden sm:block text-xs text-gray-400 font-mono px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800">
            {timeStr}
          </div>
        )}

        <button
          onClick={handleResetData}
          title="Reset database to initial demo state"
          className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
        >
          <IconSparkles className="w-3.5 h-3.5 text-gray-400" /> Reset Data
        </button>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
        >
          <IconLogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
