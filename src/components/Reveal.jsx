import { motion, useReducedMotion } from 'motion/react';

// An object being set down on the mat: it drops in from slightly above with a
// little extra rotation, then settles at its resting angle.
export default function Reveal({ as = 'div', rotate = 0, delay = 0, className, style, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={{ ...style, rotate }}
      initial={reduce ? false : { opacity: 0, y: 28, rotate: rotate + (rotate >= 0 ? 3 : -3) }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ type: 'spring', stiffness: 170, damping: 22, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
