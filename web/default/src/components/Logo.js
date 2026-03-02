import React from 'react';

const Logo = ({ size = 40, showText = true, dark = false }) => {
  const textColor = dark ? '#1a1a1a' : '#ffffff';
  const fontSize = size * 0.6;
  const textSize = size * 0.45;
  const radius = size * 0.25;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.2 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22" fill="url(#logoGradient)" />
        <text x="50" y="68" textAnchor="middle" fill="white" fontSize="58" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">
          A
        </text>
      </svg>
      {showText && (
        <span style={{
          fontSize: textSize,
          fontWeight: 800,
          color: textColor,
          letterSpacing: '-0.5px',
          lineHeight: 1
        }}>
          Ailinkor
        </span>
      )}
    </div>
  );
};

export default Logo;
