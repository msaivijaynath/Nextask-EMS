import { useState, useEffect } from "react";

const getInitials = (name = "") => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getBgColor = (name = "") => {
  const colors = [
    "bg-indigo-600 text-white",
    "bg-emerald-600 text-white",
    "bg-amber-600 text-white",
    "bg-rose-600 text-white",
    "bg-purple-600 text-white",
    "bg-sky-600 text-white",
    "bg-teal-600 text-white",
    "bg-blue-600 text-white",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const Avatar = ({ name = "User", src = "", className = "w-10 h-10 text-sm", rounded = "rounded-lg" }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className={`${className} ${rounded} object-cover shrink-0 border border-slate-700/60`}
      />
    );
  }

  const initials = getInitials(name);
  const colorClass = getBgColor(name);

  return (
    <div
      className={`${className} ${rounded} ${colorClass} flex items-center justify-center font-bold tracking-wider shrink-0 select-none border border-slate-700/50 shadow-sm`}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
