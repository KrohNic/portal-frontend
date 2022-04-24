export const BackdropAnimProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const ModalAnimProps = {
  initial: {
    opacity: 0,
    transform: 'scale(0)',
  },
  animate: {
    opacity: 1,
    transform: 'scale(1)',
  },
  exit: {
    opacity: 0,
    transform: 'scale(0)',
  },
};

export const defaultModalBackDropClick = Function.prototype;
