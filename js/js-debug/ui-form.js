! function($) {
	$.fn.galaxy.prototype.formInit = function() {
		var select = $(".ui-form-select")
		if (select.length == 0) {
			return false;
		};
		wrapSelect(select);
		initSelect(select)
		var tSelect = $(".ui-select-wrap");
		var value = select.val();
	}

	function wrapSelect(select) {
		select.wrap("<div class=ui-select-wrap></div>");
		var text = "<div class='ui-select-value'></div><div class='ui-select-arr'></div>"
		$(select).before(text);
	}

	function initSelect(select) {
		$(".ui-select-wrap").each(function(index) {
			$(this).find(".ui-select-value").text(selecText($(this)));
		});
		select.on("change",function(){
			var el = $(this);
			el.parent().find(".ui-select-value").text(selecText(el));
		})
	}
	function selecText($el){
		return $el.find("option").not(function(){ return !this.selected }).text();
	}
}(window.Zepto)