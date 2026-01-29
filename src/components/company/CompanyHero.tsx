"use client";

import styled from "@emotion/styled";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent, useRef } from "react";

interface SubHeroProps {
  title: string;
  subTitle: string;
  imageSrc: string;
}

export default function SubPageHero({
  title,
  subTitle,
  imageSrc,
}: SubHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

  function handleMouseMove(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yPct = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(xPct * 10);
    y.set(yPct * 10);
  }

  // Blob 데이터 (재사용)
  const blobD =
    "M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z";

  return (
    <HeroSection ref={containerRef}>
      <BackgroundLayer style={{ y: bgY }}>
        <MainBg src={imageSrc} alt="Background" />
        <OverlayGradient />
        <GrainTexture />
      </BackgroundLayer>

      <Inner>
        <EditorialGlassContainer style={{ opacity, y: cardY }}>
          <LeftSection>
            <MetaRow>
              <ChapterNo>No. 01</ChapterNo>
              <VerticalDivider />
              <SubLabel>{subTitle}</SubLabel>
            </MetaRow>

            <TitleWrapper>
              <MainTitle
                initial="hidden"
                animate="visible"
                variants={staggerText}
              >
                {title.split(" ").map((word, i) => (
                  <span key={i} className="word">
                    {word}
                  </span>
                ))}
              </MainTitle>
            </TitleWrapper>

            <Description>
              日常의 틈새로 스며드는
              <br />
              투명한 향기의 울림을 경험하세요.
            </Description>

            <DetailLink href="#">
              EXPLORE COLLECTION <span>→</span>
            </DetailLink>
          </LeftSection>

          <RightSection
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
          >
            <BlobWrapper style={{ rotateX: mouseY, rotateY: mouseX }}>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="blobImage"
                    patternUnits="userSpaceOnUse"
                    width="200"
                    height="200"
                  >
                    <image
                      href={imageSrc}
                      x="0"
                      y="0"
                      width="200"
                      height="200"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                  {/* 텍스트용 경로 (Blob보다 살짝 크게 설정 가능) */}
                  <path
                    id="textPathGuide"
                    d={blobD}
                    transform="translate(100, 100)"
                  />
                </defs>

                {/* 이미지 Blob */}
                <motion.path
                  d={blobD}
                  transform="translate(100, 100)"
                  fill="url(#blobImage)"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />

                {/* 회전하는 텍스트 */}
                <motion.text
                  fill="rgba(51, 51, 51, 0.4)"
                  fontSize="7.5"
                  fontWeight="600"
                  style={{ textTransform: "uppercase", letterSpacing: "1px" }}
                >
                  <textPath href="#textPathGuide" startOffset="0%">
                    SCENT OF MEMORY • PURE NATURE • SCENT OF MEMORY • PURE
                    NATURE •
                    <animate
                      attributeName="startOffset"
                      from="0%"
                      to="100%"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </textPath>
                </motion.text>
              </svg>
            </BlobWrapper>
          </RightSection>

          <PrismBorder />
        </EditorialGlassContainer>
      </Inner>
    </HeroSection>
  );
}

/* =========================
   Styles (핵심 수정 레이아웃)
========================= */

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 75vh; /* 높이 약간 조정 */
  min-height: 600px;
  background: #fdfbf7;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
  overflow: hidden;
`;

const Inner = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

const EditorialGlassContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: stretch; /* 높이 동일하게 */
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.02);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  flex: 1.2; /* 텍스트 공간 확보 */
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: 60px 40px;
    align-items: center;
    text-align: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1); /* 미세한 구분감 */
  border-left: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 1024px) {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
  }
`;

const BlobWrapper = styled(motion.div)`
  width: 100%;
  max-width: 480px; /* 크기 최적화 */
  transform-style: preserve-3d;

  svg {
    width: 100%;
    height: 100%;
    /* SVG 내부 요소가 잘리지 않도록 함 */
    overflow: visible;
  }
`;

/* 나머지 스타일은 기존 디자인 유지 */
const BackgroundLayer = styled(motion.div)`
  position: absolute;
  inset: -5%;
  z-index: 0;
`;
const MainBg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
`;
const GrainTexture = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: overlay;
`;
const OverlayGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    #fdfbf7 100%
  );
`;
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;
const ChapterNo = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #333;
`;
const VerticalDivider = styled.div`
  width: 1px;
  height: 12px;
  background: rgba(0, 0, 0, 0.1);
`;
const SubLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #666;
  text-transform: uppercase;
`;
const TitleWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 24px;
`;
const MainTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: clamp(3.2rem, 5vw, 4.8rem);
  color: #1a1a1a;
  line-height: 1.1;
  .word {
    display: inline-block;
    margin-right: 0.25em;
  }
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 40px;
`;
const DetailLink = styled.a`
  font-size: 11px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #333;
  padding-bottom: 4px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.1em;
`;
const PrismBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  pointer-events: none;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent)
    border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
`;
const staggerText = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};
