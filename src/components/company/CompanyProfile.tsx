"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { createClient } from "next-sanity";
import { useEffect, useState } from "react";

// 1. Sanity 클라이언트 설정
const client = createClient({
  projectId: "mbj14vcv",
  dataset: "production",
  apiVersion: "2024-02-04",
  useCdn: false,
});

interface CompanyProfileData {
  companyName: string;
  representative: string;
  established: string;
  capital: string;
  phone: string;
  business: string;
  licenses: string[];
  hq: { address: string; mapLink: string };
  warehouse: { address: string; mapLink: string };
}

export default function CompanyProfile() {
const [profileData, setProfileData] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. 데이터 페칭 (GROQ 쿼리)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const query = `*[_type == "profile"][0]`;
        const data = await client.fetch(query);
        setProfileData(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 로딩 중일 때 null 대신 스켈레톤이나 빈 화면을 보여주어 섹션 레이아웃 유지
  if (loading) return null; 

  // 3. Sanity 데이터를 기존 UI 구조에 맞게 매핑 (데이터가 없을 경우를 대비해 옵셔널 체이닝 및 기본값 추가)
// 3. Sanity 데이터를 실제 스키마 필드명에 맞게 매핑
  const PROFILE_ROWS = [
    { label: "会社名", value: profileData?.companyName || "-" },
    { label: "代表者", value: profileData?.representative || "-" },
    { label: "設立", value: profileData?.established || "-" },
    { label: "資本金", value: profileData?.capital || "-" },
    { label: "電話번호", value: profileData?.phone || "-" }, // tel -> phone
    { label: "事業内容", value: profileData?.business || "-" },
    { label: "取得資格", values: profileData?.licenses || [] },
    { 
      label: "本社", 
      value: profileData?.hq?.address || "-", // hqAddress -> hq
      link: profileData?.hq?.mapLink // mapUrl -> mapLink
    },
    { 
      label: "倉庫", 
      value: profileData?.warehouse?.address || "-", // warehouseAddress -> warehouse
      link: profileData?.warehouse?.mapLink // mapUrl -> mapLink
    },
  ];

  return (
    <Section>
      <Inner>
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
              信頼と実績を積み重ね、<br />
              お客様と共に成長し続ける企業でありたい。
            </Description>
            <DecorCircle
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </HeaderSide>

        <ContentSide>
          <ProfileTable
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {PROFILE_ROWS.map((row, idx) => (
              <ProfileRow
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="row_inner">
                  <dt className="label">{row.label}</dt>
                  <dd className="data">
                    {row.values ? (
                      <ul className="multi_list">
                        {row.values.map((v: string) => <li key={v}>{v}</li>)}
                      </ul>
                    ) : (
                      <div className="single_val">
                        <span>{row.value}</span>
                        {row.link && (
                          <MapLink href={row.link} target="_blank" rel="noopener noreferrer">
                            <span className="icon">📍</span>
                            Google Map
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
