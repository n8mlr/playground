/**
 * Builds interactivity for text inputs
 */
function decorate(formId) {
	$('.input .text').each(function () {
		var label = $('label', this.parentNode);
		if (this.value.length > 0) {
			$(label).css({opacity: 0});
		}
		
		$(this).focus(function() {
			$(label).animate({opacity: 0});
		});
		
		$(this).blur(function() {
			if (this.value.length == 0) {
				$(label).animate({opacity: 1});
			}
		})
	});
}

function checkForm(e) {
	var firstOffender;
	
	// check for blanks on all .required elemeents
	$('.required', this).each(function(index, field) {
		var $self = $(this);
		if (field.value.length == 0) {
			firstOffender = firstOffender || $self;
			$self.addClass("missing");
			$self.keyup(function() {
				if (field.value.length > 0) {
					$self.removeClass("missing");
					$self.unbind("keyup");
				}
			});
		} else {
			$self.removeClass("missing");
		}
	});
	
	if (firstOffender) {
		e.preventDefault();
		$(firstOffender).focus();
	}
}

$(function() {
	decorate('#registration');
	$('#registration').submit(checkForm);
});