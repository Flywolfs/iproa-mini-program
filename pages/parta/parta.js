const app = getApp()
Page({
  data:{
    selectShow: false,
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
    selectData :['先生','女士','小姐','博士']
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

  optionTap(e) {
    let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: index,
      selectShow: !this.data.selectShow
    });
    this.data.selected_values["title"] = this.data.selectData[index]
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

  previous: function (e) {
    wx.navigateBack({
      delta:1
    })
  }
})
