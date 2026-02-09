"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <ContentContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header>
          <h1>プライバシーポリシー</h1>
          <p>（個人情報保護方針）</p>
        </Header>

        <Section>
          <p className="intro">
            当サイト（以下、「当サイト」といいます）は、個人情報の保護の重要性を認識し、個人情報保護法および関連法令を遵守し、以下の方針に従って個人情報を適切に管理・利用いたします。
          </p>
        </Section>

        <Section>
          <h2>1. 個人情報の取得方法</h2>
          <p>
            当サイトでは、お問い合わせフォームのご利用時に、氏名、メールアドレス、電話番号などの個人情報をご提供いただく場合があります。これらの情報は、適正かつ公正な手段で取得し、不正な方法で取得することはありません。
          </p>
        </Section>

        <Section>
          <h2>2. 個人情報の利用目的</h2>
          <p>取得した個人情報は、以下の目的で利用いたします。</p>
          <ul>
            <li>お問い合わせへの対応</li>
            <li>製品やサービスに関するご案内</li>
            <li>ご質問への回答</li>
            <li>その他、当サイトの運営に必要な範囲内での利用</li>
          </ul>
        </Section>

        <Section>
          <h2>3. 個人情報の管理</h2>
          <p>
            当サイトは、個人情報の漏洩、紛失、毀損を防止するため、適切な安全管理措置を講じます。また、個人情報を正確かつ最新の状態に保つよう努めます.
          </p>
        </Section>

        <Section>
          <h2>4. 個人情報の第三者提供</h2>
          <p>
            法令に基づく場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはありません.
          </p>
        </Section>

        <Section>
          <h2>5. 個人情報の開示・訂正・削除等の請求</h2>
          <p>
            ご本人からの個人情報の開示、訂正、追加、削除、利用停止、消去、第三者提供の停止のご請求があった場合には、適切に対応いたします。
          </p>
        </Section>

        <Footer>
          <p>
            © {new Date().getFullYear()} Your Brand Name. All rights reserved.
          </p>
        </Footer>
      </ContentContainer>
    </PageWrapper>
  );
}

/* =========================
   Styles
========================= */

const PageWrapper = styled.section`
  padding: 160px 5% 100px;
  background: #fcfcfc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 80px;
  border-radius: 40px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 40px 24px;
    border-radius: 24px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 8px;
  }
  p {
    color: #94a3b8;
    font-weight: 600;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;

  .intro {
    line-height: 1.8;
    color: #475569;
    font-size: 1.05rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f1f5f9;
  }

  p {
    line-height: 1.8;
    color: #475569;
    font-size: 1rem;
  }

  ul {
    margin-top: 12px;
    padding-left: 20px;
    li {
      line-height: 2;
      color: #475569;
      position: relative;
      list-style: disc;
    }
  }
`;

const Footer = styled.div`
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid #f1f5f9;
  text-align: center;
  p {
    font-size: 0.85rem;
    color: #94a3b8;
  }
`;
