"use client";

import { createClient } from "next-sanity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import styled from "@emotion/styled";

const client = createClient({
  projectId: "mbj14vcv",
  dataset: "production",
  apiVersion: "2026-02-04",
  useCdn: false,
});

interface NewsPost {
  _id: string;
  title: string;
  publishedAt: string;
  label: string;
  body: PortableTextBlock[];
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<NewsPost | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      const query = `*[_type == "news" && _id == $id][0]`;
      const data = await client.fetch<NewsPost>(query, { id });
      setPost(data);
    };
    fetchDetail();
  }, [id]);

  if (!post) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Header>
        <div className="meta">
          <span className="date">{post.publishedAt}</span>
          <span className={`label ${post.label}`}>{post.label.toUpperCase()}</span>
        </div>
        <Title>{post.title}</Title>
      </Header>

      <Content>
        {/* PortableText가 JSON 데이터를 HTML로 변환해줍니다 */}
        <PortableText value={post.body} />
      </Content>

      <Footer>
        <BackButton href="/news">목록으로 돌아가기</BackButton>
      </Footer>
    </Container>
  );
}

/* --- Styles --- */
const Container = styled.article`padding: 120px 5%; max-width: 800px; margin: 0 auto;`;
const Header = styled.div`border-bottom: 1px solid #eee; padding-bottom: 30px; margin-bottom: 40px;`;
const Title = styled.h1`font-size: 28px; font-weight: 700; line-height: 1.4; margin-top: 15px;`;
const Content = styled.div`
  font-size: 16px; line-height: 1.8; color: #333; white-space: pre-wrap;
  p { margin-bottom: 1.5em; }
`;
const Footer = styled.div`margin-top: 80px; text-align: center; border-top: 1px solid #eee; padding-top: 40px;`;
const BackButton = styled.a`text-decoration: none; color: #111; font-weight: 600; border: 1px solid #111; padding: 12px 30px; border-radius: 30px; transition: 0.3s; &:hover { background: #111; color: #fff; }`;
const Loading = styled.div`padding: 200px 0; text-align: center;`;