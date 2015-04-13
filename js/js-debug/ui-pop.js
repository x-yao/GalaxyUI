! function($) {
	var animate = {
		aIn:'ani-pop-sta',
		aInOut:'ani-pop-rem',
		aInClick:'ani-pop-sta',
	}
	// opt = {
	// 	type:'', // el,loading,allScreen,alert
	// 	animate:'', //animate配置
	//  click:Boolean, // animate == aIn,defalut true
	// 	el:$(select), //插入的元素 type == el,loading,allScreen,alert
	// 	button:Boolean, //当type == alert 且为 true 
	// 	buttonValue:{a:foo()},//当type == alert 且为 true 
	// }
	$.fn.galaxy.prototype.pop = function(opt) {
		if (typeof opt == "string" || typeof opt == "number") {
			render(opt,'','aInOut');
		};
	}
	function render(value,type,ani){
		switch(type)
		{
		case 'el':

		  break;
		case 'loading':

		  break;
		case 'allScreen':

		  break;
		case 'alert':

		  break;
		default:
		  renderDef(value,ani);
		}
	}
	function renderDef(value,ani){
		var tAni = animate[ani];
		var tmp = '<div class="ui-pop ui-pop-def ui-center '+tAni+'">'+value+'</div>';
		$(tmp).appendTo('body');
	}
}(window.Zepto)