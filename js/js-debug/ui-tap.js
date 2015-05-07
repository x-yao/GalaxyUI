! function($) {
	var header,headers,contain,current;
	$.fn.galaxy.prototype.tabInit = function () {
		header = $(".ui-tab .ui-tab-header");
		headers = $(".ui-tab .ui-tab-header .ui-item-header");
		contain = $(".ui-tab .ui-tab-contain .ui-item-contain");
		if (headers.length == 0) {
			return false
		};
		headers.on("click",function(){
			if (current) {
				var scrollTop = current.scrollTop();
				current.data().scrollTop = scrollTop;
			};
			var index = $(this).index();
			removeAll();
			$(this).addClass("active");
			current = $(contain[index]);
			current.addClass('active');
		});
		init();
	}
	function removeAll () {
		headers.removeClass("active");
		contain.removeClass('active');
	}
	function init () {
		var active = header.data().active-1;
		if(!headers.hasClass("active")&&!active){
			$(headers[0]).trigger("click");
		}else{
			$(headers[active]).trigger("click");
		}
	}
}(window.Zepto)