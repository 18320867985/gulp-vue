/*pattren模块*/

// set scroll 
import setScroll from "../component/setScroll.js";

var pattern_publicIty = {

	// 企业宣传
	init: function() {

		var vm = new Vue({
			el: ".app",
			data: {
				list: [],
				isShowPop: false,
				editObj: {
					Videoname: "",
                    Id: "",
                    isRename:false
				},
				tempShowName: "", // 临时记录
				firstSubmit: true, //  一次提交
				isShowConfirm: false, // 顯示confirm 框
				isShowDelBox: false,
				isShowAddBox: false,
				isCheckAll: false,
				isDelete: false
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
                getData: function (cd) {
                    this.$http.get('BasicMode/BasicPublicItyShow?rows=100&page=1&sidx=CreatorTime desc&record=1000').then(response => {
                        var data = response.body;
                        //error
                        if (data.state === "error") {
                            $.alert(data.message);
                            return;
                        }
                        // get body data
                        this.list = data.rows.map(function (item) {
                            item.isRename = false;
                            item.ck = false;
                            return item;
                        });

                        if (typeof cd === "function") {
                            cd();
                        }
                        //console.log(this.list)

                    }, response => {
                        // error callback
                        $.alert("网络连接失败...");
                    }).catch();
                },
				// 重命名
				rename(item) {
					this.editObj.isRename = true;
					this.isShowPop = true;
					this.editObj = item;
					this.Videoname = item.Videoname;
				},

				// 取消重命名
				cancel() {
					this.isShowPop = false;
					this.editObj.isRename = false;
					this.editObj.Videoname = this.Videoname
				},
				// 保存重名
				submit() {
					if(this.editObj.Videoname.length === 0) {
						return;
					}

					if(this.firstSubmit) {
						this.firstSubmit = false;
						this.$refs.saveShowName.innerHTML = "正在提交中...";
						var props = `keyValue=${this.editObj.Id}&videoName=${this.editObj.Videoname}`;
						this.$http.post('BasicMode/BasicPublicItySubmit?' + props).then(response => {
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
							$.alert("网络连接失败...");
							// error callback
						}).catch();
					}

				},
				// 添加
				addVideo() {
                    this.isShowAddBox = true;
				},
				cancelAdd() {
					this.isShowAddBox = false;
				},
				// 保存编辑
                submitAdd() {
					if(this.firstSubmit) {
						this.firstSubmit = false;
						this.$refs.saveShowName.innerHTML = "正在提交中...";
						var props = "";

                        props = `videoname=`+$("#Videoname").val();

						this.$http.post('BasicMode/UploadVideo?' + props).then(response => {
							// success callback
							var data = response.body;
							//error
							if(data.state === "error") {
                                $.alert(data.message);
							}

							this.firstSubmit = true;
							this.$refs.saveShowName.innerHTML = "确认";
                            this.isShowAddBox = false;
                            this.getData();
						}, response => {
							this.$refs.saveShowName.innerHTML = "确认";
							$.alert("网络连接失败...");
							// error callback
							
						}).catch();
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

				}

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

	pattern_publicIty
}