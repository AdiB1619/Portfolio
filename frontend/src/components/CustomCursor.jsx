import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use a ref to store trailing position to avoid re-renders on the fast loop
  const trailingPos = useRef({ x: -100, y: -100 });
  const trailingRef = useRef(null);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Expand cursor if hovering over actionable elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.card-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop for the trailing circle
    let animationFrameId;
    const render = () => {
      // Lerp function for smooth trailing
      trailingPos.current.x += (mousePosition.x - trailingPos.current.x) * 0.15;
      trailingPos.current.y += (mousePosition.y - trailingPos.current.y) * 0.15;

      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition.x, mousePosition.y, isHovering]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny glowing dot (exact mouse position) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999]"
        style={{
          background: '#8B5CF6',
          boxShadow: '0 0 10px rgba(139,92,246,0.8)',
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      
      {/* Smooth trailing circle */}
      <div
        ref={trailingRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border border-primary/50 transition-colors duration-300"
        style={{
          width: '32px',
          height: '32px',
          background: isHovering ? 'rgba(139,92,246,0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(139,92,246,0.8)' : 'rgba(139,92,246,0.4)',
          willChange: 'transform'
        }}
      />
    </>
  );
}
