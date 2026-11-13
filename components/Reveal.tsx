'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof motion;
}) {
  const Tag = (motion[as as keyof typeof motion] || motion.div) as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

// Masked line-by-line headline reveal — the signature on-load moment.
export function MaskedLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  as: Tag = 'h1',
  ...rest
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  [key: string]: unknown;
}) {
  return (
    <Tag className={className} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '112%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

