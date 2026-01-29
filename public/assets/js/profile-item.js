function initProfileItems() {
  const items = document.querySelectorAll('.profile-item');

  const groups = {};
  items.forEach(item => {
    const index = item.dataset.index;
    if (!groups[index]) groups[index] = [];
    groups[index].push(item);
  });

  const observer = new IntersectionObserver((entries) => {
    let appeared = new Set();

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index;
        if (appeared.has(index)) return;
        appeared.add(index);

        setTimeout(() => {
          groups[index].forEach(el => el.classList.add('show'));
        }, index * 100);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}