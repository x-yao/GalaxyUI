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
		scrollHandel();
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
	function scrollHandel(){
		$('.ui-item-scroll').on('touchstart',function(e){
			// if ($(this).scrollTop() !=0) {
			// 	return false;
			// };
			var $el = $(this),
				firstChidren = $($el.children().get(0)),
				ch = $el.height(),
				ih = firstChidren.height();
			var scrollBtm = ih-ch;
			var touch = e.changedTouches[0];
			var st = touch.pageY;
			$(this).on('touchmove',function(e1){
				var touch2 = e1.changedTouches[0];
				var mt = touch2.pageY;
				if (mt-st>0&&$(this).scrollTop()==0) {
					e1.preventDefault();
				}else if(mt-st<0&&$(this).scrollTop()==scrollBtm){
					e1.preventDefault();
				};
			})
		})
		.on('touchend',function(){
			$(this).off('touchmove');
		})

	}
}(window.Zepto)