$(document).ready(function() {

	var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	$(".signup-confirm").on("click", function() {
		if ( $(".signup-email").val() != "") {
			if (emailReg.test($(".signup-email").val())) {
				var email = $(".signup-email").val();
				var username = email.split('.');
				if ($(".signup-password").val() != "") {
					if ($(".signup-password").val() == $(".signup-password-confirm").val()) {
						$.ajax({
							type:"POST",
							url: "/users/create",
							data: {
								email: email,
								password: $(".signup-password").val(),
								username: username[0],
							},
							success: function(data) {
								if (data == "success") {
									window.location = "/home";
								}
								else {
									alert("Email address already in use!  Please try again.");
								}
							}
						});
					}
					else {
						alert("Your passwords don't match!  Please try again.");
					}
				}
				else {
					alert("Please enter a password.");
				}
			}
			else {
				alert("Please enter a valid email address.");
			}
		}
		else {
			alert("Please enter an email address.");
		}
	});

	$(".login-button").on("click", function() {
		var email = $(".username").val();
		var password = $(".password").val();
		$.ajax({
			type:"POST",
			url: "/users/login",
			data: {
				email: email,
				password: password
			},
			success: function(data) {
				if (data == "success") {
					window.location = "/home";
				}
				else {
					alert("Invalid username/password.");
				}
			}
		})
	});


});