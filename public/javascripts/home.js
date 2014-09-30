$(document).ready(function() {

	var editing = false;

	$(".bake").on("click", function() {
		var tweetBody = $(".new").val();
		var date = new Date();
		if (tweetBody == "") {
			alert("You need to type something in first!");
		}
		else {
			$.ajax({
				type:"POST",
				url: "/tweets/tweet",
				data: {
					body: tweetBody,
					date: date
				},
				success: function(data) {
					if (data == "success") {
						console.log("yay");
						window.location.reload();
					}
					else {
						console.log(data);
					}
				}
			});
		}
	});

	$(".logout").on("click", function() {
		$.ajax({
			type:"GET",
			url: "/logout",
			success: function(data) {
				if (data == "success") {
					window.location = "/";
				}
			}
		});
	});

	$(".edit").on("click", function() {
		$tweet = $(this).parent().parent();
		if (!editing) {
			$(this).html("Save changes")
			$tweet.find(".tweet-info").addClass("hide");
			$tweet.find(".tweet-edit").removeClass("hide");
			editing = true;
		}
		else {
			$.ajax({
			type:"POST",
			url: "/tweets/edit",
			headers: {
				_id: $tweet.attr("data-id")
			},
			data: {
				body: $(".tweet-edit").val()
			},
			success: function(data) {
				if (data == "success") {
					window.location.reload();
				}
				else {
					alert("Sorry, something went wrong editing your tweet.  Please refresh and try again.");
				}
			}
		});
		}
	});

	$(".delete").on("click", function() {
		$.ajax({
			type:"DELETE",
			url:"/tweets/delete",
			headers: {
				_id: $(this).parent().parent().attr("data-id")
			},
			success: function(data) {
				if (data == "success") {
					window.location.reload();
				}
			}
		});
	});

	$(".home").on("click", function() {
		window.location = "/home";
	});


	//TODO: Implement these

	$(".mine,.fav").on("mouseenter", function() {
		$(this).html("!Implemented")
	});

	$(".mine").on("mouseout", function() {
		$(this).html("My Fritters")
	});

	$(".fav").on("mouseout", function() {
		$(this).html("Favorites")
	});

});