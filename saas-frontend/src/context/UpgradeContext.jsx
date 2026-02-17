import { createContext, useContext, useState } from "react";

const UpgradeContext = createContext();

export const UpgradeProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showUpgrade = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  const closeUpgrade = () => setOpen(false);

  return (
    <UpgradeContext.Provider value={{ open, message, showUpgrade, closeUpgrade }}>
      {children}
    </UpgradeContext.Provider>
  );
};

export const useUpgrade = () => useContext(UpgradeContext);
