/* =========================
   긴급 공지 팝업 (독립 실행)
   - common.js와 분리 버전
========================= */
(function () {

  const DETAIL_URL = "https://jbcosme.com/product-recall/";
  const NOTICE_VERSION = "recall_2026_01";
  const KEY = "urgent_notice_hide_until_" + NOTICE_VERSION;

  function nowTs() { return Date.now(); }

  function getHideUntil() {
    try { return Number(localStorage.getItem(KEY) || 0); }
    catch (e) { return 0; }
  }

  function setHideUntil(ts) {
    try { localStorage.setItem(KEY, String(ts)); } catch (e) {}
  }

  function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function () {

    // ✅ product-recall 페이지에서는 팝업 실행 안 함
    if (location.pathname.includes("/product-recall")) return;

    // 이미 오늘 숨김이면 종료
    const hideUntil = getHideUntil();
    if (hideUntil && nowTs() < hideUntil) return;

    // ===== 팝업 DOM 생성 =====
    const modal = document.createElement("div");
    modal.id = "urgentNoticeModal";
    modal.className = "urgent-notice";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="urgent-notice__backdrop" data-close></div>
      <div class="urgent-notice__dialog" role="dialog" aria-modal="true" aria-labelledby="urgentNoticeTitle">
        <button type="button" class="urgent-notice__close" aria-label="閉じる" data-close>×</button>

        <p class="urgent-notice__badge">【重要】</p>
        <h2 id="urgentNoticeTitle" class="urgent-notice__title">商品回収（リコール）に関するお知らせ</h2>

        <p class="urgent-notice__text">
          平素より弊社製品をご愛顧いただき、誠にありがとうございます。<br>
          このたび、弊社製造の一部商品において表示不備が判明いたしました。<br>
          お客様の安全・安心を最優先に考え、該当商品の自主回収を実施しております。<br>
          対象商品・回収方法・返金対応などの詳細は下記よりご確認ください。
        </p>

        <div class="urgent-notice__actions">
          <a class="urgent-notice__btn" href="${DETAIL_URL}">詳しいお知らせを見る</a>
          <button type="button" class="urgent-notice__btn urgent-notice__btn--ghost" data-close>閉じる</button>
        </div>

        <label class="urgent-notice__checkbox">
          <input type="checkbox" id="urgentNoticeHideToday">
          今日表示しない
        </label>
      </div>
    `;

    document.body.appendChild(modal);

    // ===== CSS 주입 =====
    const style = document.createElement("style");
    style.textContent = `
      .urgent-notice{position:fixed;inset:0;z-index:99999;display:none}
      .urgent-notice.is-open{display:block}
      .urgent-notice__backdrop{position:absolute;inset:0;background:rgba(0,0,0,.55)}
      .urgent-notice__dialog{
        position: relative;
        width: min(640px, calc(100% - 32px));
        margin: 10vh auto 0;
        background: #fff;
        border-radius: 16px;
        padding: 40px 30px 35px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, .25);
        line-height: 1.7;
        box-sizing: border-box;
      }
      .urgent-notice__close{position:absolute;top:12px;right:26px;font-size:28px;background:transparent;border:0;cursor:pointer}
      .urgent-notice__badge{margin:0 0 6px;font-weight:700;text-align:center;font-size:30px}
      .urgent-notice__title{margin:0 0 10px;font-size:22px;text-align:center}
      .urgent-notice__text{margin:0 0 30px;font-size:16px}
      .urgent-notice__actions{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0 8px}
      .urgent-notice__btn{
        display:inline-flex;align-items:center;justify-content:center;
        padding:10px 14px;border-radius:10px;text-decoration:none;cursor:pointer;
        border:1px solid #111;background:#111;color:#fff;font-size:14px;
      }
      .urgent-notice__btn--ghost{background:#fff;color:#111}
      .urgent-notice__checkbox{display:flex;align-items:center;gap:5px;font-size:16px;color:#333;justify-content:flex-end}
    `;
    document.head.appendChild(style);

    // ===== 표시 =====
    openModal(modal);

    // 닫기 / 오늘 표시 안 함
    modal.addEventListener("click", function (e) {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;

      if (t.hasAttribute("data-close")) {
        const chk = document.getElementById("urgentNoticeHideToday");
        if (chk && chk.checked) {
          const d = new Date();
          d.setHours(23, 59, 59, 999);
          setHideUntil(d.getTime());
        }
        closeModal(modal);
      }
    });

    // ESC 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal(modal);
      }
    });
  });
})();
