"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type Feature = {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  images: string[];
  reverse?: boolean;
  isAccordion?: boolean;
};

const FEATURES: Feature[] = [
  {
    eyebrow: "会社について",
    title: "COMPANY",
    desc: `私たちは、香りと雑貨を通じて、日常に笑顔と癒しをお届けします。\n世界中から選び抜いた高品質な商品を取り揃え、\nロングセラーから最新のトレンド商品まで幅広くご提案。\n暮らしに寄り添う、ちょっと特別な体験を。\nお客様の毎日を、もっと心地よく、もっと豊かに。

`,
    href: "/company",
    images: ["/assets/images/index_company.jpg"],
    reverse: false,
  },
  {
    eyebrow: "ブランド",
    title: "Brand",
    desc: `香りと暮らしに寄り添う、感性と品質に優れたブランドを厳選。\n日常を豊かに彩る、信頼とトレンドを兼ね備えたアイテムをご紹介します。`,
    href: "/brand",
    images: [
      "/assets/images/ohscent-product.jpg",
      "/assets/images/factory_normal.jpg",
      "/assets/images/jejujoah.jpg",
      "/assets/images/formulier.jpg",
      "/assets/images/chwi.jpg",
    ],
    reverse: true,
    isAccordion: true,
  },
];

export default function HomeFeatureSections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 자동 롤링 로직
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES[1].images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // 애니메이션 Variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }
    }
  };

  return (
    <Wrap>
      <Inner>
        {FEATURES.map((f) => (
          <FeatureRow 
            key={f.title} 
            data-reverse={f.reverse ? "1" : "0"}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <VisualArea>
              {f.isAccordion ? (
                <AccordionWrapper 
                  onMouseEnter={() => setIsPaused(true)} 
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {f.images.map((img, idx) => (
                    <AccordionItem
                      key={idx}
                      animate={{ flex: activeIndex === idx ? 3.5 : 0.6 }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
                      onClick={() => setActiveIndex(idx)}
                    >
                      <motion.img 
                        src={img} 
                        alt="" 
                        layout // 이미지 크기 변화를 부드럽게
                      />
                      <OverlayLabel 
                        animate={{ opacity: activeIndex === idx ? 0 : 0.2 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AccordionItem>
                  ))}
                </AccordionWrapper>
              ) : (
                <MediaCard 
                  variants={textVariants}
                >
                  <Media src={f.images[0]} alt={f.title} loading="lazy" />
                </MediaCard>
              )}
            </VisualArea>

            <Content>
              <Eyebrow variants={textVariants}>{f.eyebrow}</Eyebrow>
              <Title variants={textVariants}>{f.title}</Title>
              <Desc variants={textVariants}>{f.desc}</Desc>
              <Actions variants={textVariants}>
                <PrimaryLink href={f.href}>
                  VIEW MORE <span aria-hidden>→</span>
                </PrimaryLink>
              </Actions>
            </Content>
          </FeatureRow>
        ))}
      </Inner>
    </Wrap>
  );
}

/* =========================
   Emotion + Framer Motion Styles
========================= */

const Wrap = styled.section`
  padding: 140px 5.5%;
  background-color: #fcfcfc;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 160px;
`;

const FeatureRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  &[data-reverse="1"] {
    & > div:first-of-type { order: 2; }
    & > div:last-of-type { order: 1; }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    & > div:first-of-type { order: 1 !important; }
    & > div:last-of-type { order: 2 !important; }
  }
`;

const VisualArea = styled.div`
  width: 100%;
  height: 520px;
`;

const MediaCard = styled(motion.div)`
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
`;

const Media = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AccordionWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const AccordionItem = styled(motion.div)`
  position: relative;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;  
  }
`;

const OverlayLabel = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 1);
  pointer-events: none;
`;

const Content = styled.div`
  padding: 0;
`;

const Eyebrow = styled(motion.span)`
  display: block;
  font-size: 14px;
  color: #999;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const Title = styled(motion.h2)`
  font-size: 56px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const Desc = styled(motion.p)`
  font-size: 17px;
  line-height: 1.9;
  color: #555;
  white-space: pre-line;
  margin-bottom: 40px;
`;

const Actions = styled(motion.div)`
  display: flex;
`;

const PrimaryLink = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  border: 1px solid #1a1a1a;
  padding: 14px 38px;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #1a1a1a;
    color: #fff;
    transform: translateY(-2px);
  }
`;