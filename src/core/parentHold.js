export const isPrimaryHoldPointer = (event) => {
  if (!event) return true;
  if (event.isPrimary === false) return false;
  return typeof event.button !== 'number' || event.button === 0;
};
