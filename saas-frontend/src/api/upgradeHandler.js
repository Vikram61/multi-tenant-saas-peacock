let handler = null;

export const setUpgradeHandler = (fn) => {
  handler = fn;
};

export const triggerUpgrade = (msg) => {
  if (handler) handler(msg);
};
