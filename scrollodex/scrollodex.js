function updateScrollodex() {
	// Update scroll-based positions
	var triggerButton = $('#btnIndex'),
			container = $('#scrollodex-outline'),
			viewHeight = $(window).height(),
			scrollTop = $(window).scrollTop(),
			pos = (viewHeight / 2) + scrollTop;
	// Update scrollodex background
	container.css({top: scrollTop});
}

function openScrollodex() {
	var scrollodexButton = $('#btnIndex'),
			outline = $('#scrollodex-outline');
	scrollodexButton.animate({width: "100", queue: false});
	outline.show();
	outline.click(closeScrollodex);
	$('body').css({overflow: 'hidden'});
	
	// remove window on ESC keypress
	$('body').keyup(function(e) {
		var keyCode = e.key || e.keyCode;
		if (keyCode == 27) {
			$(this).unbind('keyup');
			closeScrollodex();
		}
	});
}

function closeScrollodex() {
	var scrollodexButton = $('#btnIndex');
	scrollodexButton.animate({
		width: scrollodexButton.attr('data-sdex-init-width')
	});
	$('#scrollodex-outline').hide();
	$("body").css({overflow: 'auto'});
}

$(function() {
	// Build and attach scrollodex html elements
	var outlineHtml = HTML5Outline(document.body).asHTML(true);
	var pane = $('<div id="scrollodex-pane" />').append(outlineHtml);
	var container = $('<div id="scrollodex-outline" />').append(pane);
	$(document.body).append(container);
	
	// Add the SVG document symbol
	var paper = Raphael('btnIndex');
	paper.image("document.svg", 5, 18, 30, 30);
	
	
	// Configure scrollodex text link jump behavior
	$(pane).click(function(e) {
		e.stopPropagation();
		closeScrollodex();
		var anchorName = $(e.target).attr('href'),
				offsetTop = $(anchorName).offset().top;
	
		$('body').animate({
			scrollTop: offsetTop, 
			duration: 300
		});
	});
		
	// Initialize scrollodex button
	var scrollodexButton = $('#btnIndex');
	scrollodexButton.attr('data-sdex-init-width', scrollodexButton.width());
	scrollodexButton.click(function(e) {
		var $btn = $(this);
		if ($btn.is(':animated')) return;
		if ($btn.width() > parseInt($btn.attr('data-sdex-init-width'))) {
			closeScrollodex();
		} else {
			openScrollodex();
		}
	});
	
	$(window)
		.scroll(updateScrollodex)
		.resize(updateScrollodex);
});