/*弹框模块
 * 
 * <div class="pop-mask">
		<div class="pop-box">
			<h5>pop</h5>
		</div>
		
		<div class="_submit-btn">
			<button class="btn btn-warning cancel" type="button">取消</button>
			<button class="btn btn-primary" type="button">确认</button>
		</div>
	</div>
 
 * */



(function() {

	$(".pop-mask").click(function() {
		$(this).toggleClass("active");
	});
	$(".pop-mask .pop-box").click(function(event) {
		event.stopPropagation();
	});
	// cancel
	$(".pop-mask .cancel").on("click", function() {

		$(this).parents(".pop-mask").removeClass("active");
	});


})();