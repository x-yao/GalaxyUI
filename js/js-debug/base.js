! function($) {
	$.fn.galaxy = function(opt){
		this.init();
		this.option = $.extend(this.defOptions,opt);
	};
	$.fn.galaxy.prototype = {
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
	}
	window.Galaxy = $.fn.galaxy||{};
	window.datas = {
		"pageWidth": document.documentElement.clientWidth,
		"pageHeight": document.documentElement.clientHeight
	}
}(window.Zepto)
$(document).ready(function() {
	FastClick.attach(document.body);
})