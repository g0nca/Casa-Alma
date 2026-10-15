/* =====================================================================
   CASA & ALMA — JavaScript
   ===================================================================== */

/* ╔═══════════════════════════════════════════════════════════════════╗
   ║  ✏️  EDITAR AQUI — CONTACTOS DO NEGÓCIO                             ║
   ║                                                                     ║
   ║  É o ÚNICO sítio que precisa de mexer para ligar os contactos.      ║
   ║  Preencha os campos abaixo. Enquanto estiverem a "" (vazios), o     ║
   ║  site mostra os textos [TELEFONE] / [EMAIL] como marcadores e os    ║
   ║  botões de WhatsApp levam à secção de contactos.                    ║
   ╚═══════════════════════════════════════════════════════════════════╝ */
const CONFIG = {
  // Número de WhatsApp em formato internacional, só dígitos:
  // indicativo de Portugal (351) + número. Ex.: "351912345678"
  whatsappNumber: "351919537734",

  // Mensagem que aparece pré-escrita ao abrir o WhatsApp:
  whatsappDefaultMessage: "Olá Paula! Vim pelo site da Casa & Alma e gostava de saber mais.",

  // Telefone para mostrar e para o botão "ligar". Ex.: "+351 912 345 678"
  phone: "+351 919 537 734",

  // Email. Ex.: "geral@casaealma.pt"
  email: "",

  // Redes sociais (endereço completo). Ex.: "https://instagram.com/casaealma"
  instagram: "",
  facebook: "",
};

/* --------------------------------------------------------------------- */

(function () {
  "use strict";

  const d = document;

  /* 1. ----------------------------------- Ligar contactos a partir do CONFIG */

  // WhatsApp: monta o link wa.me com a mensagem (geral ou específica do botão)
  function waHref(message) {
    const num = CONFIG.whatsappNumber.replace(/\D/g, "");
    if (!num) return null;
    const text = encodeURIComponent(message || CONFIG.whatsappDefaultMessage);
    return `https://wa.me/${num}?text=${text}`;
  }

  d.querySelectorAll("[data-wa]").forEach((el) => {
    const href = waHref(el.getAttribute("data-wa-text"));
    if (href) {
      el.setAttribute("href", href);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
    // Sem número definido → mantém o href original (#contactos) como reserva.
  });

  // Telefone (texto visível + link "tel:")
  if (CONFIG.phone) {
    d.querySelectorAll("[data-tel]").forEach((el) => {
      el.textContent = CONFIG.phone;
      el.setAttribute("href", "tel:" + CONFIG.phone.replace(/[^\d+]/g, ""));
    });
  }

  // Email (texto visível + link "mailto:")
  if (CONFIG.email) {
    d.querySelectorAll("[data-email]").forEach((el) => {
      el.textContent = CONFIG.email;
      el.setAttribute("href", "mailto:" + CONFIG.email);
    });
  }

  // Redes sociais
  function setSocial(selector, url) {
    if (!url) return; // sem endereço → fica como placeholder visível (href="#")
    d.querySelectorAll(selector).forEach((el) => {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }
  setSocial("[data-ig]", CONFIG.instagram);
  setSocial("[data-fb]", CONFIG.facebook);


  /* 2. ------------------------------------------------- Menu (telemóvel) */

  const header = d.querySelector(".site-header");
  const toggle = d.querySelector(".nav-toggle");

  function closeMenu() {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }
  function openMenu() {
    header.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      header.classList.contains("nav-open") ? closeMenu() : openMenu();
    });
  }

  // Fechar o menu ao clicar num link, ao carregar Esc ou ao voltar ao desktop.
  d.querySelectorAll(".nav a").forEach((a) =>
    a.addEventListener("click", closeMenu)
  );
  d.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });


  /* 3. -------------------------------- Sombra do cabeçalho ao fazer scroll */

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  /* 4. ---------------------------------- Animações subtis ao entrar na vista */

  const reveals = d.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Sem animação: mostrar tudo imediatamente.
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    // Pequeno desfasamento (stagger) entre elementos da mesma grelha.
    d.querySelectorAll(".grid").forEach((grid) => {
      grid.querySelectorAll(":scope > .reveal").forEach((el, i) => {
        el.style.transitionDelay = Math.min(i * 70, 350) + "ms";
      });
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }


  /* 5. ------------------------------------------------- Ano no rodapé */

  d.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
