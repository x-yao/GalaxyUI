! function($) {
	var animate = {
		aIn:'ani-pop-sta',
		aInOut:'ani-pop-rem',
		aInClick:'ani-pop-sta',
		aInFull:'ani-pop-full',
	}
	// opt = {
	// 	type:'', // el,loading,fullScreen,alert
	//  value:'', //string
	// 	animate:'', //animate配置
	//  click:Boolean, // animate == aIn,defalut true
	// 	el:$(select), //插入的元素 type == el,loading,allScreen,alert
	//  flexDirection: column,
	// 	button:Boolean, //当type == alert 且为 true 
	// 	buttonValue:{a:foo()},//当type == alert 且为 true 
	// }
	$.fn.galaxy.prototype.pop = function(opt) {
		if (typeof opt == "string" || typeof opt == "number") {
			render(opt,'','aInOut');
		}else if(typeof opt == "object"){
			init(opt)
		};
	}
	$.fn.galaxy.prototype.removePop = function(){
		$('.ui-pop').remove();
	}
	function init(opt){
		addHandle();
		var value = opt.value,
			type = opt.type,
			animate = opt.animate,
			el = opt.el,
			flexDirection = opt.flexDirection
		if (type) {
			render(value,type,animate,el,flexDirection)
		}else if(el){
			render(value,'el',animate,el,flexDirection)
		};
	}
	function addHandle(){
		$('body').on('touchmove','.ui-pop',function(e){
			e.preventDefault();
		})
	}
	function render(value,type,ani,el,state){
		switch(type)
		{
		case 'el':
		  renderDef(value,ani,el,state)
		  break;
		case 'loading':

		  break;
		case 'fullScreen':
		  renderDef(value,ani,el,state,true)
		  break;
		case 'alert':

		  break;
		default:
		  renderDef(value,ani);
		}
	}
	function renderDef(value,ani,el,state,fullscreen){
		var tAni = animate[ani];
		var warp = initWrap(tAni,state,fullscreen);
		if (!el) {
			tmp = $('<div class="ui-pop-str">'+value+'</div>');
		}else{
			if (value) {
				var val = $('<div class="ui-pop-str">'+value+'</div>');
				var tmp = $(el).concat(val);
			}else{
				var tmp = $(el);
			};
		};
		var popEl = warp.append(tmp);
		popEl.appendTo('body');
		if (ani == 'aInOut') {
			setTimeout(function(){
				$('.ui-pop').remove();
			},1200)
		};
	}
	function initWrap(tAni,state,fullscreen){
		var direction = state == 'row' ? '' : 'flex-direction-col';
		var isFullScreen = fullscreen ? 'ui-pop-screen' : 'ui-pop-def';
		var tmp = $('<div class="ui-pop ui-center '+tAni+' '+ direction +' '+ isFullScreen +'"></div>');
		return tmp
	}
}(window.Zepto)