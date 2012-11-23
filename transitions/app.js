$(function() {
	$('.box').click(function() {
		if ($(this).hasClass('totheleft') || !$(this).hasClass('totheright')) {
			$(this).removeClass('totheleft');
			$(this).addClass('totheright');
		} else {
			$(this).removeClass('totheright');
			$(this).addClass('totheleft');
		}
	});
	
});