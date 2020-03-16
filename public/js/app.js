$(document).ready(function() {
	//dynamically

	$('#burger-submit').on('click', function(e) {
		e.preventDefault();

		const burgerObj = {
			burger_name: $('#burger-name')
				.val()
				.trim(),
			devoured: 0
		};
		$.ajax({
			url: '/api/burgers',
			method: 'POST',
			data: burgerObj
		}).then(function(response) {
			console.log(response);

			window.location.reload();
		});
	});

	$(document).on('click', '.devour', devourBurger);

	function devourBurger() {
		const burgerObj = {
			id: $(this).attr('data-id'),
			devoured: true
		};

		$.ajax({
			url: '/api/burgers',
			method: 'PUT',
			data: burgerObj
		}).then(function(response) {
			console.log(response);

			window.location.reload();
		});
	}
});
