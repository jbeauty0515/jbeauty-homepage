"use client";

import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteFooter>
      <FooterInner>
        <FooterMain>
          <BrandSide>
            <FooterLogo>
              <LogoImg src="/assets/images/j-beauty_logo.svg" alt="j-beauty" />
            </FooterLogo>
            <BrandDesc>
              日常に特別な価値を添える、感性豊かなキュレーション。<br />
              J-BEAUTYは、あなたの美しい暮らしに寄り添います.
            </BrandDesc>
          </BrandSide>

          <NavSide>
            <NavGroup>
              <NavTitle>MENU</NavTitle>
              <div className="links">
                <FooterLink href="/">TOP</FooterLink>
                <FooterLink href="/company">COMPANY</FooterLink>
                <FooterLink href="/brand">BRAND</FooterLink>
                <FooterLink href="/news">NEWS</FooterLink>
              </div>
            </NavGroup>
            <NavGroup>
              <NavTitle>SUPPORT</NavTitle>
              <div className="links">
                <FooterLink href="/contact">CONTACT</FooterLink> 
              </div>
            </NavGroup>
          </NavSide>
        </FooterMain>

        <FooterBottom>
          <InfoArea>
            <p className="address">〒100-6001 東京都千代田区霞が関3-2-5 霞が関ビル5F</p>
            <p className="tel">TEL. 03-6824-0395</p>
          </InfoArea>
          <FooterCopy>© {currentYear} J-beauty. All Rights Reserved.</FooterCopy>
        </FooterBottom>
      </FooterInner>

      <AnimatePresence>
        {showTopBtn && (
          <ScrollTopBtn
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            whileHover={{ y: -5 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ScrollTopBtn>
        )}
      </AnimatePresence>
    </SiteFooter>
  );
}

/* =========================
   Styled Components (Slim Version)
========================= */

const SiteFooter = styled.footer`
  background: #f8f8f8;
  /* 상하 패딩을 대폭 줄여 두께감 조절 */
  padding: 60px 5.5% 30px;
  color: #1a1a1a;
  position: relative;
  
  @media (max-width: 900px) {
    padding: 50px 5.5% 25px;
  }
`;

const FooterInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const FooterMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* 하단 경계선까지의 거리 축소 */
  padding-bottom: 40px;
  border-bottom: 1px solid #e8e8e8;
  
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const BrandSide = styled.div`
  max-width: 400px;
`;

const FooterLogo = styled.div`
  margin-bottom: 20px; /* 여백 축소 */
`;

const LogoImg = styled.img`
  width: 130px; /* 로고 사이즈 미세하게 축소 */
  height: auto;
`;

const BrandDesc = styled.p`
  font-size: 14px; /* 폰트 사이즈 미세하게 축소 */
  line-height: 1.6;
  color: #777;
  word-break: keep-all;
`;

const NavSide = styled.div`
  display: flex;
  gap: 80px; /* 메뉴 간 간격 최적화 */

  @media (max-width: 600px) {
    gap: 0;
    width: 100%;
    justify-content: space-between;
  }
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  .links {
    display: flex;
    flex-direction: column;
    gap: 10px; /* 메뉴 항목 간 간격 축소 */
  }
`;

const NavTitle = styled.h4`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-bottom: 18px;
  color: #bbb;
`;

const FooterLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #4BB3C4;
  }
`;

const FooterBottom = styled.div`
  padding-top: 25px; /* 상단과의 거리 축소 */
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수평 정렬 일치 */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const InfoArea = styled.div`
  font-size: 12px;
  line-height: 1.5;
  color: #999;
  display: flex; /* 주소와 전화를 가로로 배치하여 높이 절약 */
  gap: 20px;
  
  .address {
    font-size: 14px;
    line-height: 1.5;
    color: #999;
  }
  .tel {
    font-size: 14px;
    line-height: 1.5;
    color: #999;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const FooterCopy = styled.p`
  font-size: 11px;
  color: #ccc;
`;

const ScrollTopBtn = styled(motion.button)`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 46px;
  height: 46px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
  z-index: 99;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: #1a1a1a;
    color: #fff;
    border-color: #1a1a1a;
  }

  @media (max-width: 768px) {
    right: 20px;
    bottom: 20px;
  }
`;