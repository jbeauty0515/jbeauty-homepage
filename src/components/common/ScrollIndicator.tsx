"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  /** 초기 딜레이 (초 단위) */
  delay?: number;
  /** 하단에서의 거리 (px) */
  bottom?: number;
  /** 텍스트 라벨 */
  label?: string;
  /** 색상 테마 ('light' | 'dark') */
  theme?: "light" | "dark";
}

export default function ScrollIndicator({
  delay = 1.2,
  bottom = 50,
  label = "SCROLL",
  theme = "dark",
}: ScrollIndicatorProps) {
  return (
    <StyledScrollIndicator
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      $bottom={bottom}
      $theme={theme}
    >
      <div className="mouse">
        <div className="wheel" />
      </div>
      <span>{label}</span>
    </StyledScrollIndicator>
  );
}

const StyledScrollIndicator = styled(motion.div)<{
  $bottom: number;
  $theme: "light" | "dark";
}>`
  position: absolute;
  bottom: ${(props) => props.$bottom}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0.7;
  z-index: 20;

  .mouse {
    width: 24px;
    height: 38px;
    border: 2px solid
      ${(props) =>
        props.$theme === "dark"
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(0, 0, 0, 0.6)"};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 6px;
  }

  .wheel {
    width: 2px;
    height: 6px;
    background: ${(props) => (props.$theme === "dark" ? "#fff" : "#000")};
    border-radius: 2px;
    animation: scrollWheel 1.5s infinite;
  }

  span {
    font-size: 10px;
    letter-spacing: 0.2em;
    color: ${(props) =>
      props.$theme === "dark"
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(0, 0, 0, 0.6)"};
  }

  @keyframes scrollWheel {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(12px);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    bottom: ${(props) => Math.max(30, props.$bottom - 20)}px;
  }
`;
