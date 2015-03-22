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
}(window.Zepto)