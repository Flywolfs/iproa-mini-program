const app = getApp()
Page({ 
  data: {
    selectShow: false, 
    index: 0,
    selectData: ['副學士','學士','碩士','博士'],
    selected_values: {
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
  }
  },

  onReady: function (options) {
    var storage = wx.getStorageSync('partb') || [];
    if (storage.length != 0) {
      this.setData({
        selected_values: storage
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
    this.data.selected_values["first_edu_level"] = this.data.selectData[index]
  },

  next: function (e) {
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
    wx.setStorageSync('partb', this.data.selected_values);
    wx.navigateTo({
      url: '/pages/partc/partc',
    })
  },

  previous: function (e) {
    wx.navigateBack({
        delta:1
    })
  }
})