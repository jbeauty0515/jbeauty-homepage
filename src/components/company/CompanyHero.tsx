"use client";

import styled from "@emotion/styled";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

interface SubHeroProps {
  title: string;
  subTitle: string;
  imageSrc: string;
}

export default function SubPageHero({ title, subTitle, imageSrc }: SubHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. 스크롤 인터랙션
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // 상단에 위치하므로 움직임 범위를 조금 더 드라마틱하게
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // 2. 마우스 틸트 효과 (우측 작은 이미지 카드용)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

  function handleMouseMove(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yPct = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(xPct * 15);
    y.set(yPct * 15);
  }

  return (
    <HeroSection ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
      <BackgroundLayer style={{ y: bgY }}>
        <MainBg 
          src={imageSrc} 
          alt="Background" 
          initial={{ scale: 1.2 }} // 초기 스케일 약간 증가
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        />
        <OverlayGradient />
        <GrainTexture />
      </BackgroundLayer>

      <Inner>
        {/* 더 넓어지고 경계가 부드러워진 글래스 컨테이너 */}
        <EditorialGlassContainer
          style={{ opacity, y: cardY }}
          initial={{ opacity: 0, y: 80 }} // 등장감 강화
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* [LEFT] 타이포그래피 영역 */}
          <LeftSection>
            <MetaRow>
              <ChapterNo>No. 01</ChapterNo>
              <VerticalDivider />
              <SubLabel>{subTitle}</SubLabel>
            </MetaRow>

            <TitleWrapper>
              <MainTitle variants={staggerText} initial="hidden" animate="visible">
                {title.split(" ").map((word, i) => (
                  <span key={i} className="word">{word}</span>
                ))}
              </MainTitle>
            </TitleWrapper>
            
            <Description>
              日常의 틈새로 스며드는<br/> 
              투명한 향기의 울림을 경험하세요.
            </Description>

            <DetailLink href="#">
              EXPLORE COLLECTION <ArrowIcon>→</ArrowIcon>
            </DetailLink>
          </LeftSection>

          {/* [RIGHT] 비주얼 오브제 영역 */}
          <RightSection>
            <SpinningRing 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }} // 속도 조금 더 천천히
            >
              <svg viewBox="0 0 100 100">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent"/>
                <text width="500">
                  <textPath xlinkHref="#curve" fill="rgba(255,255,255,0.4)" fontSize="13" letterSpacing="0.2em">
                    SCENT OF MEMORY • PURE NATURE •
                  </textPath>
                </text>
              </svg>
            </SpinningRing>

            <PhotoCardWrapper style={{ rotateX: mouseY, rotateY: mouseX }}>
              <PhotoCard>
                <img src={imageSrc} alt="Detail" />
                <div className="shine" />
              </PhotoCard>
            </PhotoCardWrapper>
          </RightSection>

          {/* 프리즘 효과도 살짝 더 은은하게 */}
          <PrismBorder />
        </EditorialGlassContainer>
      </Inner>

      <BottomMeta style={{ opacity }}>
        <div className="coord">37°33'59.0"N 126°58'40.6"E</div>
        <ScrollLine>
          <motion.div className="track" animate={{ height: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} />
        </ScrollLine>
      </BottomMeta>
    </HeroSection>
  );
}

/* =========================
   Animation Variants
========================= */
const staggerText = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

/* =========================
   Emotion Styles
========================= */

const HeroSection = styled.section`
  position: relative;
  width: 100%;
 
  height: 50vh; 
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #050505;
  perspective: 1200px;
 margin-top: 80px;
 @media (max-width: 968px) {
  margin-top: 60px;
 }
`;

const BackgroundLayer = styled(motion.div)`
  position: absolute;
  inset: -5%;
  z-index: 0;
`;

const MainBg = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7; /* 배경 투명도 약간 올려서 더 선명하게 */
  /* filter: blur(3px); <- 상단이므로 블러 제거하여 첫인상을 쨍하게 */
`;

const GrainTexture = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: screen; /* 블렌드 모드 변경으로 더 자연스럽게 */
`;

const OverlayGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(0,0,0,0.1) 0%, #000 90%);
`;

const Inner = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  /* [수정] 최대 너비를 넓혀서 시원하게 */
  max-width: 1500px; 
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

/* 1. 비대칭 구조의 글래스 컨테이너 (수정됨) */
const EditorialGlassContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  /* [수정] 컨테이너 너비 확장 */
  max-width: 1300px;
  /* min-height 제거하고 패딩으로 조절 */
  
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  
  border-radius: 8px; /* 모서리 라운드 약간 증가 */
  
  /* [수정] 경계선을 더 은은하게 변경 */
  background: rgba(255, 255, 255, 0.015);
  backdrop-filter: blur(25px); /* 블러 강도 증가 */
  border: 1px solid rgba(255, 255, 255, 0.04); /* 테두리 더 연하게 */
  box-shadow: 0 30px 80px rgba(0,0,0,0.3); /* 그림자 강도 약간 감소 */
  
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PrismBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 8px;
  padding: 1px;
  /* 프리즘 효과도 더 은은하게 */
  background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
`;

/* [LEFT] 텍스트 섹션 */
const LeftSection = styled.div`
  flex: 1.3; /* 텍스트 영역 비율 약간 증가 */
  padding: 70px; /* 패딩 증가 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;

  @media (max-width: 1024px) {
    align-items: center;
    padding: 50px 30px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  opacity: 0.8;
`;

const ChapterNo = styled.span`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 12px;
  background: rgba(255,255,255,0.4);
`;

const SubLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #a0a0a0;
`;

const TitleWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 25px;
`;

const MainTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  /* 폰트 사이즈 clamp 범위 약간 상향 */
  font-size: clamp(3.5rem, 6vw, 5rem);
  font-weight: 400;
  color: #fff;
  line-height: 1.1;
  
  .word {
    display: inline-block;
    margin-right: 0.25em;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255,255,255,0.7);
  font-weight: 300;
  max-width: 420px;
  margin-bottom: 50px;
`;

const DetailLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 5px;
  transition: opacity 0.3s;
  
  &:hover { opacity: 0.7; }
`;

const ArrowIcon = styled.span`
  font-size: 14px;
`;

/* [RIGHT] 비주얼 섹션 */
const RightSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 배경색을 조금 더 투명하게 */
  background: rgba(0,0,0,0.15);
  border-left: 1px solid rgba(255,255,255,0.03);
  padding: 40px; /* 우측에도 패딩 추가 */

  @media (max-width: 1024px) {
    width: 100%;
    height: 350px;
    border-left: none;
    border-top: 1px solid rgba(255,255,255,0.03);
  }
`;

const SpinningRing = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
`;

const PhotoCardWrapper = styled(motion.div)`
  perspective: 1000px;
  z-index: 2;
  cursor: pointer;
`;

const PhotoCard = styled.div`
  position: relative;
  width: 220px; /* 카드 크기 약간 증가 */
  height: 300px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.4);
  border: 3px solid rgba(255,255,255,0.08);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  .shine {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

/* 하단 메타 정보 */
const BottomMeta = styled(motion.div)`
  position: absolute;
  bottom: 40px; /* 하단 여백 약간 증가 */
  width: 100%;
  max-width: 1300px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  pointer-events: none;
  z-index: 20;
  
  .coord {
    font-size: 9px;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.4);
    font-family: monospace;
  }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 50px; /* 라인 길이 증가 */
  background: rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
  
  .track {
    width: 100%;
    background: rgba(255,255,255,0.8);
    position: absolute;
    top: 0;
  }
`;