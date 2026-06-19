
const revealEls = document.querySelectorAll('.reveal, .reveal-bar');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 화면 안이면 show 켜고, 밖이면 끈다.
    // toggle의 두 번째 인자(isIntersecting)로 추가/제거를 한 번에 처리.
    // → 다시 들어올 때 CSS transition이 처음부터 또 재생됨
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, { threshold: 0.2 });
revealEls.forEach((el) => revealObserver.observe(el));



const counters = document.querySelectorAll('.count');

function runCount(el) {
  const target = Number(el.dataset.target);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runCount(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((el) => countObserver.observe(el));

const navLinks = document.querySelectorAll('.nav_menu a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px' });

document.querySelectorAll('section[id]').forEach((sec) => spyObserver.observe(sec));








const typingEl = document.querySelector('.typing');

if (typingEl) {
  const typingText = "THE WORLD\nRUNS ON\nCHIPS.";
  let typingIndex = 0;
  let built = "";   // 지금까지 친 글자 저장

  function typeChar() {
    if (typingIndex < typingText.length) {
      const char = typingText[typingIndex];
      built += (char === "\n") ? "<br>" : char;
      typingEl.innerHTML = built;
      typingIndex++;
      setTimeout(typeChar,45);
    } else {
      // 타이핑 끝! "CHIPS." 만 깜빡이는 span으로 감싸기
      typingEl.innerHTML = "THE WORLD<br>RUNS ON<br>CHIPS<span class='blink'>.</span>";
    }
  }
  typeChar();
}