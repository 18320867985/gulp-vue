/*弹框模块
 * 
 * <!--选择图片库   加上data-mask=不許点击pop-mask隐藏-->
	<div class="pop-mask">

		<div class="pop-box">
			<h5 class="pop-ttl">选择图片</h5>
			<div class="pop-content">
				
			</div>
			<div class="pop-footer text-center">
					<button class="btn btn-warning cancel" type="button">取消</button>
					<button class="btn btn-primary" type="button">确认</button>
			</div>

		</div>

	</div>
 
 * */


(function() {

	$(".pop-mask").click(function() {
		
		if(!$(this)[0].hasAttribute("data-mask")){
			$(this).removeClass("active");
		}
	});
	$(".pop-mask .pop-box").click(function(event) {
		
		event.stopPropagation();
	});
	// cancel
	$(".pop-mask .cancel").on("click", function(event) {
		event.stopPropagation();
		$(this).parents(".pop-mask").removeClass("active");
	});


})();