$(document).ready(function(){
	//слайдер
	const slider = tns({
		container: '.carousel__inner',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		nav: false,
		controls: false
	});

	document.querySelector('.next').addEventListener('click', function () {
		slider.goTo('next');
	});

	document.querySelector('.prev').addEventListener('click', function () {
		slider.goTo('prev');
	});

	// табы
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(itemClass) {
		$(itemClass).each(function(i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__back');
	toggleSlide('.catalog-item__link');

	// модальные окна

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	// валидация полей в формах
	function validateForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				  },
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста введите имя",
					minlength: jQuery.validator.format("Введите {0} символа")
				},
				phone: "Пожалуйста введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	};

	validateForms('#order form');
	validateForms('#consultation-form');
	validateForms('#consultation form');

	// маска для ввода телефонного номера
	$('input[name=phone]').mask("+7 (999) 999-9999");

	// отправка данных на сервер
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	// плавный скрол и pageup
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	// анимация
	new WOW().init();
});
