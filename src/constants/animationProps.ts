export const AnimPageOpacity = {
  initial: { opacity: 0.1 },
  animate: { opacity: 1 },
  exit: { opacity: 0.1 },
};

export const AnimOpacityAndHeight = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
  exit: {
    opacity: 0,
    height: 0,
  },
  transition: { duration: 0.3 },
};
