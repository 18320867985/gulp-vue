/*pattren模块*/

// set scroll 
import setScroll from "../component/setScroll.js";

var pattern_consult = {

	// 常见咨询
	init: function() {

		var vm = new Vue({
			el: ".app",
			data: {
				list: [],
				isShowPop: false,
				editObj: {},
				tempShowName: "", // 临时记录
				firstSubmit: true, //  一次提交
				isShowConfirm: false, // 顯示confirm 框
				isCheckAll: false,
				isShowDelBox: false,
				isDelete: false,
				// 添加分类
				isShowAddBox: false,
				isAdd: false,

				//添加分类对象
				addObj: {
					questionClass: ""
				}

			},
			mounted: function() {
				$(".v-app").show();
				loading.addLoading("#pattern-table");
				this.$http.get('BasicMode/GetCommonConsultationJson?rows=1000&page=1&sidx=CreatorTime  desc').then(response => {
					loading.removeLoading("#pattern-table");
					var data = response.body;
					//error
					if(data.state === "error") {
						$.alert(data.message);
						return;
					}
					// get body data
					this.list = data.rows.map(function(item) {
						item.isRename = false;
						item.ck = false;
						return item;
					});
					//console.log(this.list)

				}, response => {
					// error callback
					$.alert("网络连接失败...");
				}).catch();

			},
			updated: function() {
				setScroll(true);
			},
			watch: {

			},

			methods: {
				// 重命名模块名称
				rename(item) {
					item.isRename = !item.isRename;
					this.isShowPop = true;
					this.editObj = item;
					this.tempShowName = item.QuestionClass;
				},
				// 取消重命名
				cancel() {
					this.isShowPop = false;
					this.editObj.isRename = false;
					this.editObj.QuestionClass = this.tempShowName
				},
				// 保存重名
				submit() {
					if(this.editObj.QuestionClass.length === 0) {
						return;
					}

					if(this.firstSubmit) {
						this.firstSubmit = false;
						this.$refs.saveShowName.innerHTML = "正在提交中...";
						var props = `keyValue=${this.editObj.Id}&&questionClass=${this.editObj.QuestionClass}`;
						this.$http.post('BasicMode/SubmitRenameQuestionClass?' + props).then(response => {
							// success callback
							var data = response.body;
							//error
							if(data.state === "error") {
								$.alert(data.message);
								return;
							}
							this.firstSubmit = true;
							this.$refs.saveShowName.innerHTML = "确认";
							this.isShowPop = false;
							this.editObj.isRename = false;
						}, response => {
							this.$refs.saveShowName.innerHTML = "确认";
							// error callback

							$.alert("网络连接失败...");
						}).catch();
					}

				},
				// 是否禁用模塊
				enMobule(item) {
					//item.LookSate=!item.LookSate;
					this.isShowConfirm = true;
					this.editObj = item;
				},
				confirm(item) {
					if(this.firstSubmit) {
						this.$refs.saveShowName2.innerHTML = "正在提交中...";

						// 禁用
						if(item.LookSate === 1) {

							this.firstSubmit = false;

							var props = `keyValue=${item.Id}`;
							this.$http.post('BasicMode/DisabledModule?' + props).then(response => {
								var data = response.body;
								//error
								if(data.state === "error") {
									$.alert(data.message);
									return;
								}
								this.firstSubmit = true;
								this.$refs.saveShowName2.innerHTML = "确认";
								this.isShowConfirm = false;
								this.editObj.LookSate = 0;
							}, response => {

								// error callback
								this.$refs.saveShowName2.innerHTML = "确认";
								$.alert("网络连接失败...");
							}).catch();

						}

						// 启用
						if(item.LookSate === 0) {

							this.firstSubmit = false;

							var props = `keyValue=${item.Id}`;
							this.$http.post('BasicMode/EnabledModule?' + props).then(response => {
								var data = response.body;
								//error
								if(data.state === "error") {
									$.alert(data.message);
									return;
								}
								this.firstSubmit = true;
								this.$refs.saveShowName2.innerHTML = "确认";
								this.isShowConfirm = false;
								this.editObj.LookSate = 1;
							}, response => {
								this.$refs.saveShowName2.innerHTML = "确认";
								$.alert("网络连接失败...");
								// error callback
							}).catch();

						}

					}
				},

				// 全选
				checkAll(event) {
					this.isCheckAll = !this.isCheckAll;
					//					$(event.target).siblings().removeClass("active");
					this.selectBtnStyle(this.$refs.ckBtn);
					this.isDelete = false;
					if(this.isCheckAll) {
						$(event.target).addClass("active");
						this.list.filter(function(item) {
							return item.ck = true;
						});
					} else {
						$(event.target).removeClass("active");
						this.list.filter(function(item) {
							return item.ck = false;
						});
					}

				},

				// 删除
				delAll(event) {

					if(this.ischeckCount === 0) {
						return;
					}

					this.isShowDelBox = true;

					this.isDelete = !this.isDelete;
					this.isCheckAll = false;
					if(this.isDelete) {
						this.selectBtnStyle(this.$refs.delBtn);

					} else {
						this.selectBtnStyle(this.$refs.delBt, true);

					}

				},

				// 添加数据
				addAll(event) {
					this.selectBtnStyle(this.$refs.addBtn);
					this.isDelete = false;
					this.isCheckAll = false;
					this.isShowAddBox = !this.isShowAddBox;
				},
				// 删除
				delBtn(event) {

					var arrs = this.getcheckItems.map(item => item.Id);

					if(this.firstSubmit) {
						this.firstSubmit = false;
						this.$refs.saveShowName2.innerHTML = "正在提交中...";
						var props = `keyValue=${arrs.join(",")}`;
						//alert(props)
						//return ;
						this.$http.post('BasicMode/DeleteQuestionClass?' + props).then(response => {
							// success callback
							var data = response.body;
							//error
							if(data.state === "error") {
								$.alert(data.message);
								return;
							}

							this.firstSubmit = true;
							this.$refs.saveShowName2.innerHTML = "确认";
							this.isShowDelBox = false;
							//this.editObj.isRename = false;
							//this.list.filter(item=>);
							this.getData();
						}, response => {
							this.$refs.saveShowName2.innerHTML = "确认";
							$.alert("网络连接失败...");
							// error callback
						}).catch();
					}
				},

				// 提交添加的数据
				addSubmit() {
					if(this.addObj.questionClass.length === 0) {
						return;
					}
					this.$refs.saveShowName3.innerHTML = "正在提交中...";
					var props = `questionClass=${this.addObj.questionClass}`;
					this.$http.post('BasicMode/SubmitQuestionClass?' + props).then(response => {
						// success callback
						var data = response.body;
						//error
						if(data.state === "error") {
							$.alert(data.message);
							return;
						}
						this.addObj.questionClass = "";
						this.firstSubmit = true;
						this.$refs.saveShowName3.innerHTML = "添加";
						this.isShowAddBox = false;
						//this.editObj.isRename = false;
						//this.list.filter(item=>);
						this.getData();
					}, response => {
						this.$refs.saveShowName3.innerHTML = "添加";
						$.alert("网络连接失败...");
						// error callback
					}).catch();

				},
				getData: function(cd) {
					this.$http.get('BasicMode/GetCommonConsultationJson?rows=1000&page=1&sidx=CreatorTime  desc').then(response => {
						//loading.removeLoading("#pattern-table");

						var data = response.body;
						//error
						if(data.state === "error") {
							$.alert(data.message);
							return;
						}
						// get body data
						this.list = data.rows.map(function(item) {
							item.isRename = false;
							item.ck = false;
							return item;
						});

						if(typeof cd === "function") {
							cd();
						}
						//console.log(this.list)

					}, response => {
						// error callback
						$.alert("网络连接失败...");
					}).catch();
				},
				// 选择按钮的样式
				selectBtnStyle: function(el, bl) {

					$(el).siblings().removeClass("active");
					$(el).addClass("active");
					if(bl) {
						$(el).removeClass("active");
					}
				},

			},

			computed: {
				ischeckCount: function() {

					return this.list.filter(function(item) {
						return item.ck === true
					}).length;
				},
				getcheckItems: function() {

					return this.list.filter(function(item) {
						return item.ck === true
					});
				},

			}

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
			//			$(".pattern-ttl2 a").on("click", function() {
			//				var p = $(this).parents(".pattern-ttl2");
			//				//p.find("a").removeClass("active");
			//				var a = p.find("a");
			//				a.eq(0).css("z-index", 3);
			//				a.eq(1).css("z-index", 2);
			//				a.eq(2).css("z-index", 1);
			//
			//				//$(this).addClass("active");
			//				$(this).css("z-index", 9);
			//
			//			});

		});

		/*场景总览*/
		$(".pattern-overview .pattern-ttl3 ._ck").click(function(event) {
			//	event.stopPropagation()
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

	pattern_consult
}