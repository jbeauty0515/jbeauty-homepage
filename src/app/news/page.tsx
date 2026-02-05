"use client";

import styled from "@emotion/styled";
import { createClient } from "next-sanity";
import Link from "next/link";
import { useEffect, useState } from "react";

const client = createClient({
  projectId: "mbj14vcv",
  dataset: "production",
  apiVersion: "2026-02-04",
  useCdn: false,
});

interface NewsItem {
  _id: string;
  title: string;
  publishedAt: string;
  label: string;
  isPinned: boolean;
  excerpt?: string;
}

export default function NewsListPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      // isHidden이 false인 것 중, 고정글 우선 -> 날짜 최신순 정렬
      const query = `*[_type == "news" && isHidden == false] | order(isPinned desc, publishedAt desc) {
        _id,
        title,
        publishedAt,
        label,
        isPinned,
        excerpt
      }`;
      const data = await client.fetch<NewsItem[]>(query);
      setNewsList(data);
    };
    fetchNews();
  }, []);

  return (
    <Container>
      <Title>NEWS</Title>
      <List>
        {newsList.map((item) => (
          <NewsItem key={item._id} isPinned={item.isPinned}>
            <Link href={`/news/${item._id}`}>
              <div className="info">
                <span className="date">{item.publishedAt}</span>
                <span className={`label ${item.label}`}>
                  {item.isPinned ? "📌 " : ""}{item.label.toUpperCase()}
                </span>
              </div>
              <p className="item_title">{item.title}</p>
              <p className="excerpt">{item.excerpt}</p>
            </Link>
          </NewsItem>
        ))}
      </List>
    </Container>
  );
}

// 스타일 생략 (아래 상세 페이지와 통일감 있게 구성 가능)
const Container = styled.div`padding: 100px 5%; max-width: 1000px; margin: 0 auto;`;
const Title = styled.h1`font-size: 32px; margin-bottom: 50px; text-align: center;`;
const List = styled.div`border-top: 2px solid #111;`;
const NewsItem = styled.div<{ isPinned: boolean }>`
  border-bottom: 1px solid #eee;
  padding: 25px 0;
  background: ${props => props.isPinned ? "#fff9fa" : "transparent"};
  .info { display: flex; gap: 15px; margin-bottom: 10px; align-items: center; }
  .date { font-size: 14px; color: #888; }
  .label { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; color: #fff; background: #ccc; }
  .label.important { background: #e5989b; }
  .label.notice { background: #111; }
  .item_title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .excerpt { font-size: 14px; color: #666; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
`;