"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SERVICES = [
  {
    num: "01",
    title: "トレンド分析 & 商品企画",
    desc: ["コスメ・ライフスタイル動向", "SNS / ECデータ調査", "現地ブランド連携と選定"],
    color: "#E0F7F4"
  },
  {
    num: "02",
    title: "パートナー提案 & 改善サポート",
    desc: ["市場に合わせた商品組", "販売データ分析・改善案提示"],
    color: "#FFF0F0"
  },
  {
    num: "03",
    title: "ロジスティクス & 納品支援",
    desc: ["輸出入・在庫管理・納品", "販促支援"],
    color: "#EEF2FF"
  },
];

export default function CompanyServiceFinal() {
  const [activeIndex, setActiveIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <Inner> 

        {/* 오른쪽: 자동 순환하는 역동적 카드 리스트 */}
        <ServiceSide
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.4 }
            }
          }}
        >
          {SERVICES.map((s, idx) => {
            const isActive = activeIndex === idx;
            return (
              <ServiceCard
                key={s.num}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
                }} 
                onMouseEnter={() => setActiveIndex(idx)}
                $isActive={isActive}
                $bgColor={s.color}
              >
                <CardHeader>
                  <div className="num_circle">
                    <span className="num">{s.num}</span>
                  </div>
                  <h4 className="title">{s.title}</h4>
                </CardHeader>
                <CardBody>
                  <ul className="list">
                    {s.desc.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </CardBody>
                <div className="decor_glow" />
              </ServiceCard>
            );
          })}
        </ServiceSide>        <StorySide>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          >
            <Label>PHILOSOPHY</Label>
            <MainTitle>心地よい暮らしの<br />ご提案</MainTitle>
            <StoryText>
              私たちは、日々の暮らしに「香り」と「心地よさ」をプラスすることで、 <br />
              お客様の毎日に笑顔가 咲く瞬間을 お届けしています。 <br />
              <br />
              世界中から 厳選した、品質に こ다わった 商品を 取り揃え、 <br />
              時代を 超えて 愛される ロングセラーから、最新トレンドの 話題の 商品まで、 <br />
              幅広く ご提案いたします. <br />
              <br />
              香りに 包まれる 癒しの ひととき、心くすぐる デザインの 雑貨との 出会い <br />
              そんな ちょっとした 驚きと、思わず 微笑んでしまうような 体験을, <br />
              私たちは 商品を 通じて お届けします. <br />
              <br />
              日常を ほんの 少し 豊かに. <br />
              お客様の 「好き」に 寄り添う ブランドを 目指しています.
            </StoryText>
          </motion.div>
        </StorySide>

      </Inner>
    </Section>
  );
}

/* =========================
   Emotion Styles
========================= */

const Section = styled.section`
  padding: 140px 5.5%;
  background-color: #fff;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const StorySide = styled.div`
  flex: 0 0 45%;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.4em;
  color: #4bb3c4;
  display: block;
  margin-bottom: 24px;
`;

const MainTitle = styled.h3`
  font-size: 38px;
  font-weight: 700;
  line-height: 1.35;
  color: #1a1a1a;
  margin-bottom: 36px;
`;

const StoryText = styled.p`
  font-size: 15px;
  line-height: 2;
  color: #666;
  word-break: keep-all;
`;

const ServiceSide = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ServiceCard = styled(motion.div)<{ $bgColor: string; $isActive: boolean }>`
  position: relative;
  background-color: ${props => props.$isActive ? "#fff" : "#fcfcfc"};
  padding: 35px 40px;
  border-radius: 24px;
  border: 1px solid ${props => props.$isActive ? props.$bgColor : "#f2f2f2"};
  overflow: hidden;
  box-shadow: ${props => props.$isActive ? "0 20px 40px rgba(0, 0, 0, 0.06)" : "0 4px 20px rgba(0, 0, 0, 0.02)"};
  
  /* 자동 순환 시 시각적 피드백 - 부드럽게 */
  transform: ${props => props.$isActive ? "translateX(-8px)" : "translateX(0)"};
  transition: all 0.5s ease;
  cursor: pointer;

  .decor_glow {
    position: absolute;
    top: -30px;
    right: -30px;
    width: 100px;
    height: 100px;
    background-color: ${props => props.$bgColor};
    border-radius: 50%;
    filter: blur(40px);
    opacity: ${props => props.$isActive ? 0.5 : 0.3};
    transform: ${props => props.$isActive ? "scale(2)" : "scale(1)"};
    transition: all 0.6s ease;
  }

  .num_circle {
    background: ${props => props.$isActive ? props.$bgColor : "#fff"};
    transition: background 0.3s ease;
    .num {
      color: ${props => props.$isActive ? "#fff" : "#4bb3c4"};
      transition: color 0.3s ease;
    }
  }

  &:hover {
    background: #fff;
    border-color: ${props => props.$bgColor};
  }
`;

const CardHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;

  .num_circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    
    .num {
      font-size: 11px;
      font-weight: 900;
    }
  }

  .title {
    font-size: 19px;
    font-weight: 700;
    color: #1a1a1a;
  }
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
  padding-left: 46px;

  .list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 14px;
      color: #777;
      display: flex;
      align-items: center;
      
      &::before {
        content: "";
        width: 10px;
        height: 1px;
        background: #4bb3c4;
        margin-right: 12px;
        opacity: 0.5;
      }
    }
  }
`;