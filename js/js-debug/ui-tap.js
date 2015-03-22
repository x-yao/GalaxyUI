! function($) {
	var header,contain;
	$.fn.galaxy.tapInit = function () {
		header = $(".ui-tap .ui-tap-header .ui-item-header");
		contain = $(".ui-tap .ui-tap-contain .ui-item-contain");
		if (header.length == 0) {
			return false
		};
		header.on("click",function(){
			var index = $(this).index();
			removeAll();
			$(this).addClass("active");
			$(contain[index]).show();
		});
		init();
	}
	function removeAll () {
		header.removeClass("active");
		contain.hide();
	}
	function init () {
		if(!header.hasClass("active")){
			$(header[0]).trigger("click")
		}
	}
}(window.Zepto)