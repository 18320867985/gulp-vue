/*pattren模块*/

// set scroll 
import setScroll from "../component/setScroll";
import { pattern } from "./pattern";



var pattern_list = {


  // 主界面
  init: async function () {

    let dialogs = {};
    let template = await $.get("/admin/pattern/dialog-input-template.html", null, "text");
    dialogs.input = new Vue({
      template: template,
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
          this.callback(this.value);
        },

        run: function (options, value) {
          this.options = options;
          this.value = value;
          this.visible = true;

          let that = this;

          return new Promise(function (resolve, reject) {

            console.info(that);
            that.callback = function (value) {
              resolve(value);
            };


          });
        }


      },
    });

    element = $("<div id='dialog-input' />");
    $("#list-hold").append(element);
    dialogs.input.$mount(element[0]);


    template = await $.get("/admin/pattern/dialog-confirm-template.html", null, "text");
    dialogs.confirm = new Vue({
      template: template,
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

    element = $("<div id='dialog-confirm' />");
    $("#list-hold").append(element);
    dialogs.confirm.$mount(element[0]);



    template = await $.get("/admin/pattern/dialog-edit-template.html", null, "text");
    dialogs.edit = new Vue({
      template: template,
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
    });

    element = $("<div id='dialog-edit' />");
    $("#list-hold").append(element);
    dialogs.edit.$mount(element[0]);



    pattern_list.dialog_input = async function (options, value) {

      console.info("dialog_input");
      return await dialogs.input.run(options, value);

    };

    pattern_list.dialog_confirm = async function (options) {

      console.info("dialog_confirm");
      return await dialogs.confirm.run(options);

    };

    pattern_list.dialog_edit = async function (options, metadata, model) {

      console.info("dialog_edit");
      return await dialogs.edit.run(options, metadata, model);
    };

    pattern_list.list_refresh = async function (listData) {

      if (listData.checked) {
        listData.rows.forEach(item => item[listData.checked] = !!item[listData.checked]);
      }

      this.listView.list = listData;
    };


    pattern_list.list_show = function (options) {

      this.listView.options = options;
    };


    pattern_list.list_selectAll = function () {

      if (this.listView.list.checked) {
        this.listView.list.rows.forEach(item => item[this.listView.list.checked] = true);
      }

    };



    template = await $.get("/admin/pattern/list-template.html", null, "text");
    pattern_list.listView = new Vue({
      template: template,
      data: {
        options: {},
        list: {},
      },

      updated: function () {
        setScroll(true);
      },


      methods: {
        invoke_action: function (action, item) {

          page_config[action](pattern_list, item);

        },
      }
    });

    element = $("<div id='list-view' />");
    $("#list-hold").append(element);
    pattern_list.listView.$mount(element[0]);

    console.info(element[0]);


    console.info("page initialized");

    page_config.init(pattern_list);


    /*滚动条*/
    setScroll();
    $(window).resize(function () {
      setScroll();
    });

  },
}


export {

  pattern_list
}