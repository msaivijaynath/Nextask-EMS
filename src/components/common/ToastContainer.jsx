import { IconAlert, IconCheckCircle, IconClose } from "./Icons";

const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = "border-[#374151] bg-[#111827] text-slate-100";
        let icon = <IconCheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />;

        if (toast.type === "success") {
          borderClass = "border-emerald-900/60 bg-[#111827] text-emerald-100";
          icon = <IconCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
        } else if (toast.type === "error") {
          borderClass = "border-rose-900/60 bg-[#111827] text-rose-100";
          icon = <IconAlert className="w-4 h-4 text-rose-400 shrink-0" />;
        } else if (toast.type === "warning") {
          borderClass = "border-amber-900/60 bg-[#111827] text-amber-100";
          icon = <IconAlert className="w-4 h-4 text-amber-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-2.5 p-3 rounded-lg border shadow-lg transition ${borderClass}`}
          >
            {icon}
            <div className="flex-1 text-xs">
              {toast.title && <div className="font-semibold mb-0.5">{toast.title}</div>}
              <div className="text-slate-300 text-[11px] leading-snug">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition cursor-pointer"
            >
              <IconClose className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
