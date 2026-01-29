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
  { key: "loft", name: "Loft", src: "/assets/images/partner_logo/logo-loft.png", scale: 0.9 },
  { key: "plaza", name: "PLAZA", src: "/assets/images/partner_logo/logo-plaza.png", scale: 0.8 },
  { key: "hands", name: "HANDS", src: "/assets/images/partner_logo/logo-hands.png", scale: 0.55 },
  { key: "shopin", name: "shop in", src: "/assets/images/partner_logo/logo-shopin.svg", scale: 0.95 },
  { key: "cosme", name: "@cosme", src: "/assets/images/partner_logo/logo-cosme.svg", scale: 1.15 },
  { key: "aeon", name: "AEON", src: "/assets/images/partner_logo/logo-aeon.svg", scale: 0.75 },
  { key: "matsukiyo", name: "Matsumoto Kiyoshi", src: "/assets/images/partner_logo/logo_matsukiyo.png", scale: 0.9 },
  { key: "sugi", name: "sugi", src: "/assets/images/partner_logo/logo_sugi.svg", scale: 0.95 },
  { key: "itoyokado", name: "Ito-Yokado", src: "/assets/images/partner_logo/logo_ito-yokado.png", scale: 0.9 },
  { key: "donki", name: "Don Quijote", src: "/assets/images/partner_logo/logo-donki.png", scale: 0.9 },
  { key: "marui", name: "marui", src: "/assets/images/partner_logo/logo-marui.svg", scale: 0.75 },
  { key: "tsutaya", name: "TSUTAYA", src: "/assets/images/partner_logo/logo-tsutaya.png", scale: 0.95 },
  { key: "unico", name: "unico", src: "/assets/images/partner_logo/logo-unico.svg", scale: 1.05 },
  { key: "studioclip", name: "studio CLIP", src: "/assets/images/partner_logo/logo-studioclip.png", scale: 0.95 },
  { key: "birthdaybar", name: "birthday bar", src: "/assets/images/partner_logo/logo-birthdaybar.png", scale: 0.95 },
];

export default function CompanyPartners() {
  return (
    <Section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Inner>
        <Header>
          <motion.span 
            className="label"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            OUR NETWORK
          </motion.span>
          <Title>BUSINESS PARTNERS</Title>
          <SubTitle>国内外の信頼できるパートナー企業様とともに</SubTitle>
        </Header>

        <LogoGrid variants={gridV}>
          {PARTNERS.map((p) => (
            <LogoItem key={p.key} variants={itemV}>
              <LogoWrap style={{ ["--scale" as string]: String(p.scale ?? 1) }}>
                <img src={p.src} alt={p.name} />
              </LogoWrap>
              <HoverOverlay>
                <span className="name">{p.name}</span>
              </HoverOverlay>
            </LogoItem>
          ))}
        </LogoGrid>
      </Inner>
    </Section>
  );
}

/* =========================
   Motion Variants
========================= */

const gridV = {
  show: { transition: { staggerChildren: 0.05 } },
};

const itemV = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* =========================
   Emotion Styles
========================= */

const Section = styled(motion.section)`
  padding: 160px 5.5%;
  background-color: #fafafa; /* 배경에 아주 미세한 그레이를 주어 그리드가 잘 보이게 */
`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 100px;

  .label {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.4em;
    color: #4bb3c4;
    display: block;
    margin-bottom: 20px;
  }
`;

const Title = styled.h2`
  font-size: 38px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #1a1a1a;
  margin: 0;
`;

const SubTitle = styled.p`
  margin-top: 15px;
  font-size: 15px;
  color: #999;
  letter-spacing: 0.05em;
`;

const LogoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #eee; /* 라인 색상 역할 */
  gap: 1px; /* 그리드 라인 두께 */
  border: 1px solid #eee;

  @media (max-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

const LogoItem = styled(motion.div)`
  aspect-ratio: 1.6 / 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    z-index: 10;
    background: #fff;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
`;

const LogoWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);

  img {
    width: 85%;
    max-height: 65px;
    object-fit: contain;
    transform: scale(var(--scale, 1));
    /* 처음부터 선명하게 노출 */
    opacity: 0.85; 
    filter: saturate(1);
    transition: all 0.5s ease;
  }

  ${LogoItem}:hover & {
    transform: translateY(-10px) scale(1.05);
    img { opacity: 1; }
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(to top, rgba(255,255,255,1), transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.4s ease;

  .name {
    font-size: 11px;
    font-weight: 800;
    color: #4bb3c4;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  ${LogoItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;