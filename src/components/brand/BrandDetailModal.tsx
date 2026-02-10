"use client";

import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import { useEffect } from "react";
import { Brand, urlFor } from "./Brand";

export default function BrandDetailModal({
  brand,
  open,
  onClose,
}: {
  brand: Brand;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Sheet
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Header>
              <div className="titles">
                <div className="ja">{brand.nameJa}</div>
                <div className="en">{brand.name}</div>
              </div>
              <IconButton type="button" onClick={onClose} aria-label="閉じる">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </IconButton>
            </Header>

            <Body>
              <MediaContainer>
                {brand.eyecatch && (
                  <SquareImage
                    src={urlFor(brand.eyecatch).width(800).height(800).url()}
                    alt={brand.name}
                  />
                )}
              </MediaContainer>

              <ContentSection>
                <TextWrapper>
                  {brand.description?.length ? (
                    <PortableText value={brand.description} />
                  ) : (
                    <p className="empty">説明文がありません。</p>
                  )}
                </TextWrapper>

                <Footer>
                  {brand.hasPdf && brand.pdfUrl ? (
                    <PrimaryLink
                      href={brand.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {/* ✅ pdfLabel이 있으면 사용, 없으면 기본 텍스트 */}
                      <span>{brand.pdfLabel || "PDF를 다운로드"}</span>
                      <ArrowIcon
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </ArrowIcon>
                    </PrimaryLink>
                  ) : (
                    <MutedChip>PDFはありません</MutedChip>
                  )}
                  <SecondaryButton type="button" onClick={onClose}>
                    閉じる
                  </SecondaryButton>
                </Footer>
              </ContentSection>
            </Body>
          </Sheet>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

/* =========================
   Styles
========================= */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  touch-action: none; /* ✅ */

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Sheet = styled(motion.div)`
  width: 100%;
  max-width: 940px;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  /* ✅ 스크롤을 Sheet가 담당 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 480px) {
    border-radius: 18px;
    max-height: 92vh;
  }
`;

const Header = styled.header`
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 12px;

  .titles {
    flex: 1;
    min-width: 0;
  }

  .ja {
    font-size: 1rem;
    font-weight: 700;
    color: #64748b;
    margin-bottom: 4px;
    letter-spacing: 0.02em;
    overflow-wrap: anywhere; /* ✅ */
  }

  .en {
    font-size: 2.2rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
    overflow-wrap: anywhere; /* ✅ */
  }

  @media (max-width: 768px) {
    padding: 22px 20px;
    .en {
      font-size: 1.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 18px 16px;
    .ja {
      font-size: 0.95rem;
    }
    .en {
      font-size: 1.6rem;
    }
  }
`;

const Body = styled.div`
  flex: 1;
  /* ✅ Body 스크롤 제거 */
  overflow: visible;

  padding: 0 32px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    padding: 0 16px 16px;
  }
`;

const MediaContainer = styled.div`
  position: sticky;
  top: 0;
  height: fit-content;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
  }
`;

const SquareImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 20px;
  background: #f8fafc;

  @media (max-width: 480px) {
    border-radius: 16px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const TextWrapper = styled.div`
  font-size: 1.15rem;
  line-height: 1.75;
  color: #334155;
  margin-bottom: 40px;

  /* ✅ 기본은 keep-all, 대신 긴 토큰은 끊을 수 있게 */
  word-break: keep-all;
  overflow-wrap: anywhere;

  p {
    margin-bottom: 1.2em;
  }

  .empty {
    color: #94a3b8;
    font-style: italic;
  }

  @media (max-width: 480px) {
    font-size: 1.02rem;
    margin-bottom: 24px;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const PrimaryLink = styled.a`
  flex: 1;
  min-width: 200px;
  height: 54px;
  background: #0f172a;
  color: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #1e293b;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    min-width: 100%;
    height: 52px;
  }
`;

const MutedChip = styled.div`
  flex: 1;
  height: 54px;
  background: #f8fafc;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-weight: 600;

  @media (max-width: 480px) {
    flex: none;
    width: 100%;
    height: 52px;
  }
`;

const SecondaryButton = styled.button`
  height: 54px;
  padding: 0 28px;
  border-radius: 16px;
  background: #f1f5f9;
  color: #475569;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 52px;
  }
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #f1f5f9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;

  svg {
    width: 22px;
    height: 22px;
  }
  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

const ArrowIcon = styled.svg`
  width: 18px;
  height: 18px;
`;
