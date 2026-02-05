"use client";

import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import Image from "next/image";
import { useEffect, useState } from "react";

// 1. Sanity Client 설정
const client = createClient({
  projectId: "mbj14vcv",
  dataset: "production",
  apiVersion: "2026-02-04",
  useCdn: false, // 최신 데이터를 즉시 확인하기 위해 false 권장
});

// 2. Image URL Builder 설정
const builder = imageUrlBuilder(client);
function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// 3. API 응답 인터페이스 정의 (응답 JSON 기반)
export interface BrandResponse {
  _id: string;
  name: string;        // 영어 이름
  nameJa?: string;      // 일본어 이름
  category?: "fragrance" | "organic_cosmetics";
  order?: number;
  eyecatch?: {         // 스키마 기준 필드명
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  description?: Array<Record<string, unknown>>;
  hasPdf?: boolean;
  pdfLabel?: string;
  pdfUrl?: string;     // 쿼리에서 추출한 PDF 주소
}

export default function Brand() {
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        /**
         * [GROQ 쿼리 수정 사항]
         * 1. order(order asc): 스키마의 'order' 필드 기준으로 정렬
         * 2. "pdfUrl": pdf.asset->url: 'pdf' 필드에서 실제 파일 주소 추출
         */
        const query = `*[_type == "brand"] | order(order asc) {
          _id,
          name,
          nameJa,
          category,
          order,
          eyecatch,
          description,
          hasPdf,
          pdfLabel,
          "pdfUrl": pdf.asset->url
        }`;
        
        const data = await client.fetch<BrandResponse[]>(query);
        console.log("Fetched Brands:", data);
        setBrands(data);
      } catch (error) {
        console.error("Brand fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <LoadingWrapper>Loading J-BEAUTY Brands...</LoadingWrapper>;
  if (brands.length === 0) return <LoadingWrapper>No brands found.</LoadingWrapper>;

  return (
    <BrandSection>
      <Title>OUR BRANDS</Title>
      <BrandGrid>
        {brands.map((brand) => (
          <BrandCard key={brand._id}>
            {/* 브랜드 로고/이미지 (eyecatch 필드 사용) */}
            <LogoContainer>
              {brand.eyecatch ? (
                <Image
                  src={urlFor(brand.eyecatch).width(400).url()}
                  alt={brand.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <NoImage>No Image</NoImage>
              )}
            </LogoContainer>

            <BrandInfo>
              <BrandName>{brand.name}</BrandName>
              <BrandNameJa>{brand.nameJa}</BrandNameJa>
              <CategoryTag>{brand.category?.replace('_', ' ').toUpperCase()}</CategoryTag>

              {/* PDF 카탈로그 버튼 */}
              {brand.hasPdf && brand.pdfUrl && (
                <PdfButton
                  href={brand.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  📥 {brand.pdfLabel || "Download PDF"}
                </PdfButton>
              )}
            </BrandInfo>
          </BrandCard>
        ))}
      </BrandGrid>
    </BrandSection>
  );
}

/* =========================
   간이 스타일 (Emotion/Styled로 변경 가능)
========================= */
import styled from "@emotion/styled";

const BrandSection = styled.section`
  padding: 100px 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  letter-spacing: 0.1em;
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
`;

const BrandCard = styled.div`
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandInfo = styled.div`
  padding: 25px;
  text-align: center;
`;

const BrandName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const BrandNameJa = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const CategoryTag = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 12px;
  background: #eee;
  border-radius: 20px;
  color: #888;
  margin-bottom: 20px;
`;

const PdfButton = styled.a`
  display: block;
  padding: 12px;
  background: #111;
  color: #fff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover {
    background: #e5989b;
  }
`;

const NoImage = styled.div`
  color: #ccc;
  font-size: 12px;
`;

const LoadingWrapper = styled.div`
  padding: 200px 0;
  text-align: center;
  font-weight: 600;
  color: #888;
`;