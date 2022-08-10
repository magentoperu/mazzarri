 define([
    'jquery',
    'Blueskytechco_QuickviewProduct/js/model/jquery.magnific-popup.min',
    'slick'
], function ($, magnificPopup) {
    'use strict';

    function setCustomCookie(name,value,days)
	{
	  if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		  }
		  else var expires = "";
		  document.cookie = name+"="+value+expires+"; path=/";
	}

	function getCustomCookie(name)
	{
		  var nameEQ = name + "=";
		  var ca = document.cookie.split(';');
		  for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		  }
		  return null;
	}

	$(document).ready(function () {
        if($('#newsletter-popup-common').length > 0 && !getCustomCookie('shownewsletter')){
        	var data_show = $('#newsletter-popup-common').data('show');
        	var get_width = $('#newsletter-popup-common').data('width');
        	$('#newsletter-popup-common').css({"max-width": get_width, "margin": "auto"});
        	var show_newsletter = false;
        	if(data_show == '1'){
        		if($('body').hasClass('cms-index-index')){
        			show_newsletter = true;
        		}
        	}
        	else{
        		show_newsletter = true;
        	}
        	if(show_newsletter){
        		$.magnificPopup.open({
		        	items: {
					    src: '#newsletter-popup-common',
					    type: 'inline'
					},
					removalDelay: 500,
                    closeOnBgClick: true,
                    preloader: true,
                    tLoading: '',
                    mainClass: 'mfp-zoom-in',
					callbacks: {
                        open: function() {
                        	$('.mfp-preloader').css('display', 'block');
                            $('body').addClass('loading-page-newsletter-magnific-popup');
                          	var cal = $('#products-popup-common').find("div[data-appearance='carousel']").length;
                          	if(cal > 0){
                          		var carouselElement = $('#products-popup-common').find('.elementor__content');
                          		carouselElement.slick('refresh');
            					carouselElement.slick('setPosition');
                          	}
                        },
                        close: function() {
                          	$('body').removeClass('loading-page-newsletter-magnific-popup');
                            $('.mfp-preloader').css('display', 'none');
                        }
                    }
		        });
        	}
		}
		if($('#products-popup-common').length > 0){
			var data_show = $('#products-popup-common').data('show');
			var get_width = $('#products-popup-common').data('width');
			$('#products-popup-common').css({"max-width": get_width, "margin": "auto"});
			var show_products = false;
			if(data_show == '1'){
        		if($('body').hasClass('cms-index-index')){
        			show_products = true;
        		}
        	}
        	else{
        		show_products = true;
        	}
        	if(show_products){
        		var data_auto = parseInt($('#products-popup-common').data('timeout'));
        		setTimeout(function(){
					$.magnificPopup.open({
			        	items: {
						    src: '#products-popup-common',
						    type: 'inline'
						},
						removalDelay: 500,
	                    closeOnBgClick: true,
	                    preloader: true,
	                    tLoading: '',
	                    mainClass: 'mfp-zoom-in',
						callbacks: {
	                        open: function() {
	                        	$('.mfp-preloader').css('display', 'block');
	                            $('body').addClass('loading-page-newsletter-magnific-popup');
	                          	var cal = $('#products-popup-common').find("div[data-appearance='carousel']").length;
	                          	if(cal > 0){
	                          		var carouselElement = $('#products-popup-common').find('.elementor__content');
	                          		carouselElement.slick('refresh');
                					carouselElement.slick('setPosition');
	                          	}
	                        },
	                        close: function() {
	                          	$('body').removeClass('loading-page-newsletter-magnific-popup');
	                            $('.mfp-preloader').css('display', 'none');
	                        }
	                    }
			        });
				}, data_auto*1000);
        	}
		}
		if($('.product-image-container').length > 0){
			$(".product-image-container").each(function() {
				var get_c = $(this).data("hover");
				$(this).closest('.product-item-info').addClass(get_c);
			});
		}
		$('#new_check--show').click(function() {
		    if ($(this).is(':checked')) {
		    	$.magnificPopup.close();
		    	setCustomCookie("shownewsletter",'1',365)
		    }
		  });
		$(document).on('click','.link-shortview', function() {
            var prodUrl = $(this).attr('data-shortview-url');
            if (prodUrl.length) {
                $.magnificPopup.open({
                    items: {
                      src: prodUrl
                    },
                    type: 'ajax',
                    removalDelay: 500,
                    closeOnBgClick: true,
                    preloader: true,
                    tLoading: '',
                    mainClass: 'mfp-zoom-in',
                    callbacks: {
                        open: function() {
                          	$('.mfp-preloader').css('display', 'block');
                          	$('.mfp-close').css('display', 'none');
                          	$('body').addClass('product-short-magnific-popup');
                        },
                        close: function() {
                        	$('body').removeClass('product-short-magnific-popup');
                          	$('.mfp-preloader').css('display', 'none');
                          	$('.mfp-close').css('display', 'block');
                        }
                    }
                });
            }
        });

        $(document).on('click', '.btn__top--header--banner--close', function(){
			$('.section-top-header').slideUp();
			return false;
		});
        
        $(document).on('click', '.grid-mode-show-type-products a', function(){
			$('.grid-mode-show-type-products a').removeClass('actived');
			$(this).addClass('actived');
			var data_view_mode = $('.container-products-switch').attr('data-view-mode');
			var view_mode = $(this).attr('data-grid-mode');
			$('.container-products-switch').removeClass('category_page_grid_'+data_view_mode);
			$('.container-products-switch').attr('data-view-mode',view_mode);
			$('.container-products-switch').addClass('category_page_grid_'+view_mode);
			return false;
		});

        var width = $(window).width();
        if(width <= 991){
            $('body').on('click', '.filter-options-title', function(){
                if (!$(this).parent().hasClass("active")) {
                    $(this).parent().addClass("active");
                    $(this).parent().children(".filter-options-content").slideDown(300);
                } else {
                    $(this).parent().removeClass("active");
                    $(this).parent().children(".filter-options-content").slideUp(300);
                }
            });
        }

        $('body').on('click', '.cat_filter .btn_filter', function(){
            var screenWidth = $(window).width();
            if($('body').hasClass('filter-active')){
                $('body').removeClass('filter-active');
                $('#layered-filter-block').removeClass('active');
                if (screenWidth > 991 && !$('body').hasClass('catalog-category-sidebar-canvas')) {
                    $('.filter-options').slideUp(300);
                }
            }else{
                $('body').addClass('filter-active');
                $('#layered-filter-block').addClass('active');
                if (screenWidth > 991 && !$('body').hasClass('catalog-category-sidebar-canvas')) {
                    $('.filter-options').slideDown(300);
                }
            }
            return false;
        });

        $('body').on("click", function(event){
            var screenWidth = $(window).width();
            var $trigger = $("#narrow-by-list");
            if (screenWidth > 991 && ($('body').hasClass('catalog-category-grid') || $('body').hasClass('catalog-category-packery') || $('body').hasClass('catalog-category-masonry')) && $('body').hasClass('page-layout-1column')) {
                if($trigger !== event.target && !$trigger.has(event.target).length){
                    $('body').removeClass('filter-active');
                    $('#layered-filter-block').removeClass('active')
                    $('.filter-options').slideUp(500);
                }
            }
        });	

        $(document).on('click', '#layered-filter-block .filter-title', function(){
			if($('body').hasClass('filter-active')){
                $('body').removeClass('filter-active');
                $('#layered-filter-block').removeClass('active');
            }else{
                $('body').addClass('filter-active');
                $('#layered-filter-block').addClass('active');
            }
		});

		$(document).on('click', '.static-menu-click', function(){
			var current_this = $(this);
			if(current_this.hasClass('more-action')){
				current_this.removeClass('more-action');
				current_this.addClass('less-action');
				current_this.closest('div[data-content-type="staticmenu"]').find('.elementor-content-static-menu').slideDown("slow");
			}
			else{
				current_this.removeClass('less-action');
				current_this.addClass('more-action');
				current_this.closest('div[data-content-type="staticmenu"]').find('.elementor-content-static-menu').slideUp("slow");
			}
			return false;
		});

		if($("div").hasClass( "products-list" )){
			$(".grid-mode-show-type-products").hide();
		}
		
		$('#back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
		if($('#purchase-fake-order').length > 0){
			var show_number_seconds = parseInt($('#purchase-fake-order').attr('data-seconds-displayed'));
			var show_number_hide = parseInt($('#purchase-fake-order').attr('data-seconds-hide'));
			var url_fake = $('#purchase-fake-order').attr('data-url');
			var interval_fake_order = setInterval(getProductRandom, show_number_seconds*1000);
			var stop_now = false;
			$(document).on('click', '#purchase-fake-order .purchase-close', function(){
				clearInterval(interval_fake_order);
				stop_now = true;
				$('#purchase-fake-order').removeClass('fadeInUp');
				$('#purchase-fake-order').addClass('fadeOutDown');
			});
			function getProductRandom(){
				clearInterval(interval_fake_order);
                if(stop_now){
                    return false;
                }
				if(!$('#purchase-fake-order').hasClass('fadeInUp')){
					$.getJSON(url_fake, function( data ) {
						if(data.html != ""){
							$('#purchase-fake-order .product-purchase').html(data.html);
							$('#purchase-fake-order').removeClass('fadeOutDown');
							$('#purchase-fake-order').addClass('fadeInUp');
							$('#purchase-fake-order').removeAttr("style");
							setTimeout(function(){
								$('#purchase-fake-order').removeClass('fadeInUp');
								$('#purchase-fake-order').addClass('fadeOutDown'); 
								interval_fake_order = setInterval(getProductRandom, show_number_seconds*1000);
							}, show_number_hide*1000);
						}
					});
				}
				else{
					$('#purchase-fake-order').removeClass('fadeInUp');
					$('#purchase-fake-order').addClass('fadeOutDown'); 
				}
			}
		}

		var scrolled_back = false;
		var offset = $('.page-header').outerHeight();
		var prevScrollpos = window.pageYOffset;
		
		$(window).scroll(function () {
			var screenWidth = $(window).width();
			if($('#back-top').length > 0){
				if ($(this).scrollTop() > 400 && !scrolled_back) {
					$('#back-top').addClass('show');
					scrolled_back = true;
				}
				if ($(this).scrollTop() <= 400 && scrolled_back) {
					$('#back-top').removeClass('show');
					scrolled_back = false;
				}
			}
			if($('body').hasClass('enable__sticky--header') && screenWidth >= 768){
				var currentScroll = $(window).scrollTop();
				var currentScrollPos = window.pageYOffset;
				if(prevScrollpos > currentScrollPos && currentScroll > offset ) {
		            $(".header-container").addClass("sticky");
		            $(".header-container").addClass('kalles_scroll_up').removeClass('kalles_scroll_down');
		        } 
		        else if(currentScroll <= offset ) {
		        	$(".header-container").removeClass("sticky");
		        	$(".header-container").removeClass('kalles_scroll_up kalles_scroll_down');
		        } 
		        else{
		        	$(".header-container").addClass("sticky");
		        	$(".header-container").addClass('kalles_scroll_down').removeClass('kalles_scroll_up');
		        }
		        prevScrollpos = currentScrollPos;
			}
		});
	});
});