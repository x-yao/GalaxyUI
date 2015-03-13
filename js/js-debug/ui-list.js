!function($) {
	function init(){
		initLinkAct();
		initScroll()
	}
	function initLinkAct(){
		$(".ui-list-link").on("touchstart","li",function(e){
			var el = e.currentTarget;
			var list = $(this);
			var act = setTimeout(function(){
				$(el).addClass("ui-list-active");
			},50);
			list.on("touchmove.active",function(){
				clearTimeout(act);
				$(el).removeClass("ui-list-active");
			})
			list.on("touchend.active",function(){
				clearTimeout(act);
				$(el).removeClass("ui-list-active");
				list.off("touchmove.active touchend.active")
			})
		})
	}
	function initScroll(){
		var loading = false;
		var sh = window.datas.pageHeight;
		var tep = '<li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li>'
		// $(".ui-list-link").on("touchmove.scroll",function(){
		// 	var dh = $(".ui-list-link").height()-sh
		// 	var scroll = $("body").scrollTop();
		// 	var s = dh-scroll;
		// 	// var list = $(this);
		// 	// if (s<50&&(!loading)) {
		// 	// 	loading = true;
		// 	// 	setTimeout(function(){
		// 	// 		list.append(tep);
		// 	// 		loading = false;
		// 	// 		reinitLink();
		// 	// 	},500)
		// 	// }else if(s > (dh-50)&&(!loading)){
		// 	// 	loading = true;
		// 	// 	setTimeout(function(){
		// 	// 		list.prepend(tep);
		// 	// 		loading = false;
		// 	// 		reinitLink();
		// 	// 	},500)
		// 	// };
		// 	console.log(s,dh,scroll);
		// })

		$(window).on("scroll",function(){
			var sh2 = document.documentElement.clientHeight
			var dh = $(".ui-list-link").height()-sh
			var scroll = $("body").scrollTop();
			var s = dh-scroll;
			console.log(dh,scroll,s,sh,sh2)
		})
	}
	function reinitLink(){
		$.fn.galaxy.linkOff();
		$.fn.galaxy.linkInit();
	}
	$(document).ready(function() {
		init();
	})
}(window.Zepto)