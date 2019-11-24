const app = getApp()
Page({
  data:{
    selectShow: false,
    selectShow_gender:false,
    selected_values:{
      "title":"",
      "cn_surname":"",
      "cn_name":"",
      "en_surname":"",
      "en_name":"",
      "gender":"",
      "hkid":"",
      "hkid_path":"",
      "email":"",
      "doby":"",
      "dobm":"",
      "dobd":"",
      "phone":"",
      "district":"",
      "street":"",
      "building":"",
      "door":""
  },

    index: 0,
    index_gender:0,
    selectData :['先生','女士','小姐','博士'],
    gender:['男','女']
  },

  onReady: function (options){
    var storage = wx.getStorageSync('parta') || [];
    if(storage.length!=0){
      this.setData({
        selected_values:storage
      })
    }
  },

  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },

  selectTap_gender(){
    this.setData({
      selectShow_gender: !this.data.selectShow_gender
    });
  },

  optionTap(e) {
    let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: index,
      selectShow: !this.data.selectShow
    });
    this.data.selected_values["title"] = this.data.selectData[index]
  },

  optionTap_gender(e){
    let index_gender = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index_gender: index_gender,
      selectShow_gender: !this.data.selectShow_gender
    });
    this.data.selected_values["gender"] = this.data.gender[index_gender]
  },

  genderChoose:function(e){ 
    this.data.selected_values["gender"]=e.detail.value;
  },

  next:function(e){
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
    wx.setStorageSync('parta', this.data.selected_values);
    wx.navigateTo({
      url: '/pages/partb/partb',
    })
  },

  parta_previous: function (e) {
    wx.navigateBack({
      delta:1
    })
  },

  change_color:function(e){

  },

  photo:function(e){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  }
})
