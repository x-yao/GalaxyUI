! function($) {
	$.fn.galaxy = {
		init: function() {
			this.linkInit();
			this.ptrInit();
			this.tapInit();
			this.formInit();
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
		linkOff: function() {
			$('[data-href]').off('click');
		},
		defOptions:{
			ptr:false,

		},
		customOptions:{

		},
		options:function (opt) {
			this.customOptions = opt;
		}
	}
	var galaxy = $.fn.galaxy;
	window.datas = {
		"pageWidth": document.documentElement.clientWidth,
		"pageHeight": document.documentElement.clientHeight,
		"isSafari": (/Safari/).test(navigator.userAgent)
	}
	$(document).ready(function() {
		var opt = $.extend(galaxy.defOptions,galaxy.customOptions)
		FastClick.attach(document.body);
		$.fn.galaxy.init();
	})
}(window.Zepto);
console.log("hello");;
! function($) {
	$.fn.galaxy.formInit = function () {
		var select = $(".ui-form-select")
		if (select.length == 0) {
			return false;
		};
		select.wrap("<div class=ui-select-wrap></div>");
	}
}(window.Zepto);
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
}(window.Zepto);
! function($) {
	$.fn.galaxy.ptrInit = function() {
		var ptr = $(".ui-ptr");
		if (ptr.length == 0) {
			return false
		};
		for (var n = 0; n < ptr.length; n++) {
			var cList = $(ptr[n]);
			var list = cList.children(".ui-item-ptr");
			var row = cList.data().row;
			var wrap = Math.ceil(list.length / row);
			var stuff = "<div class='ui-item-ptr'></div>";
			wrapList(wrap, list, row, stuff, cList);
		};

	}

	function wrapList(wrap, list, row, stuff, cList) {
			for (var i = wrap; i > 0; i--) {
				var tep = list.splice(0, row);
				if (i == 1) {
					for (var m = 0; m < row - tep.length; m++) {
						$(stuff).appendTo(cList);
					};
					tep = cList.children(".ui-item-ptr");
					$(tep).wrapAll("<div class=ui-flex-ptr>");
				} else {
					$(tep).wrapAll("<div class=ui-flex-ptr>")
				};
			};
		}
		// $(document).ready(function() {
		// 	$.fn.galaxy.ptrInit()
		// })
}(window.Zepto);
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