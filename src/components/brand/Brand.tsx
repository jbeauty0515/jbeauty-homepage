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

// ✅ 1. Category 인터페이스 추가
export interface Category {
  _id: string;
  title: string;
  value: string;
}

export interface Brand {
  _id: string;
  name: string;
  nameJa: string;
  category: Category;
  eyecatch?: ImageAsset;
  description?: TypedObject[];
  hasPdf: boolean;
  pdfUrl: string | null;
  pdfLabel?: string;
}

/* =========================
   Main Page
========================= */

export default function BrandPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // ✅ 3. 동적 카테고리 상태 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 4. 쿼리 수정: category 데이터를 참조(->)해서 가져오고, 카테고리 목록도 따로 가져옴
        const query = `{
          "brands": *[_type == "brand"] | order(order asc) {
            _id, 
            name, 
            nameJa, 
            "category": category->{_id, title, value}, 
            eyecatch, 
            description, 
            hasPdf, 
            pdfLabel,
            "pdfUrl": pdf.asset->url
          },
          "categories": *[_type == "category"] | order(title asc) {
            _id,
            title,
            value
          }
        }`;

        const { brands, categories } = await client.fetch<{
          brands: Brand[];
          categories: Category[];
        }>(query);
        setBrands(brands);
        setCategories(categories);
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageContainer>
      {loading ? (
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
        </>
      ) : (
        // ✅ 5. 하드코딩된 배열 대신 DB에서 가져온 categories를 기반으로 렌더링
        categories.map((cat) => {
          const filtered = brands.filter((b) => b.category?._id === cat._id);
          if (filtered.length === 0) return null;

          return (
            <CategorySection key={cat._id}>
              <CategoryTitle>{cat.title.toUpperCase()}</CategoryTitle>

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
   Styles (기존과 동일하므로 유지)
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
    background: linear-gradient(
      to bottom,
      transparent 0%,
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

const shimmer = ` @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } } `;
const SkeletonTitle = styled.div`
  width: 200px;
  height: 32px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 8px;
  margin: 0 auto;
  ${shimmer}
`;
const SkeletonCard = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 20px;
  overflow: hidden;
  ${shimmer}
`;
