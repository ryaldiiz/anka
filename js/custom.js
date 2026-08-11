/* ----------------------------------------------------------------
[ Custom settings ]
------------------------------------------------------------------- */

$(function() {

    "use strict";

    var wind = $(window);

    // ScrollIt (Menü linklerine tıklandığında yumuşak kayma)
    if ($.scrollIt) {
        $.scrollIt({
            upKey: 38,
            downKey: 40,
            easing: 'swing',
            scrollTime: 600,
            activeClass: 'active',
            onPageChange: null,
            topOffset: -70
        });
    }

    /* =========================
        NAVBAR + DARK MODE FIX
    ========================= */
    const navbar = $(".navbar");
    const themeBtn = $(".theme-icon");
    const body = $("body");
    let isDarkMode = false;

    // DARK MODE TOGGLE
    themeBtn.on("click", function () {
        isDarkMode = !isDarkMode;
        body.toggleClass("dark", isDarkMode);
        updateNavbarState();
    });

    // SCROLL EVENT
    wind.on("scroll", function () {
        updateNavbarState();
    });

    function updateNavbarState() {
        const scrolled = wind.scrollTop() > 100;

        if (scrolled) {
            navbar.addClass("nav-scroll");
        } else {
            navbar.removeClass("nav-scroll");
        }

        // Logo Yönetimi
        if (isDarkMode) {
            $(".logo-img").attr("src", "img/logo.png");
        } else {
            if (scrolled) {
                $(".logo-img").attr("src", "img/logo-dark.png");
            } else {
                $(".logo-img").attr("src", "img/logo.png");
            }
        }
    }

    updateNavbarState();
    
    /* =========================
        BACKGROUND IMAGES
    ========================= */
    var pageSection = $(".bg-img, section");
    pageSection.each(function(){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    /* =========================
        ISOTOPE PROJECTS & GALLERY (Hata Almamak İçin Güvenli Kontrol)
    ========================= */
    if ($('.bauen-project-items').length && $.fn.imagesLoaded) {
        $('.bauen-project-items').imagesLoaded(function () {
            $('.bauen-project-filter li').on('click', function () {
                $(".bauen-project-filter li").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                $(".bauen-project-items").isotope({
                    filter: selector,
                    animationOptions: { duration: 750, easing: 'linear', queue: false }
                });
                return false;
            });
            $(".bauen-project-items").isotope({
                itemSelector: '.single-item',
                layoutMode: 'masonry'
            });
        });
    }

    if ($('.bauen-gallery-items').length && $.fn.imagesLoaded) {
        $('.bauen-gallery-items').imagesLoaded(function () {
            $('.bauen-gallery-filter li').on('click', function () {
                $(".bauen-gallery-filter li").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                $(".bauen-gallery-items").isotope({
                    filter: selector,
                    animationOptions: { duration: 750, easing: 'linear', queue: false }
                });
                return false;
            });
            $(".bauen-gallery-items").isotope({
                itemSelector: '.single-item',
                layoutMode: 'masonry'
            });
        });
    }

    /* =========================
        ANIMATIONS (Waypoints Kontrolü)
    ========================= */
    if (typeof $.fn.waypoint !== 'undefined' && $('.animate-box').length) {
        var contentWayPoint = function () {
            $('.animate-box').waypoint(function (direction) {
                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    $(this.element).addClass('item-animate');
                    setTimeout(function () {
                        $('body .animate-box.item-animate').each(function (k) {
                            var el = $(this);
                            setTimeout(function () {
                                var effect = el.data('animate-effect');
                                if (effect === 'fadeIn') {
                                    el.addClass('fadeIn animated');
                                } else if (effect === 'fadeInLeft') {
                                    el.addClass('fadeInLeft animated');
                                } else if (effect === 'fadeInRight') {
                                    el.addClass('fadeInRight animated');
                                } else {
                                    el.addClass('fadeInUp animated');
                                }
                                el.removeClass('item-animate');
                            }, k * 200);
                        });
                    }, 100);
                }
            }, { offset: '85%' });
        };
        contentWayPoint();
    }

    /* =========================
        PLUGINS (Owl Carousel Eleman Kontrolleri)
    ========================= */
    if ($.fn.YouTubePopUp) {
        $("a.vid").YouTubePopUp();
    }

    // Owl Carousel kütüphanesi yüklüyse ve elementler varsa çalıştırır (Kırılmayı önler)
    if ($.fn.owlCarousel) {
        if ($('.testimonials .owl-carousel').length) $('.testimonials .owl-carousel').owlCarousel({ loop:true, margin:30, items:1 });
        if ($('.projects .owl-carousel').length) $('.projects .owl-carousel').owlCarousel({ loop:true, margin:30, items:2 });
        if ($('.project-page .owl-carousel').length) $('.project-page .owl-carousel').owlCarousel({ loop:true, margin:30, items:1 });
        if ($('.bauen-blog .owl-carousel').length) $('.bauen-blog .owl-carousel').owlCarousel({ loop:true, margin:30, items:2 });
        if ($('.team .owl-carousel').length) $('.team .owl-carousel').owlCarousel({ loop:true, margin:30, items:3 });
        if ($('.clients .owl-carousel').length) $('.clients .owl-carousel').owlCarousel({ loop:true, margin:30, items:2, autoplay:true });
    }

    if ($.fn.magnificPopup) {
        $(".img-zoom").magnificPopup({
            type: "image",
            gallery: { enabled: true }
        });
    }

    /* =========================
        BACK TO TOP
    ========================= */
    var progressPath = document.querySelector('.progress-wrap path');
    if (progressPath) {
        var pathLength = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;

        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;

            if (scroll > 150) {
                $('.progress-wrap').addClass('active-progress');
            } else {
                $('.progress-wrap').removeClass('active-progress');
            }
        });

        $('.progress-wrap').on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 550);
            return false;
        });
    }
});

// Slider & Header
$(document).ready(function() {
    if ($.fn.owlCarousel) {
        var owl = $('.header .owl-carousel');
        
        if ($('.slider .owl-carousel').length) {
            $('.slider .owl-carousel').owlCarousel({
                items: 1,
                loop:true,
                dots: false,
                margin: 0,
                autoplay: true,
                autoplayTimeout: 5000,
                nav: true,
                navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
            });
        }
        
        if ($('.slider-fade .owl-carousel').length) {
            $('.slider-fade .owl-carousel').owlCarousel({
                items: 1,
                loop:true,
                dots: false,
                margin: 0,
                autoplay: true,
                autoplayTimeout: 5000,
                animateOut: 'fadeOut',
                nav: true,
                navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
            });
        }

        if (owl.length) {
            owl.on('changed.owl.carousel', function(event) {
                var item = event.item.index - 2;
                $('h4').removeClass('animated fadeInUp');
                $('h1').removeClass('animated fadeInUp');
                $('p').removeClass('animated fadeInUp');
                $('.butn-light').removeClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('.butn-light').addClass('animated fadeInUp');
            });
        }
    }
});

// Accordion Box
if ($(".accordion-box").length) {
    $(".accordion-box").on("click", ".acc-btn", function () {
      var outerBox = $(this).parents(".accordion-box");
      var target = $(this).parents(".accordion");

      if ($(this).next(".acc-content").is(":visible")) {
        $(this).removeClass("active");
        $(this).next(".acc-content").slideUp(300);
        $(outerBox).children(".accordion").removeClass("active-block");
      } else {
        $(outerBox).find(".accordion .acc-btn").removeClass("active");
        $(this).addClass("active");
        $(outerBox).children(".accordion").removeClass("active-block");
        $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
        target.addClass("active-block");
        $(this).next(".acc-content").slideDown(300);
      }
    });
}

// Preloader
var CustomApp = {
    init: function () {
        this.handlePreloader();
    },
    handlePreloader: function () {
        if ($("#preloader").length) {
            $("#preloader").fadeOut(500);
            $(".preloader-bg").delay(300).fadeOut(500);
        }
    }
};
CustomApp.init();

// Contact Form
var form = $('.contact__form'),
    message = $('.contact__msg'),
    form_data;

function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text(response);
    setTimeout(function () {
        message.fadeOut();
    }, 2000);
    form.find('input:not([type="submit"]), textarea').val('');
}

function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-success');
    message.text(data.responseText);
    setTimeout(function () {
        message.fadeOut();
    }, 2000);
}

if (form.length) {
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
}


/* =========================
    MOBİL MENÜ TOGGLE & CLOSE
========================= */
const hamburger = $(".hamburger");
const closeBtn = $(".mobile-close-btn");
const mobileOverlay = $(".mobile-nav-overlay");
const mobileLinks = $(".mobile-nav-menu a");

// Açma
hamburger.on("click", function () {
    mobileOverlay.addClass("active");
    $("body").addClass("no-scroll");
});

// Kapatma (X Butonu)
closeBtn.on("click", function () {
    mobileOverlay.removeClass("active");
    $("body").removeClass("no-scroll");
});

// Linke tıklayınca kapatma
mobileLinks.on("click", function () {
    mobileOverlay.removeClass("active");
    $("body").removeClass("no-scroll");
});


function updateNavbarState() {
    const scrolled = wind.scrollTop() > 100;

    if (scrolled) {
        navbar.addClass("nav-scroll");
    } else {
        navbar.removeClass("nav-scroll");
    }

    // Mobil Ekran Logoları (991px ve altı)
    if ($(window).width() <= 991) {
        if (scrolled) {
            $(".logo-img").attr("src", "img/logo-dark.png"); // Aşağı kaydırınca siyah logo
        } else {
            $(".logo-img").attr("src", "img/logo.png");      // En üstteyken orijinal beyaz logo
        }
        return;
    }

    // Masaüstü Ekran Logoları
    if (isDarkMode) {
        $(".logo-img").attr("src", "img/logo.png");
    } else {
        if (scrolled) {
            $(".logo-img").attr("src", "img/logo-dark.png");
        } else {
            $(".logo-img").attr("src", "img/logo.png");
        }
    }
}

