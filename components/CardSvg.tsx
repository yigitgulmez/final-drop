import { BlockIcon, ReverseIcon, DrawTwoIcon, WildDrawFourIcon, WildIcon, CardColor, CardIcon, COLOR_MAP } from "@/types";
import { ICON_COMPONENTS } from '@/components'

export default function CardSvg({
  color = "blue",
  number = "7",
  width = 66,
  height = 103,
  icon,
}: {
  color?: CardColor;
  number?: string;
  width?: number;
  height?: number;
  icon?: CardIcon;
}) {
  const fillColor = COLOR_MAP[color];
  const IconComp = icon ? ICON_COMPONENTS[icon] : null;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 66 103"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-xl shadow-xl"
    >
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor={fillColor} />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <pattern
          id="stars"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".5" fill="white" opacity=".5" />
        </pattern>
      </defs>

      <rect width="66" height="103" rx="8" fill="url(#bgGradient)" />
      <rect width="66" height="103" rx="8" fill="url(#stars)" />

      {/* Sol üst */}
      {IconComp ? (
        <foreignObject x={3} y={3} width={24} height={24}>
          <IconComp color={fillColor} size={18} />
        </foreignObject>
      ) : (
        <text
          x="8"
          y="20"
          fontSize="16"
          fill="white"
          fontWeight="bold"
          fontFamily="Arial"
        >
          {number}
        </text>
      )}

      {/* Sağ alt */}
      {IconComp ? (
        <foreignObject x={39} y={77} width={24} height={24}>
          <div style={{ transform: "rotate(180deg)" }}>
            <IconComp color={fillColor} size={18} />
          </div>
        </foreignObject>
      ) : (
        <text
          x="58"
          y="83"
          fontSize="16"
          fill="white"
          fontWeight="bold"
          fontFamily="Arial"
          transform="rotate(180,58,83)"
        >
          {number}
        </text>
      )}

      <polygon
        points="33,22 42,43 59,51 42,61 33,81 24,61 7,51 24,43"
        fill="white"
        opacity=".4"
      />

      {/* Ortadaki içerik */}
      {IconComp ? (
        <foreignObject x={14} y={33} width={38} height={38}>
          <IconComp color={fillColor} size={38} />
        </foreignObject>
      ) : (
        <text
          x="33"
          y="65"
          fontSize="36"
          fill="white"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="Arial"
        >
          {number}
        </text>
      )}
    </svg>
  );
}
