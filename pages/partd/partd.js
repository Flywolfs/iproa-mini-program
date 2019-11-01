// pages/partd/partd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    table_values:[
      {"name":"推荐人1姓名"},
      {"name":"推荐人1会员ID"},
      { "name": "推荐人2姓名" },
      { "name": "推荐人2会员ID" },
    ]
  },

  next: function (e) {
    wx.reLaunch({
      url: '/pages/parte/parte',
    })
  },

  previous: function (e) {
    wx.reLaunch({
      url: '/pages/partc/partc',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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