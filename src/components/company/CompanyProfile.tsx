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
    value: "韓国コスメ・雑貨 / 食品輸入販売 / 卸売業 / イベントマーケティング / 広告",
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
      href: "https://maps.google.com",
      text: "Google Map",
    },
  },
  {
    key: "warehouse",
    label: "倉庫",
    value: "〒121-0836 東京都足立区入谷 2-22-14",
    link: {
      href: "https://maps.google.com",
      text: "Google Map",
    },
  },
];

export default function CompanyProfile() {
  return (
    <Section>
      <Inner>
        <Header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Label>INFORMATION</Label>
          <Title>COMPANY PROFILE</Title>
        </Header>

        <ProfileGrid
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            show: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {PROFILE.map((row) => (
            <ProfileCard
              key={row.key}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <Dt>{row.label}</Dt>
              <Dd>
                {"values" in row ? (
                  <List>
                    {row.values.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </List>
                ) : (
                  <ValueArea>
                    <p className="val">{row.value}</p>
                    {"link" in row && row.link && (
                      <MapLink href={row.link.href} target="_blank" rel="noopener noreferrer">
                        {row.link.text} <span>→</span>
                      </MapLink>
                    )}
                  </ValueArea>
                )}
              </Dd>
            </ProfileCard>
          ))}
        </ProfileGrid>
      </Inner>
    </Section>
  );
}

/* =========================
   Emotion Styles
========================= */

const Section = styled.section`
  padding: 160px 5.5%;
  background: #fff;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  margin-bottom: 80px;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #4bb3c4;
  display: block;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #1a1a1a;
`;

const ProfileGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2단 구성 */
  gap: 0 80px; /* 가로 간격을 넓게 벌려 매거진 느낌 강조 */
  border-top: 1px solid #1a1a1a;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const ProfileCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    padding-left: 20px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 40px;
      bottom: 40px;
      width: 2px;
      background: #4bb3c4;
    }
  }

  @media (max-width: 768px) {
    padding: 30px 0;
    &:hover { padding-left: 0; &::after { display: none; } }
  }
`;

const Dt = styled.dt`
  font-size: 13px;
  font-weight: 800;
  color: #aaa;
  margin-bottom: 15px;
  letter-spacing: 0.05em;
`;

const Dd = styled.dd`
  margin: 0;
`;

const ValueArea = styled.div`
  .val {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    line-height: 1.7;
    margin: 0;
    word-break: keep-all;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.6;
    &:last-child { margin-bottom: 0; }
  }
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #4bb3c4;
  text-decoration: none;
  transition: gap 0.3s;

  span { font-size: 14px; transition: transform 0.3s; }

  &:hover {
    gap: 15px;
    span { transform: translateX(3px); }
  }
`;