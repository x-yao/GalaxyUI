! function($) {
	$.fn.galaxy = function(opt){
		this.init();
		this.option = $.extend(this.defOptions,opt);
	};
	$.fn.galaxy.prototype = {
		init: function() {
			this.linkInit();
			this.ptrInit();
			this.tabInit();
			this.formInit();
			this.listInit();
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
			$('body').on('click','[data-href]', function(e) {
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
});
console.log("hello");;
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
		var text = "<div class='ui-select-value'></div><div class='ui-select-arr ui-iconfont'></div>"
		$(select).before(text);
	}

	function initSelect(select) {
		$(".ui-select-wrap").each(function(index) {
			$(this).find(".ui-select-value").text(selecText($(this)));
		});
		select.on("change",function(){
			var el = $(this);
			el.parent().find(".ui-select-value").text(selecText(el));
		});
	}
	function selecText($el){
		return $el.find("option").not(function(){ return !this.selected }).text();
	}
}(window.Zepto);
!function($) {
	$.fn.galaxy.prototype.listInit = function (){
		initLinkAct();
		//initScroll()
	}
	function initLinkAct(){
		$(".ui-list-link").on("touchstart","li",function(e){
			var el = e.currentTarget;
			var list = $(this);
			var act = setTimeout(function(){
				$(el).addClass("ui-list-active");
			},80);
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
	var defaultopt = {
		slideAble : 'left',//right,both
		autoRun : {
			left : '',
			right : ''
		}, //false
		eachLength: 40,
		listEl : '.ui-list',

	}
	// var defaultopt = {
	// 	slideAble : 'left',//right,both
	// 	autoRun : {
	// 		left : '',
	// 		right : ''
	// 	}, //false
	// 	el : {
	// 		left : [{
	// 			word : '',
	// 			image : '',
	// 			id : ''
	// 		}],
	// 		right : []
	// 	}
	// }

	//list scroll 未完待续
	var startP,//起始点
		endP,//终结点
		endDis,//结尾长度
		options,
		endPos,
		leftCont,
		rightCont;//松手位移


	$.fn.galaxy.prototype.listSlide = function(opt){
		options = $.extend(defaultopt,opt);
		var el = options.listEl;
		bindSlide($(el));
	}
	function bindSlide(el){
		el.on('touchstart.slide','.ui-list-slide',function(e){
			var touch = e.changedTouches[0];
			leftCont = el.find('.ui-slide-left .ui-slide-item').length;
			rightCont = el.find('.ui-slide-right .ui-slide-item').length;
			startP = touch.pageX;
			el.on('touchmove.slide','.ui-list-slide',function(e2){
				e2.preventDefault();
				var direction;
				var touchM = e2.changedTouches[0];
				var distance = touchM.pageX - startP;
				if (options.slideAble == 'left' && distance > '0') {
					return false
				}else if(options.slideAble == 'right' && distance <= '0'){
					return false
				};
				//distance >= 0 ? direction = 
				animateMove($(this),distance);
			})
		})
		el.on('touchend.slide','.ui-list-slide',function(e){
			var touch = e.changedTouches[0];
			el.off('touchmove.slide');
			endDis = touch.pageX - startP;
			moveEnd(el,endDis);
		})
		
	}
	function animateMove(el,length){
		el.find('.ui-slide-main').css({
			'transform' : 'translateX('+length+'px)',
			'-webkit-transform' : '-webkit-translateX('+length+'px)',
			'transition-duration' : '0s',
			'-webkit-transition-duration' : '0s',
		});
	}
	function moveEnd(el,endDis){
		var dis = Math.abs(endDis);
		if (dis < 30) {
			length = 0;
		}else{
			if (endDis < 0) {
				length = - rightCont * options.eachLength;
			}else {
				length = leftCont * options.eachLength;
			};
		};
		animateEnd(length,el);
	}
	function animateEnd(length,el){
		el.find('.ui-slide-main').css({
			'transform' : 'translateX('+length+'px)',
			'-webkit-transform' : '-webkit-translateX('+length+'px)',
			'transition-property' : 'transform',
			'-webkit-transition-property' : '-webkit-transform',
			'transition-duration' : '.6s',
			'-webkit-transition-duration' : '.6s',
			'transition-timing-function': 'ease-in-out',
			'-webkit-transition-timing-function': 'ease-in-out'
		})
	}
	// function initScroll(){
	// 	var loading = false;
	// 	var tep = '<li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li>'
	// 	var el = $(".ui-list-scroll");
	// 	$(window).on("scroll",function(){
	// 		var sData = $.fn.galaxy.getScroll();
	// 		if (sData.scrollB < 100) {
	// 			el.trigger("scrollBottom");
	// 		}else if(sData.scrollT < 100){
	// 			el.trigger("scrolltop");
	// 		};
	// 	})
	// }
	// $.fn.galaxy.prototype.getScroll = function (){
	// 	var dh = $(".ui-list-link").height()-window.datas.pageHeight
	// 	var scroll = $("body").scrollTop();
	// 	var s = dh-scroll;
	// 	return {
	// 		scrollB : s,
	// 		scrollT : scroll
	// 	}
	// 	// console.log(dh,scroll,s,sh)
	// }
}(window.Zepto);
! function($) {
	var animate = {
		aIn:'ani-pop-sta',
		aInOut:'ani-pop-rem',
		aInClick:'ani-pop-sta',
		aInFull:'ani-pop-full',
	}
	// opt = {
	// 	type:'', // el,loading,fullScreen
	//  value:'', //string
	// 	animate:'', //animate配置
	//  click:Boolean, // animate == aIn,defalut true
	// 	el:$(select), //插入的元素 type == el,loading,allScreen,alert
	//  flexDirection: column,
	// }
	$.fn.galaxy.prototype.pop = function(opt) {
		if (typeof opt == "string" || typeof opt == "number") {
			render(opt,'','aInOut');
		}else if(typeof opt == "object"){
			init(opt);
		};
		perevendDef();
	}
	$.fn.galaxy.prototype.removePop = function(){
		popRemove();
	}
	function init(opt){
		addHandle();
		var value = opt.value,
			type = opt.type,
			animate = opt.animate,
			el = opt.el,
			flexDirection = opt.flexDirection,
			click = opt.click;
		if (type) {
			render(value,type,animate,el,flexDirection,click)
		}else if(el){
			render(value,'el',animate,el,flexDirection,click)
		};
	}
	function addHandle(){
		$('body').on('touchmove','.ui-pop',function(e){
			e.preventDefault();
		})
	}
	function popRemove(){
		$('.ui-pop').remove();
	}
	function render(value,type,ani,el,state,click){
		switch(type)
		{
		case 'el':
		  renderDef(value,ani,el,state)
		  break;
		case 'loading':

		  break;
		case 'fullScreen':
		  renderDef(value,ani,el,state,true,click)
		  break;
		default:
		  renderDef(value,ani);
		}
	}
	function renderDef(value,ani,el,state,fullscreen,click){
		var tmp;//填充模板
		var tAni = animate[ani];
		var warp = initWrap(tAni,state,fullscreen);
		if (!el) {
			tmp = $('<div class="ui-pop-str">'+value+'</div>');
		}else{
			if (value) {
				var val = $('<div class="ui-pop-str">'+value+'</div>');
				tmp = $(el).concat(val);
			}else{
				tmp = $(el);
			};
		};
		var popEl = warp.append(tmp);
		popEl.appendTo('body');
		if(click){
			popEl.on('click',function(){
				popRemove();
			})
		}
		if (ani == 'aInOut') {
			setTimeout(function(){
				$('.ui-pop').remove();
			},1200)
		};
	}
	function perevendDef(){
		$('body').off("touchmove.preSlide");
		$('body').on("touchmove.preSlide",'.ui-pop,.ui-alert-bac',function(e){
			e.preventDefault();
		})
	}
	function initWrap(tAni,state,fullscreen){
		var direction = state == 'row' ? '' : 'flex-direction-col';
		var isFullScreen = fullscreen ? 'ui-pop-screen' : 'ui-pop-def';
		var tmp = $('<div class="ui-pop ui-center '+tAni+' '+ direction +' '+ isFullScreen +'"></div>');
		return tmp
	}
	
	$.fn.galaxy.prototype.alert = function(value,opt){
		var alertOptions = {
			value : '',
			title:window.location,
			isButton:true,
			button : [{value:'确认',className:'',handle:function(){alertRemove();}}]
		}
		var alertOption = $.extend(alertOptions,opt);
		var alertValue = JSON.stringify(value)
		renderAlert(alertValue,alertOption);
		initHighlight();
		if(alertOption.isButton){
			initBtnHandle(alertOption.button);
		}
		perevendDef();
	}
	$.fn.galaxy.prototype.removeAlert = function(){
		alertRemove();
	}
	function alertRemove(){
		$('.ui-alert-bac').remove();
	}
	function renderAlert(value,opt){
		opt.value = value;
		var alert = [
			'<div class="ui-pop-screen ui-alert-bac ani-pop-alertBac">',
			'<div class="ui-pop-alert ani-pop-full">',
			'<div class="ui-alert-main">',
			'<div class="alert-main-title">'+opt.title+'</div>',
			'<div class="alert-main-article">'+opt.value+'</div>',
			'</div>'
		];
		if(opt.isButton){
			alert.push(renderButton(opt.button))
		}
		var tail = '</div></div>';
		alert.push(tail);
		var alertEl = alert.join('');
		$(alertEl).appendTo('body');
	}
	function renderButton(ary){
		var botton = ['<div class="ui-alert-button">'];
		for (var i = 0; i < ary.length; i++) {
			var tmp = '<div class="alert-button-item '+(ary[i].className ? ary[i].className : ("botton"+i))+'">'+ary[i].value+'</div>';
			botton.push(tmp);
		};
		botton.push('</div>');
		return botton.join('');
	}
	function initBtnHandle(ary){
		$(".ui-alert-button").on("click",".alert-button-item",function(){
			var index = $(this).index();
			ary[index].handle ? ary[index].handle() : alertRemove();
		})
	}
	function initHighlight(){
		$(".ui-alert-button").on("touchstart",".alert-button-item",function(e){
			var el = e.currentTarget;
			var button = $(this);
			var act = setTimeout(function(){
				$(el).addClass("active");
			},80);
			button.on("touchmove.active",function(){
				clearTimeout(act);
				$(el).removeClass("active");
			});
			button.on("touchend.active",function(){
				clearTimeout(act);
				$(el).removeClass("active");
				button.off("touchmove.active touchend.active")
			})
		})
	}


}(window.Zepto);
! function($) {
	$.fn.galaxy.prototype.ptrInit = function() {
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
	$.fn.galaxy.prototype.scroll = function(el,needload) {
		scrollHandel(el,needload);
	}
	function scrollHandel(el,needload){
		$(el).on('touchstart',function(e){
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
			if(needload){
				scrollLoad(el,scrollBtm);
			}
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
	function scrollLoad(el,btm){
		var $el = $(el);
		var lastst = $el.scrollTop();
		$el.on('scroll',function(e){
			var thisst = $(this).scrollTop()
			console.log(thisst,btm);
			if (btm-thisst<50 && thisst > lastst ) {
				console.log('hi');
				$(this).trigger('scrLoad')
					   .off('scroll');
			};
			lastst = thisst;
		})
	}
}(window.Zepto)