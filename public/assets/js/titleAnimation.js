document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("animatedText");
  const smallContainer = document.getElementById("animatedSmallText");

  const text = container.dataset.title || "TITLE";
  const smallText = smallContainer.dataset.subtitle || "";

  container.innerHTML = "";

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("letter");
    span.style.animationDelay = `${i * 0.1}s`;
    container.appendChild(span);
  });

  // 작은 텍스트 초기화 후 애니메이션 적용
  smallContainer.textContent = smallText;
  smallContainer.style.animationDelay = `${text.length * 0.1 + 0.3}s`; // 자연스럽게 뒤에 시작
});
