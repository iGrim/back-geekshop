/* sfx */
var sfx = new Audio();
document.getElementById("buttonn").addEventListener("click", function(){
    sfx.pause();
    sfx = new Audio('sounds/erwin.mp3');
    sfx.play();
});

/* slideshow */
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 1700); // Change image every 2 seconds
}

/* change text */
$(document).ready(function(){
		$("#soz").mouseover(function(){
			$('#soz').html("オタクショップ");
});
});

$(document).ready(function(){
		$("#soz").mouseout(function(){
			$('#soz').html("GEEKSHOP");
});
});

/* discount */
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});



/* animate */
$(document).ready(function(){
    $("myBtn1").click(function(){
        $("buttonn1").animate({
            left: -300
        });
    });
});

document.getElementById("buttonn1").addEventListener("click", function(){
    $("buttonn1").animate({
            left: -300
        });
});

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
