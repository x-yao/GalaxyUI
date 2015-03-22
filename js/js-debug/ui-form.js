! function($) {
	$.fn.galaxy.formInit = function () {
		var select = $(".ui-form-select")
		if (select.length == 0) {
			return false;
		};
		select.wrap("<div class=ui-select-wrap></div>");
	}
}(window.Zepto)