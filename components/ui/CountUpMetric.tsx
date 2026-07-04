"use client";

import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

type CountUpMetricProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export const CountUpMetric = ({ value, prefix = '', suffix = '', duration = 2.5, className = '' }: CountUpMetricProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0 });
  const [displayValue, setDisplayValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Determine decimal places from the target value
  const decimals = value.toString().includes('.') ? value.toString().split('.')[1].length : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isInView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(latest);
        }
      });
      return () => controls.stop();
    }
  }, [mounted, isInView, value, duration]);

  const formattedValue = mounted 
    ? displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};
