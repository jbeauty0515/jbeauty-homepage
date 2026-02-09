"use client";

import emailjs from "@emailjs/browser";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    email: "",
    email_confirm: "",
    message: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.email_confirm) {
      alert("メールアドレスが一致しません。");
      return;
    }
    if (!formData.agree) {
      alert("個人情報保護方針への同意が必要です。");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_pwrtotg",
        "template_30r5c0f",
        formRef.current!,
        "EdEB7LunkOJGAvDZh"
      );

      alert("お問い合わせを送信いたしました。ありがとうございました。");
      setFormData({
        subject: "",
        name: "",
        email: "",
        email_confirm: "",
        message: "",
        agree: false,
      });
      formRef.current?.reset();
    } catch (error) {
      console.error("Submit error:", error);
      alert(
        "送信中にエラーが発生しました。しばらく経ってから再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <HeaderSection>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CONTACT
        </motion.h2>
        <p>
          製品やサービスに関するお問い合わせは、以下のフォームより承っております。
        </p>
      </HeaderSection>

      <FormContainer
        ref={formRef}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FormLabel>
          <LabelText>
            お問い合わせ項目 <span className="req">必須</span>
          </LabelText>
          <Select
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            <option value="商品について">商品について</option>
            <option value="ご注文・お支払いについて">
              ご注文・お支払いについて
            </option>
            <option value="取引・パートナー提携について">
              取引・パートナー提携について
            </option>
            <option value="その他のお問い合わせ">その他のお問い合わせ</option>
          </Select>
        </FormLabel>

        <FormLabel>
          <LabelText>
            お名前 <span className="req">必須</span>
          </LabelText>
          <Input
            name="name"
            type="text"
            required
            placeholder="例：山田 太郎"
            value={formData.name}
            onChange={handleChange}
          />
        </FormLabel>

        <TwoColumn>
          <FormLabel>
            <LabelText>
              メールアドレス <span className="req">必須</span>
            </LabelText>
            <Input
              name="email"
              type="email"
              required
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </FormLabel>
          <FormLabel>
            <LabelText>
              メールアドレス（確認） <span className="req">必須</span>
            </LabelText>
            <Input
              name="email_confirm"
              type="email"
              required
              placeholder="再度入力してください"
              value={formData.email_confirm}
              onChange={handleChange}
            />
          </FormLabel>
        </TwoColumn>

        <FormLabel>
          <LabelText>お問い合わせ内容</LabelText>
          <TextArea
            name="message"
            rows={6}
            placeholder="詳細をご記入ください"
            value={formData.message}
            onChange={handleChange}
          />
        </FormLabel>

        <AgreeBox>
          <p>
            「
            <PrivacyLink onClick={() => setIsModalOpen(true)}>
              個人情報の取り扱いについて
            </PrivacyLink>
            」の内容を確認し、同意した上で送信してください。
          </p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agree"
              required
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>同意する</span>
          </label>
        </AgreeBox>

        <SubmitSection>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "上記の内容で送信する"}
          </SubmitButton>
        </SubmitSection>
      </FormContainer>

      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            onClick={() => setIsModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <ModalHeader>
                <h2>プライバシーポリシー</h2>
                <p>（個人情報保護方針）</p>
                <CloseButton onClick={() => setIsModalOpen(false)}>
                  ✕
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                <PolicySection>
                  <p className="intro">
                    当サイト（以下、「当サイト」といいます）は、個人情報の保護の重要性を認識し、個人情報保護法および関連法令を遵守し、以下の方針に従って個人情報を適切に管理・利用いたします。
                  </p>
                </PolicySection>

                <PolicySection>
                  <h3>1. 個人情報の取得方法</h3>
                  <p>
                    当サイトでは、お問い合わせフォームのご利用時に、氏名、メールアドレス、電話番号などの個人情報をご提供いただく場合があります。これらの情報は、適正かつ公正な手段で取得し、不正な方法で取得することはありません。
                  </p>
                </PolicySection>

                <PolicySection>
                  <h3>2. 個人情報の利用目的</h3>
                  <p>取得した個人情報は、以下の目的で利用いたします。</p>
                  <ul>
                    <li>お問い合わせへの対応</li>
                    <li>製品やサービスに関するご案内</li>
                    <li>ご質問への回答</li>
                    <li>その他、当サイトの運営に必要な範囲内での利用</li>
                  </ul>
                </PolicySection>

                <PolicySection>
                  <h3>3. 個人情報の管理</h3>
                  <p>
                    当サイトは、個人情報の漏洩、紛失、毀損を防止するため、適切な安全管理措置を講じます。また、個人情報を正確かつ最新の状態に保つよう努めます。
                  </p>
                </PolicySection>

                <PolicySection>
                  <h3>4. 個人情報の第三者提供</h3>
                  <p>
                    法令に基づく場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはありません。
                  </p>
                </PolicySection>

                <PolicySection>
                  <h3>5. 個人情報の開示・訂正・削除等の請求</h3>
                  <p>
                    ご本人からの個人情報の開示、訂正、追加、削除、利用停止、消去、第三者提供の停止のご請求があった場合には、適切に対応いたします。
                  </p>
                </PolicySection>
              </ModalBody>

              <ModalFooter>
                <CloseModalButton onClick={() => setIsModalOpen(false)}>
                  閉じる
                </CloseModalButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

const PageWrapper = styled.section`
  padding: 140px 5%;
  background: #fcfcfc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  h2 {
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #111;
  }
  p {
    color: #666;
    margin-top: 10px;
    font-size: 0.95rem;
  }
`;

const FormContainer = styled(motion.form)`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  display: grid;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelText = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  color: #333;
  .req {
    background: #e5989b;
    color: #fff;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 8px;
    vertical-align: middle;
  }
`;

const commonInput = `
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  transition: all 0.2s;
  &:focus { 
    border-color: #111; 
    outline: none; 
    background: #fafafa; 
  }
`;

const Input = styled.input`
  ${commonInput}
`;

/* ✅ Select 스타일 수정: 아이콘 위치 제어 */
const Select = styled.select`
  ${commonInput}
  appearance: none; /* 브라우저 기본 화살표 제거 */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center; /* 아이콘을 오른쪽에서 16px 띄움 */
  background-size: 16px;
  padding-right: 48px; /* 글자가 아이콘과 겹치지 않도록 충분한 우측 여백 확보 */
  cursor: pointer;

  &::-ms-expand {
    display: none; /* IE 대응 */
  }
`;

const TextArea = styled.textarea`
  ${commonInput} resize: none;
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const AgreeBox = styled.div`
  background: #f8fafc;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  p {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 12px;
    line-height: 1.6;
  }
  .checkbox-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 700;
    cursor: pointer;
    input {
      width: 18px;
      height: 18px;
      accent-color: #111;
      cursor: pointer;
    }
  }
`;

const SubmitSection = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background: #111;
  color: #fff;
  padding: 20px 60px;
  border-radius: 50px;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const PrivacyLink = styled.span`
  text-decoration: underline;
  color: #111;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #e5989b;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 40px 40px 20px;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #111;
  }
  p {
    color: #94a3b8;
    font-size: 0.8rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f1f5f9;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: #e2e8f0;
    transform: rotate(90deg);
    transition: 0.2s;
  }
`;

const ModalBody = styled.div`
  padding: 40px;
`;

const PolicySection = styled.div`
  margin-bottom: 30px;
  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 12px;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 5px;
  }
  p,
  li {
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.8;
  }
  ul {
    padding-left: 20px;
    margin-top: 10px;
  }
`;

const ModalFooter = styled.div`
  padding: 0 40px 40px;
  display: flex;
  justify-content: center;
`;

const CloseModalButton = styled.button`
  background: #111;
  color: #fff;
  padding: 12px 40px;
  border-radius: 50px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;
