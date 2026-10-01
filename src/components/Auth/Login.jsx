import { useState, useContext } from "react";
import { Authcontext } from "../../context/Authprovider";
import {
  IconLock,
  IconMail,
  IconEye,
  IconEyeOff,
  IconCheck,
} from "../common/Icons";

const Login = () => {
  const { handleLogin } = useContext(Authcontext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      handleLogin(email, password);
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0B0F19]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold text-lg mb-3">
            N
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            NexTask EMS
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Employee & Task Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#111827] rounded-xl p-6 sm:p-7 border border-[#1F2937] shadow-xl">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">Sign In</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Enter your corporate credentials to access your dashboard.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <IconMail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg pl-10 pr-4 py-2.5 text-xs bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <IconLock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg pl-10 pr-10 py-2.5 text-xs bg-[#0B0F19] border border-[#1F2937] text-white placeholder-slate-500 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-white transition p-0.5 cursor-pointer"
                >
                  {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <IconCheck className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-slate-500">
          Corporate Workspace Portal • Internal Use Only
        </div>
      </div>
    </div>
  );
};

export default Login;
