import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsHidden(false);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if mouse is hovering over interactive elements
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable');
        
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Follower effect (smooth lag for the outer ring)
    let animationFrameId;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease speed
        const ease = 0.15;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    updateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple transition-all duration-150 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovered ? '48px' : '24px',
          height: isHovered ? '48px' : '24px',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.08)' : 'transparent',
          borderColor: isHovered ? '#06b6d4' : '#a855f7',
          boxShadow: isHovered ? '0 0 15px rgba(6, 182, 212, 0.3)' : 'none',
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4] transition-transform duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
        }}
      />
    </>
  );
}
