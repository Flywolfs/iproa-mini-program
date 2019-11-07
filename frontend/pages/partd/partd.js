// pages/partd/partd.js
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    selected_values: {
          "first_surname":"",
          "first_other_name":"",
          "first_id":"",
          "sec_surname":"",
          "sec_other_name":"",
          "sec_id":""
    }
  },

  onReady: function () {
    var storage = wx.getStorageSync('partd') || [];
    if (storage.length != 0) {
      this.setData({
        selected_values: storage
      })
    }
  },  


  next: function (e) {
    this.data.selected_values["first_surname"] = e.detail.value.first_surname;
    this.data.selected_values["first_other_name"] = e.detail.value.first_other_name;
    this.data.selected_values["first_id"] = e.detail.value.first_id;
    this.data.selected_values["sec_surname"] = e.detail.value.sec_surname;
    this.data.selected_values["sec_other_name"] = e.detail.value.sec_other_name;
    this.data.selected_values["sec_id"] = e.detail.value.sec_id;
    wx.setStorageSync('partd', this.data.selected_values);
    wx.navigateTo({
      url: '/pages/parte/parte',
    })
  },

  previous: function (e) {
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})