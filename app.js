const initialMessage = "Olá! Tenho um imóvel em João Pessoa e gostaria de conversar sobre a administração por temporada.";
const contactUrl = new URL("https://wa.me/5583987332441");
contactUrl.searchParams.set("text", initialMessage);
document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.href = contactUrl.href;
});

const gallery = document.querySelector("#gallery");
const galleryImage = document.querySelector("#gallery-image");
const images = {
  sala: { path: "assets/ambiente-sala.webp", description: "Imagem ilustrativa criada com IA de sala com varanda e vista para o mar" },
  quarto: { path: "assets/ambiente-quarto.webp", description: "Imagem ilustrativa criada com IA de quarto com decoração azul e branca" },
  banheiro: { path: "assets/ambiente-banheiro.webp", description: "Imagem ilustrativa criada com IA de banheiro com bancada clara e box de vidro" }
};
document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => {
    const image = images[button.dataset.gallery];
    galleryImage.src = image.path;
    galleryImage.alt = image.description;
    gallery.showModal();
  });
});
document.querySelector("[data-privacy]").addEventListener("click", () => {
  document.querySelector("#privacy").showModal();
});
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
});
document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".mobile-nav").removeAttribute("open");
  });
});



const presentation = document.querySelector(".hero-journey");
const scenes = [...presentation.querySelectorAll(".cinema-scene")];
const chapterButtons = [...presentation.querySelectorAll("[data-step]")];
const playbackButton = presentation.querySelector("#toggle-animation");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const chapters = [
  {
    label: "Apresentamos seu imóvel",
    title: "Seu imóvel bem apresentado. Interessados bem atendidos.",
    description: "Organizamos a apresentação do espaço e cuidamos das mensagens dos hóspedes."
  },
  {
    label: "Preparamos e recebemos",
    title: "Tudo preparado para a próxima chegada.",
    description: "Cuidamos da limpeza entre estadias e orientamos o hóspede para o check-in."
  },
  {
    label: "Conferimos e informamos",
    title: "Depois da saída, o cuidado continua.",
    description: "Conferimos os itens e registramos as condições do imóvel com fotos para o proprietário."
  }
];
let activeChapter = 0;
let userPaused = reducedMotion.matches;
let presentationVisible = false;
const sceneTimelines = [];

function mayPlay() {
  return !userPaused && presentationVisible && !document.hidden && !reducedMotion.matches;
}

function createChapterTimeline(index) {
  const scene = scenes[index];
  const find = selector => scene.querySelector(selector);
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.65 },
    onComplete: () => {
      if (mayPlay()) activateChapter((index + 1) % chapters.length);
    }
  });
  // Every chapter lasts eight seconds, including its reading time.
  timeline.to({}, { duration: 8 }, 0);

  if (index === 0) {
    timeline
      .fromTo(find(".cinema-apartment"), { scale: 1 }, { scale: 1.1, xPercent: -3, duration: 3.2 }, 0)
      .fromTo(find(".photo-viewfinder"), { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 0.95 }, 0.25)
      .fromTo(find(".camera-object"), { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.3)
      .fromTo(find(".capture-flash"), { opacity: 0 }, { opacity: 0.8, duration: 0.06 }, 1.35)
      .to(find(".capture-flash"), { opacity: 0, duration: 0.18 }, 1.41)
      .fromTo(find(".print-living"), { opacity: 0, x: 40, y: 45, rotation: 0, scale: 0.75 },
        { opacity: 1, x: 0, y: 0, rotation: -7, scale: 1 }, 1.65)
      .fromTo(find(".print-bedroom"), { opacity: 0, x: -20, y: 45, rotation: 0, scale: 0.75 },
        { opacity: 1, x: 0, y: 0, rotation: 7, scale: 1 }, 2.2)
      .to([find(".photo-viewfinder"), find(".camera-object")], { opacity: 0, duration: 0.4 }, 2.8)
      .fromTo(find(".property-listing"), { opacity: 0, y: 20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1 }, 3.2)
      .to(find(".print-living"), { opacity: 0, x: 130, y: -20, scale: 0.4 }, 3.3)
      .to(find(".print-bedroom"), { opacity: 0, x: 80, y: -30, scale: 0.4 }, 3.45)
      .fromTo(find(".conversation-card"), { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 4.8)
      .fromTo(find(".guest-question"), { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.45 }, 5.15)
      .fromTo(find(".team-answer"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, 6.05);
  }

  if (index === 1) {
    timeline
      .fromTo(find(".prepared-bedroom"), { scale: 1.1 }, { scale: 1.01, duration: 8, ease: "none" }, 0)
      .fromTo(find(".bed-confirm"), { opacity: 0, y: 12, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1 }, 0.55)
      .fromTo(find(".kitchen-detail"), { opacity: 0, x: -35, y: 15, rotation: -10 },
        { opacity: 1, x: 0, y: 0, rotation: -4 }, 1.6)
      .fromTo(find(".bathroom-detail"), { opacity: 0, x: 35, y: 15, rotation: 10 },
        { opacity: 1, x: 0, y: 0, rotation: 4 }, 2.8)
      .to(find(".bed-confirm"), { opacity: 0, y: -8 }, 4.8)
      .to([find(".kitchen-detail"), find(".bathroom-detail")], { opacity: 0, y: 15, scale: 0.9 }, 5)
      .fromTo(find(".arrival-instructions"), { opacity: 0, y: 22, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1 }, 5.5)
      .fromTo(find(".ready-label"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 6.4);
  }

  if (index === 2) {
    timeline
      .fromTo(find(".inspection-apartment"), { scale: 1.04, xPercent: 0 },
        { scale: 0.94, xPercent: -8, duration: 3.8 }, 0)
      .fromTo(find(".target-living"), { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1 }, 0.3)
      .fromTo(find(".snapshot-living"), { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0 }, 1.15)
      .to(find(".target-living"), { opacity: 0 }, 1.7)
      .fromTo(find(".target-bedroom"), { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1 }, 1.9)
      .fromTo(find(".snapshot-bedroom"), { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0 }, 2.65)
      .to(find(".target-bedroom"), { opacity: 0 }, 3.3)
      .fromTo(find(".owner-report"), { opacity: 0, x: 25, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1 }, 3.9)
      .to([find(".snapshot-living"), find(".snapshot-bedroom")],
        { opacity: 0, x: 100, y: -15, scale: 0.5 }, 4.1)
      .fromTo(scene.querySelectorAll(".report-check"), { opacity: 0, x: 8 },
        { opacity: 1, x: 0, stagger: 0.3, duration: 0.4 }, 4.9);
  }
  return timeline;
}

function synchronizePlayback() {
  const playing = mayPlay();
  presentation.dataset.playback = playing ? "playing" : "paused";
  playbackButton.textContent = userPaused ? "Reproduzir animação" : "Pausar animação";
  playbackButton.setAttribute("aria-pressed", String(userPaused));
  const timeline = sceneTimelines[activeChapter];
  if (!timeline) return;
  if (playing) timeline.play();
  else timeline.pause();
}

function activateChapter(index) {
  sceneTimelines.forEach(timeline => timeline.pause());
  activeChapter = index;
  scenes.forEach((scene, position) => {
    scene.hidden = position !== index;
  });
  const chapter = chapters[index];
  presentation.dataset.stage = String(index);
  presentation.querySelector("#scene-phase").textContent = chapter.label;
  presentation.querySelector("#story-title").textContent = chapter.title;
  presentation.querySelector("#story-description").textContent = chapter.description;
  presentation.querySelector(".scene-count").textContent = `0${index + 1} / 03`;
  chapterButtons.forEach((button, position) => {
    if (position === index) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  const timeline = sceneTimelines[index];
  if (timeline) {
    timeline.pause(0, true);
    if (userPaused || reducedMotion.matches) timeline.progress(1, true);
  }
  synchronizePlayback();
}

if (window.gsap) {
  chapters.forEach((chapter, index) => sceneTimelines.push(createChapterTimeline(index)));
} else {
  playbackButton.hidden = true;
}

chapterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activateChapter(Number(button.dataset.step));
  });
});
playbackButton.addEventListener("click", () => {
  userPaused = !userPaused;
  const timeline = sceneTimelines[activeChapter];
  if (!userPaused && timeline && timeline.progress() >= 1) timeline.pause(0, true);
  synchronizePlayback();
});
new IntersectionObserver(entries => {
  presentationVisible = entries[0].isIntersecting;
  synchronizePlayback();
}, { threshold: 0.2 }).observe(presentation.querySelector(".hero-maquette"));
document.addEventListener("visibilitychange", synchronizePlayback);
reducedMotion.addEventListener("change", () => {
  userPaused = reducedMotion.matches;
  activateChapter(activeChapter);
});
activateChapter(0);

