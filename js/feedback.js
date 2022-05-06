$(document).ready(function(){
	
	$('#modal-consult .form-control').bind('input propertychange', function(){
		$(this).parent('.form-group').removeClass('has-error');
	});
	
	$('#consult-agree').bind('change', function(){
		$(this).parent('.form-group').removeClass('has-error');
	});
	
	$('#modal-consult').bind('hidden.bs.modal', function(){
		$('#consult-success').hide();
		$('#consult-error').hide();
		
		clearForm('consult');
	});
	
	var modalArr = ['consult'];
	
	$.each(modalArr, function(index, value){
		$('#' + value + '-send').bind('click', function(){
			var response = new Promise(function(resolve, reject){
				$.ajax({
					url : '/ajax/feedback.php',
					type : 'post',
					dataType : 'json',
					data : {
						name 		: $('#' + value + '-name').val(),
						phone 		: $('#' + value + '-phone').val(),
						email 		: $('#' + value + '-email').val(),
						comment 	: $('#' + value + '-comment').val(),
						agree 		: $('#' + value + '-agree').prop('checked') ? 1 : 0,
						type 		: $('#' + value + '-type').val()
					},
					success : function(re){
						resolve(re);
					},
					error : function(re){
						reject(re);
					}
				});
			});
			
			response.then(function(result){
				$('#' + value + '-success').hide();
				$('#' + value + '-error').hide();
				
				if(result.status == 'ok'){
					$('#' + value + '-success').show().text(result.response);
					
					setTimeout(function(){
						$('#modal-' + value).modal('hide');
					}, 2500);
					
					clearForm(value);
				} else{
					$('#' + value + '-error').show().text(result.response);
					
					$.each(result.error, function(key, val){
						$('#' + value + '-' + val).parent('.form-group').addClass('has-error');
					});
				}
			}, function(reason){});
		});
	});
	
});

function clearForm(type){
	$('#modal-' + type + ' .form-group').removeClass('has-error');
	$('#modal-' + type + ' .form-control').val('');
	$('#' + type + '-agree').prop('checked', false);
}