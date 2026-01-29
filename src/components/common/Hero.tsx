"use client";

import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Fragment, useRef } from "react";

interface CorporateHeroProps {
  title: string;
  subTitle: string;
  imageSrc: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function Hero({
  title,
  subTitle,
  imageSrc,
  breadcrumbs,
}: CorporateHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <HeroContainer ref={containerRef}>
        {/* 1. 배경 레이어 그룹 */}
        <BgLayer>
          <BgImage src={imageSrc} alt="Background" />
          <GradientOverlay />
          <GridPattern />
          <NoiseTexture />
        </BgLayer>

        {/* 2. 컨텐츠 레이어 */}
        <ContentInner>
          {/* 브레드크럼 */}
          <GlassBreadcrumb
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={index}>
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                {index < breadcrumbs.length - 1 && (
                  <span className="arrow">›</span>
                )}
              </Fragment>
            ))}
          </GlassBreadcrumb>

          <MainContent>
            {/* 타이틀 리빌 애니메이션 */}
            <TitleWrapper>
              <RevealText custom={0}>
                {title} <span className="dot">.</span>
              </RevealText>
            </TitleWrapper>

            <Divider
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
            />

            <SubWrapper>
              <RevealText custom={0.2} isSub>
                {subTitle}
              </RevealText>
              <RevealText custom={0.3} isSub>
                {/* 일본어 텍스트 적용 */}
                絶え間ない革新で、世界の基準を高めていきます。
              </RevealText>
            </SubWrapper>
          </MainContent>
        </ContentInner>
      </HeroContainer>
    </>
  );
}

/* =========================
   Components for Animation
========================= */

const RevealText = ({
  children,
  custom,
  isSub,
}: {
  children: React.ReactNode;
  custom: number;
  isSub?: boolean;
}) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        custom={custom}
        variants={revealVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "inline-block",
          fontSize: isSub ? "inherit" : "inherit",
          lineHeight: isSub ? "1.8" : "1.2", // 일본어 가독성을 위해 줄간격 조정
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const revealVariants: Variants = {
  hidden: { y: "110%", opacity: 0, rotateX: 10 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 0.4 + i,
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

/* =========================
   Styles
========================= */

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0 5.5%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050505;
  margin-top: 67px;

  @media (max-width: 768px) {
    height: 450px;
    margin-top: 52px;
  }
`;

const BgLayer = styled(motion.div)`
  position: absolute;
  inset: -5%;
  width: 110%;
  height: 110%;
  z-index: 0;
`;

const BgImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 15, 30, 0.4) 0%,
    rgba(5, 10, 20, 0.7) 60%,
    rgba(0, 0, 0, 0.9) 100%
  );
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
`;

const NoiseTexture = styled.div`
  position: absolute;
  inset: 0;
  background: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
`;

const ContentInner = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

/* --- Breadcrumb --- */
const GlassBreadcrumb = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  backdrop-filter: blur(10px);
  margin-bottom: 40px;

  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: #fff;
    }
  }

  .arrow {
    color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
  }
  .current {
    color: #fff;
  }
`;

/* --- Main Typography --- */
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;

  .dot {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Divider = styled(motion.div)`
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  margin: 10px 0 20px 0;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
