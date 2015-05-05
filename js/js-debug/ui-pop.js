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
			init(opt)
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


}(window.Zepto)