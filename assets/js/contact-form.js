$(document).ready(function() {		
	var focusColor = '#ffdc53';
	
	$('#buttonsend').click( function() {

		var name    = $('.contact-form #name').val();
		var subject = $('.contact-form #subject').val();
		var email   = $('.contact-form #email').val();
		var message = $('.contact-form #message').val();

		$('.loading').css('display','inline-block').fadeIn('fast');

		if (name != "" && subject != "" && email != "" && message != "") {

			$.ajax({
				url: './sendemail.php',
				type: 'POST',
				data: "name=" + name + "&subject=" + subject + "&email=" + email + "&message=" + message,
				success: function(result) {
					$('.loading').fadeOut('fast');
					
					if(result == "email_error") {
						$('#email').css({ "background":"#FFFCFC","border":"1px solid #ffadad" }).next('.require').text(' !');
						$('label[for="email"] span').css({"border":"none", "background":"#ffadad"});
					} else {
						$('#name, #subject, #email, #message').val("","Name","Subject","Email","Message");
						$('.success-contact').fadeIn();
						$('.success-contact').fadeOut(5000, function(){ $(this).remove(); });
					}
				}
			});

			return false;

		} else {
			$('.loading').fadeOut('fast');

			if(name == "") { 
				$('.contact-form #name').css({"background":"#FFFCFC","border":"1px solid #ffadad"}) 
				$('label[for="name"] span').css({"border":"none", "background":"#ffadad"})
			};

			if(subject == "") {
				$('.contact-form #subject').css({"background":"#FFFCFC","border":"1px solid #ffadad"})
				$('label[for="subject"] span').css({"border":"none", "background":"#ffadad"})
			};

			if(email == "") {
				$('.contact-form #email').css({"background":"#FFFCFC","border":"1px solid #ffadad"})
				$('label[for="email"] span').css({"border":"none", "background":"#ffadad"})
			};

			if(message == "") {
				$('.contact-form #message').css({"background":"#FFFCFC","border":"1px solid #ffadad"});
				$('label[for="message"] span').css({"border":"none", "background":"#ffadad"})
			}
			return false;
		}
	});
		

	$("#name").focus(function () { $('label[for=name] span').css({"border":"none","background": focusColor }); });
	$("#subject").focus(function () { $('label[for=subject] span').css({"border":"none","background":focusColor }); });
	$("#email").focus(function () { $('label[for=email] span').css({"border":"none","background":focusColor }); });
	$("#message").focus(function () { $('label[for=message] span').css({"border":"none","background":focusColor }); });

	$('#name, #subject, #email, #message').focus(function(){
		$(this).css({"border":"none","background":"#f7f7f7","border":"1px solid focusColor"});
	});      	
});