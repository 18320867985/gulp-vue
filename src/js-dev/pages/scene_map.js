/*导航地图*/
import { url } from "../common/url.js";
var scene_map = {

	init: function() {
		//坐标点
		var x;
		var y;
        var iscoordinate = false;

        var robotX = 201;
        var robotY = 100;
        var robotAngel = 70;


        var width = 0;//服务端提供
        var height = 0;//服务端提供
        var pointsMultiple = 0;//服务端提供

        var mapIdFromUrl = url.getQueryString("mapId");
        if (mapIdFromUrl == null) {
            mapIdFromUrl = "";
        }



        $(function () {

            if (mapIdFromUrl != "" && mapIdFromUrl != null && mapIdFromUrl != undefined) {
                $(".CannotShowInUrl").css("display", "none");
                $("#showImg").attr("src", "/Navigation/GetCurrentImage?mapId=" + mapIdFromUrl);
            }

            SetRobotLocation(robotX, robotY, robotAngel);

            $.ajax({
                type: "GET",
                url: config.api.root+"Navigation/GetMapDataJson",
                dataType: "json",
                success: function (data) {
                    if (data != null && data != undefined) {
                        width = data.width;
                        height = data.height;
                        pointsMultiple = data.pointsMultiple;

                        if (width == 0) {
                            $(".pointDiv").css("display", "none");
                        }
                    }

                },
                error: function (data) {
                    $.alert("获取地图数据失败");
                }
            });

        


            $.ajax({
                url: config.api.root +"Navigation/GetMapPointsJson?mapId=" + mapIdFromUrl,
                dataType: "json",
                async: true,
                success: function (data) {
                    if (data != null && data != undefined && data.length > 0) {
                        var htmlStr = ""
                        $.each(data, function (i) {
                            
                            htmlStr += "<li class=\"list-group-item\">";
                            htmlStr += "<div class=\"checkbox\" >";
                            htmlStr += "<label><input type=\"checkbox\" id=\"" + data[i].Name +"\">" + data[i].Name + "</label>";
                            htmlStr += "</div></li>";

                            $("#deleteCollection").before(htmlStr);
                        });

                    }
                }
            });




        });


        function SetRobotLocation(robotX, robotY, robotAngel) {
            $("#currentX").html(robotX);
            $("#currentY").html(robotY);
            $("#currentAngle").html(robotAngel + "°");
        }


		// 点击收藏按钮
		$(document).on("click", ".btn-save-ck", function() {
			if(!iscoordinate) {
			
				$.alert("请选择定位坐标");
				return;
			}
			$(".pop-mask").addClass("active");
			$("._save-x").text(x);
            $("._save-y").text(y);
            $("._save-name").val("");

		});

		// 弹框的保存
        $(document).on("click", ".btn-save", function () {

            if ($("._save-name").val() == "") {
                $.alert("请输入收藏点名称");
                return;
            }

            var dataSubmit = {
                pointX: x,
                pointY: y,
                pointName: $("._save-name").val(),
                pointBz: $("._remark").val(),
                mapId: mapIdFromUrl
            };


            $.ajax({
                type: "POST",
                url: "/Navigation/AddCollectionPoint",
                data: dataSubmit,
                dataType: "json",
                success: function (data) {
                    if (data.state == "error") {
                        $.alert(data.message);
                    } else {

                        var htmlStr = ""
                        htmlStr += "<li class=\"list-group-item\">";
                        htmlStr += "<div class=\"checkbox\" value=\"" + $("._save-name").val() + "\">";
                        htmlStr += "<label><input type=\"checkbox\" id=\"" + $("._save-name").val()+"\">" + $("._save-name").val() + "</label>";
                        htmlStr += "</div></li>";
                        $("#deleteCollection").before(htmlStr);

                        $(".pop-mask").removeClass("active");

                        $.info("添加收藏点成功", "success");
                    }

                },
                error: function (data) {
                    $.alert("保存失败");
                }
            });

			
			//$.alert("弹框的保存");
//			$.ajax({
//				type: "post",
//				url: "", //int pageIndex,int pageSize
//				data: o,
//				success: function(data) {
//					$.info("数据保存成功！", "success");
//					$(".pop-mask").removeClass("active");
//		
//				},
//
//				timeout: 10000,
//
//				error: function(data) {
//					$.alert(data.message);
//				}
//
//			});
			

		});

		// 弹框的取消
		$(document).on("click", ".btn-close", function() {

			$(this).parents(".pop-mask").removeClass("active");
			//$.info("弹框的取消");
		});

		// 获取鼠标的定位坐标
		$(".scene-map-img").on("click", function(e) {
			//var big_w=$(this).outerWidth();
			//var big_h=$(this).outerHeight();
			//iscoordinate = true;
			//x = event.clientX;
			//y = event.clientY;
			//var icon_w=$(".coordinate-icon").outerWidth();
			//var icon_h=$(".coordinate-icon").outerHeight();
			//if(x>=(big_w-icon_w)){
			//	x=big_w-icon_w;
			//}
			//if(y>=(big_h-icon_h)){
			//	y=big_h-icon_h;
			//}
			//y=y-(icon_h/2);
			//x=x-(icon_w/2);
			
            var currentWidth = $(this).outerWidth();
            var currentHeight = $(this).outerHeight();
            x = e.pageX - $(this).offset().left;
            y = e.pageY - $(this).offset().top;

            $(".coordinate-icon").show().css({
                "left": x-20,"top": y-40
            });
            //SetAimLocation();
            x = Math.round((width / currentWidth) * x);

            x = pointsMultiple * x;

            y = Math.round((height / currentHeight) * y);
            y = (height - y) * pointsMultiple;
            iscoordinate = true;
            //$("#aimX").html(offsetX);
            //$("#aimY").html(offsetY);
           
        });


        // 删除收藏点
        $(document).on("click", ".btn-delete", function () {

            $('input[name="pronunciation"]:checked').val()


            var pointNames = "";
            //$("#collectionPoint input[type='checkbox']").each(function () {
            $("#collectionPoint input:checkbox:checked").each(function () {
                if ($(this).is(':checked')) {
                    pointNames += $(this).attr("id") + ",";
                }
            });
            alert(pointNames);
            

            $.ajax({
                type: "POST",
                url: "/Navigation/DeleteCollectionPointArr",
                data: { pointNames: pointNames, mapId: mapIdFromUrl},
                dataType: "json",
                success: function (data) {
                    if (data.state == "error") {
                        $.alert(data.message);
                    } else {

                        $("#collectionPoint input:checkbox:checked").each(function () {
                            $(this).parent().parent().remove();
                        });

                        $.info("删除收藏点成功", "success");
                    }

                },
                error: function (data) {
                    $.alert("保存失败");
                }
            });
   
        });

		
		// 导出地图
		$(document).on("click",".btn-map",function(){
				$.alert("导出地图");
			
		});
		
		
	},

}

export {

	scene_map
}