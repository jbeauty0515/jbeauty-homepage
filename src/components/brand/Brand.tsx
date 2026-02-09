"use client";

import styled from "@emotion/styled";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { useEffect, useState } from "react";
import BrandDetailModal from "./BrandDetailModal";

/* =========================
   Configuration & Types
========================= */

const client = createClient({
  projectId: "mbj14vcv",
  dataset: "production",
  apiVersion: "2026-02-04",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

interface ImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export function urlFor(source: ImageAsset) {
  return builder.image(source);
}

export interface Brand {
  _id: string;
  name: string;
  nameJa: string;
  category: "fragrance" | "organic_cosmetics";
  eyecatch?: ImageAsset;
  description?: TypedObject[];
  hasPdf: boolean;
  pdfUrl: string | null;
  pdfLabel?: string; // ✅ 추가된 필드
}

/* =========================
   Main Page
========================= */

export default function BrandPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // ✅ 쿼리에 pdfLabel 추가
        const query = `*[_type == "brand"] | order(order asc) {
          _id, 
          name, 
          nameJa, 
          category, 
          eyecatch, 
          description, 
          hasPdf, 
          pdfLabel,
          "pdfUrl": pdf.asset->url
        }`;
        const data = await client.fetch<Brand[]>(query);
        setBrands(data);
      } catch (error) {
        console.error("Brand fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const categories = ["fragrance", "organic_cosmetics"] as const;

  return (
    <PageContainer>
      {loading ? (
        // 로딩 중일 때 스켈레톤 UI 표시
        <>
          <CategorySection>
            <CategoryTitle>
              <SkeletonTitle />
            </CategoryTitle>
            <BrandGrid>
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </BrandGrid>
          </CategorySection>
          <CategorySection>
            <CategoryTitle>
              <SkeletonTitle />
            </CategoryTitle>
            <BrandGrid>
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </BrandGrid>
          </CategorySection>
        </>
      ) : (
        // 로딩 완료 후 실제 데이터 표시
        categories.map((cat) => {
          const filtered = brands.filter((b) => b.category === cat);
          if (filtered.length === 0) return null;

          return (
            <CategorySection key={cat}>
              <CategoryTitle>
                {cat === "fragrance" ? "FRAGRANCE" : "ORGANIC COSMETICS"}
              </CategoryTitle>

              <BrandGrid>
                {filtered.map((brand) => (
                  <BrandCardItem key={brand._id} brand={brand} />
                ))}
              </BrandGrid>
            </CategorySection>
          );
        })
      )}
    </PageContainer>
  );
}

/* =========================
   Item Component
========================= */

function BrandCardItem({ brand }: { brand: Brand }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PreviewCard onClick={() => setOpen(true)}>
        {brand.eyecatch && (
          <Backdrop
            src={urlFor(brand.eyecatch)
              .width(900)
              .height(1100)
              .fit("crop")
              .url()}
            alt={brand.name}
            className="backdrop"
          />
        )}

        <Content>
          <div className="category-label">{brand.nameJa}</div>
          <div className="brand-name">{brand.name}</div>

          <div className="description-area">
            <TextContent>
              {brand.description?.length ? (
                <PortableText value={brand.description} />
              ) : (
                <p>説明文がありません。</p>
              )}
            </TextContent>

            <CardActions>
              <MoreButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                <span>もっと見る</span>
                <ChevronIcon aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M9 18l6-6-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </ChevronIcon>
              </MoreButton>
            </CardActions>
          </div>

          {/* {brand.hasPdf && brand.pdfUrl && (
            <DownloadIcon
              href={brand.pdfUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={brand.pdfLabel || "PDFをダウンロード"}
              title={brand.pdfLabel || "PDFをダウンロード"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#fff"
              >
                <path
                  d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56  58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
                  fill="currentColor"
                />
              </svg>
            </DownloadIcon>
          )} */}
        </Content>
      </PreviewCard>

      <BrandDetailModal
        brand={brand}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/* =========================
   Styles
========================= */

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 120px 5%;
  width: 100%;
  background: #f8f9fa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 96px 5%;
  }

  @media (max-width: 480px) {
    padding: 80px 4.5%;
  }
`;

const CategorySection = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto 10rem;
  @media (max-width: 768px) {
    margin: 0 auto 8rem;
  }
  @media (max-width: 480px) {
    margin: 0 auto 6rem;
  }
`;

const CategoryTitle = styled.h3`
  color: #444;
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  margin-bottom: 4rem;
  padding-left: 1.2rem;
  border-left: 4px solid #111827;

  @media (max-width: 768px) {
    margin-bottom: 2.8rem;
  }
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const PreviewCard = styled.div`
  --gutter: 3rem;
  --brightness: 0.5;
  --frostRadius: 1.5rem;

  position: relative;
  aspect-ratio: 4 / 3.6;
  border-radius: 2.4rem;
  overflow: hidden;
  display: grid;
  align-content: end;
  padding: var(--gutter);
  cursor: pointer;
  transition: transform 250ms ease-in-out;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.12);

  &:hover {
    transform: scale(1.015);
    .backdrop {
      transform: scale(1.06);
    }
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.05) 30%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  @media (max-width: 768px) {
    --gutter: 1.8rem;
    aspect-ratio: 3 / 3.8;
  }

  @media (max-width: 480px) {
    --gutter: 2.5rem;
    aspect-ratio: 3 / 4.2;
  }
`;

const Backdrop = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: 0.2rem;
  color: #fff;
  padding-right: 4rem;

  .category-label {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.2rem;
  }

  .brand-name {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 0.8rem;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  .description-area {
    display: grid;
    gap: 1rem;
  }
`;

const TextContent = styled.div`
  font-size: 1.15rem;
  line-height: 1.6;
  opacity: 0.9;
  word-break: keep-all;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;

  @media (max-width: 768px) {
    -webkit-line-clamp: 3;
  }
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
`;

const MoreButton = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  &:hover span {
    text-decoration: underline;
  }
`;

const ChevronIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

const DownloadIcon = styled.a`
  position: absolute;
  right: 2rem;
  bottom: 2.2rem;
  z-index: 3;

  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    transform: translateY(-3px);
    svg {
      fill: #111;
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 768px) {
    right: 1.5rem;
    bottom: 1.8rem;
  }
`;

/* =========================
   Skeleton Loading Styles
========================= */

const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`;

const SkeletonTitle = styled.div`
  width: 200px;
  height: 32px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 8px;
  margin: 0 auto;

  ${shimmer}
`;

const SkeletonCard = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 20px;
  overflow: hidden;

  ${shimmer}

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3),
      transparent
    );
  }
`;
