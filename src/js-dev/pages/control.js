/*control模块*/


var  control = {

	//  音频控制
	init() {

	},
	
	// 屏幕控制
	pm(){},
	
	// yd 运动控制
	yd(){
		
	},
	
	// 组合指令
	direct(){
		
		
		// 编辑btn
		$("._btn-edit").on("click",function(){
			$("._direct-edit").fadeIn(600);
			$("._direct").hide();
			
		});
		
		// 返回btn
		$("._btn-back").on("click",function(){
			
			$("._direct").fadeIn(600);
			$("._direct-edit").hide();
		});
		
		
	},
	
	
	
}


export {

	control
}



