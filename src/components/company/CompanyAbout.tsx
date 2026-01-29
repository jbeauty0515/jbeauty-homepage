"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SERVICES = [
  {
    num: "01",
    id: "service-01",
    title: "トレンド分析 & 商品企画",
    desc: [
      "コスメ・ライフスタイル動向",
      "SNS / ECデータ調査",
      "現地ブランド連携と選定",
    ],
    color: "#FFF0F3", // 미스티 로즈
    darkColor: "#E5989B",
  },
  {
    num: "02",
    id: "service-02",
    title: "パートナー提案 & 改善サポート",
    desc: ["市場に合わせた商品構成", "販売データ分析・改善案提示"],
    color: "#F1F7ED", // 세이지 그린
    darkColor: "#94A684",
  },
  {
    num: "03",
    id: "service-03",
    title: "ロジスティクス & 納品支援",
    desc: ["輸出入・在庫管理・納品", "販促支援 (VMD/POP)"],
    color: "#F0F4F8", // 포그 블루
    darkColor: "#8E9AAF",
  },
];

export default function CompanyAbout() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 3초마다 자동 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Section>
        <Inner>
          {/* 1. 왼쪽: 고정된 스토리 (Sticky) */}
          <StorySide>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Label>PHILOSOPHY</Label>
              <MainTitle>
                心地よい暮らしの
                <br />
                ご提案
              </MainTitle>
              <StoryText>
                私たちは、日々の暮らしに<Highlight>「香り」</Highlight>と
                <Highlight>「心地よさ」</Highlight>をプラスすることで、
                <br />
                お客様の毎日に笑顔が咲く瞬間をお届けしています。
                <br />
                <br />
                世界中から厳選した、品質にこだわった商品を取り揃え、
                <br />
                時代を超えて愛されるロングセラーから、最新トレンドの話題の商品まで、
                <br />
                幅広くご提案いたします。
                <br />
                <br />
                香りに包まれる癒しのひととき、心くすぐるデザインの雑貨との出会い
                <br />
                そんなちょっとした驚きと、思わず微笑んでしまうような体験を、
                <br />
                私たちは商品を通じてお届けします。
                <br />
                日常をほんの少し豊かに。
                <br />
                お客様の<Highlight>「好き」</Highlight>
                に寄り添うブランドを目指しています。
              </StoryText>

              <DecorLine
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </motion.div>
          </StorySide>

          {/* 2. 오른쪽: 서비스 리스트 (모두 펼침) */}
          <ServiceSide>
            {SERVICES.map((s, idx) => {
              const isActive = activeIndex === idx;
              return (
                <ServiceCard
                  key={s.id}
                  $isActive={isActive}
                  $baseColor={s.color}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {/* 활성 상태일 때만 보이는 프로그레스 바 */}
                  {isActive && (
                    <ProgressBar>
                      <motion.div
                        className="fill"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        style={{ backgroundColor: s.darkColor }}
                      />
                    </ProgressBar>
                  )}

                  <CardHeader>
                    <NumBadge $isActive={isActive} $darkColor={s.darkColor}>
                      {s.num}
                    </NumBadge>
                    <CardTitle $isActive={isActive}>{s.title}</CardTitle>
                  </CardHeader>

                  {/* 내용이 항상 보임 (AnimatePresence 제거) */}
                  <CardBody>
                    <ul className="desc_list">
                      {s.desc.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </CardBody>
                </ServiceCard>
              );
            })}
          </ServiceSide>
        </Inner>
      </Section>
    </>
  );
}

/* =========================
   Styles
========================= */

const Section = styled.section`
  padding: 120px 5%;
  background-color: #fff;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
`;

/* --- Left Side (Story) --- */
const StorySide = styled.div`
  flex: 0 0 45%;
  position: sticky;
  top: 100px;

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
  }
`;

const Label = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #888;
  margin-bottom: 20px;
  text-transform: uppercase;

  &::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 1px;
    background: #888;
    vertical-align: middle;
    margin-right: 10px;
  }
`;

const MainTitle = styled.h3`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
  margin-bottom: 40px;
  letter-spacing: -0.02em;
`;

const StoryText = styled.p`
  font-size: 15px;
  line-height: 2.2;
  color: #555;
  word-break: break-all;
  margin-bottom: 30px;
`;

const Highlight = styled.span`
  color: #111;
  font-weight: 600;
  background: linear-gradient(to top, #e0f7f4 40%, transparent 40%);
`;

const DecorLine = styled(motion.div)`
  height: 2px;
  background: #111;
`;

/* --- Right Side (Service List) --- */
const ServiceSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px; /* 카드 사이 간격 */
  width: 100%;
`;

const ServiceCard = styled(motion.div)<{
  $isActive: boolean;
  $baseColor: string;
}>`
  position: relative;

  /* 활성 상태: 흰색 배경 + 그림자 + 보더 */
  /* 비활성 상태: 투명 배경(또는 아주 연한 배경) + 흐린 텍스트 */
  background-color: ${(props) =>
    props.$isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  padding: 30px 40px;
  border-radius: 16px;

  border: 1px solid
    ${(props) => (props.$isActive ? props.$baseColor : "transparent")};
  box-shadow: ${(props) =>
    props.$isActive ? "0 20px 40px rgba(0, 0, 0, 0.08)" : "none"};

  /* 비활성 상태일 때 투명도를 낮춰서 활성 카드에 집중시킴 */
  opacity: ${(props) => (props.$isActive ? 1 : 1)};

  /* 크기 변화: 활성 카드를 아주 살짝 키움 */
  transform: ${(props) => (props.$isActive ? "scale(1.02)" : "scale(1)")};

  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s ease; /* 부드러운 전환 */

  &:hover {
    opacity: 1;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;

  .fill {
    height: 100%;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NumBadge = styled.div<{ $isActive: boolean; $darkColor: string }>`
  font-size: 14px;
  font-weight: 700;
  /* 비활성 상태일 때도 숫자는 어느 정도 보이게 */
  color: ${(props) => (props.$isActive ? props.$darkColor : "#aaa")};
  transition: color 0.3s;
`;

const CardTitle = styled.h4<{ $isActive: boolean }>`
  font-size: 18px;
  font-weight: 700;
  /* 비활성 상태일 때 타이틀 색상 흐리게 */
  color: ${(props) => (props.$isActive ? "#111" : "#888")};
  margin: 0;
  transition: color 0.3s;
`;

const CardBody = styled.div`
  /* 높이 0 제한 삭제 -> 항상 보임 */
  height: auto;
  opacity: 1;
  margin-top: 15px;

  .desc_list {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05); /* 아주 연한 구분선 */
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 14px;
      color: #666; /* 기본 가독성 확보 */
      display: flex;
      align-items: center;

      &::before {
        content: "•";
        color: #ccc;
        margin-right: 10px;
        font-size: 1.2em;
      }
    }
  }
`;
