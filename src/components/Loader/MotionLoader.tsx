import React from 'react';
import { motion } from 'framer-motion';

import { AnimPageOpacity } from 'constants/animationProps';
import Loader from './Loader';

interface Props {
  className?: string;
}

const MotionLoader = ({ className }: Props) => (
  <motion.div
    key='Loader'
    initial={AnimPageOpacity.initial}
    animate={AnimPageOpacity.animate}
    exit={AnimPageOpacity.exit}
    className={className}
  >
    <Loader />
  </motion.div>
);

export default MotionLoader;
