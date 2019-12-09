//attention.js
//获取应用实例
const app = getApp()
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
Page({
    data:{ 
      attention:"true",
      viptype:"none",
      parta:"none",
      partb:"none",
      partc: "none",
      partd: "none",
      parte: "none",
      title: ['先生', '女士', '小姐', '博士'],
      gender: ['男', '女'],
      edu: ['副學士', '學士', '碩士', '博士'],
      year_range: ['2-5年', '6-10年', '10年以上'],
      index_title: 0,
      index_gender: 0,
      index_edu: 0,
      selectShow_title: false,
      selectShow_gender: false,
      selectShow_edu: false, 
      attention_selected:"none",
      parta_selected:"",
      partb_selected:"",
      partc_selected:"",
      partd_selected:"",
      //这个被所有缓存存储，应该按part区分selected_values
      selected_values: {
        // parta
        "title": "",
        "cn_surname": "",
        "cn_name": "",
        "en_surname": "",
        "en_name": "",
        "gender": "",
        "hkid": "",
        "hkid_path": "",
        "email": "",
        "doby": "",
        "dobm": "",
        "dobd": "",
        "phone": "",
        "district": "",
        "street": "",
        "building": "",
        "door": "",
        // partb
        "first_edu_level": "",
        "first_edu_org": "",
        "first_edu_year": "",
        "first_edu_month": "",
        "first_edu_day": "",
        "first_edu_prof": "",
        "first_edu_cert_path": "",
        "sec_edu_org": "",
        "sec_edu_year": "",
        "sec_edu_month": "",
        "sec_edu_day": "",
        "sec_edu_prof": "",
        "sec_edu_cert_path": "",
        "first_prof_org": "",
        "first_prof_name": "",
        "first_prof_date": "",
        "first_prof_path": "",
        "sec_prof_org": "",
        "sec_prof_name": "",
        "sec_prof_date": "",
        "sec_prof_path": "",
        //partc
        working_range: "",
        records: [],
        //partd
        "first_surname": "",
        "first_other_name": "",
        "first_id": "",
        "sec_surname": "",
        "sec_other_name": "",
        "sec_id": ""
      },

      radioValues: [
        { "type": "Life Fellow Member (voting membership)", "price": "HK$10,000(one - off)", "selected": false },
        { "type": "Fellow Member (voting membership)", "price": "HK$ 500/yr", "selected": false },
        { "type": "Life Full Member (voting membership)", "price": "HK$5,000 (one - off)", "selected": false },
        { "type": "Full Member (voting membership)", "price": "HK$250/yr", "selected": false },
        { "type": "Full Member (voting membership)", "price": "HK$400/3yrs", "selected": false }
      ]
    },

    onReady: function (options) {
      // viptype
      var type_storage = wx.getStorageSync('radioValues') || [];
      if (type_storage.length != 0) {
        // this.data.radioValues = storage;
        this.setData({
          radioValues: type_storage
        })
      }
      // parta
      var a_storage = wx.getStorageSync('parta') || [];
      if (a_storage.length != 0) {
        this.setData({
          selected_values: a_storage
        })
      }
      // partb
      var b_storage = wx.getStorageSync('partb') || [];
      if (b_storage.length != 0) {
        this.setData({
          selected_values: b_storage
        })
      }
      // partc
      var c_storage = wx.getStorageSync('partc') || [];
      if (c_storage.length != 0) {
        this.setData({
          selected_values: c_storage
        })
      }
      // partd
      var d_storage = wx.getStorageSync('partd') || [];
      if (d_storage.length != 0) {
        this.setData({
          selected_values: d_storage
        })
      }
      // parte
    },

    onLoad: function (options) {
      context = wx.createCanvasContext('signature');
      context.beginPath()
      context.setStrokeStyle('#000000');
      context.setLineWidth(4);
      context.setLineCap('round');
      context.setLineJoin('round');
    },

    photo: function (e) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
        }
      })
    },

    //attention
    required: function(e){
      this.data.attention_selected = e.detail.value;
    },

    // viptype
    select_type: function (e) {
      var index = e.currentTarget.dataset.index;
      console.log(index);
      var arr = this.data.radioValues;
      for (var v in arr) {
        if (v == index) {
          arr[v].selected = true;
        } else {
          arr[v].selected = false;
        }
      }
      wx.setStorageSync("radioValues", arr);
      // console.log(arr);
      this.setData({
        radioValues: arr
      })
    },

    //parta
    selectTap_title() {
      this.setData({
        selectShow_title: !this.data.selectShow_title
      });
    },  

    selectTap_gender() {
      this.setData({
        selectShow_gender: !this.data.selectShow_gender
      });
    },

    optionTap_title(e) {
      let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index_title: index,
        selectShow_title: !this.data.selectShow_title
      });
      this.data.selected_values["title"] = this.data.title[index]
    },

    optionTap_gender(e) {
      let index_gender = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index_gender: index_gender,
        selectShow_gender: !this.data.selectShow_gender
      });
      this.data.selected_values["gender"] = this.data.gender[index_gender]
    },

    // partb
    selectTap_edu() {
      this.setData({
        selectShow_edu: !this.data.selectShow_edu
      });
    },

    optionTap_edu(e) {
      let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: index,
        selectShow_edu: !this.data.selectShow_edu
      });
      this.data.selected_values["first_edu_level"] = this.data.edu[index]
    },

    // partc
    insert: function () {
      console.log(this.data.selected_values.records);
      var rc = this.data.selected_values.records;
      rc.push({ "start_year": "", "start_month": "", "start_day": "", "end_year": "", "end_month": "", "end_day": "", "company": "", "occupation": "", "role": "", "prof_path": "" });
      this.setData({
        'selected_values.records': rc
      });
    },

    delBind: function () {
      var rc = this.data.selected_values.records;
      console.log(rc);
      rc.pop();
      this.setData({
        'selected_values.records': rc
      });
    },

    selectTap_year() {
      this.setData({
        selectShow: !this.data.selectShow
      });
    },

    optionTap_year(e) {
      let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: index,
        selectShow: !this.data.selectShow
      });
      this.data.selected_values.working_range = this.data.year_range[index]
    },

    //parte
    canvasIdErrorCallback: function (e) {
      console.error(e.detail.errMsg)
    },

    canvasStart: function (event) {
      isButtonDown = true;
      arrz.push(0);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      //context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y);

    },

    canvasMove: function (event) {
      if (isButtonDown) {
        arrz.push(1);
        arrx.push(event.changedTouches[0].x);
        arry.push(event.changedTouches[0].y);
        // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
        // context.stroke();
        // context.draw()
        console.log(arrz);
    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };

    context.clearRect(0, 0, canvasw, canvash);
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
    },

    canvasEnd: function (event) {
      isButtonDown = false;
    },

    cleardraw: function () {
      //清除画布
      arrx = [];
      arry = [];
      arrz = [];
      context.clearRect(0, 0, canvasw, canvash);
      context.draw(false);
    },
  
    checkEmail:function(email){
    　var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(email)){
  　　　　return true;
  　　 } else {
  　　　　return false;
      }
    },

    checkDate:function(year,month,day){
      var year_error = 1;
      var month_error = 2;
      var day_error = 3;
      var correct = 0;
      var d = new Date();
      year = parseInt(year);
      month = parseInt(month);
      day = parseInt(day);
      if (isNaN(year) || year > d.getFullYear()){
          return year_error;
      }else if(isNaN(month) || month < 1 || month >12){
          return month_error;
      }else if(isNaN(day) || day < 1 || day >31){
          return day_error;
      }else{
        return correct
      }
    },

    attention_next:function(e){
      // wx.navigateTo({
      //     url: '/pages/viptype/viptype',
      //   })
      if(this.data.attention_selected=="yes"){
        this.setData({ attention: "none", viptype: "true" });
      }
    },

    viptype_next: function (e) {
      // wx.navigateTo({
      //   url: '/pages/parta/parta',
      // })
      for (var i = 0; i < this.data.radioValues.length; i++){
        if (this.data.radioValues[i]["selected"]){
          this.setData({ parta: "true", viptype: "none" });
        } 
      }
    },

    viptype_previous: function (e) {
      wx.setStorage({
        key: "type",
        data: '',
      })
      this.setData({ attention: "true", viptype: "none" });
    },

    parta_next:function(e){
      this.data.selected_values["cn_surname"] = e.detail.value.cn_surname;
      this.data.selected_values["cn_name"] = e.detail.value.cn_name;
      this.data.selected_values["en_surname"] = e.detail.value.en_surname;
      this.data.selected_values["en_name"] = e.detail.value.en_name;
      this.data.selected_values["hkid"] = e.detail.value.hkid;
      this.data.selected_values["email"] = e.detail.value.email;
      this.data.selected_values["doby"] = e.detail.value.year;
      this.data.selected_values["dobm"] = e.detail.value.month;
      this.data.selected_values["dobd"] = e.detail.value.day;
      this.data.selected_values["phone"] = e.detail.value.phone;
      this.data.selected_values["district"] = e.detail.value.district;
      this.data.selected_values["street"] = e.detail.value.street;
      this.data.selected_values["building"] = e.detail.value.building;
      this.data.selected_values["door"] = e.detail.value.door;
      //TODO 需要加入字段检测
      this.parta_test();
      wx.setStorageSync('parta', this.data.selected_values);
      if(this.data.parta_selected == ""){
        this.setData({ partb: "true", parta: "none" });
      }
    },

    parta_test:function(e){
      if(this.data.selected_values["cn_surname"] == "" || this.data.selected_values["cn_name"] == "" || this.data.selected_values["en_surname"] == "" || this.data.selected_values["en_name"] == "" || this.data.selected_values["hkid"] == "" || this.data.selected_values["email"] == "" || this.data.selected_values["doby"]== "" || this.data.selected_values["dobm"] == "" || this.data.selected_values["dobd"] == "" || this.data.selected_values["phone"] == "" || this.data.selected_values["district"] == "" || this.data.selected_values["street"] == "" || this.data.selected_values["building"] == "" || this.data.selected_values["door"] == ""){
        this.setData(
          { parta_selected: "*請填寫完整上述信息"}
        )
      }else{
        if(!this.checkEmail(this.data.selected_values["email"])){
          this.setData(
            { parta_selected: "*請輸入正確Email格式！" }
          )
        }
        var date_result = this.checkDate(this.data.selected_values["doby"], this.data.selected_values["dobm"], this.data.selected_values["dobd"])
        if(date_result == 1){
          this.setData(
            { parta_selected: "*請輸入正確年份" }
          )
        } else if (date_result == 2){
          this.setData(
            { parta_selected: "*請輸入正確月份" }
          )
        }else if(date_result == 3){
          this.setData(
            { parta_selected: "*請輸入正確日期" }
          )
        }else{
          this.setData(
            { parta_selected: "" }
          )
        }
      }
    },

    parta_previous:function(e){
      this.setData({ parta: "none", viptype: "true" });
    },

    partb_next:function(e){
      this.data.selected_values["first_edu_org"] = e.detail.value.first_edu_org;
      this.data.selected_values["first_edu_year"] = e.detail.value.first_edu_year;
      this.data.selected_values["first_edu_month"] = e.detail.value.first_edu_month;
      this.data.selected_values["first_edu_day"] = e.detail.value.first_edu_day;
      this.data.selected_values["first_edu_prof"] = e.detail.value.first_edu_prof;
      this.data.selected_values["sec_edu_org"] = e.detail.value.sec_edu_org;
      this.data.selected_values["sec_edu_year"] = e.detail.value.sec_edu_year;
      this.data.selected_values["sec_edu_month"] = e.detail.value.sec_edu_month;
      this.data.selected_values["sec_edu_day"] = e.detail.value.sec_edu_day;
      this.data.selected_values["sec_edu_prof"] = e.detail.value.sec_edu_prof;
      this.data.selected_values["first_prof_org"] = e.detail.value.first_prof_org;
      this.data.selected_values["first_prof_name"] = e.detail.value.first_prof_name;
      this.data.selected_values["first_prof_date"] = e.detail.value.first_prof_date;
      this.data.selected_values["sec_prof_org"] = e.detail.value.sec_prof_org;
      this.data.selected_values["sec_prof_date"] = e.detail.value.sec_prof_date;
      this.data.selected_values["sec_prof_name"] = e.detail.value.sec_prof_name;
      //TODO 需要加入字段检测
      this.partb_test()
      wx.setStorageSync('partb', this.data.selected_values);
      if (this.data.partb_selected == "") {
        this.setData({ partc: "true", partb: "none" });
      }
    },

    partb_test:function(e){
      if (this.data.selected_values["first_edu_org"] == "" || this.data.selected_values["first_edu_year"] == "" || this.data.selected_values["first_edu_month"] == "" || this.data.selected_values["first_edu_day"] == "" || this.data.selected_values["first_edu_prof"] == "") {
        this.setData(
          { partb_selected: "*請至少填寫一個學歷的全部信息" }
        )
      } else {
        this.setData(
          { partb_selected: "" }
        )
      }
    },

    partb_previous:function(e){
      this.setData({ parta: "true", partb: "none" });
    },

    partc_next: function (e) {
      var selected = e.detail.value;
      console.log(this.data.selected_values.records)
      var total_fill_in = 0
      var fill_in_not_null = 0
      for (var i = 0; i < this.data.selected_values.records.length; i++) {
        for (var item in selected) {
          total_fill_in += 1;
          if ("start_year" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["start_year"] = selected[item];
            fill_in_not_null += 1;
          } else if ("start_month" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["start_month"] = selected[item];
            fill_in_not_null += 1;
          } else if ("start_day" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["start_day"] = selected[item];
            fill_in_not_null += 1;
          } else if ("end_year" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["end_year"] = selected[item];
            fill_in_not_null += 1;
          } else if ("end_month" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["end_month"] = selected[item];
            fill_in_not_null += 1;
          } else if ("end_day" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["end_day"] = selected[item];
            fill_in_not_null += 1;
          } else if ("company" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["company"] = selected[item];
            fill_in_not_null += 1;
          } else if ("occupation" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["occupation"] = selected[item];
            fill_in_not_null += 1;
          } else if ("role" + i == item && selected[item] != "") {
            this.data.selected_values.records[i]["role"] = selected[item];
            fill_in_not_null += 1;
          }
        }
      };
      if (total_fill_in == fill_in_not_null && total_fill_in > 0){
        wx.setStorageSync('partc', this.data.selected_values);
        this.setData(
          { partc_selected: "" }
        )
        this.setData({ partd: "true", partc: "none" });
      }else{
        this.setData(
          { partc_selected: "*請將所有工作信息填寫完整" }
        )
      }
    },

    partc_previous: function (e) {
      this.setData({ partb: "true", partc: "none" });
    },

    partd_next: function (e) {
      this.data.selected_values["first_surname"] = e.detail.value.first_surname;
      this.data.selected_values["first_other_name"] = e.detail.value.first_other_name;
      this.data.selected_values["first_id"] = e.detail.value.first_id;
      this.data.selected_values["sec_surname"] = e.detail.value.sec_surname;
      this.data.selected_values["sec_other_name"] = e.detail.value.sec_other_name;
      this.data.selected_values["sec_id"] = e.detail.value.sec_id;
      this.partd_test();
      wx.setStorageSync('partd', this.data.selected_values);
      if (this.data.partd_selected == "") {
        this.setData({ parte: "true", partd: "none" });
      }
    },

    partd_test:function(e){
      if (this.data.selected_values["first_surname"] == "" || this.data.selected_values["first_other_name"] == "" || this.data.selected_values["first_id"] == "" || this.data.selected_values["sec_surname"] == "" || this.data.selected_values["sec_other_name"] == "" || this.data.selected_values["sec_id"] == "") {
        this.setData(
          { partd_selected: "*請填寫完整上述信息" }
        )
      }else{
        this.setData(
          { partd_selected: "" }
        )
      }
    },

    partd_previous: function (e) {
      this.setData({ partc: "true", partd: "none" });
    },

    parte_next: function (e) {
      var viptype = wx.getStorageSync('radioValues') || [];
      var parta = wx.getStorageSync('parta') || [];
      var partb = wx.getStorageSync('partb') || [];
      var partc = wx.getStorageSync('partc') || [];
      var partd = wx.getStorageSync('partd') || [];
      var parte = wx.getStorageSync('parte') || [];
      var request_paras = { "viptype": viptype, "parta": parta, "partb": partb, "partc": partc, "partd": partd, "parte": parte };
      console.log(request_paras);
      wx.request({
        url: 'http://127.0.0.1:8001/application/confirm/',
        method: "POST",
        data: {
          "request_paras": request_paras
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
        }
      })
      this.setData({ parte: "none", attention: "true" });
    },

    parte_previous: function (e) {
      this.setData({ partd: "true", parte: "none" });
    },
})

