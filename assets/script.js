const Z = {
  owner: "zavorynofficial",
  repo: "zavoryn-portfolio",
  branch: "main",
  email: "zavoryn@outlook.com",

  paths: {
    posts: "assets/img/post-designing",
    logos: "assets/img/brand-designing/logos",
    letterheads: "assets/img/brand-designing/letterheads",
    businessCards: "assets/img/brand-designing/business-cards",
    stationery: "assets/img/brand-designing/stationery",
    guidelines: "assets/img/brand-designing/brand-guidelines",
    social: "assets/img/social-media-management",
    ai: "assets/img/ai-automation"
  }
};

const API = `https://api.github.com/repos/${Z.owner}/${Z.repo}/contents/`;

const isImg = name =>
  /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(name);


/* =========================================
   GITHUB CONTENTS API
========================================= */

async function contents(path) {
  const url = `${API}${path}?ref=${Z.branch}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}


/* =========================================
   LOAD IMAGES
   Supports files + one level of subfolders
========================================= */

async function images(path) {
  try {
    const items = await contents(path);
    const output = [];

    for (const item of items) {
      /* Direct image */
      if (item.type === "file" && isImg(item.name)) {
        output.push(item);
        continue;
      }

      /* Images inside a subfolder */
      if (item.type === "dir") {
        try {
          const nested = await contents(item.path);

          nested
            .filter(file =>
              file.type === "file" &&
              isImg(file.name)
            )
            .forEach(file => output.push(file));

        } catch (error) {
          console.warn(
            "Could not load subfolder:",
            item.path,
            error
          );
        }
      }
    }

    return output;

  } catch (error) {
    console.warn(
      "Zavoryn catalogue error:",
      path,
      error
    );

    return [];
  }
}


/* =========================================
   CLEAN FILE NAME
========================================= */

const clean = name => {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
};


/* =========================================
   LIGHTBOX
========================================= */

function lightbox(src, alt) {
  const box = document.getElementById("z-lightbox");

  if (!box) return;

  const image = box.querySelector("img");

  if (!image) return;

  image.src = src;
  image.alt = alt;

  box.classList.add("open");

  document.body.classList.add("lightbox-active");
}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {
  const box = document.getElementById("z-lightbox");

  if (!box) return;

  box.classList.remove("open");

  document.body.classList.remove("lightbox-active");
}


/* =========================================
   MEDIA CARD
   Same image:
   - Background = zoomed + blurred + low opacity
   - Foreground = original image
========================================= */

function mediaCard(file, label) {
  const element = document.createElement("article");

  element.className = "media-card reveal";

  const imageUrl = file.download_url;
  const imageAlt = clean(file.name);

  element.innerHTML = `
    <button
      class="media-button"
      type="button"
      aria-label="Open ${imageAlt}"
    >

      <div
        class="media-image"
        style="
          position:relative;
          overflow:hidden;
          isolation:isolate;
        "
      >

        <!-- ZOOMED BACKGROUND IMAGE -->
        <div
          class="media-image-background"
          aria-hidden="true"
          style="
            position:absolute;
            inset:-18%;
            z-index:0;
            background-image:url('${imageUrl}');
            background-position:center;
            background-repeat:no-repeat;
            background-size:cover;
            opacity:0.18;
            filter:blur(16px);
            transform:scale(1.08);
            pointer-events:none;
          "
        ></div>

        <!-- SUBTLE DARK/GLASS OVERLAY -->
        <div
          class="media-image-overlay"
          aria-hidden="true"
          style="
            position:absolute;
            inset:0;
            z-index:1;
            background:rgba(255,255,255,0.04);
            pointer-events:none;
          "
        ></div>

        <!-- ORIGINAL IMAGE -->
        <img
          src="${imageUrl}"
          alt="${imageAlt}"
          loading="lazy"
          decoding="async"
          style="
            position:relative;
            z-index:2;
            display:block;
            width:100%;
            height:100%;
            object-fit:contain;
          "
        />

      </div>

      <div class="media-meta">
        <span>${label}</span>
      </div>

    </button>
  `;

  const button = element.querySelector(".media-button");

  button.addEventListener("click", () => {
    lightbox(imageUrl, imageAlt);
  });

  return element;
}


/* =========================================
   RENDER GALLERY
========================================= */

async function renderGallery(
  element,
  path,
  label,
  limit = 999
) {
  if (!element) return;

  element.innerHTML = `
    <div class="loading">
      Loading work…
    </div>
  `;

  const files = await images(path);

  if (!files.length) {
    element.innerHTML = `
      <div class="notice">
        No work here yet.
        Upload images to this GitHub folder and commit to main.
      </div>
    `;

    return;
  }

  element.innerHTML = "";

  files
    .slice(0, limit)
    .forEach(file => {
      element.appendChild(
        mediaCard(file, label)
      );
    });

  observe();
}


/* =========================================
   SCROLL REVEAL
========================================= */

function observe() {
  const elements = document.querySelectorAll(
    ".reveal:not(.visible)"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  elements.forEach(element => {
    observer.observe(element);
  });
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }


  /* =======================================
     LIGHTBOX EVENTS
  ======================================= */

  const lightboxElement =
    document.getElementById("z-lightbox");

  if (lightboxElement) {

    lightboxElement.addEventListener("click", event => {

      if (
        event.target === lightboxElement ||
        event.target.classList.contains("lightbox-close")
      ) {
        closeLightbox();
      }

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeLightbox();
      }

    });

  }


  /* =======================================
     INITIAL REVEAL
  ======================================= */

  observe();

});