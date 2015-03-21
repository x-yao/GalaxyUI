! function($) {
	$.fn.galaxy.ptrInit = function () {
		var ptr = $(".ui-ptr");
		var list = $(".ui-ptr > .ui-item-ptr");
		var row = ptr.data().row;
		var wrap = Math.ceil(list.length / row);
		var stuff = "<div class='ui-item-ptr'></div>";
		for (var i = wrap; i > 0; i--) {
			var tep = list.splice(0,row);
			if (i == 1) {
				for (var n = 0; n < row - tep.length; n++) {
					$(stuff).appendTo(ptr);
				};
				tep = $(".ui-ptr > .ui-item-ptr");
				$(tep).wrapAll("<div class=ui-flex-ptr>");
			}else {
				$(tep).wrapAll("<div class=ui-flex-ptr>")
			};
		};
	}
	$(document).ready(function() {
		$.fn.galaxy.ptrInit()
	})
}(window.Zepto)