"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

type PartnerLogo = {
  key: string;
  name: string;
  src: string;
  scale?: number;
};

const PARTNERS: PartnerLogo[] = [
  {
    key: "loft",
    name: "Loft",
    src: "/assets/images/partner_logo/logo-loft.png",
    scale: 0.9,
  },
  {
    key: "plaza",
    name: "PLAZA",
    src: "/assets/images/partner_logo/logo-plaza.png",
    scale: 0.8,
  },
  {
    key: "hands",
    name: "HANDS",
    src: "/assets/images/partner_logo/logo-hands.png",
    scale: 0.55,
  },
  {
    key: "shopin",
    name: "shop in",
    src: "/assets/images/partner_logo/logo-shopin.svg",
    scale: 0.95,
  },
  {
    key: "cosme",
    name: "@cosme",
    src: "/assets/images/partner_logo/logo-cosme.svg",
    scale: 1.15,
  },
  {
    key: "aeon",
    name: "AEON",
    src: "/assets/images/partner_logo/logo-aeon.svg",
    scale: 0.75,
  },
  {
    key: "matsukiyo",
    name: "Matsumoto Kiyoshi",
    src: "/assets/images/partner_logo/logo_matsukiyo.png",
    scale: 0.9,
  },
  {
    key: "sugi",
    name: "sugi",
    src: "/assets/images/partner_logo/logo_sugi.svg",
    scale: 0.95,
  },
  {
    key: "itoyokado",
    name: "Ito-Yokado",
    src: "/assets/images/partner_logo/logo_ito-yokado.png",
    scale: 0.9,
  },
  {
    key: "donki",
    name: "Don Quijote",
    src: "/assets/images/partner_logo/logo-donki.png",
    scale: 0.9,
  },
  {
    key: "marui",
    name: "marui",
    src: "/assets/images/partner_logo/logo-marui.svg",
    scale: 0.75,
  },
  {
    key: "tsutaya",
    name: "TSUTAYA",
    src: "/assets/images/partner_logo/logo-tsutaya.png",
    scale: 0.95,
  },
  {
    key: "unico",
    name: "unico",
    src: "/assets/images/partner_logo/logo-unico.svg",
    scale: 1.05,
  },
  {
    key: "studioclip",
    name: "studio CLIP",
    src: "/assets/images/partner_logo/logo-studioclip.png",
    scale: 0.95,
  },
  {
    key: "birthdaybar",
    name: "birthday bar",
    src: "/assets/images/partner_logo/logo-birthdaybar.png",
    scale: 0.95,
  },
];

export default function CompanyPartners() {
  return (
    <>
      <Section>
        <Inner>
          {/* 헤더 영역: 중앙 정렬로 안정감 부여 */}
          <Header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Label>OUR NETWORK</Label>
            <Title>BUSINESS PARTNERS</Title>
            <SubTitle>
              国内外の信頼できるパートナー企業様とともに、
              <br className="mo-only" />
              新しい価値を創造しています。
            </SubTitle>
          </Header>

          {/* 로고 그리드 */}
          <LogoGrid
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              show: { transition: { staggerChildren: 0.03 } }, // 아주 빠른 순차 등장
            }}
          >
            {PARTNERS.map((p) => (
              <LogoItem key={p.key} variants={fadeInItem}>
                <LogoWrap
                  style={{ ["--scale" as string]: String(p.scale ?? 1) }}
                >
                  {/* next/image를 쓰신다면 Image 컴포넌트로 교체 권장 */}
                  <img src={p.src} alt={p.name} />
                </LogoWrap>
              </LogoItem>
            ))}
          </LogoGrid>
        </Inner>
      </Section>
    </>
  );
}

/* =========================
   Motion Variants
========================= */

const fadeInItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/* =========================
   Emotion Styles
========================= */

const Section = styled.section`
  padding: 140px 5%;
  background-color: #f9fafb;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
`;

const Label = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #4bb3c4; /* 기존 포인트 컬러 유지 (청록색) */
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.01em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SubTitle = styled.p`
  font-size: 15px;
  color: #888;
  line-height: 1.8;
  word-break: keep-all;

  .mo-only {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const LogoGrid = styled(motion.div)`
  display: grid;
  /* 5열 그리드 */
  grid-template-columns: repeat(5, 1fr);
  /* 보더 색상 (그리드 라인) */
  background-color: #eeeeee;
  gap: 1px; /* 1px 간격으로 라인 표현 */
  border: 1px solid #eeeeee; /* 외곽선 */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LogoItem = styled(motion.div)`
  background: #fff;
  aspect-ratio: 1.6 / 1; /* 직사각형 비율 유지 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: default; /* 클릭 기능이 없다면 default 커서 */

  /* 호버 시 배경색 미세하게 변화 */
  &:hover {
    background: #fafafa;
    z-index: 1; /* 라인 위로 올라오게 */
  }
`;

const LogoWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(var(--scale, 1));
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: filter, opacity, transform;
  }

  /* 부모(Item) 호버 시 이미지 스타일 변경 */
  ${LogoItem}:hover & img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(calc(var(--scale, 1) * 1.05)); /* 아주 살짝만 커짐 */
  }
`;
