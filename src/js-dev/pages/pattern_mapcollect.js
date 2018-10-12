/*pattren模块*/

// set scroll 
import setScroll from "../component/setScroll";


var config = {
    loadData: async () => {
        var data = await $.get("/BasicMode/MapCollectShow", { rows: 100, page: 1, sidx: "CreatorTime desc" }, "JSON");
        data.columns = [
            { field: "Id", display: "编号" },
            { field: "GuideName", display: "区域" },
            { field: "Tier", display: "层数" },
        ];


        data.rows.forEach(item => {
            item.actions = [
                { name: "test", display: "重命名" },
                { name: "edit_locathen", display: "编辑" },
            ];
        });

        return data;
    },

    options: {
        title: "问路指引",
        actions:
            [
                {
                    name: "add",
                    display: "添加区域",
                }
            ]
    },

                                                     
    edit_locathen: async function (page, item) {
        location.href = 'pattern-mapcollect-edit.html?Id=' + item.Id + '&GuideName=' + encodeURIComponent(item.GuideName);
    },

    rename: async function (page, item) {
        var name = await page.dialog_input({ title: "重命名模块" }, item.Tier);
        if (name !== null) {
            console.info(name);
            await $.post('/BasicMode/MapCollectSubmit', { keyValue: item.Id, guidename: name }, "JSON");
        }
    },





    disable: async function (page, item) {

        if (await page.dialog_confirm({ title: "确定要禁用 " + item.ModuleName + " 模块吗？" })) {

            await $.post("/BasicMode/DisabledModule", { keyValue: item.Id }, "JSON");
            page.listView.list = await this.loadData();
        }

    },


    enable: async function (page, item) {

        if (await page.dialog_confirm({ title: "确定要启用 " + item.ModuleName + " 模块吗？" })) {

            await $.post("/BasicMode/EnabledModule", { keyValue: item.Id }, "JSON");
            page.listView.list = await this.loadData();
        }
    },

    test: async function (page, item) {
        var model = await page.dialog_edit(
            {
                title: "重命名",
            },
            [
                {
                    field: "title",
                    display: "区域:",
                    type: "text",
                },
                {
                    field: "titles",
                    display: "层数:",
                    type: "text",
                },
            ],
            {
                title: item.GuideName,
                titles: item.Tier,
            }
        );
        if (model !== null) {
            console.info(model);
            await $.post('/BasicMode/MapCollectSubmit', { keyValue: item.Id, guidename: model.title, Tier: model.titles }, "JSON");
        }
    },
    add: async function (page, item) {
        var model = await page.dialog_edit(
            {
                title: "添加区域",
            },
            [
                {
                    field: "title",
                    display: "区域:",
                    type: "text",
                },
                {
                    field: "titles",
                    display: "层数:",
                    type: "text",
                },
            ],
            {

            }
        );
        if (model !== null) {
            console.info(model);
            await $.post('/BasicMode/MapCollectSubmit', { guidename: model.title, Tier: model.titles }, "JSON");
        }
    }

};



var pattern_mapcollect = {


    // 主界面
    init: async function () {

        $(".v-app").show();


        let data;

        loading.addLoading("#pattern-table");
        try {
            data = await config.loadData();
        }
        catch (err) {

            console.info(err);
            alert("读取数据失败");
            return;
        }
        loading.removeLoading("#pattern-table");


        let dialogs = {};
        dialogs.input = new Vue({
            el: "#dialog-input",
            data: {
                visible: false,
                value: null,
                callback: null,
            },

            methods: {

                cancel: function () {
                    this.visible = false;
                    this.callback(null);
                },

                ok: function () {
                    this.visible = false;

                    console.info(data);
                    this.callback(data.value);
                },

                run: function (options, value) {
                    this.options = options;
                    this.value = value;
                    this.visible = true;

                    let that = this;

                    return new Promise(function (resolve, reject) {

                        console.info(that);
                        that.callback = function () {
                            resolve(that.value);
                        };


                    });
                }


            },
        });


        dialogs.confirm = new Vue({
            el: "#dialog-confirm",
            data: {
                visible: false,
                callback: null,
            },

            methods: {

                cancel: function () {
                    this.visible = false;
                    this.callback(false);
                },

                ok: function () {
                    this.visible = false;
                    this.callback(true);
                },

                run: function (options) {
                    this.options = options;
                    this.visible = true;

                    let that = this;
                    return new Promise(function (resolve, reject) {

                        console.info(that);
                        that.callback = function (result) {
                            resolve(result);
                        };


                    });
                }


            },
        });


        dialogs.edit = new Vue({
            el: "#dialog-edit",
            data: {
                visible: false,
                callback: null,
                options: {},
                metadata: [],
                model: {},
            },

            methods: {

                cancel: function () {
                    this.visible = false;
                    this.callback(null);
                },

                ok: function () {
                    this.visible = false;
                    this.callback(this.model);
                },

                run: function (options, metadata, model) {
                    this.options = options;
                    this.metadata = metadata;
                    this.model = model;
                    this.visible = true;


                    Vue.nextTick(function () {
                        dialogs.edit.initRichtext();
                    });

                    let that = this;
                    return new Promise(function (resolve, reject) {

                        console.info(that);
                        that.callback = function (result) {
                            resolve(result);
                        };


                    });
                },

                initRichtext: function () {
                    console.info(document.querySelector("#dialog-edit .richtext"));
                    var richText = KindEditor.create("#dialog-edit .richtext", {
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

                    console.info("initRichtext");
                    console.info(richText);
                },



            },
            mounted: function () {
                console.info("mounted");
            }
        });




        pattern_mapcollect.dialog_input = async (options, value) => {

            console.info("dialog_input");
            return await dialogs.input.run(options, value);

        };

        pattern_mapcollect.dialog_confirm = async (options) => {

            console.info("dialog_confirm");
            return await dialogs.confirm.run(options);

        };


        pattern_mapcollect.dialog_edit = async (options, metadata, model) => {

            console.info("dialog_edit");
            return await dialogs.edit.run(options, metadata, model);
        };



        pattern_mapcollect.header = new Vue({
            el: "#list-header",
            data: {
                options: config.options,
            },
            methods: {
                invoke_action: function (action) {

                    config[action](pattern_mapcollect);

                },
            }

        });

        pattern_mapcollect.listView = new Vue({
            el: "#pattern-table",
            data: {
                list: data,
            },

            updated: function () {
                setScroll(true);
            },


            methods: {
                invoke_action: function (action, item) {

                    config[action](pattern_mapcollect, item);

                },
            }
        });

        /*btn click style*/
        $(function () {

            // pattern-ttll
            $(".pattern-ttl1 a").on("click", function () {

                var p = $(this).parents(".pattern-ttl1");
                p.find("a").removeClass("active");
                $(this).addClass("active");

            });

            $(".pattern-ttl1 a").on('shown.bs.tab', function (e) {
                _moz_.resetScroll();
                setScroll();

            })

            // pattern-ttl2
            $(".pattern-ttl2 a").on("click", function () {
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
        $(".pattern-overview .pattern-ttl3 ._ck").click(function () {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }

        });

        /*滚动条*/
        setScroll();
        $(window).resize(function () {
            setScroll();
        });

    },
}


export {

    pattern_mapcollect
}