const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Reveal on scroll */
const reveals = document.querySelectorAll(".reveal");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.closest(".problem-grid, .cards, .process")
            ? (i % 4) * 80
            : 0;
          setTimeout(() => entry.target.classList.add("in"), delay);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

/* ===== Lead form: envía por WhatsApp o abre correo ===== */
const WA_NUMBER = "56942967564";
const CONTACT_EMAIL = "marketingprofesionalchile@gmail.com";

const leadForm = document.getElementById("leadForm");
const formHint = document.getElementById("formHint");
const emailBtn = document.getElementById("leadEmail");

function getLead() {
  return {
    nombre: document.getElementById("nombre").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    proyecto: document.getElementById("proyecto").value.trim(),
    mensaje: document.getElementById("mensaje").value.trim(),
  };
}

function validate(lead) {
  let ok = true;
  const nombreEl = document.getElementById("nombre");
  const telEl = document.getElementById("telefono");
  [nombreEl, telEl].forEach((el) => el.classList.remove("invalid"));
  if (!lead.nombre) { nombreEl.classList.add("invalid"); ok = false; }
  if (!lead.telefono) { telEl.classList.add("invalid"); ok = false; }
  return ok;
}

function buildText(lead) {
  return (
    `Hola, quiero información para vender las parcelas de mi proyecto.%0A%0A` +
    `Nombre: ${lead.nombre}%0A` +
    `Teléfono: ${lead.telefono}%0A` +
    (lead.proyecto ? `Proyecto/Comuna: ${lead.proyecto}%0A` : ``) +
    (lead.mensaje ? `Mensaje: ${lead.mensaje}` : ``)
  );
}

function showHint(msg, type) {
  if (!formHint) return;
  formHint.textContent = msg;
  formHint.className = "form-hint" + (type ? " " + type : "");
}

leadForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const lead = getLead();
  if (!validate(lead)) {
    showHint("Completa al menos tu nombre y teléfono.", "err");
    return;
  }
  const url = `https://wa.me/${WA_NUMBER}?text=${buildText(lead)}`;
  window.open(url, "_blank", "noopener");
  showHint("¡Listo! Te abrimos WhatsApp para enviar tus datos.", "ok");
  leadForm.reset();
});

emailBtn?.addEventListener("click", () => {
  const lead = getLead();
  if (!validate(lead)) {
    showHint("Completa al menos tu nombre y teléfono.", "err");
    return;
  }
  const subject = encodeURIComponent(`Nuevo contacto: ${lead.nombre} - ${lead.proyecto || "Proyecto de parcelas"}`);
  const body = encodeURIComponent(
    `Nombre: ${lead.nombre}\n` +
    `Teléfono: ${lead.telefono}\n` +
    (lead.proyecto ? `Proyecto/Comuna: ${lead.proyecto}\n` : ``) +
    (lead.mensaje ? `Mensaje: ${lead.mensaje}\n` : ``)
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  showHint("Te abrimos tu correo con los datos listos para enviar.", "ok");
});
