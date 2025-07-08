import React from "react";

type IconProps = { color: string; size: number };


export function BackgroundBox({
  strokeWidth,
}: {
  strokeWidth: number;
}) {
  return (
    {/* background icon */}
    <rect
      x={-36}
      y={-36}
      width={72}
      height={72}
      rx={12}
      fill="white"
      stroke="black"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.25}
    />
  );
}

export function BlockIcon({ color, size }: IconProps) {
  const strokeWidth = size * 0.1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-40 -40 80 80"
      opacity={0.85}
    >
      <BackgroundBox strokeWidth={strokeWidth}/>

      {/* icon */}
      <path
        d="M-25.8-9C-20.9-23.1-5.3-30.8 9-25.8S30.8-5.3 25.8 9C20.9 23.1 5.3 30.8-9 25.8S-30.8 5.3-25.8-9Zm6 2.1c-1.6 4.4-1.5 9-.2 13L17.2-12c-2.4-3.6-6-6.4-10.4-7.9-10.8-3.8-22.9 2-26.6 13ZM19.9 6.8c1.6-4.4 1.5-9 .1-13.2L-17.4 11.9c2.4 3.6 6 6.4 10.5 8C4 23.7 16 17.8 19.8 6.9Z"
        fill={color}
      />
    </svg>
  );
}



export function ReverseIcon({ color, size }: { color: string; size: number }) {
  const strokeWidth = size * .1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-40 -40 80 80"
      fill="none"
    >
      <BackgroundBox strokeWidth={strokeWidth}/>
      {/* icon */}
      <path
        d="M2.4 1.6C2.4-8 2.4-8-2.4-8h-6.4c-6.4 0-6.4 0-6.4 9.6V6.4c0 12.8-1.6 12.8 4.8 12.8l-8 8-8-8c6.4 0 4.8 0 4.8-12.8V0c0-14.4 0-14.4 12.8-14.4h6.4c11.2 0 11.2 0 11.2 16m6.4-8c0-12.8 1.6-12.8-4.8-12.8l8-9.6 8 9.6c-6.4 0-4.8 0-4.8 12.8V0c0 14.4 0 14.4-12.8 14.4H2.4c-11.2 0-11.2 0-11.2-16h6.4C-2.4 8-2.4 8 2.4 8h6.4c6.4 0 6.4 0 6.4-9.6Z"
        fill={color}
        opacity={0.85}
      />
    </svg>
  );
}


export function DrawTwoIcon({ color, size }: IconProps) {
  const strokeWidth = size * 0.1;
  const center = 0;

  const cardW = Math.max(size * 0.6, 34);
  const cardH = Math.max(size * 0.75, 50);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`-40 -40 80 80`}>
      <BackgroundBox strokeWidth={strokeWidth} />

      {/* back card */}
      <rect
        x={center - cardW / 2 - 5}
        y={center - cardH / 2 - 3}
        width={cardW}
        height={cardH}
        rx={4}
        fill="white"
        opacity={0.6}
      />

      {/* front card */}
      <rect
        x={center - cardW / 2 + 5}
        y={center - cardH / 2 + 2}
        width={cardW}
        height={cardH}
        rx={4}
        fill="white"
      />

      {/* +2 */}
      <text
        x={center}
        y={center + cardH * 0.15}
        textAnchor="middle"
        fontSize={Math.max(size * 0.35, 25)}
        fill={color}
        fontWeight="bold"
        fontFamily="Arial"
      >
        +2
      </text>
    </svg>
  );
}


const COLOR_MAP = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"];

export function WildDrawFourIcon({ color, size }: IconProps) {
  const strokeWidth = size * 0.1;
  const cardSize = 29;
  const gap = 2;

  const positions = [
    [-cardSize - gap / 2, -cardSize - gap / 2],
    [gap / 2, -cardSize - gap / 2],
    [-cardSize - gap / 2, gap / 2],
    [gap / 2, gap / 2],
  ];

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="-40 -40 80 80">
      <BackgroundBox strokeWidth={strokeWidth} />
      
      {/* icon */}
      {positions.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={cardSize}
          height={cardSize}
          fill={COLOR_MAP[i]}
          rx={4}
        />
      ))}

      {/* +4 */}
      <text
        x={0}
        y={9}
        textAnchor="middle"
        fontSize={Math.max(size * 0.8, 30)}
        fill="white"
        stroke="black"
        strokeWidth={0.5}
        fontWeight="bold"
        fontFamily="Arial"
      >
        +4
      </text>
    </svg>
  );
}

export function WildIcon({ color, size }: IconProps) {
  const strokeWidth = size * 0.1;
  const cardSize = 29;
  const gap = 2;

  const positions = [
    [-cardSize - gap / 2, -cardSize - gap / 2],
    [gap / 2, -cardSize - gap / 2],
    [-cardSize - gap / 2, gap / 2],
    [gap / 2, gap / 2],
  ];

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="-40 -40 80 80">
      <BackgroundBox strokeWidth={strokeWidth} />
      {/* icon */}
      {positions.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={cardSize}
          height={cardSize}
          fill={COLOR_MAP[i]}
          rx={4}
        />
      ))}
    </svg>
  );
}
