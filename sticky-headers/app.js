// http://css-tricks.com/persistent-headers/
function updateSticky() {
	$(".persist-region").each(function() {
		var el = $(this),
				offset = el.offset(),
				scrollTop = $(window).scrollTop(),
				floatingHeader = $(".floatingHeader", this);
		
		if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height() - 80)) {
			floatingHeader.css({"visibility":"visible"});
		} else {
			floatingHeader.css({"visibility":"hidden"});			
		}
	});
}

$(function () {
	var clonedHeaderRow;
	$(".persist-region").each(function() {
		clonedHeaderRow = $(".sticky", this);
		clonedHeaderRow
			.before(clonedHeaderRow.clone())
			.css("width", clonedHeaderRow.width())
			.addClass("floatingHeader");
	});
	$(window)
		.scroll(updateSticky)
		.trigger("scroll");
});