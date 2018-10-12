/*status模块*/

// set scroll 
import setScroll from "../component/setScroll.js";

var status = {
	init: function() {

		/*滚动条*/
		setScroll();
		$(window).resize(function() {
			_moz_.resetScroll();
			setScroll();
		});

	
	}

}

export {

	status
}