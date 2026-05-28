/**
 * Surya Ghosh Academy - Core UI & SPA Logic
 * Features a high-performance custom state-based hash router, course filter/search engine,
 * interactive accordion modules, scrolling testimonials slider, light/dark theme manager, and
 * custom form submission simulations with detailed micro-feedbacks.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // Core State Manager
  // ==========================================================================
  const AppState = {
    currentTheme: "light",
    activeCategory: "all",
    searchQuery: "",
    selectedCourseId: null,
  };

  // Cache DOM Elements
  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById("theme-toggle"),
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    navMenu: document.getElementById("nav-menu"),
    navLinks: document.querySelectorAll(".nav-link"),
    viewSections: document.querySelectorAll(".view-section"),
    
    // Testimonials
    testimonialTrack: document.getElementById("testimonial-track"),
    prevTestimonialBtn: document.getElementById("prev-testimonial"),
    nextTestimonialBtn: document.getElementById("next-testimonial"),

    // Courses View
    coursesContainer: document.getElementById("courses-grid-container"),
    searchField: document.getElementById("course-search-field"),
    filterTagsRow: document.getElementById("filter-tags-row"),

    // Course Details View
    courseDetailsBody: document.getElementById("course-details-dynamic-body"),
    mobileStickyBar: document.getElementById("mobile-sticky-action-bar"),

    // Contact & Community Forms
    contactForm: document.getElementById("academy-contact-form"),
    contactFormBox: document.getElementById("contact-pane-box-wrapper"),
    contactSuccessCard: document.getElementById("contact-success-card"),
    newsletterForm: document.getElementById("academy-newsletter-form"),
    newsletterBox: document.getElementById("newsletter-box-wrapper"),
    newsletterSuccessCard: document.getElementById("newsletter-success-card"),

    // Achievements Grid & Lightbox elements
    achievementsGrid: document.getElementById("achievements-grid-container"),
    aboutAchievementsGrid: document.getElementById("about-achievements-container"),
    lightboxModal: document.getElementById("achievement-lightbox"),
    lightboxImg: document.getElementById("lightbox-img"),
    lightboxClose: document.getElementById("lightbox-close"),
    lightboxBadge: document.getElementById("lightbox-badge"),
    lightboxTitle: document.getElementById("lightbox-title"),
    lightboxSubtitle: document.getElementById("lightbox-subtitle"),
  };

  // ==========================================================================
  // Custom SPA Hash Router
  // ==========================================================================
  const handleRouting = () => {
    const rawHash = window.location.hash || "#home";
    let viewName = rawHash;
    let queryParams = {};

    // Clear active states in mobile menus
    DOM.navMenu.classList.remove("active");

    // Check for complex route with queries (e.g. #course-details?id=personal-finance-masterclass)
    if (rawHash.includes("?")) {
      const parts = rawHash.split("?");
      viewName = parts[0];
      const queryStr = parts[1];
      queryStr.split("&").forEach(param => {
        const [key, val] = param.split("=");
        queryParams[key] = decodeURIComponent(val);
      });
    }

    // Scroll back to top during transition
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Transition view sections
    let foundView = false;
    DOM.viewSections.forEach(section => {
      const sectionId = `#${section.id.replace("-view", "")}`;
      if (sectionId === viewName) {
        section.classList.add("active");
        foundView = true;
      } else {
        section.classList.remove("active");
      }
    });

    // Fallback if view doesn't exist
    if (!foundView) {
      document.getElementById("home-view").classList.add("active");
      viewName = "#home";
    }

    // Synchronize Header Links Active state
    DOM.navLinks.forEach(link => {
      const linkHash = link.getAttribute("href");
      if (linkHash === viewName || (viewName === "#course-details" && linkHash === "#courses")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Route-specific Initialization Logic
    if (viewName === "#home") {
      renderFeaturedCourses();
    } else if (viewName === "#courses") {
      renderCoursesPage();
    } else if (viewName === "#course-details") {
      const courseId = queryParams.id;
      if (courseId) {
        AppState.selectedCourseId = courseId;
        renderCourseDetailsPage(courseId);
      } else {
        window.location.hash = "#courses";
      }
    }
  };

  // Listen for hash changes
  window.addEventListener("hashchange", handleRouting);

  // ==========================================================================
  // Theme Manager (Light / Obsidian Dark Mode)
  // ==========================================================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem("sg-academy-theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      AppState.currentTheme = savedTheme;
    } else if (userPrefersDark) {
      AppState.currentTheme = "dark";
    } else {
      AppState.currentTheme = "light";
    }
    
    applyTheme();
  };

  const applyTheme = () => {
    DOM.html.setAttribute("data-theme", AppState.currentTheme);
    localStorage.setItem("sg-academy-theme", AppState.currentTheme);
  };

  const toggleTheme = () => {
    AppState.currentTheme = AppState.currentTheme === "light" ? "dark" : "light";
    applyTheme();
  };

  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // ==========================================================================
  // Mobile Navigation Drawer Toggle
  // ==========================================================================
  if (DOM.mobileMenuBtn && DOM.navMenu) {
    DOM.mobileMenuBtn.addEventListener("click", () => {
      DOM.navMenu.classList.toggle("active");
    });
  }

  // Close mobile drawer on link click
  document.querySelectorAll(".nav-menu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      DOM.navMenu.classList.remove("active");
    });
  });

  // ==========================================================================
  // Course Visual Asset Generator (Dynamic Inline SVGs)
  // ==========================================================================
  const getBannerSvg = (type) => {
    const svgs = {
      wallet: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12m18 0V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44l-2.118-2.118A1.5 1.5 0 0 0 6.621 3.75H5.25A2.25 2.25 0 0 0 3 6v6" />
        </svg>
      `,
      briefcase: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18.4v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.453.258-.75.258H4.875a1.055 1.055 0 0 1-.75-.258m16.5 0A2.18 2.18 0 0 1 19.5 12h-15m0 0a2.18 2.18 0 0 1-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m11.25 0V5.25c0-.621-.504-1.125-1.125-1.125h-9.75c-.621 0-1.125.504-1.125 1.125v3.58m10.125 0a9 9 0 0 0-10.125 0M9.75 8.966V5.25h4.5v3.716m-4.5 0a9 9 0 0 1 4.5 0" />
        </svg>
      `,
      zap: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      `,
      rocket: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.64 8.38m6 .15a4.5 4.5 0 0 0-6.085-6.085m1.505 1.505a4.5 4.5 0 0 0-4.5 4.5v3.185a15 15 0 0 0-2.25 11.25l1.21-1.21a9.768 9.768 0 0 1 3.02-2.122m13.955-16.83a8.032 8.032 0 0 1-2.24 3.02" />
        </svg>
      `,
      brain: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 2.25 6c0 1.353.716 2.53 1.793 3.193a5.99 5.99 0 0 0 3.09 7.31A3.75 3.75 0 0 0 12 18z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 1-.495-7.467 5.99 5.99 0 0 1 1.925-3.546 5.974 5.974 0 0 0 2.133-1A3.75 3.75 0 0 1 21.75 6c0 1.353-.716 2.53-1.793 3.193a5.99 5.99 0 0 1-3.09 7.31A3.75 3.75 0 0 1 12 18z" />
        </svg>
      `
    };
    return svgs[type] || svgs.wallet;
  };

  // ==========================================================================
  // Home View: Render Featured Modules
  // ==========================================================================
  const renderFeaturedCourses = () => {
    const featuredContainer = document.getElementById("featured-courses-container");
    if (!featuredContainer) return;

    // Grab top 3 courses
    const featuredList = ACADEMY_DATA.courses.slice(0, 3);
    
    let html = "";
    featuredList.forEach(course => {
      const isUpcoming = course.status === "upcoming";
      const detailHash = `#course-details?id=${course.id}`;
      const ctaBtn = isUpcoming 
        ? `<a href="#contact" class="btn btn-outline btn-sm">Join Waitlist</a>`
        : `<a href="${detailHash}" class="btn btn-primary btn-sm">Explore Curriculum</a>`;

      html += `
        <div class="course-card">
          <div class="course-card-banner">
            <span class="course-card-badge">${course.tag}</span>
            <span class="category-indicator">${course.categoryName}</span>
            ${getBannerSvg(course.bannerSvg)}
          </div>
          <div class="course-card-body">
            <div class="course-card-details">
              <div class="course-meta">
                <div class="course-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span>${course.duration}</span>
                </div>
                <div class="course-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span>${course.lessonsCount} Lessons</span>
                </div>
              </div>
              <h3 style="margin-top:0.5rem;"><a href="${detailHash}">${course.title}</a></h3>
              <p>${course.shortDescription}</p>
            </div>
            <div class="course-card-footer">
              <div class="course-price-block">
                <span class="course-price-sale">₹${course.price.toLocaleString("en-IN")}</span>
                <span class="course-price-original">₹${course.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              ${ctaBtn}
            </div>
          </div>
        </div>
      `;
    });

    featuredContainer.innerHTML = html;
  };

  // Render Testimonials statically
  const renderTestimonials = () => {
    if (!DOM.testimonialTrack) return;
    let html = "";
    ACADEMY_DATA.testimonials.forEach(t => {
      let ratingStars = "";
      for (let i = 0; i < t.rating; i++) {
        ratingStars += `★`;
      }
      
      html += `
        <div class="testimonial-slide">
          <div>
            <div class="testimonial-rating">${ratingStars}</div>
            <p class="testimonial-body" style="margin-top: 1.25rem;">"${t.quote}"</p>
          </div>
          <div class="testimonial-user">
            <div class="testimonial-avatar">${t.avatarInitials}</div>
            <div class="testimonial-user-info">
              <h4>${t.name}</h4>
              <p>${t.role}</p>
            </div>
          </div>
        </div>
      `;
    });
    DOM.testimonialTrack.innerHTML = html;
  };

  // Render Platform general FAQs
  const renderPlatformFAQs = () => {
    const faqContainer = document.getElementById("platform-faq-list");
    if (!faqContainer) return;
    
    let html = "";
    ACADEMY_DATA.faqs.forEach((faq, index) => {
      html += `
        <div class="accordion-item" data-index="${index}">
          <button class="accordion-header">
            <span>${faq.q}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div class="accordion-content">
            <div class="accordion-content-inner">
              <p>${faq.a}</p>
            </div>
          </div>
        </div>
      `;
    });
    faqContainer.innerHTML = html;
    initAccordions(faqContainer);
  };

  // ==========================================================================
  // Courses View: Rendering & Category Search Toggles
  // ==========================================================================
  const renderCoursesPage = () => {
    if (!DOM.coursesContainer) return;

    // Filter courses based on Category and Search inputs
    const filteredCourses = ACADEMY_DATA.courses.filter(course => {
      const matchCategory = AppState.activeCategory === "all" || course.category === AppState.activeCategory;
      const matchQuery = course.title.toLowerCase().includes(AppState.searchQuery.toLowerCase()) || 
                         course.shortDescription.toLowerCase().includes(AppState.searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });

    if (filteredCourses.length === 0) {
      DOM.coursesContainer.innerHTML = `
        <div class="empty-courses-state">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18" />
          </svg>
          <h3>No courses found</h3>
          <p>We couldn't find any courses matching your search query. Try removing filters or typing something else.</p>
        </div>
      `;
      return;
    }

    let html = "";
    filteredCourses.forEach(course => {
      const isUpcoming = course.status === "upcoming";
      const detailHash = `#course-details?id=${course.id}`;
      const ctaBtn = isUpcoming 
        ? `<a href="#contact" class="btn btn-outline btn-sm">Join Waitlist</a>`
        : `<a href="${detailHash}" class="btn btn-primary btn-sm">Explore Course</a>`;

      html += `
        <div class="course-card">
          <div class="course-card-banner">
            <span class="course-card-badge">${course.tag}</span>
            <span class="category-indicator">${course.categoryName}</span>
            ${getBannerSvg(course.bannerSvg)}
          </div>
          <div class="course-card-body">
            <div class="course-card-details">
              <div class="course-meta">
                <div class="course-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span>${course.duration}</span>
                </div>
                <div class="course-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span>${course.lessonsCount} Lessons</span>
                </div>
              </div>
              <h3 style="margin-top:0.5rem;"><a href="${detailHash}">${course.title}</a></h3>
              <p>${course.shortDescription}</p>
            </div>
            <div class="course-card-footer">
              <div class="course-price-block">
                <span class="course-price-sale">₹${course.price.toLocaleString("en-IN")}</span>
                <span class="course-price-original">₹${course.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              ${ctaBtn}
            </div>
          </div>
        </div>
      `;
    });

    DOM.coursesContainer.innerHTML = html;
  };

  // Wire search and category clicking events on Courses Page
  const initCoursesFilterEvents = () => {
    if (DOM.searchField) {
      DOM.searchField.addEventListener("input", (e) => {
        AppState.searchQuery = e.target.value;
        renderCoursesPage();
      });
    }

    if (DOM.filterTagsRow) {
      DOM.filterTagsRow.addEventListener("click", (e) => {
        const targetBtn = e.target.closest(".filter-tag");
        if (!targetBtn) return;
        
        // Clear active on all siblings
        DOM.filterTagsRow.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
        
        targetBtn.classList.add("active");
        AppState.activeCategory = targetBtn.dataset.category;
        renderCoursesPage();
      });
    }
  };

  // ==========================================================================
  // Course Details View: Dynamic Generator & Sidebars
  // ==========================================================================
  const renderCourseDetailsPage = (courseId) => {
    if (!DOM.courseDetailsBody) return;

    const course = ACADEMY_DATA.courses.find(c => c.id === courseId);
    if (!course) {
      window.location.hash = "#courses";
      return;
    }

    const isUpcoming = course.status === "upcoming";
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

    // Dynamic Curriculum HTML
    let curriculumHtml = "";
    course.curriculum.forEach(mod => {
      let lessonsHtml = "";
      mod.lessons.forEach(les => {
        lessonsHtml += `
          <div class="lesson-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
            <span>${les}</span>
          </div>
        `;
      });

      curriculumHtml += `
        <div class="curriculum-module">
          <h3><span></span>${mod.moduleTitle}</h3>
          <div class="lessons-list">
            ${lessonsHtml}
          </div>
        </div>
      `;
    });

    // Dynamic FAQ HTML
    let faqHtml = "";
    course.faqs.forEach((faq, index) => {
      faqHtml += `
        <div class="accordion-item" data-index="c-${index}">
          <button class="accordion-header">
            <span>${faq.q}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div class="accordion-content">
            <div class="accordion-content-inner">
              <p>${faq.a}</p>
            </div>
          </div>
        </div>
      `;
    });

    // Dynamic Outcomes HTML
    let outcomesHtml = "";
    course.outcomes.forEach(out => {
      outcomesHtml += `
        <div class="outcome-check-item">
          <div class="outcome-check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div class="outcome-check-text">
            <h4>${out}</h4>
          </div>
        </div>
      `;
    });

    // Main checkout CTA logic
    const primaryCtaBtn = isUpcoming
      ? `<a href="#contact" class="btn btn-success btn-lg w-100" style="display:flex; width: 100%;">Join Waitlist</a>`
      : `<button class="btn btn-primary btn-lg w-100 btn-enroll-action" style="display:flex; width: 100%;" data-course="${course.title}">Enroll in Course</button>`;

    // Update Mobile sticky bar details
    if (DOM.mobileStickyBar) {
      DOM.mobileStickyBar.querySelector(".sale").innerText = `₹${course.price.toLocaleString("en-IN")}`;
      DOM.mobileStickyBar.querySelector(".title").innerText = course.title;
      DOM.mobileStickyBar.querySelector(".mobile-sticky-btn-wrapper").innerHTML = isUpcoming
        ? `<a href="#contact" class="btn btn-success btn-sm">Join Waitlist</a>`
        : `<button class="btn btn-primary btn-sm btn-enroll-action" data-course="${course.title}">Enroll</button>`;
    }

    // Assemble the complete panel
    DOM.courseDetailsBody.innerHTML = `
      <div class="course-details-grid">
        <div class="course-details-main">
          <!-- Course intro -->
          <div class="course-intro-banner">
            <div class="course-intro-banner-accent"></div>
            <h1 id="course-detail-title">${course.title}</h1>
            <p class="lead">${course.shortDescription}</p>
            <div class="detail-pills">
              <div class="detail-pill">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>${course.level}</span>
              </div>
              <div class="detail-pill">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                <span>${course.duration}</span>
              </div>
              <div class="detail-pill">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <span>${course.lessonsCount} Modules</span>
              </div>
            </div>
          </div>

          <!-- Learning outcomes -->
          <div class="curriculum-box" style="margin-bottom: 4rem;">
            <h2 style="margin-bottom: 2rem;">What You Will Master</h2>
            <div class="outcomes-list">
              ${outcomesHtml}
            </div>
          </div>

          <!-- Curriculum breakdown -->
          <div class="curriculum-box">
            <h2>Detailed Syllabus</h2>
            <div class="curriculum-list">
              ${curriculumHtml}
            </div>
          </div>

          <!-- Integrated checkout block for mobile -->
          <div class="integrated-checkout-block" style="display:none;">
            <div class="checkout-pricing" style="margin-bottom:1.5rem;">
              <span class="checkout-tag">${course.tag}</span>
              <div class="checkout-price-row">
                <span class="checkout-price-sale">₹${course.price.toLocaleString("en-IN")}</span>
                <span class="checkout-price-original">₹${course.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              <span class="checkout-discount">${discount}% Off • Lifetime Access</span>
            </div>
            ${primaryCtaBtn}
          </div>

          <!-- FAQs section -->
          <div class="faq-box" style="margin-top: 4rem;">
            <h2>Course FAQ</h2>
            <div class="accordion-list" id="course-faq-list">
              ${faqHtml}
            </div>
          </div>
        </div>

        <!-- Sticky checkout block for desktop -->
        <div class="course-details-sidebar">
          <div class="checkout-card">
            <div class="checkout-pricing">
              <span class="checkout-tag">${course.tag}</span>
              <div class="checkout-price-row">
                <span class="checkout-price-sale">₹${course.price.toLocaleString("en-IN")}</span>
                <span class="checkout-price-original">₹${course.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              <span class="checkout-discount">You Save ₹${(course.originalPrice - course.price).toLocaleString("en-IN")} (${discount}%)</span>
            </div>
            <div class="checkout-highlights">
              <div class="checkout-highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Full Lifetime Access</span>
              </div>
              <div class="checkout-highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Self-Paced Learning</span>
              </div>
              <div class="checkout-highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Direct Mentorship Community</span>
              </div>
              <div class="checkout-highlight-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Gold Certification of Completion</span>
              </div>
            </div>
            ${primaryCtaBtn}
            <p style="font-size:0.75rem; text-align:center; color: var(--text-tertiary);">7-Day Refund Guarantee • Secure checkout</p>
          </div>
        </div>
      </div>
    `;

    // Initialize accordions in Details View
    const detailsFaqList = document.getElementById("course-faq-list");
    if (detailsFaqList) {
      initAccordions(detailsFaqList);
    }

    // Attach checkout CTA simulations
    document.querySelectorAll(".btn-enroll-action").forEach(btn => {
      btn.addEventListener("click", () => {
        simulateEnrollment(course.title);
      });
    });
  };

  // Simulate premium payment/enrollment process
  const simulateEnrollment = (courseName) => {
    alert(`🎉 [Simulation Mode] Redirecting to Razorpay secure checkout for: "${courseName}".\n\nInside production, this triggers your payment gateway and adds the student to Surya's Private Learning Community automatically.`);
  };

  // ==========================================================================
  // Interactive UI Accordion Engine
  // ==========================================================================
  const initAccordions = (container) => {
    container.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (!header) return;

      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const isActive = item.classList.contains("active");

      // Close other accordions under this container
      container.querySelectorAll(".accordion-item").forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove("active");
          sibling.querySelector(".accordion-content").style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  };

  // ==========================================================================
  // Testimonial Horizontal Scroller Slider
  // ==========================================================================
  if (DOM.prevTestimonialBtn && DOM.nextTestimonialBtn && DOM.testimonialTrack) {
    const scrollAmount = 350;

    DOM.prevTestimonialBtn.addEventListener("click", () => {
      DOM.testimonialTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    DOM.nextTestimonialBtn.addEventListener("click", () => {
      DOM.testimonialTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }

  // ==========================================================================
  // Custom Form Interactivity & Feedbacks
  // ==========================================================================
  const setupFormSubmissions = () => {
    // Newsletter signup
    if (DOM.newsletterForm) {
      DOM.newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = DOM.newsletterForm.querySelector("input[type='email']");
        const val = emailInput.value.trim();
        if (!val) return;

        // Visual fade out / fade in loading simulation
        const submitBtn = DOM.newsletterForm.querySelector("button");
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Joining...</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          DOM.newsletterForm.reset();
          DOM.newsletterForm.style.display = "none";
          
          const title = DOM.newsletterBox.querySelector("h2");
          const desc = DOM.newsletterBox.querySelector("p");
          if (title) title.style.display = "none";
          if (desc) desc.style.display = "none";

          DOM.newsletterSuccessCard.style.display = "block";
          DOM.newsletterSuccessCard.querySelector(".email-feedback-placeholder").innerText = val;
        }, 1200);
      });
    }

    // Contact Panel / Waitlist Form
    if (DOM.contactForm) {
      DOM.contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Grab inputs
        const nameVal = document.getElementById("contact-name").value.trim();
        const interestVal = document.getElementById("contact-interest").value;

        const submitBtn = DOM.contactForm.querySelector("button[type='submit']");
        submitBtn.innerHTML = `<span>Sending Request...</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          DOM.contactForm.reset();
          DOM.contactForm.style.display = "none";
          DOM.contactFormBox.querySelector("h3").style.display = "none";
          DOM.contactFormBox.querySelector("p").style.display = "none";

          DOM.contactSuccessCard.style.display = "block";
          DOM.contactSuccessCard.querySelector(".contact-name-feedback").innerText = nameVal;
          DOM.contactSuccessCard.querySelector(".contact-interest-feedback").innerText = interestVal;
        }, 1500);
      });
    }
  };

  // ==========================================================================
  // Achievements Dynamic Rendering & Lightbox Zoom Engine
  // ==========================================================================
  const renderAchievements = () => {
    if (!ACADEMY_DATA.achievements) return;

    // 1. Paint achievements on Home View
    if (DOM.achievementsGrid) {
      let homeHtml = "";
      ACADEMY_DATA.achievements.forEach(ach => {
        homeHtml += `
          <div class="achievement-card">
            <div class="achievement-card-banner">
              <img src="${ach.image}" alt="${ach.title}" class="achievement-thumb">
              <span class="achievement-card-badge ${ach.badge.toLowerCase()}">${ach.badge}</span>
            </div>
            <div class="achievement-card-body">
              <span class="achievement-card-subtitle">${ach.subtitle}</span>
              <h3>${ach.title}</h3>
              <p>${ach.description}</p>
              <button class="btn-zoom-achievement" data-title="${ach.title}" data-subtitle="${ach.subtitle}" data-image="${ach.image}" data-badge="${ach.badge}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
                <span>View Full Evidence</span>
              </button>
            </div>
          </div>
        `;
      });
      DOM.achievementsGrid.innerHTML = homeHtml;
    }

    // 2. Paint achievements on About View (Story pane)
    if (DOM.aboutAchievementsGrid) {
      let aboutHtml = "";
      ACADEMY_DATA.achievements.forEach(ach => {
        aboutHtml += `
          <div class="about-achievement-item">
            <div class="about-achievement-img-box">
              <img src="${ach.image}" alt="${ach.title}">
              <span class="about-achievement-badge ${ach.badge.toLowerCase()}">${ach.badge}</span>
            </div>
            <div class="about-achievement-info">
              <h4>${ach.title}</h4>
              <h5>${ach.subtitle}</h5>
              <p>${ach.description}</p>
              <a href="javascript:void(0)" class="view-evidence-link" data-title="${ach.title}" data-subtitle="${ach.subtitle}" data-image="${ach.image}" data-badge="${ach.badge}">View Certificate &rarr;</a>
            </div>
          </div>
        `;
      });
      DOM.aboutAchievementsGrid.innerHTML = aboutHtml;
    }
  };

  const initLightboxEvents = () => {
    if (!DOM.lightboxModal) return;

    const openLightbox = (data) => {
      DOM.lightboxImg.src = data.image;
      DOM.lightboxTitle.innerText = data.title;
      DOM.lightboxSubtitle.innerText = data.subtitle;
      DOM.lightboxBadge.innerText = data.badge;
      
      // Clean previous badge classes and add current
      DOM.lightboxBadge.className = "caption-badge " + data.badge.toLowerCase();

      DOM.lightboxModal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    };

    const closeLightbox = () => {
      DOM.lightboxModal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scroll
    };

    // Attach delegated clicks for home grid zoom
    document.addEventListener("click", (e) => {
      const zoomBtn = e.target.closest(".btn-zoom-achievement, .view-evidence-link");
      if (zoomBtn) {
        e.preventDefault();
        openLightbox(zoomBtn.dataset);
      }
    });

    // Close button click
    if (DOM.lightboxClose) {
      DOM.lightboxClose.addEventListener("click", closeLightbox);
    }

    // Close on backdrop click (click outside modal content)
    DOM.lightboxModal.addEventListener("click", (e) => {
      if (e.target === DOM.lightboxModal) {
        closeLightbox();
      }
    });

    // Close on ESC key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && DOM.lightboxModal.style.display === "flex") {
        closeLightbox();
      }
    });
  };

  // ==========================================================================
  // System Initializer
  // ==========================================================================
  const initializeSystem = () => {
    initTheme();
    renderFeaturedCourses();
    renderTestimonials();
    renderPlatformFAQs();
    initCoursesFilterEvents();
    setupFormSubmissions();
    renderAchievements(); // Dynamic achievements load
    initLightboxEvents(); // Zoom listeners
    handleRouting(); // Execute router for initial paint
  };

  initializeSystem();
});
