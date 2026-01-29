"use client";

import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function ContactCta() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <Section id="contact">
      <BackgroundOverlay />
      {/* 1. Inner에 직접 motion 속성 부여 */}
      <Inner
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <ContentBox whileHover={{ x: 10 }}>
          {/* 2. Styled Motion 컴포넌트 사용 */}
          <VerticalLine
            variants={lineVariants as unknown as Variants}
            style={{ originY: 0 }}
          />
          
          <TextMask>
            <Title variants={itemVariants as unknown as Variants}>CONTACT US</Title>
          </TextMask>
          <TextMask>
            <SubTitle variants={itemVariants as unknown as Variants}>お問い合わせ</SubTitle>
          </TextMask>
          <DescMask>
            <Desc variants={itemVariants as unknown as Variants}>
            ご質問などありましたら、お電話かお問い合わせフォームより <br />
            気軽にお問い合わせください。
            </Desc>
          </DescMask>
        </ContentBox>

        <ButtonWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <CtaLink 
            href="/contact" 
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>お問い合わせフォーム</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <HoverBg className="hover-bg" />
          </CtaLink>
        </ButtonWrapper>
      </Inner>
    </Section>
  );
}

/* =========================
   Emotion Styles (수정된 부분)
========================= */

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-image: url("/assets/images/contect_bg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  @media (max-width: 768px) {
    height: auto;
    padding: 80px 0;
    background-attachment: scroll;
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  z-index: 1;
`;

// ★ 핵심: styled(motion.div)를 사용하여 Framer Motion 속성을 허용합니다.
const Inner = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;
  }
`;

const ContentBox = styled(motion.div)`
  position: relative;
  padding-left: 40px;
  cursor: default;
`;

const VerticalLine = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: #fff;
  transition: width 0.3s, background-color 0.3s, box-shadow 0.3s;

  ${ContentBox}:hover & {
    width: 4px;
    background-color: #4bb3c4;
    box-shadow: 0 0 15px rgba(75, 179, 196, 0.6);
  }
`;

const TextMask = styled.div`
  overflow: hidden;
  margin-bottom: 8px;
`;

const DescMask = styled.div`
  overflow: hidden;
  margin-top: 32px;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  color: #fff;
  letter-spacing: -0.03em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  margin: 0;
`;

const Desc = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonWrapper = styled(motion.div)`
  perspective: 1000px;
`;

// ★ Link 컴포넌트의 경우 motion(Link)를 styled로 감쌉니다.
const CtaLink = styled(motion(Link))`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 54px;
  background: #fff;
  color: #000;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  span, svg { position: relative; z-index: 2; }
  svg { 
    width: 22px; height: 22px; 
    transition: transform 0.4s ease; 
  }

  &:hover svg { transform: translate(4px, -4px); }
  &:hover { color: #fff; }
`;

const HoverBg = styled.div`
  position: absolute;
  top: 0; 
  left: -100%;
  width: 100%; 
  height: 100%;
  background: #4BB3C4;
  z-index: 1;
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${CtaLink}:hover & {
    left: 0;
  }
`;