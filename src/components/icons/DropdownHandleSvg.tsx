import React from 'react';

interface Props {
  className?: string;
}

const DropdownHandleSvg = ({ className }: Props) => (
  <svg
    viewBox='0 0 14 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M6.99974 5.17198L11.9497 0.221985L13.3637 1.63598L6.99974 7.99998L0.635742 1.63598L2.04974 0.221985L6.99974 5.17198Z'
      fill='#ABABB4'
    />
  </svg>
);

export default DropdownHandleSvg;
