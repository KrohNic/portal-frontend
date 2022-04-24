import React from 'react';

interface Props {
  className?: string;
}

const CrossSvg = ({ className }: Props) => (
  <svg
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M6.99974 5.58599L11.9497 0.635986L13.3637 2.04999L8.41374 6.99999L13.3637 11.95L11.9497 13.364L6.99974 8.41399L2.04974 13.364L0.635742 11.95L5.58574 6.99999L0.635742 2.04999L2.04974 0.635986L6.99974 5.58599Z'
      fill='#31353B'
    />
  </svg>
);

export default CrossSvg;
