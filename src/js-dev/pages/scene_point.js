/*scene_point模块*/

var scene_point = {

	// 主界面
	init: function() {

		// 添加页面
		var pages = [{
				id: "page-1",
				tag: 1
			}

		]

		// 添加tab
		$(".scene-point-addpage").click(function() {

			if(pages.length === 20) {
				$.alert("最多能添加20项！");
				return;
			}
			var _index = pages.length;
			
			pages.push({
				id:"page-" + (_index + 1),
				tag:(_index + 1)
			});
			var _li_html = addLi(_index);
			//alert(_index);

			$(".nav-tabs").append(_li_html);
			var _tab_html = addTab(_index);
			$(".tab-content").append(_tab_html);

			console.log(JSON.stringify(pages))

		});

		// 删除tab
		$(".nav-tabs").on("click", ".glyphicon", function() {

			if(pages.length === 1) {
				$.alert("最后一项，不能删除！");
				return;
			}
			var _li = $(this).parents("li");
			var _id = $(_li).find("a").attr("href");
			var _index = $(".nav-tabs li").index(_li);
			_li.remove();
			var $li = $(".nav-tabs li");
			if($(".nav-tabs li.active").length === 0) {
				$(".nav-tabs li").eq($li.length - 1).addClass("active");
			}

			// content
			$(".tab-content").find(_id).remove();
			var $tab = $(".tab-content .tab-pane");
			if($(".tab-content .tab-pane.active").length === 0) {
				$(".tab-content .tab-pane").eq($tab.length - 1).addClass("active");
			}
			//alert($tab.length)
			//del array
			pages.splice(_index, 1);

		});

	},

}


function addLi(index) {

	var _li_temp = `<li role="presentation" class="active">
							<a href="#page-${index+1}" role="tab" data-toggle="tab">
								<span class="_page-text">页面-${index+1}</span>
								<span class="glyphicon glyphicon-remove text-danger"></span>
							</a>
							
						</li>`;
	$(".nav-tabs").find("li").removeClass("active");

	return _li_temp;
}

function addTab(index) {

	var _temp = `<div role="tabpanel" class="tab-pane active" id="page-${index+1}">
							<p class="_page-ttl">页面-${index+1}</p>
							<form class=" form-horizontal">
								<div class="form-group clearfix">
									<label class="col-xs-2 control-label">屏幕显示:</label>
									<div class="col-xs-6">
										<select name="" class="form-control">
											<option value="">图片</option>
										</select>
									</div>

								</div>
								<div class="form-group clearfix">

									<label class="col-xs-2 control-label">上传图片:</label>
									<div class="col-xs-3">
										<input class="form-control" type="text" placeholder="" />
									</div>
									<div class="col-xs-3">
										<input class="form-control" type="file" placeholder="" />
									</div>
								</div>
								<div class="form-group clearfix">

									<label class="col-xs-2 control-label">语音文本:</label>
									<div class="col-xs-6">
										<textarea class="form-control" placeholder="输入语音文本" name="" rows="" cols=""></textarea>
									</div>

								</div>

								<div class="form-group clearfix">
									<label class="col-xs-2 control-label">动作列表:</label>
									<div class="col-xs-6">
										<select name="" class="form-control">
											<option value="">图片</option>
										</select>
									</div>

								</div>

								<div class="form-group clearfix">

									<label class="col-xs-2 control-label">角度:</label>
									<div class="col-xs-6">
										<input	 class="form-control" placeholder="0" />
									</div>

								</div>
								<div class="form-group clearfix " >
									<div class="col-xs-offset-2" style="padding-left:15px;">
										<button class="btn btn-primary" type="button"> 提交</button>
									</div>
									
								</div>

							</form>

						</div>
						`;
	$(".tab-content").find(".tab-pane").removeClass("active");

	return _temp;
}

export {

	scene_point
}