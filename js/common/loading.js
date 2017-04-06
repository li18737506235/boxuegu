define(['jquery'], function($) {
	
	// ajax-loading
	(function() {
		
		$(document).on('ajaxStart', function() {
			$('.overlay').show();
		}).on('ajaxStop', function() {
			$('.overlay').hide();
		});
		
	})();
	
});
