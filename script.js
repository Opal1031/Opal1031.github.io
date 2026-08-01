const sections = [...document.querySelectorAll('[data-section]')];
const navItems = [...document.querySelectorAll('[data-nav]')];
const progress = document.querySelector('[data-progress]');

function updateTimeline() {
  const viewportPoint = window.scrollY + window.innerHeight * 0.42;
  let activeId = sections[0].dataset.section;
  sections.forEach((section) => {
    if (section.offsetTop <= viewportPoint) activeId = section.dataset.section;
  });
  const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  if (atPageEnd) activeId = sections.at(-1).dataset.section;
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.nav === activeId));

  const start = sections[0].offsetTop;
  const end = sections.at(-1).offsetTop + sections.at(-1).offsetHeight - window.innerHeight;
  const percent = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
  progress.style.height = `${percent * 100}%`;
}

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();
