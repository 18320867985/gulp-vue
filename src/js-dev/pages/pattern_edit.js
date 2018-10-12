/*pattren模块*/

import { url } from "../common/url.js";
// set scroll 
import setScroll from "../component/setScroll.js";

var pattern_edit = {

	// 编辑场景
	init: function() {

		var _id = url.getQueryString("Id");
		var _className = url.getQueryString("className");
		_className = `编辑“${_className}”常见问题"`;

		var vm = new Vue({
			el: ".app",
			data: {
				id: _id,
				className: _className,
				sreachText: "",
				list: [],
				isShowPop: false,
				editObj: {},
				tempShowName: "", // 临时记录
				firstSubmit: true, //  一次提交

				isShowConfirm: false, // 顯示confirm 
				isShowDelBox: false,

				isCheckAll: false, // 按钮点击
				isDelete: false, // 按钮点击

				// 添加分类
				isShowAddBox: false,
				isAdd: false,

				//添加分类对象
				addType: 1, // 1问修改 2添加
				addObj: {
					Question: "",
					Answer: "",
					questionClass: _id,

				},
				editor: "",

			},
			mounted: function() {
				$(".v-app").show();
				loading.addLoading("#pattern-table");
				this.getData(() => {
					loading.removeLoading("#pattern-table");
				});

			},
			updated: function() {
				setScroll(true);
			},
			watch: {

			},

			methods: {
				// 修改文本
				rename(item) {
					this.addType = 1;
					this.isShowPop = true;
					this.editObj = item;

					this.$http.get('BasicMode/AddOrEditBasicQuestion_interface?keyValue=' + item.Id).then(response => {
						// success callback
						var data = response.body;
						//error
						if(data.state === "error") {
							$.alert(data.message);
							return;
						}
						this.editObj = response.body;
						this.firstSubmit = true;

						editorMini.html(this.editObj.Answer);
						//this.isShowPop = false;
						console.log(this.editObj);

					}, response => {

						// error callback
						$.alert("网络连接失败...");
					}).catch();

				},
				// 取消重命名
				cancel() {
					this.isShowPop = false;
					this.editObj.isRename = false;
					this.editObj = {};

				},

				// 保存重名
				submit() {

					// 答案
					this.editObj.Answer = editorMini.html();
					if(this.editObj.Question.length == 0 || this.editObj.Answer.length == 0) {
						return;
					}
					//修还
					if(this.addType === 1) {
						if(this.firstSubmit) {
							this.firstSubmit = false;
							this.$refs.saveShowName.innerHTML = "正在提交中...";
							var props = {
								basicConsultid: this.editObj.BasicConsultid,
								question: this.editObj.Question,
								answer: this.editObj.Answer
							};

							this.$http.post('BasicMode/SubmitBasicQuestion', props, {
								emulateJSON: true
							}).then(response => {

								// success callback
								var data = response.body;
								//error
								if(data.state === "error") {
									$.alert(data.message);
									return;
								}

								this.getData();
								this.firstSubmit = true;
								this.$refs.saveShowName.innerHTML = "确认";
								this.isShowPop = false;
								this.editObj.isRename = false;
								this.editObj = {};

							}, response => {

								// error callback
								this.firstSubmit = true;
								this.$refs.saveShowName.innerHTML = "确认";
								$.alert("网络连接失败...");
							}).catch();
						}
					}

					// 添加
					else if(this.addType === 2) {

						if(this.firstSubmit) {
							this.firstSubmit = false;
							this.$refs.saveShowName.innerHTML = "正在提交中...";
							var props = {
								basicConsultid: this.id,
								question: this.editObj.Question,
								answer: this.editObj.Answer

							};

							this.$http.post('BasicMode/SubmitBasicQuestion', props, {
								emulateJSON: true
							}).then(response => {

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
								this.addObj.Question = "";
								this.addObj.Answer = "";
								this.getData();

							}, response => {

								// error callback
								this.firstSubmit = true;
								this.$refs.saveShowName.innerHTML = "确认";
								$.alert("网络连接失败...");
							}).catch();
						}
					}

				},

				search(event) {
					// 不能为空
					//					if(this.sreachText.length === 0) {
					//						return;
					//					}
					if(this.firstSubmit) {
						this.$refs.search.innerHTML = "正在提交中...";
						var props = `basicConsultid=${this.id}&rows=100&page=1&sidx=CreatorTime desc&records=100&keyword=${this.sreachText}`;
						this.$http.get('BasicMode/GetBasicQuestionJson?' + props).then(response => {
							var data = response.body;
							//error
							if(data.state === "error") {
								$.alert(data.message);
								return;
							}
							// get body data
							this.$refs.search.innerHTML = "搜索";
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

					}

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
								this.$refs.saveShowName2.innerHTML = "确认";
								// error callback
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
								// error callback
							}).catch();

						}

					}
				},

				// 添加数据
				addAll(event) {
					this.addType = 2;
					this.isShowPop = true;
					this.editObj = this.addObj;
					editorMini.html("");

					//					$(event.target).siblings().removeClass("active");
					//					$(event.target).addClass("active");
					this.selectBtnStyle(this.$refs.addBtn);
					this.isDelete = false;
					this.isCheckAll = false;
					this.isShowAddBox = !this.isShowAddBox;
				},
				// 全选
				checkAll(event) {

					this.isCheckAll = !this.isCheckAll;

					this.selectBtnStyle(this.$refs.ckBtn);
					this.isDelete = false;
					if(this.isCheckAll) {
						this.selectBtnStyle(this.$refs.ckBtn);
						this.list.filter(function(item) {
							return item.ck = true;
						});
					} else {
						this.selectBtnStyle(this.$refs.ckBtn, true);
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

					this.selectBtnStyle(this.$refs.delBtn);
					this.isCheckAll = false;
					this.isDelete = true;

					if(this.isDelete) {
						$(event.target).addClass("active");

					} else {
						$(event.target).removeClass("active");

					}

				},
				// 删除
				delBtn(event) {

					var arrs = this.getcheckItems.map(item => item.Id);

					if(this.firstSubmit) {
						this.firstSubmit = false;
						this.$refs.saveShowName2.innerHTML = "正在提交中...";
						var props = `keyValue=${arrs.join(",")}`;
						//return;
						this.$http.post('BasicMode/DeleteBasicQuestion?' + props).then(response => {
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

				getData: function(cd) {
					var props = `basicConsultid=${this.id}&rows=100&page=1&sidx=CreatorTime desc`;
					this.$http.get('BasicMode/GetBasicQuestionJson?' + props).then(response => {
						var data = response.body;
						//error
						if(data.state === "error") {
							$.alert(data.message);
							return;
						}
						if(typeof cd === "function") {
							cd();
						}

						// get body data
						this.list = response.body.rows.map(function(item) {
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
				cancelConfirm() {
					this.isShowDelBox = false;
					this.isDelete = false;

				},

				// 返回上一页
				backPage() {

					window.history.back();
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

			},
			created: function() {

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

		// 文本编辑器
		window.editorMini = KindEditor.create('#answer', {
			width: '85%',
			height: '400px',
			resizeType: 1,
			uploadJson: '/Files/UploadImage',
			items: [
				'source', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
				'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
				'insertunorderedlist', '|', 'image', 'link', 'fullscreen'
			]
		});

		/*滚动条*/
		setScroll();
		$(window).resize(function() {
			setScroll();
		});

	}

}

export {

	pattern_edit
}