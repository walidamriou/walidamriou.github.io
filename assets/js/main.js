/*
Theme Name: Oli
Description: Responsive Coming Soon Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/oli
Author URI: https://themeforest.net/user/erilisdesign
Version: 2.0.0
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------------------
[Table of contents]

1. Preloader
2. Backgrounds
3. Navigation
4. Lightbox
5. Slider
6. Countdown
7. Mailchimp
8. Contact Form
-------------------------------------------------------------------*/

(function($) {
	"use strict";

	// Vars
	var $body = $('body'),
		$navigationLinks = $('a.scrollto, #site-navbar a'),
		autoCloseMobileNavigation = true,
		$homeBlock = $('.home-block'),
		$contentBlock = $('.content-block'),
		$btnBackToTop = $('.back-to-top'),
		$preloader = $('#preloader'),
		preloaderDelay = 1200,
		preloaderFadeOutTime = 500,
		target,
		trueMobile;

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}

	// System Detector
	function oli_systemDetector() {

		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
			}
		};

		trueMobile = isMobile.any();

	}

	// [1. Preloader]
	function oli_preloader() {
		$preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
	}

	// [2. Backgrounds]
	function oli_backgrounds() {

		// Image
		var $bgImage = $('.bg-image-holder');
		if($bgImage.length > 0) {
			$bgImage.each(function(){
				var src = $(this).children('img').attr('src');

				$(this).css('background-image','url('+src+')').children('img').hide();
			});
		}

		// Slideshow
		if ($body.hasClass('slideshow-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-4.jpg' }
				]
			});
		}

		// Slideshow - ZoomOut
		if ($body.hasClass('slideshow-zoom-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 7000,
				transition: 'zoomOut',
				transitionDuration: 4000,
				slides: [
					{ src: 'demo/images/image-4.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-15.jpg' }
				]
			});
		}

		// Slideshow with Video
		if ($body.hasClass('slideshow-video-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/video/marine.jpg',
						video: {
							src: [
								'demo/video/marine.mp4',
								'demo/video/marine.webm',
								'demo/video/marine.ogv'
							],
							loop: false,
							mute: true
						}
					},
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' }
				]
			});
		}

		// Kenburns
		if ($body.hasClass('kenburns-background')) {

			var kenburnsDisplayBackdrops = false;
			var kenburnsBackgrounds = [
				{ src: 'demo/images/image-15.jpg', valign: 'center' },
				{ src: 'demo/images/image-14.jpg', valign: 'center' },
				{ src: 'demo/images/image-17.jpg', valign: 'center' }
			];

			$body.vegas({
				preload: true,
				transition: 'swirlLeft',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: kenburnsBackgrounds,
				walk: function (nb) {
					if (kenburnsDisplayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation = [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ];
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						$body
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});
		}

		// Youtube Video
		if ($('#youtube-background').length > 0) {
			var videos = [
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:true, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
		}

		// Youtube Multiple Videos
		if ($('#youtube-multiple-background').length > 0) {

			var videos = [
				{videoURL: "CG20eBusRg0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true},
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);

		}

		// Video Background
		if($body.hasClass('mobile')) {
			$('.video-wrapper').css('display', 'none');
		}

		// Granim
		$('[data-gradient-bg]').each(function(index,element){
			var granimParent = $(this),
				granimID = 'granim-'+index+'',
				colours = granimParent.attr('data-gradient-bg'),
				colours = colours.replace(' ',''),
				colours = colours.replace(/'/g, '"')
				colours = JSON.parse( colours );

			// Add canvas
			granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

			var granimInstance = new Granim({
				element: '#'+granimID,
				name: 'basic-gradient',
				direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
				opacity: [1, 1],
				isPausedWhenNotInView: true,
				states : {
					"default-state": {
						gradients: colours
					}
				}
			});
		});

	}
	
	// [4. Fullpage]
	function oli_fullpage() {
		var $o_fullpage = $('.oli-fullpage');

		if( $o_fullpage.length > 0 ){

			// Generate anchors
			var anchors = [];
			$o_fullpage.children('.oli-section').each(function() {
				var anchor = $(this).data('anchor');
				if(typeof anchor !== 'undefined') {
					anchors.push(anchor);
				}
			});

			if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
				if( !$o_fullpage.hasClass('fullpage-wrapper') || $o_fullpage.hasClass('fp-destroyed') ){

					$('.oli-section').each(function(){
						var $section = $(this),
							sectionHeight = parseInt($section.innerHeight(),10);

						if( sectionHeight > getWindowHeight() ){
							$section.addClass('is-scrollable');
						}
					});

					$body.addClass('oli-fullpage-active');

					$o_fullpage.fullpage({
						//Navigation
						menu: '#navigation',
						lockAnchors: false,
						anchors: anchors,

						//Scrolling
						scrollingSpeed: 700,
						autoScrolling: true,
						fitToSection: true,
						fitToSectionDelay: 700,
						scrollBar: false,
						easingcss3: 'cubic-bezier(0.54, 0.18, 0.36, 0.81)',
						loopBottom: false,
						loopTop: false,
						scrollOverflow: true,

						//Accessibility
						animateAnchor: true,
						recordHistory: false,

						//Design
						controlArrows: false,
						verticalCentered: false,
						paddingTop: false,
						paddingBottom: false,

						//Custom selectors
						sectionSelector: '.oli-section',
						slideSelector: '.oli-slide',

						// Events
						onLeave: function(index, nextIndex, direction){
							if(nextIndex === 1){
								$body.addClass('oli-fullpage-intro-active');
								$btnBackToTop.removeClass('active');
							} else {
								$body.removeClass('oli-fullpage-intro-active');
								$btnBackToTop.addClass('active');
							}
						},
						afterLoad: function(anchorLink, index){
							if(index == 1){
								$body.addClass('oli-fullpage-intro-active');
								$btnBackToTop.removeClass('active');
							} else {
								$btnBackToTop.addClass('active');
							}
						}
					});
				}
			} else {
				// Fullpage - Destroy
				if( $o_fullpage.hasClass('fullpage-wrapper') && !$o_fullpage.hasClass('fp-destroyed') ){
					$body.removeClass('oli-fullpage-active oli-fullpage-intro-active ui-light ui-dark');
					$.fn.fullpage.destroy('all');
					$('.oli-section').removeClass('is-scrollable');
					$btnBackToTop.removeClass('active');
				}
			}
		}
	}

	// [3. Navigation]
	function oli_navigation() {

		$('#site-navbar').on('show.bs.collapse hide.bs.collapse', function(e) {
			if (e.type=='show'){
				$('.site-header .navbar-toggler').addClass('open');
			} else {
				$('.site-header .navbar-toggler').removeClass('open');
			}
		});

		$navigationLinks.off('click');
		$navigationLinks.on('click', function(e) {
			if (this.hash !== '') {
				e.preventDefault();

				var target = $(this).attr('href');

				if( $body.hasClass('oli-fullpage-active') ){
					if( !$('[data-anchor="' + target.substr(1) + '"]').length > 0 )
						return;

					var target = target.substr(1);
					$.fn.fullpage.moveTo(target);
				} else {
					if( $('[data-anchor="' + target.substr(1) + '"]').length > 0 ){
						var target = $('[data-anchor="'+ target.substr(1) +'"]');

						$(window).scrollTop( target.offset().top );
					} else {
						$(window).scrollTop( $(target).offset().top );
					}
				}
				
				if( autoCloseMobileNavigation === true ){
					if( !( getWindowWidth() >= 1200 ) ){
						$('.site-header .navbar-toggler').trigger('click');
					}
				}
			}
		});

		$btnBackToTop.off('click');
		$btnBackToTop.on('click', function(e) {
			e.preventDefault();

			if( getWindowWidth() >= 1200 ){
				if( !$body.hasClass('oli-fullpage-active') )
					return;

				$.fn.fullpage.moveTo(1);
			} else {
				$(window).scrollTop(0);
			}
		});

	}

	// [5. Slider]
	function oli_slider() {
		var $slider = $('.slider');

		if($slider.length > 0){
			if( !$slider.hasClass('slick-initialized') ){
				$slider.slick({
					slidesToShow: 1,
					infinite: true,
					nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
					prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>'
				});
			}

			if( !( getWindowWidth() >= 576 ) ){
				if( $slider.hasClass('slick-initialized') && $slider.hasClass('unslick-sm') ){
					$slider.slick('unslick');
				}
			}

			if( !( getWindowWidth() >= 768 ) ){
				if( $slider.hasClass('slick-initialized') && $slider.hasClass('unslick-md') ){
					$slider.slick('unslick');
				}
			}

			if( !( getWindowWidth() >= 992 ) ){
				if( $slider.hasClass('slick-initialized') && $slider.hasClass('unslick-lg') ){
					$slider.slick('unslick');
				}
			}

			if( !( getWindowWidth() >= 1200 ) ){
				if( $slider.hasClass('slick-initialized') && $slider.hasClass('unslick-xl') ){
					$slider.slick('unslick');
				}
			}

		}
	}

	// [6. Countdown]
	function oli_countdown() {
		var countdown = $('.countdown[data-countdown]');

		if (countdown.length > 0) {
			countdown.each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="countdown-container row"><div class="countdown-item col-6 col-sm"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-item col-6 col-sm"><div class="number">%H</div><span>Hours</span></div><div class="countdown-item col-6 col-sm"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-item col-6 col-sm"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}
	}

	// [7. Mailchimp]
	function oli_mailchimp() {
		var subscribeForm = $('.subscribe-form');
		if( subscribeForm.length < 1 ){ return true; }

		subscribeForm.each( function(){
			var el = $(this),
				elResult = el.find('.subscribe-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						resetForm: true,
						success: function( data ) {
							alert('ok2');
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// [8. Contact Form]
	function oli_contactForm() {
		var contactForm = $('.contact-form');
		if( contactForm.length < 1 ){ return true; }

		contactForm.each( function(){
			var el = $(this),
				elResult = el.find('.contact-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}
	
	// document.ready function
	jQuery(document).ready(function($) {
		oli_backgrounds();
		oli_fullpage();
		oli_navigation();
		oli_slider();
		oli_countdown();
		oli_mailchimp();
		oli_contactForm();
	});

	// window load function
	$(window).on('load', function() {
		oli_preloader();
	});

	// window.resize function
	$(window).on('resize', function() {
		oli_fullpage();
		oli_navigation();
		oli_slider();
	});

})(jQuery);