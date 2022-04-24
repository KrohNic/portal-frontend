import React from 'react';

interface Props {
  className?: string;
}

const ArrowSvg = ({ className }: Props) => (
  <svg
    viewBox='0 0 16 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M3.828 6.49998H15C15.5523 6.49998 16 6.9477 16 7.49998C16 8.05227 15.5523 8.49998 15 8.49998H3.828L8.485 13.157C8.87547 13.5475 8.87547 14.1805 8.485 14.571C8.09453 14.9615 7.46147 14.9614 7.071 14.571L0.707106 8.20709C0.316582 7.81657 0.316582 7.1834 0.707107 6.79288L7.071 0.428985C7.46147 0.0385193 8.09453 0.0385194 8.485 0.428985C8.87547 0.81945 8.87547 1.45252 8.485 1.84299L3.828 6.49998Z'
      fill='#ABABB4'
    />
  </svg>
);

export default ArrowSvg;
