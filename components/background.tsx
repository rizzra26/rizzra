"use client"
import { useEffect, useRef, useState, useCallback } from "react";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  r: number;
}

const Background = () => {
  const refDiv = useRef<HTMLDivElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const mouseStrengthRef = useRef(0);
  const mousePressedRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [height, setHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 0);
  const [boids, setBoids] = useState<Boid[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseStrength, setMouseStrength] = useState(0);
  const [mousePressed, setMousePressed] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Class Boid definition
  class BoidClass implements Boid {
    x: number;
    y: number;
    vx: number;
    vy: number;
    hue: number;
    private _r: number;

    constructor(w: number, h: number) {
      this._r = Math.random() * 1 + 1;
      this.x = Math.random() * (w + 2 * this.r) - this.r;
      this.y = Math.random() * (h + 2 * this.r) - this.r;
      this.vx = 0;
      this.vy = 0;
      this.hue = Math.random() * 60 + 240;
    }

    get r() {
      return (this._r * width * height * (typeof window !== 'undefined' ? window.devicePixelRatio : 1)) / 8000;
    }
  }

  // Handle resize logic
  const resize = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const newWidth = window.innerWidth;
    const newHeight = refDiv.current?.clientHeight || window.innerHeight;

    setWidth(newWidth);
    setHeight(newHeight);

    // Create new boids array with correct count
    const newBoids = [...boidsRef.current];

    // Adjust boids' positions and number
    if (newBoids.length < 20) {
      while (newBoids.length < 20) {
        newBoids.push(new BoidClass(newWidth, newHeight));
      }
    } else if (newBoids.length > 20) {
      while (newBoids.length > 20) {
        newBoids.pop();
      }
    }

    boidsRef.current = newBoids;
    setBoids([...newBoids]);
  }, []);

  const updateBoids = useCallback(() => {
    const currentBoids = boidsRef.current;
    const w = width;
    const h = height;

    const updatedBoids = currentBoids.map(boid => {
      boid.x += boid.vx;
      boid.y += boid.vy;

      // Wrap around screen edges
      if (boid.x < -boid.r) {
        boid.x += w + 2 * boid.r;
      } else if (boid.x > w + boid.r) {
        boid.x -= w + 2 * boid.r;
      }

      if (boid.y < -boid.r) {
        boid.y += h + 2 * boid.r;
      } else if (boid.y > h + boid.r) {
        boid.y -= h + 2 * boid.r;
      }

      boid.vx *= 0.99;
      boid.vy *= 0.99;

      // Boid separation behavior
      for (const other of currentBoids) {
        if (boid === other) continue;

        const dx = boid.x - other.x;
        const dy = boid.y - other.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 200) {
          boid.vx += (dx / dist / dist) * 0.5;
          boid.vy += (dy / dist / dist) * 0.5;
        }
      }

      return boid;
    });

    boidsRef.current = updatedBoids;
    setBoids([...updatedBoids]); // Create new array reference for React
  }, [width, height]);

  // Animation loop
  const loop = useCallback(() => {
    updateBoids();
    animationIdRef.current = requestAnimationFrame(loop);
  }, [updateBoids]);

  // Initialize everything once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial dimensions
    const initialWidth = window.innerWidth;
    const initialHeight = refDiv.current?.clientHeight || window.innerHeight;
    
    setWidth(initialWidth);
    setHeight(initialHeight);

    // Create initial boids
    const initialBoids = [];
    for (let i = 0; i < 20; i++) {
      initialBoids.push(new BoidClass(initialWidth, initialHeight));
    }
    boidsRef.current = initialBoids;
    setBoids(initialBoids);

    // Start animation loop
    animationIdRef.current = requestAnimationFrame(loop);

    setIsClient(true);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []); // Empty dependency array - runs once on mount

  // Handle resize separately
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resize]);

  // Handle mouse events separately
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mouseMoveTimeout: NodeJS.Timeout | null = null;
    const increaseStrengthInterval: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      mousePositionRef.current = newPosition;
      setMousePosition(newPosition);

      if (mouseStrengthRef.current < 1) {
        if (mouseStrengthRef.current < 1) {
          mouseStrengthRef.current = Math.min(mouseStrengthRef.current + 0.09, 1); // Increase gradually
          setMouseStrength(mouseStrengthRef.current);
        }
      }

      // Set a timeout to gradually decrease mouseStrength
      mouseMoveTimeout = setTimeout(() => {
        // Start decreasing mouseStrength
        const decreaseStrength = () => {
          if (mouseStrengthRef.current > 0) {
            mouseStrengthRef.current = Math.max(mouseStrengthRef.current - 0.005, 0);
            setMouseStrength(mouseStrengthRef.current);
          }
        };

        // Decrease mouse strength gradually over time
        const decreaseInterval = setInterval(decreaseStrength, 100);

        // Clear the interval when mouseStrength reaches 0
        setTimeout(() => {
          clearInterval(decreaseInterval);
        }, 1000); // stop decreasing after 1 second

      }, 1000);
    };

    const handleMouseDown = () => {
      mousePressedRef.current = 1;
      setMousePressed(1);
    };
    
    const handleMouseUp = () => {
      mousePressedRef.current = 0;
      setMousePressed(0);
    };
    
    const handleMouseLeave = () => {
      mousePressedRef.current = 0;
      setMousePressed(0);
    };

    const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
      setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setMouseStrength(1);
    };

    const handleTouchStart = () => {
      setMousePressed(1);
      setMouseStrength(1);
    };

    const handleTouchEnd = () => {
      setMousePressed(0);
    };

    const handleBlur = () => {
      setMousePressed(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchcancel', handleTouchEnd);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div ref={refDiv} style={{ height: "100vh", position: "fixed", top: 0 }}>
      <svg
        className="w-screen h-screen fixed -z-10 top-0 left-0 pointer-events-none"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          {boids.map((boid, i) => (
            <radialGradient
              key={`boidGradient${i}`}
              id={`boidGradient${i}`}
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor={`hsla(${boid.hue}, 100%, 50%, 0.1)`} />
              <stop offset="100%" stopColor={`hsla(${boid.hue}, 100%, 50%, 0)`} />
            </radialGradient>
          ))}
          <radialGradient id="mouseGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop
              offset="0%"
              stopColor={`hsla(270, 100%, 50%, ${mouseStrength * (mousePressed * 0.125 + 0.125)})`}
            />
            <stop offset="100%" stopColor="hsla(270, 100%, 50%, 0)" />
          </radialGradient>
        </defs>

        {boids.map((boid, i) => (
          <circle
            key={i}
            cx={boid.x}
            cy={boid.y}
            r={boid.r}
            fill={`url(#boidGradient${i})`}
          />
        ))}

        <circle
          cx={mousePosition.x}
          cy={mousePosition.y}
          r={mouseStrength * 100}
          fill="url(#mouseGradient)"
        />
      </svg>
    </div>
  );
};

export default Background;