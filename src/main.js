const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);

  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

on('click', '.mobile-nav-toggle', function (e) {
  select('#navbar').classList.toggle('navbar-mobile');
  this.classList.toggle('bi-list');
  this.classList.toggle('bi-x');
});

on('click', '#navbar .nav-link', function (e) {
  let section = select(this.hash);
  if (section) {
    e.preventDefault();

    let navbar = select('#navbar');
    let header = select('#header');
    let sections = select('section', true);
    let navlinks = select('#navbar .nav-link', true);

    navlinks.forEach((item) => {
      item.classList.remove('active');
    });

    this.classList.add('active');

    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      let navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }

    if (this.hash == '#header') {
      header.classList.remove('header-top');
      sections.forEach((item) => {
        item.classList.remove('section-show');
      });
      return;
    }

    if (!header.classList.contains('header-top')) {
      header.classList.add('header-top');
      setTimeout(function () {
        sections.forEach((item) => {
          item.classList.remove('section-show');
        });
        section.classList.add('section-show');
      }, 350);
    } else {
      sections.forEach((item) => {
        item.classList.remove('section-show');
      });
      section.classList.add('section-show');
    }

    // scrollto(this.hash);
  }
}, true);

window.addEventListener('load', () => {
  if (window.location.hash) {
    let initial_nav = select(window.location.hash);

    if (initial_nav) {
      let header = select('#header');
      let navlinks = select('#navbar .nav-link', true);

      header.classList.add('header-top');

      navlinks.forEach((item) => {
        if (item.getAttribute('href') == window.location.hash) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      setTimeout(function () {
        initial_nav.classList.add('section-show');
      }, 350);

      // scrollto(window.location.hash); 
    }
  }
});

window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    let portfolioFilters = select('#portfolio-flters li', true);

    on('click', '#portfolio-flters li', function (e) {
      e.preventDefault();
      portfolioFilters.forEach(function (el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
    }, true);
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var typed = new Typed('#typed-output', {
      strings: ["Айдос", "фронтенд-разработчик", "веб-дизайнер"],
      typeSpeed: 50, 
      backSpeed: 30, 
      backDelay: 1000, 
      startDelay: 500, 
      loop: true 
  });
});


document.getElementById('downloadButton').addEventListener('click', function() {
    
  const fileURL = 'src/resume.pdf'; 


  const downloadLink = document.createElement('a');
  downloadLink.href = fileURL;
  downloadLink.download = 'resume.pdf';

  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});


document.addEventListener("DOMContentLoaded", function () {
  fetch("portfolio.json")
    .then(response => response.json())
    .then(data => {
      const portfolioContainer = document.getElementById("portfolio-container");

      data.forEach(item => {
        const portfolioItem = document.createElement("div");
        portfolioItem.className = `col-lg-4 col-md-6 portfolio-item filter-${item.category}`;
        portfolioItem.id = `portfolio-item-${item.id}`;

        const portfolioWrap = document.createElement("div");
        portfolioWrap.className = "portfolio-wrap";

        const portfolioLink = document.createElement("a");
        portfolioLink.href = item.imageSrc;
        portfolioLink.setAttribute("data-gallery", "portfolioGallery");
        portfolioLink.className = "portfolio-lightbox";
        portfolioLink.target = "_blank";

        const workImg = document.createElement("div");
        workImg.className = "work-img";

        const imgElement = document.createElement("img");
        imgElement.src = item.imageSrc;
        imgElement.alt = "portfolio-work";
        imgElement.className = "img-fluid";

        workImg.appendChild(imgElement);
        portfolioLink.appendChild(workImg);
        portfolioWrap.appendChild(portfolioLink);
        portfolioItem.appendChild(portfolioWrap);
        portfolioContainer.appendChild(portfolioItem);
      });
    })
    .catch(error => console.error("Error fetching portfolio data:", error));
});
