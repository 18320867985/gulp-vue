/*test模块*/


// set scroll 
import setScroll from "../component/setScroll";
import vueList from "../vue-component/share/list";
import vueEdit from "../vue-component/share/edit";
import vueAdd from "../vue-component/share/add";

var list_url="json/test.json";
var test = {

	// 主界面
	init: function() {
		
		var vm = new Vue({
			el: ".app",
			data: {
				list: [],
				isShowEditPop:false,
				isShowAddPop:false,
				editObj:{},
				firstSubmit: true, //  一次提交
				
				
			},
			mounted: function() {
				$(".v-app").show();
				$.loadingAdd("#pattern-table");
				this.$http.get(list_url).then(response => {

					$.loadingRemove("#pattern-table");
					var data = response.body;
					
					//console.log(data)
					//error
					if(data.state === "error") {
						$.alert(data.message);
						return;
					}

					// get body data
					this.list = data.map(function(item) {
						item.isRename = false;
						return item;
					});
					
					
					//console.log(this.list)

				}, response => {
					// error callback
					$.loadingRemove("#pattern-table");
					$.alert("网络连接失败...");
					return;

				}).catch();

			},
			updated: function() {
				setScroll(true);
			},
			watch: {

			},
			
			components:{
				vueList,
				vueEdit,
				vueAdd,
			},
			methods:{
				
				// 编辑按钮
				editBtn(){
					this.isShowEditPop=true;
				},
				// 添加按钮
				addBtn(){
					this.isShowAddPop=true;
				},
				
				// 编辑保存
				editSave(){
					$.confirm("是否确认保存数据",()=>{
						$.info("保存成功","success");
					},()=>{
						
					});
					
				},
				// 添加保存
				addSave(){
					
				},
				
			
			},
		});

		/*btn click style*/
		$(function() {

			// pattern-ttll
			$(".pattern-ttl1 a").on("click", function() {

				var p = $(this).parents(".pattern-ttl1");
				p.find("a").removeClass("active");
				$(this).addClass("active");

			});

			$(".pattern-ttl1 a").on('shown.bs.tab', function(e) {
				_moz_.resetScroll();
				setScroll();

			})

			// pattern-ttl2
			$(".pattern-ttl2 a").on("click", function() {
				var p = $(this).parents(".pattern-ttl2");
				p.find("a").removeClass("active");
				var a = p.find("a");
				a.eq(0).css("z-index", 3);
				a.eq(1).css("z-index", 2);
				a.eq(2).css("z-index", 1);

				$(this).addClass("active");
				$(this).css("z-index", 9);

			});

		});

		/*场景总览*/
		$(".pattern-overview .pattern-ttl3 ._ck").click(function() {
			if(!$(this).hasClass("active")) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}

		});

		/*滚动条*/
		setScroll();
		$(window).resize(function() {
			setScroll();
		});

	},

}


export {

	test
}


