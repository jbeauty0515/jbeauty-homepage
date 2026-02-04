# 💄 J-BEAUTY Admin Studio (Sanity.io)

J-BEAUTYのブランド、ニュース、会社情報を効率的に管理するための専用管理画面（CMS）です。
J-BEAUTY의 브랜드, 뉴스, 회사 정보를 효율적으로 관리하기 위한 전용 어드민 스튜디오입니다.
A dedicated admin studio for managing J-BEAUTY's brands, news, and company information.

---

## 🇯🇵 日本語 (Japanese)

### 概要
Sanity.ioを使用したヘッドレスCMSで、ウェブサイトのコンテンツをリアルタイムで更新できます。日本人運用者が直感的に操作できるよう、全ての項目に日本語のガイドを適用しています。

### 主な機能
* **会社情報管理**: 本社・倉庫の住所やGoogleマップURL、ライセンス情報などを一括管理。
* **ブランド管理**: 取扱ブランドのロゴ、カテゴリー、PDFカタログの登録。
* **ニュース管理**: お知らせやイベント情報の投稿。トップ固定機能やカテゴリーラベル機能を搭載。

### 実行方法
1. **インストール**: `npm install`
2. **ローカル実行**: `npx sanity dev` (http://localhost:3333)
3. **デプロイ**: `npx sanity deploy`

---

## 🇰🇷 한국어 (Korean)

### 개요
Sanity.io를 기반으로 구축된 헤드리스 CMS로, 웹사이트의 콘텐츠를 실시간으로 업데이트할 수 있습니다. 일본인 운영자가 직관적으로 사용할 수 있도록 모든 항목에 일본어 가이드를 적용했습니다.

### 주요 기능
* **회사 정보 관리**: 본사 및 창고 주소, 구글 맵 URL, 사업자 라이선스 정보 등을 통합 관리.
* **브랜드 관리**: 취급 브랜드의 로고, 카테고리, PDF 카탈로그 등록 및 정렬 순서 관리.
* **뉴스 관리**: 공지사항 및 이벤트 게시판. 상단 고정(Pin) 및 다국어 라벨 기능 포함.

### 실행 방법
1. **패키지 설치**: `npm install`
2. **로컬 실행**: `npx sanity dev` (http://localhost:3333 접속)
3. **배포**: `npx sanity deploy`

---

## 🇺🇸 English (English)

### Overview
A Headless CMS built with Sanity.io that allows real-time content updates for the website. It includes localized Japanese guides for intuitive operation by Japanese administrators.

### Key Features
* **Company Profile**: Centralized management of HQ/Warehouse addresses, Google Maps URLs, and business licenses.
* **Brand Management**: Registration of brand logos, categories, and PDF catalogs with custom display ordering.
* **News Management**: Announcement and event posting with "Pin to Top" and categorized label support.

### Getting Started
1. **Install Dependencies**: `npm install`
2. **Local Development**: `npx sanity dev` (Go to http://localhost:3333)
3. **Deployment**: `npx sanity deploy`

---

## 📂 Project Structure
* `schemaTypes/profile.ts`: Company profile schema (Singleton)
* `schemaTypes/brand.ts`: Brand information schema
* `schemaTypes/news.ts`: News/Announcements schema
