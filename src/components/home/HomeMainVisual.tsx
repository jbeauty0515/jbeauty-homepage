"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

const SLIDE_MS = 5000;

export default function HomeMainVisual() {
  const slides = useMemo(() => [
    { id: "01", bg: "/assets/images/main_v_first.jpg" },
    { id: "02", bg: "/assets/images/main_v_second.jpg" },
    { id: "03", bg: "/assets/images/main_v_third.jpg" },
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Section id="index">
      <StyledSwiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1500}
        autoplay={{ delay: SLIDE_MS, disableOnInteraction: false }}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <SlideBG style={{ backgroundImage: `url(${s.bg})` }} />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <Overlay
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Inner>
          <TextArea>
            <motion.div className="label_wrap" variants={itemVariants}>
              <span className="line"></span>
              <p className="label">PREMIUM LIFESTYLE</p>
            </motion.div>
            <motion.h2 className="catch" variants={itemVariants}>
              JAZZINESS <span className="amp">&</span> <br />
              BLISSFULNESS
            </motion.h2>
          </TextArea>
          
          <RightContent>
            <motion.p className="intro" variants={itemVariants}>
              何気ない日常に、ワンランク上の<br />
              特別な空間と、幸福な時間を<br />
              彩るアイテムを提案いたします.
            </motion.p>
          </RightContent>
        </Inner>

        <Indicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="current">{String(activeIndex + 1).padStart(2, "0")}</span>
          <div className="bar_base">
             <div className="bar_fill" style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }} />
          </div>
          <span className="total">{String(slides.length).padStart(2, "0")}</span>
        </Indicator>

        {/* 중앙 마우스 스크롤 가이드 */}
        <CentralScrollGuide
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow_box">
            <span className="arrow_down"></span>
          </div>
          <p className="text">SCROLL DOWN</p>
        </CentralScrollGuide>
      </Overlay>
    </Section>
  );
}

/* =========================
   Animations & Styles
========================= */

const kenBurns = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;

const wheelAnim = keyframes`
  0% { opacity: 0; transform: translateY(0); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translateY(12px); }
`;

const arrowAnim = keyframes`
  0% { opacity: 0; transform: translateY(-5px) rotate(45deg); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(5px) rotate(45deg); }
`;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const SlideBG = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  animation: ${kenBurns} 10s ease-out infinite alternate;
  filter: brightness(0.75);
`;

const Overlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
`;

const Inner = styled.div`
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
`;

const TextArea = styled.div`
  color: #fff;
  .label_wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 25px;
    .line { width: 35px; height: 1px; background: #fff; }
    .label { font-size: 13px; letter-spacing: 0.3em; font-weight: 500; }
  }
  .catch {
    font-size: 5.5rem;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0;
    .amp { font-weight: 300; font-size: 3rem; opacity: 0.6; }
  }
  @media (max-width: 1500px) {
    .catch { font-size: 3rem; }
  }
  @media (max-width: 768px) {
    .catch { font-size: 2.5rem; }
  }
`;

const RightContent = styled.div`
  color: #fff;
  padding-bottom: 10px;
  .intro {
    font-size: 1.1rem;
    line-height: 2;
    opacity: 0.9;
    text-align: right;
    letter-spacing: 0.05em;
    margin: 0;
  }
  @media (max-width: 900px) {
    .intro { text-align: left; }
  }
`;

const Indicator = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  left: 6%;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #fff;
  .bar_base {
    width: 120px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    position: relative;
    .bar_fill {
      position: absolute;
      left: 0; top: 0; height: 100%;
      background: #fff;
      transition: width 0.6s ease;
    }
  }
  .current, .total { font-size: 12px; letter-spacing: 0.1em; font-weight: 600; }
`;

const CentralScrollGuide = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff;

  .mouse {
    width: 24px;
    height: 38px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    position: relative;
    .wheel {
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      top: 6px;
      left: 50%;
      margin-left: -2px;
      animation: ${wheelAnim} 1.6s ease-out infinite;
    }
  }

  .arrow_box {
    .arrow_down {
      display: block;
      width: 10px;
      height: 10px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      transform: rotate(45deg);
      animation: ${arrowAnim} 1.6s ease-out infinite;
    }
  }

  .text {
    font-size: 10px;
    letter-spacing: 0.2em;
    opacity: 0.6;
    font-weight: 600;
  }
`;