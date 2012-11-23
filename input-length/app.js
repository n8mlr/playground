var maxLengths = {};

jQuery.fn.identify = function(prefix) {
    var i = 0;
    return this.each(function() {
        if($(this).attr('id')) return;
        do { 
            i++;
            var id = prefix + '_' + i;
        } while($('#' + id).length > 0);            
        $(this).attr('id', id);            
    });
};

function bindMaxLengths() {
	var mlClass, maxLength, feedback;
	$('[class*="maxLength"]').each(function() {
		$(this).identify('ta');
		$(this).parent("p").addClass("lengthFeedback");
		mlClass = this.className.match(/\bmaxLength(\d+)\b/)[0];
		maxLength = parseInt(mlClass.replace(/\D+/g, ''));
		feedback = $("<span />").addClass('feedback');
		
		// Cache the field length and its feedback element
		maxLengths[$(this).attr("id")] = [maxLength, feedback];
		updateFeedback(this);
		$(this)
			.bind('keyup', updateFeedback)
			.bind('keypress', updateFeedback);		
		$(this).after(feedback);
	});
}

// Executed each time user enters text
function updateFeedback(e) {
	var field = e.tagName ? e : e.currentTarget;
	var tfId = $(field).attr("id");
	var currentLength = $(field).val().length,
			fieldData = maxLengths[tfId],
			maxLength = fieldData[0],
			feedbackField = fieldData[1]
			remaining = ((maxLength - currentLength) < 0) ? 0 : maxLength - currentLength;
	
	$(feedbackField).text(remaining + " characters remaining");
	if (currentLength > maxLength) {
		$(field).val($(field).val().substr(0, maxLength));
	}
	
}

$(function() {
	bindMaxLengths();
})