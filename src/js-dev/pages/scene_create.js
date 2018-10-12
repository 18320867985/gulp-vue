/*场景模块*/

var scene_create = {

	init: function() {

        var _select = '';
        $.get("/Navigation/GetScenePoints", function (data) {
            if (data == undefined) {
                return;
            }
            _select = `<select class="form-control SceneSelect">`;
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var _option = `<option value="${item.ID}" >${item.Name}</option>`;
				_select += _option;
			}
            _select += '</select>'; 
		});


		$(".scene-create-add").on("click", ".add-btn", function() {

			var createEl = `<div class="_item">
					<div class="_cont clearfix">
							<span class="glyphicon glyphicon-remove  text-danger pull-right close-item"></span>
                            ${_select }
							<button  class="btn btn-primary pull-right btn-save" type="button">保存</button>
							<div class="_item-mask"></div>
	
					</div>
					<button class="btn btn-primary add-btn" type="button "> <span class="glyphicon glyphicon-plus"></span></button>
				</div>`;

			var item_length = $("._item").length;

			if(item_length === 0) {

				$(".scene-create-add").prepend(createEl);
			} else {

				$(".scene-create-add").append(createEl);
			}

			item_length = $("._item").length;

			if(item_length >= 1) {
				$(".add-btn-init.add-btn").hide();
			} else {
				$(".add-btn-init.add-btn").show();
			}

		});

		$(".scene-create-add").on("click", ".close-item", function(event) {

			$(this).parents("._item").remove();
			var item_length = $("._item").length;

			if(item_length === 0) {
				$(".add-btn-init.add-btn").show();

			} else {
				$(".add-btn-init.add-btn").hide();

			}
		});

		//		// 每一项保存
		$(".scene-create-add").on("click", ".btn-save", function() {

			var p = $(this).parents("._cont");
			var mask = p.find("._item-mask");
			var v = p.find("select option:selected").text();

			mask.html(v);
			mask.show();

		});

		$(".scene-create-add").on("click", "._item-mask", function() {

			$(this).hide();

		});

		// 保存提交
		$(".scene-create-submit .btn").on("click", function() {

			if($("#sceneName").val() == "") {        
                $.alert("请输入场景名称");
				return;
			}

			if($(".scene-create-add .SceneSelect").length <= 0) {
                $.alert("场景至少要有一个点，请点击加号添加");
				return;
			}
			var vals = "";
			$(".scene-create-add .SceneSelect").each(function() {
				vals += $(this).val() + ",";
			});
            vals = vals.substr(0, vals.length - 1);


            $.ajax({
                type: "POST",
                url: "/Navigation/SubmitCreateScene",
                data: { sceneName: $("#sceneName").val(), scenePointIds: vals },
                dataType: "json",
                success: function (data) {
                    if (data.state == "error") {
                        $.alert(data.message);
                    } else {
                        $.info("保存成功", "success");
                    }
                    
                },
                error: function (data) {
                    $.alert("保存失败");
                }
            });

            //$.post(
            //    '/Navigation/SubmitCreateScene',
            //    { sceneName: $("#sceneName").val(), scenePointIds: vals },
            //    function (data) {
            //        $.info("保存成功", "success");
            //        //alert(data);
            //    }, 'json');


			//var postData = $("#form1").formSerialize();
			//postData["sceneName"] = $("#sceneName").val();
			//postData["scenePointIds"] = vals;
			//$.submitForm({
			//	url: "/Navigation/SubmitCreateScene",
			//	param: postData,
			//	success: function() {
			//		$.info("保存成功", "success");
			//	},
			//	error: function() {
			//		$.info("保存失败", "danger");
			//	}
			//});

			//			$.info("保存提交","warning");
			//			$.info("保存提交","info");
			//$.info("保存提交","danger");
			//			$.info("保存提交");

		});

	},

}

export {

	scene_create
}