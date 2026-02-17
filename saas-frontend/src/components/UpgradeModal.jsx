import { useUpgrade } from "../context/UpgradeContext";
import { useNavigate } from "react-router-dom";

const UpgradeModal = () => {
  const { open, message, closeUpgrade } = useUpgrade();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 w-[420px] animate-scaleIn">
        
        <h2 className="text-xl font-semibold mb-2">
          Upgrade Required
        </h2>

        <p className="opacity-70 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeUpgrade}
            className="px-4 py-2 rounded-lg border border-[var(--border)]"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              closeUpgrade();
              navigate("/upgrade");
            }}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
