// pages/partc/partc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    table_values:[
      {"name":"总工作年期"},
      {"name":"工作日期"},
      {"name":"公司名称"},
      {"name":"职位"},
      {"name":"主要职责"}
    ],
    records:[],
    selectData: ['2-5年', '6-10年', '10年以上']
  },

  insert: function () {
    var rc = this.data.records;
    console.log(rc);
    rc.push(this.data.records.length);
    this.setData({
      records: rc
    });
  },

  delBind: function () {
    var rc = this.data.records;
    console.log(rc);
    rc.pop(this.data.records.length);
    this.setData({
      records: rc
    });
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
  },

  next:function(e){
      wx.reLaunch({
              url: '/pages/partd/partd',
    })
  },

  previous: function (e) {
    wx.reLaunch({
      url: '/pages/partb/partb',
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