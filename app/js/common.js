$(function() {

	// Скролинг по якорям
	$('.anchor').bind("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top-0 // отступ от меню
		}, 500);
	e.preventDefault();
	});

	// Меню при скроле
	$(window).scroll(function(){
		var topline = $(window).scrollTop();
		if ( topline > 650 ) {
			$(".posf").addClass('show');
		} else {
			$(".posf").removeClass('show');
		};
	});

	// Клик по гамбургеру на моб версии
	$('.mob-mnu__humb').click(function() {
		$('.mob-mnu-list').toggleClass('show');
	});
	$('.mob-mnu__li').click(function() {
		$('.mob-mnu-list').removeClass('show');
	});

	// Формирование полей и заголовков формы в мод окне
	$('.modal').click(function(){
		var ttl = $(this).data('title');
		var subTtl = $(this).data('subtitle');
		var text = $(this).data('text');
		var btn = $(this).data('btn');
		var goal = $(this).data('goal');
		var subject = $(this).data('subject');
		$('.ttl').html(ttl);
		$('.subTtl').html(subTtl);
		$('.text').html(text);
		$('.btn').html(btn);
		$('.goal').val(goal);
		$('.subject').val(subject);
	});

	// Отправка формы
	$('form').submit(function() {
		var data = $(this).serialize();
		var goalId = $(this).find('input[ name="goal"]').val();
		var formId = $(this).data('id');
		data += '&ajax-request=true';
		$.ajax({
			type: 'POST',
			url: 'mail.php',
			dataType: 'json',
			data: data,
			success: (function() {
				if ( formId == "price-form") {
					window.location = "price.pdf";
    				target = "_blank";
				}
				$.fancybox.close();
				$.fancybox.open('<div class="thn"><h3>Заявка отправлена!</h3><p>С Вами свяжутся в ближайшее время.</p></div>');
				gtag('event','submit',{'event_category':'submit','event_action':goalId});
				//fbq('track', 'Lead');
			})()
		});
		return false;
	});

	// Инит фансибокса
	$('.fancybox, .modal').fancybox({
		margin: 0,
		padding: 0
	});

	//Якорь наверх
	$("[href='#top']").click(function(e){
		$('html, body').stop().animate({
			scrollTop: $('#top').offset().top
		}, 300);
		e.preventDefault();
	});

	$('.equipment__dot').mouseover(function() {
		var numb = $(this).data('numb');
		$('.equipment__txt.txt'+numb).css('opacity', '1');
	});
	$('.equipment__dot').mouseout(function() {
		var numb = $(this).data('numb');
		$('.equipment__txt.txt'+numb).css('opacity', '0');
	});

	$("#carousel").featureCarousel({
		smallFeatureWidth: 0.8,
		smallFeatureHeight: 0.8,
		trackerIndividual: false,
		trackerSummation: false,
		autoPlay: 0
	});

	$("#twentytwenty").twentytwenty({
		before_label: 'до', // Set a custom before label
		after_label: 'после', // Set a custom after label
	});

	$('a[href^="#"].form-chouse__item').click(function(event) {
		event.preventDefault();
		var elm = '';
		var elm2 = '';
		var el = $(this).attr('href');
		var el = $(this).attr('href'); 
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			if($('input[name="teeth"]').val().length > 2) {
				elm = ', ';
			} else {
				elm = ''; 
			}
			if($('input[name="teeth"]').val().substr(0, 2) == el.slice(-3)) {
				elm = ''; 
				elm2 = ', ';
			} else {
				elm2 = '';
			}
			if($('input[name="teeth"]').val().length == 2) {
				$('input[name="teeth"]').val('');    
			}
			$('input[name="teeth"]').val($('input[name="teeth"]').val().replace(elm+el.slice(-3)+elm2, ''));
		} else {
			$(this).addClass('active'); 
			if($('input[name="teeth"]').val() != '') {
			   elm = ', '  
			} else {
				elm = '';
			}
		   $('input[name="teeth"]').val($('input[name="teeth"]').val()+elm+(el.slice(-3)));
		}  
	});

	$('.team-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		adaptiveHeight: true
	});

	$('.service-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		  ]
	});

});
