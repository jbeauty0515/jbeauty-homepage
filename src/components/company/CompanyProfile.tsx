"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

type ProfileRow =
  | { key: string; label: string; value: string }
  | {
      key: string;
      label: string;
      value: string;
      link?: { href: string; text: string };
    }
  | { key: string; label: string; values: string[] };

const PROFILE: ProfileRow[] = [
  { key: "companyName", label: "会社名", value: "合同会社 J-BEAUTY" },
  { key: "representative", label: "代表者", value: "鄭 柱洪" },
  { key: "established", label: "設立", value: "令和1年5月15日" },
  { key: "capital", label: "資本金", value: "500万円" },
  { key: "tel", label: "電話番号", value: "03-6824-0395" },
  {
    key: "business",
    label: "事業内容",
    value:
      "韓国コスメ・雑貨 / 食品輸入販売 / 卸売業 / イベントマーケティング / 広告",
  },
  {
    key: "licenses",
    label: "取得資格",
    values: [
      "1) 化粧品製造業許可証：13CZ201770",
      "2) 化粧品製造販売業許可証：13C0X12361",
    ],
  },
  {
    key: "hq",
    label: "本社",
    value: "〒100-6001 東京都千代⽥区霞が関3-2-5 霞が関ビル5階",
    link: {
      href: "https://goo.gl/maps/example", // 실제 링크로 교체 필요
      text: "Google Map",
    },
  },
  {
    key: "warehouse",
    label: "倉庫",
    value: "〒121-0836 東京都足立区入谷 2-22-14",
    link: {
      href: "https://goo.gl/maps/example",
      text: "Google Map",
    },
  },
];

export default function CompanyProfile() {
  return (
    <Section>
      <Inner>
        {/* 1. 오른쪽: 헤더 영역 (Sticky) - 교차 배치를 위해 순서 변경 혹은 Flex로 제어 */}
        <HeaderSide>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Label>INFORMATION</Label>
            <Title>COMPANY PROFILE</Title>
            <Description>
              信頼と実績を積み重ね、
              <br />
              お客様と共に成長し続ける企業でありたい。
            </Description>
            {/* 장식용 파스텔 오브젝트 */}
            <DecorCircle
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </HeaderSide>

        {/* 2. 왼쪽: 프로필 데이터 리스트 */}
        <ContentSide>
          <ProfileTable
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {PROFILE.map((row) => (
              <ProfileRow
                key={row.key}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="row_inner">
                  <dt className="label">{row.label}</dt>
                  <dd className="data">
                    {"values" in row ? (
                      <ul className="multi_list">
                        {row.values.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="single_val">
                        <span>{row.value}</span>
                        {"link" in row && row.link && (
                          <MapLink
                            href={row.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="icon">📍</span>
                            {row.link.text}
                          </MapLink>
                        )}
                      </div>
                    )}
                  </dd>
                </div>
              </ProfileRow>
            ))}
          </ProfileTable>
        </ContentSide>
      </Inner>
    </Section>
  );
}

/* =========================
   Styles
========================= */

const Section = styled.section`
  padding: 140px 5%;
  background: #fff; /* 깨끗한 화이트 배경 */
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse; /* [핵심] 헤더를 오른쪽으로 보내기 위해 역순 정렬 */
  justify-content: space-between;
  align-items: flex-start;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column; /* 모바일에서는 다시 세로 정렬 */
    gap: 50px;
  }
`;

/* --- Right Side (Header) --- */
const HeaderSide = styled.div`
  flex: 0 0 35%; /* 너비 비율 조정 */
  position: sticky;
  top: 100px;
  text-align: right; /* 오른쪽 정렬로 균형 맞춤 */

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
    text-align: left; /* 모바일에선 왼쪽 정렬 */
  }
`;

const Label = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #e5989b; /* Service 섹션의 1번 강조색(Muted Rose) 사용 */
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  color: #111;
  margin-bottom: 30px;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 2;
  color: #888;
  margin-bottom: 40px;
  font-feature-settings: "palt";
`;

const DecorCircle = styled(motion.div)`
  position: absolute;
  top: -60px;
  right: -60px;
  width: 300px;
  height: 300px;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
`;

/* --- Left Side (Content List) --- */
const ContentSide = styled.div`
  flex: 1;
  width: 100%;
`;

const ProfileTable = styled(motion.dl)`
  margin: 0;
  border-top: 2px solid #111; /* 상단 굵은 라인으로 무게감 */
`;

const ProfileRow = styled(motion.div)`
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;

  .row_inner {
    display: flex;
    padding: 24px 0;
    align-items: baseline;
    transition: transform 0.3s ease;
  }

  /* 호버 효과: 배경색 은은하게 + 텍스트 이동 */
  &:hover {
    .row_inner {
      transform: translateX(1px); /* 오른쪽으로 살짝 이동 */
    }
  }

  @media (max-width: 768px) {
    .row_inner {
      flex-direction: column;
      gap: 10px;
    }
    &:hover {
      background-color: transparent;
      .row_inner {
        transform: none;
      }
    }
  }
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 15px;
  padding: 4px 10px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #555;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);

  .icon {
    font-size: 10px;
  }

  &:hover {
    background: #111;
    color: #fff;
    border-color: #111;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
    display: table; /* 줄바꿈 */
  }
`;
