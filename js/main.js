var doctor_list_item, gcaptcha_modal_enter = false;
var gsite_key = '6LfVV2MUAAAAAKPsQKfj8Y1d2K0MXY35mFF98BFU';

$(document).ready(function(){

	doctor_list_item = $('body.doc_record .doctor_list .item').eq(0).clone();

	//----------------------------------------------
	//Всплывающее окно аутентификации
	var profile_data_changed = false;

	$('#modal_auth input.phone_mask, #modal-consult input.phone_mask').inputmask("+7 (999) 999-99-99");
	$('#modal_auth #reg_birthday, #modal_auth #profile_birthday').inputmask("99.99.9999");
	$('#modal_auth #reg_confirm_code, #modal_auth #reminder_confirm_code').inputmask("999999");

	$('#modal_auth').on('hidden.bs.modal', function () {
		if ( profile_data_changed == true ){
			location.href = '/doc_record.html';
		}
	})

	//Ссылки Авторизация и Регистрация
	$("#modal_auth .current_selector").on('click', 'a', function(e){
		e.preventDefault();

		if ( !$(this).hasClass('active') ){
			var target = $(this).attr('data-target');

			$('#modal_auth #error_message').html('');
			$('#modal_auth #error_message').slideUp();
			$('#modal_auth #success_message').html('');
			$('#modal_auth #success_message').slideUp();

			$('#modal_auth .current_selector a').removeClass('active');
			$(this).addClass('active');

			$("#modal_auth .auth_form, #modal_auth .register_form, #modal_auth .reminder_form, #modal_auth .reminder_form_confirm").slideUp();
			$("#modal_auth " + target).slideDown();
		}
	});

	//Ссылка Забыли пароль
	$("#modal_auth").on('click', '#forgot_pass', function(e){
		e.preventDefault();

		$('#modal_auth .current_selector a').removeClass('active');

		$("#modal_auth .auth_form, #modal_auth .register_form").slideUp();
		$("#modal_auth .reminder_form").slideDown();
	});


	//Подтверждение регистрации
	$("#modal_auth").on('click', '#reg_confirm', function(e){
		e.preventDefault();

		var data = $('#modal_auth .register_form_confirm input').serialize();
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=register_confirm',
			data: data,
			beforeSend: function(xhr) {
				$('#modal_auth .loading_box').fadeIn();

				$('#modal_auth .register_form_confirm input').each(function(){
					if ( $(this).val() == '' ) $(this).parent('.form-group').addClass('has-error');
					else $(this).parent('.form-group').removeClass('has-error');
				});
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #error_message').html( response.message );
					$('#modal_auth #error_message').slideDown();
					$('#modal_auth #success_message').slideUp();
				}
				else{
					$('#modal_auth #error_message').slideUp();
					$('#modal_auth #success_message').html( response.message );
					$('#modal_auth #success_message').slideDown();
					$('#modal_auth .register_form_confirm').slideUp();
				}

				$('#modal_auth .loading_box').fadeOut();
			}
		})
	});

	//Восстановить пароль
	$("#modal_auth").on('click', '#reminder_button', function(e){
		e.preventDefault();

		var data = $('#modal_auth .reminder_form input').serialize();
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=reminder',
			data: data,
			beforeSend: function(xhr) {
				$('#modal_auth .loading_box').fadeIn();

				$('#modal_auth .reminder_form input').each(function(){
					if ( $(this).val() == '' ) $(this).parent('.form-group').addClass('has-error');
					else $(this).parent('.form-group').removeClass('has-error');
				});
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #error_message').html( response.message );
					$('#modal_auth #error_message').slideDown();
					$('#modal_auth #success_message').slideUp();
				}
				else{
					$('#modal_auth #error_message').slideUp();
					$('#modal_auth #success_message').html( response.message );
					$('#modal_auth #success_message').slideDown();
					$('#modal_auth .reminder_form').slideUp();
					$('#modal_auth .reminder_form_confirm').slideDown();
				}

				$('#modal_auth .loading_box').fadeOut();
			}
		})
	});

	//Восстановить пароль - код из sms и изменение пароля
	$("#modal_auth").on('click', '#reminder_confirm', function(e){
		e.preventDefault();

		var data = $('#modal_auth .reminder_form_confirm input').serialize();
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=reminder_confirm',
			data: data,
			beforeSend: function(xhr) {
				$('#modal_auth .loading_box').fadeIn();

				$('#modal_auth .reminder_form_confirm input').each(function(){
					if ( $(this).val() == '' ) $(this).parent('.form-group').addClass('has-error');
					else $(this).parent('.form-group').removeClass('has-error');
				});
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #error_message').html( response.message );
					$('#modal_auth #error_message').slideDown();
					$('#modal_auth #success_message').slideUp();
				}
				else{
					$('#modal_auth #error_message').slideUp();
					$('#modal_auth #success_message').html( response.message );
					$('#modal_auth #success_message').slideDown();
					$('#modal_auth .reminder_form_confirm').slideUp();
				}

				$('#modal_auth .loading_box').fadeOut();
			}
		})
	});

	//Изменение данных профиля
	$("#modal_auth").on('click', '#profile_change_data', function(e){
		e.preventDefault();

		var data = $('#modal_auth .profile_form .profile_custom_params input').serialize();
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=change_custom_params',
			data: data,
			beforeSend: function(xhr) {
				$('#modal_auth .loading_box').fadeIn();

				$('#modal_auth .profile_form .profile_custom_params input').each(function(){
					if ( $(this).val() == '' && $(this).attr('id') != 'profile_oms' && $(this).attr('id') != 'profile_dms' ) $(this).parent('.form-group').addClass('has-error');
					else $(this).parent('.form-group').removeClass('has-error');
				});
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #error_message').html( response.message );
					$('#modal_auth #error_message').slideDown();
					$('#modal_auth #success_message').slideUp();
				}
				else{
					$('#modal_auth #error_message').slideUp();
					$('#modal_auth #success_message').html( response.message );
					$('#modal_auth #success_message').slideDown();
					profile_data_changed = true;
				}

				$('#modal_auth .loading_box').fadeOut();
			}
		})
	});

	//Изменение номера телефона
	$("#modal_auth").on('click', '#profile_change_login', function(e){
		e.preventDefault();

		var data = $('#modal_auth .profile_form .profile_login input').serialize();
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=change_login',
			data: data,
			beforeSend: function(xhr) {
				$('#modal_auth .loading_box').fadeIn();

				$('#modal_auth .profile_form .profile_login input').each(function(){
					if ( $(this).val() == '' ) $(this).parent('.form-group').addClass('has-error');
					else $(this).parent('.form-group').removeClass('has-error');
				});
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #profile_phone_error_message').html( response.message );
					$('#modal_auth #profile_phone_error_message').slideDown();
					$('#modal_auth #profile_phone_success_message').slideUp();
				}
				else{
					$('#modal_auth #profile_phone_error_message').slideUp();
					$('#modal_auth #profile_phone_success_message').html( response.message );
					$('#modal_auth #profile_phone_success_message').slideDown();
					profile_data_changed = true;
				}

				$('#modal_auth .loading_box').fadeOut();
			}
		})
	});

	//Изменение пароля
	$("#modal_auth").on('click', '#profile_change_pass', function(e){
		e.preventDefault();

		var data = $('#modal_auth .profile_form .profile_password input').serialize();
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=change_passwd',
			data: data,
			beforeSend: function(xhr) {
				$('#modal_auth .loading_box').fadeIn();

				$('#modal_auth .profile_form .profile_password input').each(function(){
					if ( $(this).val() == '' ) $(this).parent('.form-group').addClass('has-error');
					else $(this).parent('.form-group').removeClass('has-error');
				});
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #profile_passwd_error_message').html( response.message );
					$('#modal_auth #profile_passwd_error_message').slideDown();
					$('#modal_auth #profile_passwd_success_message').slideUp();
				}
				else{
					$('#modal_auth #profile_passwd_error_message').slideUp();
					$('#modal_auth #profile_passwd_success_message').html( response.message );
					$('#modal_auth #profile_passwd_success_message').slideDown();
					profile_data_changed = true;
				}

				$('#modal_auth .loading_box').fadeOut();
			}
		})
	});


	//----------------------------------------------
	//Страница записи /doc_record
	
	$('#record-type-select').bind('click', function(){
		var recordType = $('#record-type').val();
		
		if(recordType){
			$.cookie('record_type', recordType, { expires: 1/24, path: '/' });
			$('#step1').show();
		} else{
			$.cookie('record_type', '', { expires: -1, path: '/' });
			$('#step1').hide();
		}
		
		if($('body.doc_record .addr_list input:checked').length){
			var data = $('body.doc_record .addr_list input').serialize();
			get_profile_list_by_clinic ( data );
		}
	});
	
	if ( $('body.doc_record').length > 0 ){
		$('body.doc_record #step2 #date_input').datepicker({
			language: 	'ru-RU',
			startDate: 	new Date(),
			endDate: 	new Date( Date.now() + 1000*24*60*60 * 90 ) //+90 дней
		});
		$('body.doc_record #step2 #date_input').inputmask("99.99.9999");
		$('body.doc_record #step2 #time_input').inputmask("99:99");
	}
	//список направлений по выбору адреса radio
	$("body.doc_record .addr_list").on('change', 'input[type="radio"]', function(e){
		e.preventDefault();

		var data = $('body.doc_record .addr_list input').serialize();
		get_profile_list_by_clinic ( data );
	});
	//список направлений по выбору адреса select
	$("body.doc_record #step2").on('change', '#id_clinic_select', function(e){
		e.preventDefault();

		$('body.doc_record .addr_list input[type="radio"]').filter('[value="' + $(this).val() + '"]').trigger('click');
	});


	//направление выбрано radio
	$("body.doc_record .profile_list").on('change', 'input[type="radio"]', function(e){
		e.preventDefault();

		$('body.doc_record #step3').slideUp(300);
		$('body.doc_record #time_input').val('');

		$('body.doc_record #step2').slideDown(700);
		$('html, body').animate({
			scrollTop: $("#step2").offset().top + 10
		}, 700);

		$("body.doc_record #id_profile_select").val( $(this).val() );

		var data = $('body.doc_record #step1 .profile_list input').serialize();
		get_short_doc_and_dates( data );
	});
	//направление выбрано select
	$("body.doc_record #step2").on('change', '#id_profile_select', function(e){
		e.preventDefault();

		$('body.doc_record #step1 .profile_list input[value="' + $(this).val() + '"]').trigger('click');
	});


	//выбор даты из карусели
	$("body.doc_record .date_select_carousel").on('click', 'li.item', function(e){
		e.preventDefault();

		$('body.doc_record #step3').slideUp(300);
		$('body.doc_record #time_input').val('');

		$('body.doc_record #step2 #date_input').val( $(this).attr('data-value') );
		$('body.doc_record .date_select_carousel li.active').removeClass('active');
		$('body.doc_record .date_select_carousel li[data-value="' +  $(this).attr('data-value') + '"]').addClass('active');

		var data = $('body.doc_record #step2 input, body.doc_record #step2 select').serialize();
		get_doc_list_by_date( data );
	});
	//выбор даты из select
	$("body.doc_record #step2").on('change', '#date_input', function(e){
		e.preventDefault();

		$('body.doc_record #step3').slideUp(300);
		$('body.doc_record #time_input').val();


		$('body.doc_record .date_select_carousel li.active').removeClass('active');
		var targ_obj = $('body.doc_record .date_select_carousel li[data-value="' + $(this).val() + '"]');
		targ_obj.addClass('active');
		$('body.doc_record .date_select_carousel').jcarousel('scroll', targ_obj);

		var data = $('body.doc_record #step2 input, body.doc_record #step2 select').serialize();
		get_doc_list_by_date( data );
	});

	$("body.doc_record #step2 .doctor_list").on('click', '.time_list span', function(e){
		e.preventDefault();

		$('body.doc_record #time_input').attr('disabled', false);

		$('body.doc_record #step2 .doctor_list .time_list span').removeClass('active');
		$(this).addClass('active');

		$('body.doc_record #step3').slideDown(700);
		$('html, body').animate({
			scrollTop: $("#step3").offset().top + 10
		}, 700);

		var data = $('body.doc_record #step2 input, body.doc_record #step2 select').serialize();

		var curr_obj = $(this);
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=get_step3',
			data: data,
			beforeSend: function(xhr) {

			},
			success: function(response) {
				var timeType = $(curr_obj).attr('data-type');

				response = JSON.parse(response);

				$('body.doc_record #step2 #time_input').val( $(curr_obj).html() );
				$('body.doc_record #step2 #time_id').val( $(curr_obj).attr('data-id') );

				$('body.doc_record #step2 #id_doctor').val( $(curr_obj).parents('.item').attr('data-id') );

				$('body.doc_record #step3 .profile').html( response.name );
				$('body.doc_record #step3 .date').html( response.date );
				$('body.doc_record #step3 .time').html( $(curr_obj).html() );
				$('body.doc_record #step3 .name').html( $(curr_obj).parents('.item').find('.name').html() );

				$('#time_type').val(timeType);
				$('#is_oms').val(0);
				$('#is_dms').val(0);
				$('#oms_check').prop('checked', false);
				$('#dms_check').prop('checked', false);
				$('#oms_error').hide();
				$('#dms_error').hide();
				$('#submit_button').show();

				if(timeType == 'oms'){
					$('#inet').hide();
					$('#oms').show();
					$('#dms').hide();
				} else if(timeType == 'dms'){
					$('#inet').hide();
					$('#oms').hide();
					$('#dms').show();
				} else{
					$('#inet').show();
					$('#oms').hide();
					$('#dms').hide();
				}
			}
		})

	});


	$("body.doc_record .prev_times").on('click', '.show_content', function(e){
		e.preventDefault();

		$(this).next('.record_list').slideToggle();

	});

	$('#oms_check').bind('change', function(){
		var isOms = $('#time_type').val() == 'oms' ? ( $(this).prop('checked') ? 1 : 0 ) : 0;
		var dataOms = $(this).attr('data-oms');

		$('#is_oms').val(isOms);
		$('#is_dms').val(0);

		if(isOms == 1 && !dataOms){
			$('#oms_error').show();
			$('#submit_button').hide();
		} else{
			$('#oms_error').hide();
			$('#submit_button').show();
		}
	});

	$('#dms_check').bind('change', function(){
		var isDms = $('#time_type').val() == 'dms' ? ( $(this).prop('checked') ? 1 : 0 ) : 0;
		var dataDms = $(this).attr('data-dms');

		$('#is_dms').val(isDms);
		$('#is_oms').val(0);

		if(isDms == 1 && !dataDms){
			$('#dms_error').show();
			$('#submit_button').hide();
		} else{
			$('#dms_error').hide();
			$('#submit_button').show();
		}
	});

	$('#alert-no-more').bind('click', function(){
		$.cookie('alert_no_more', 1, { expires: 365, path: '/' });

		$('#modal_alert').modal('hide');
	});

	$('#alert-button').bind('click', function(){
		$('#modal_alert').bind('hidden.bs.modal', function(){
			$('#modal-consult').modal('show');
			$(this).unbind('hidden.bs.modal');
		});

		$('#modal_alert').modal('hide');
	});

	setTimeout(function(){
		var noMore = $.cookie('alert_no_more') ? true : false;

		if(!noMore && !$('body').hasClass('modal-open')) $('#modal_alert').modal('show');
	}, 5000);
	
	$('#reg_sms_resend').bind('click', function(){
		$.ajax({
			method: "post",
			url: '/doc_record_ajax.php?action=resend_activation',
			data: {
				'reg_phone' : $('#reg_confirm_code').attr('data-phone')
			},
			success: function(response) {
				response = JSON.parse(response);

				if ( response.error == true ){
					$('#modal_auth #error_message').html( response.message );
					$('#modal_auth #error_message').slideDown();
				}
				else{
					$('#modal_auth #error_message').slideUp();
					
					$('#reg_sms_resend').hide();
					
					resendCode();
				}
			}
		});
	});

});

activateCounter = false;

function resendCode(){
	resetSecond = 60;
	
	$('#reg_sms_resend_text').show();
	$('#reg_sms_resend_counter').text(resetSecond);
	
	if(!activateCounter){
		activateCounter = setInterval(function(){
			resetSecond--;
			
			if(resetSecond > 0){
				$('#reg_sms_resend_counter').text(resetSecond);
			} else{
				$('#reg_sms_resend_text').hide();
				$('#reg_sms_resend').show();
				clearInterval(activateCounter);
				activateCounter = false;
			}
		}, 1000);
	}
}

window.onload = function(){
	/*if( $('#recaptcha').length ){
		gcaptcha_modal_enter = grecaptcha.render('recaptcha', {
			'sitekey' : gsite_key,
			'callback' : modal_enter,
			'size' : 'invisible',
			'badge' : 'inline'
		});


		$('#auth_enter').bind('click', function(e){
			e.preventDefault();
			grecaptcha.execute(gcaptcha_modal_enter);
		});
	}*/

	$('#auth_enter').bind('click', function(){
		modal_enter();
	});

	if( $('#recaptcha_reg').length ){
		gcaptcha_modal_reg = grecaptcha.render('recaptcha_reg', {
			'sitekey' : gsite_key,
			'callback' : modal_reg,
			'size' : 'invisible',
			'badge' : 'inline'
		});


		$('#reg_register').bind('click', function(e){
			e.preventDefault();
			grecaptcha.execute(gcaptcha_modal_reg);
		});
	}
};


//Войти
function modal_enter(){

	var data = $('#modal_auth .auth_form input').serialize();
	$.ajax({
		method: "post",
		url: '/doc_record_ajax.php?action=login',
		data: data, // + '&captcha=' + (captcha ? captcha : $("#g-recaptcha-response").val())
		beforeSend: function(xhr) {
			$('#modal_auth .loading_box').fadeIn();
		},
		success: function(response) {
			response = JSON.parse(response);

			if ( response.error == true ){
				$('#modal_auth #error_message').html( response.message );
				$('#modal_auth #error_message').slideDown();
			}
			else{
				$('#modal_auth #error_message').slideUp();
				$('#modal_auth #success_message').html( response.message );
				$('#modal_auth #success_message').slideDown();
				$('#modal_auth .auth_form').slideUp();

				window.location = "/doc_record.html";
			}

			$('#modal_auth .loading_box').fadeOut();

			grecaptcha.reset(gcaptcha_modal_enter);
		}
	})
}

//Регистрация
function modal_reg(captcha){
	var data = $('#modal_auth .register_form input').serialize();
	$.ajax({
		method: "post",
		url: '/doc_record_ajax.php?action=register',
		data: data + '&captcha=' + (captcha ? captcha : $("#g-recaptcha-response-1").val()),
		beforeSend: function(xhr) {
			$('#modal_auth .loading_box').fadeIn();

			$('#modal_auth .register_form input').each(function(){
				if ( $(this).val() == '' ) $(this).parent('.form-group').addClass('has-error');
				else $(this).parent('.form-group').removeClass('has-error');
			});
		},
		success: function(response) {
			response = JSON.parse(response);

			if ( response.error == true ){
				$('#modal_auth #error_message').html( response.message );
				$('#modal_auth #error_message').slideDown();
				
				if(response.inactive == true){
					$('#reg_confirm_code').attr('data-phone', $('#reg_phone').val());
					
					$('#modal_auth .register_form').slideUp();
					$('#modal_auth .register_form_confirm').slideDown();
					
					$('#reg_sms_resend_text').hide();
					$('#reg_sms_resend').show();
				}
			}
			else{
				$('#modal_auth #error_message').slideUp();
				$('#modal_auth #success_message').html( response.message );
				$('#modal_auth #success_message').slideDown();

				$('#modal_auth .register_form').slideUp();
				$('#modal_auth .register_form_confirm').slideDown();
				
				$('#reg_confirm_code').attr('data-phone', $('#reg_phone').val());
				
				resendCode();
			}

			$('#modal_auth .loading_box').fadeOut();
			grecaptcha.reset(gcaptcha_modal_reg);
		}
	});
}


function get_profile_list_by_clinic( data ){

	$('body.doc_record .loading_box').fadeIn();

	$('body.doc_record #time_input').attr('disabled', true);

	$('body.doc_record #step3').slideUp(300);
	$('body.doc_record #time_input').val('');

	$('body.doc_record #step2').slideUp(600);
	$('body.doc_record .doctor_list').slideUp(200);
	$('body.doc_record .doctor_list').html('');
	$('body.doc_record #date_input').val('');
	$('body.doc_record .date_select_carousel li.active').removeClass('active');

	$.ajax({
		method: "post",
		url: '/doc_record_ajax.php?action=profile_list',
		data: data,
		beforeSend: function(xhr) {

		},
		success: function(response) {
			response = JSON.parse(response);

			$('body.doc_record .profile_list').slideUp(200);
			$('body.doc_record .profile_list').html('');
			$('body.doc_record #id_profile_select').find('option').remove();

			for( var i=0; i< response.length; i++ ) {

			var radio_el = $('body.doc_record .addr_list div').eq(0).clone();
				$(radio_el).find('input').attr('name', 'id_profile');
				$(radio_el).find('input').attr('checked', false);
				$(radio_el).find('input').attr('id', 'profile_' + response[i].id);
				$(radio_el).find('input').attr('value', response[i].id);

				$(radio_el).find('label').attr('for', 'profile_' + response[i].id);
				$(radio_el).find('label').html( response[i].name );

				$('body.doc_record .profile_list').append( radio_el );

				$('body.doc_record #id_profile_select').append( $("<option></option>").attr("value", response[i].id).text( response[i].name ) );
			}

			$("body.doc_record #id_clinic_select").val( $('body.doc_record .addr_list input:checked').val() );

			$('body.doc_record .profile_list').slideDown();
			$('body.doc_record .loading_box').fadeOut();
		}
	})
}

function get_short_doc_and_dates( data ){

	$('body.doc_record .doctor_list').slideUp(200);
	$('body.doc_record .doctor_list').html('');
	$('body.doc_record #date_input').val('');
	$('body.doc_record .date_select_carousel li.active').removeClass('active');

	$('body.doc_record #time_input').attr('disabled', true);

	$('body.doc_record .date_select_carousel').jcarousel({scroll: 7, visible: 7});
	$('body.doc_record .jcarousel_main .prev').jcarouselControl({target: '-=7'});
	$('body.doc_record .jcarousel_main .next').jcarouselControl({target: '+=7'});

	$.ajax({
		method: "post",
		url: '/doc_record_ajax.php?action=doctor_list',
		data: data,
		beforeSend: function(xhr) {
			$('body.doc_record .loading_box').fadeIn();
			$('body.doc_record #id_doctor').find('option').remove();
		},
		success: function(response) {
			response = JSON.parse(response);
			for( var i=0; i< response.length; i++ ) {
				$('body.doc_record #id_doctor').append( $("<option></option>").attr("value", response[i].id).text( response[i].name ) );
			}

			$('body.doc_record .loading_box').fadeOut();
		}
	})
}

function get_doc_list_by_date( data ){

	$('body.doc_record .loading_box').fadeIn();
	$('body.doc_record #id_doctor').val(0);
	$('body.doc_record #time_input').attr('disabled', true);

	$.ajax({
		method: "post",
		url: '/doc_record_ajax.php?action=doctor_list_page',
		data: data,
		beforeSend: function(xhr) {

		},
		success: function(response) {
			response = JSON.parse(response);

			$('body.doc_record .doctor_list').slideUp(200);
			$('body.doc_record .doctor_list').html('');

			if ( response != null ){

				for( var i=0; i< response.length; i++ ) {

					var new_doctor_list_item = $(doctor_list_item).clone();
					$(new_doctor_list_item).attr('data-id', response[i].id_doc);
					$(new_doctor_list_item).find('.doc_photo').attr('src', response[i].image);
					$(new_doctor_list_item).find('.name').html(response[i].name);
					$(new_doctor_list_item).find('.profile').html(response[i].profile_name);


					for( var j=0; j<response[i].time_list.length; j++ ) {
						var timeType = response[i].time_list[j].type;

						if(timeType != 'reg') $(new_doctor_list_item).find('.time_list').append('<span data-id="' + response[i].time_list[j].id + '" data-type="' + timeType + '">' + response[i].time_list[j].value + '</span>');
					}

					$('body.doc_record .doctor_list').append( new_doctor_list_item );
				}

			}
			else{
				$('body.doc_record .doctor_list').append( '<div class="nothing_found">Ничего не найдено, возможно в этот день нет свободного времени</div>' );
			}

			$('body.doc_record .doctor_list').slideDown();
			$('body.doc_record .loading_box').fadeOut();
		}
	});
}
