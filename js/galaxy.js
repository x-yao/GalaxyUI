! function($) {
	$.fn.galaxy = {
			init: function() {

			},
			//初始化连接方法
			initLink: function(e) {
				var el = e.currentTarget;
				var datas = $(el).data();
				if (datas.href) {
					location.href = datas.href;
				};
			},
			linkInit: function() {
				var self = this;
				$('[data-href]').on('click', function(e) {
					self.initLink(e);
				})
			},
			linkOff:function(){
				$('[data-href]').off('click');				
			}
		}
		window.datas = {
			"pageWidth": document.documentElement.clientWidth,
			"pageHeight": document.documentElement.clientHeight,
			"isSafari": (/Safari/).test(navigator.userAgent)
		}
	$(document).ready(function() {
		FastClick.attach(document.body);
		$.fn.galaxy.linkInit()
	})
}(window.Zepto);
console.log("hello");;
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
		var tep = '<li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li>'
		var el = $(".ui-list-scroll");
		$(window).on("scroll",function(){
			var sData = $.fn.galaxy.getScroll();
			if (sData.scrollB < 100) {
				el.trigger("scrollBottom");
			}else if(sData.scrollT < 100){
				el.trigger("scrolltop");
			};
		})
	}
	function reinitLink(){
		$.fn.galaxy.linkOff();
		$.fn.galaxy.linkInit();
	}
	$.fn.galaxy.getScroll = function (){
		var dh = $(".ui-list-link").height()-window.datas.pageHeight
		var scroll = $("body").scrollTop();
		var s = dh-scroll;
		return {
			scrollB : s,
			scrollT : scroll
		}
		// console.log(dh,scroll,s,sh)
	}
	$(document).ready(function() {
		init();
	})
}(window.Zepto)