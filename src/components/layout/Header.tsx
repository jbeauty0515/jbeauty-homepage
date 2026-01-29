"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ variant = "sub" }: { variant?: "home" | "sub" }) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // 스크롤이 50px 이상 내려가면 배경색과 쉐도우 변화
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // 로고 색상 결정 로직 (홈이면서 스크롤 전일 때만 화이트 로고)
  const isWhiteLogo = variant === "home" && !isScrolled;
  const logoSrc = isWhiteLogo
    ? "/assets/images/j-beauty_logo_w.svg"
    : "/assets/images/j-beauty_logo.svg";

  return (
    <HeaderWrapper 
      $variant={variant} 
      $scrolled={isScrolled}
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : variant === "home" ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
        backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.05)" : "0 0 0 rgba(0, 0, 0, 0)",
        paddingTop: isScrolled ? "16px" : "18px",
        paddingBottom: isScrolled ? "16px" : "18px",
      }}
      transition={{ duration: 0.3 }}
    >
      <HeaderInner>
        <Logo>
          <Link href="/" aria-label="Go to home">
            <LogoImg
              src={logoSrc}
              alt="j-beauty"
              $isWhite={isWhiteLogo}
            />
          </Link>
        </Logo>

        <Hamburger
          $open={open}
          $isWhite={isWhiteLogo}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </Hamburger>

        <Nav $open={open}>
          <MobileMenuLogo className="sp_on">
            <Link href="/" onClick={() => setOpen(false)}>
              <MobileLogoImg src="/assets/images/j-beauty_logo.svg" alt="j-beauty" />
            </Link>
          </MobileMenuLogo>

          <NavList> 
            <NavItem><NavLink href="/company" $isWhite={isWhiteLogo} onClick={() => setOpen(false)}>COMPANY</NavLink></NavItem>
            <NavItem><NavLink href="/brand" $isWhite={isWhiteLogo} onClick={() => setOpen(false)}>BRAND</NavLink></NavItem>
            <NavItem><NavLink href="/news" $isWhite={isWhiteLogo} onClick={() => setOpen(false)}>NEWS</NavLink></NavItem>
            <NavItem>
              <ContactBtn href="/contact" $scrolled={isScrolled} onClick={() => setOpen(false)}>
                CONTACT
              </ContactBtn>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}

/* =========================
   Styled Components
========================= */

const HeaderWrapper = styled(motion.header)<{ $variant: "home" | "sub"; $scrolled: boolean }>`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 5.5%;
  
  /* sub 페이지 기본 보더 (스크롤 시 사라짐) */
  ${({ $variant, $scrolled }) => $variant === "sub" && !$scrolled && css`
    border-bottom: 1px solid #eee;
  `}
`;

const HeaderInner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  line-height: 0;
  z-index: 1001;
`;

const LogoImg = styled.img<{ $isWhite: boolean }>`
  width: 140px;
  height: auto;
  transition: filter 0.3s ease;
  
  @media (max-width: 768px) {
    width: 110px;
  }
`;

const Hamburger = styled.button<{ $open: boolean; $isWhite: boolean }>`
  display: none;
  z-index: 1001;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    span {
      display: block;
      width: 28px;
      height: 2px;
      background: ${({ $isWhite, $open }) => $open ? "#333" : $isWhite ? "#fff" : "#333"};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 2px;
    }

    ${({ $open }) => $open && css`
      span:nth-of-type(1) { transform: rotate(45deg) translate(6px, 6px); }
      span:nth-of-type(2) { opacity: 0; }
      span:nth-of-type(3) { transform: rotate(-45deg) translate(5px, -5px); }
    `}
  }
`;

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $open }) => $open ? "0" : "-100%"};
    width: 100%;
    height: 100vh;
    background: #fff;
    flex-direction: column;
    justify-content: center;
    transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 20px;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 60px;
  list-style: none;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$isWhite',
})<{ $isWhite: boolean }>`
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${({ $isWhite }) => $isWhite ? "#fff" : "#1a1a1a"};
  transition: color 0.3s ease;
  
  &:hover {
    color: #4BB3C4;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    color: #1a1a1a !important;
  }
`;

const ContactBtn = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$scrolled',
})<{ $scrolled: boolean }>`
  display: inline-block;
  padding: 12px 32px;
  border-radius: 50px;
  background: #1a1a1a;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #4BB3C4;
    transform: translateY(-1px);
    color: #fff;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px 60px;
    font-size: 16px;
  }
`;

const MobileMenuLogo = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 60px;
  }
`;

const MobileLogoImg = styled.img`
  width: 140px;
`;