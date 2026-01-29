// ✅ Swiper 슬라이드 타이머 + 스크롤 튐 방지
const swiper = new Swiper(".swiper-container", {
  loop: true,
  effect: "fade",
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  simulateTouch: true,
  touchRatio: 1,
  grabCursor: true,
  allowTouchMove: true,
  on: {
    init: function () {
      syncSlideState(this.realIndex);
    },
    slideChangeTransitionStart: function () {
      syncSlideState(this.realIndex);
      document.documentElement.classList.add('swiper-lock-scroll');
      if (this.realIndex === 1) {
        this.params.autoplay.delay = 3000;
        this.autoplay.start();
      }
    },
    slideChangeTransitionEnd: function () {
      setTimeout(() => {
        document.documentElement.classList.remove('swiper-lock-scroll');
      }, 400);
    }
  }
});

function syncSlideState(index) {
  updateSlideNumber(index);
  restartTimer();
}

function updateSlideNumber(index) {
  const slideNumber = document.querySelector(".slide-number");
  if (!slideNumber) return;
  slideNumber.classList.add("fade-out");
  setTimeout(() => {
    const displayNum = (index + 1).toString().padStart(2, '0');
    slideNumber.textContent = displayNum;
    slideNumber.classList.remove("fade-out");
  }, 200);
}

function restartTimer() {
  const progress = document.querySelector(".progress");
  if (!progress) return;
  const newProgress = progress.cloneNode(true);
  progress.parentNode.replaceChild(newProgress, progress);
}

// ✅ 스무스 스크롤 (휠 막기 off 상태)
/*
const sections = document.querySelectorAll("section");
let isScrolling = false;

function getCurrentSectionIndex() {
  const scrollY = window.scrollY;
  let index = 0;
  sections.forEach((section, i) => {
    if (section.offsetTop <= scrollY + 10) index = i;
  });
  return index;
}

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
}

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  const sensitivity = 1;
  if (e.deltaY > sensitivity) {
    scrollToSection(getCurrentSectionIndex() + 1);
  } else if (e.deltaY < -sensitivity) {
    scrollToSection(getCurrentSectionIndex() - 1);
  }
});
*/

// ✅ Fade-in on Scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// ✅ SERVICE 이미지 hover → 자동 정렬
const container = document.querySelector(".image-container");
const wrapper = document.querySelector(".service-wrapper");
if (container && wrapper) {
  const images = container.querySelectorAll("a");
  images.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const imgRect = link.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      const offset = (imgRect.top + imgRect.height / 2) - (wrapperRect.top + wrapperRect.height / 2);

      const style = window.getComputedStyle(container);
      const matrix = new DOMMatrixReadOnly(style.transform);
      const currentY = matrix.m42 || 0;

      container.style.animationPlayState = 'paused';
      container.style.transition = 'transform 0.4s ease';
      container.style.transform = `translateY(${currentY - offset}px)`;
    });

    link.addEventListener("mouseleave", () => {
      container.style.transition = 'transform 0.4s ease';
      container.style.transform = '';
      container.style.animationPlayState = 'running';
    });
  });
}

// ✅ 푸터 등장 시 CONTACT 애니메이션
window.addEventListener("scroll", () => {
  const contactSection = document.querySelector(".contact-section");
  const footer = document.querySelector(".site-footer");
  if (!contactSection || !footer) return;

  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  const buttonArea = document.querySelector(".button-area");
  const textArea = document.querySelector(".contact-text-area");

  if (footerTop <= windowHeight) {
    contactSection.style.width = "90%";
    contactSection.style.borderRadius = "30px";

    if (!buttonArea.classList.contains("animate-right")) {
      buttonArea.classList.add("animate-right");
      setTimeout(() => {
        textArea.classList.add("border-animate");
      }, 800);
    }
  } else {
    contactSection.style.width = "100%";
    contactSection.style.borderRadius = "0";
    buttonArea.classList.remove("animate-right");
    textArea.classList.remove("border-animate");
  }
});

// ✅ 돋보기 효과 커서
if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-dot");
  document.body.appendChild(cursor);

  const lens = document.createElement("div");
  lens.classList.add("lens-cursor");
  document.body.appendChild(lens);

  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lens.style.left = `${mouseX}px`;
    lens.style.top = `${mouseY}px`;
  });

  function animate() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    cursor.style.left = `${dotX}px`;
    cursor.style.top = `${dotY}px`;
    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll("a, button, .hover-target").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      lens.classList.add("active");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      lens.classList.remove("active");
    });
  });
}

// ✅ 햄버거 메뉴
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-btn");
  const nav = document.getElementById("nav-menu");
  let scrollPosition = 0;

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      nav.classList.toggle("open");

      if (hamburger.classList.contains("open")) {
        scrollPosition = window.scrollY;
        document.body.classList.add("no-scroll");
        document.body.style.top = `-${scrollPosition}px`;
      } else {
        document.body.classList.remove("no-scroll");
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition);
      }
    });
  }
});

// ✅ .fade-in 요소 강제 트리거 함수
function triggerFadeIns() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

// ✅ Barba.js + GSAP 전환 효과: 부드러운 페이드 인/아웃
barba.init({
  prevent: ({ el }) => {
    const href = el.getAttribute('href') || '';
    return el.tagName === 'FORM' || href.includes('/contact') || href.includes('/confirm') || href.includes('/thanks');
  },

  transitions: [{
    name: 'blur-in-out',

    // ✅ 떠날 때: 커지며 흐려지며 페이드 아웃
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power2.out"
      });
    },

    // ✅ 도착할 때: 작고 흐린 상태에서 커지고 선명하게
    enter(data) {
      gsap.set(data.next.container, {
        opacity: 0,
        scale: 0.96,
        filter: "blur(12px)"
      });

      return gsap.to(data.next.container, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          // ✅ 페이지 내부 애니메이션 강제 트리거
          document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
              el.classList.add('active');
            }
          });

          // ✅ 페이지별 추가 스크립트 실행 (예: title 애니메이션)
          if (typeof initTitleAnimation === "function") initTitleAnimation();
          if (typeof initProfileItems === "function") initProfileItems();
        }
      });
    }
  }]
}); // ✅ 여기서 Barba.init을 “완전히” 닫음 (중요)

/* =========================
   긴급 공지 팝업
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
    const hideUntil = getHideUntil();
    if (hideUntil && nowTs() < hideUntil) return;

    const modal = document.createElement("div");
    modal.id = "urgentNoticeModal";
    modal.className = "urgent-notice";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="urgent-notice__backdrop" data-close></div>
      <div class="urgent-notice__dialog" role="dialog" aria-modal="true">
        <button type="button" class="urgent-notice__close" data-close>×</button>

        <p class="urgent-notice__badge">【重要】</p>
        <h2 class="urgent-notice__title">商品回収（リコール）に関するお知らせ</h2>

        <p class="urgent-notice__text">
          平素より弊社製品をご愛顧いただき、誠にありがとうございます。<br>
          このたび、弊社製造の一部商品において表示不備が判明いたしました。<br>
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

    const style = document.createElement("style");
    style.textContent = `
      .urgent-notice{position:fixed;inset:0;z-index:99999;display:none}
      .urgent-notice.is-open{display:block}
      .urgent-notice__backdrop{position:absolute;inset:0;background:rgba(0,0,0,.55)}
      .urgent-notice__dialog{
        width:min(640px,calc(100% - 32px));
        margin:10vh auto 0;
        background:#fff;
        border-radius:16px;
        padding:40px 30px;
      }
    `;
    document.head.appendChild(style);

    openModal(modal);

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
  });
})();
