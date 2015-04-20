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
			console.log(touch.pageX);
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
}(window.Zepto)