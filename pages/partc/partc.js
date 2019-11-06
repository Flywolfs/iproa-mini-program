// pages/partc/partc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //TODO 这个要改成界面可显示变化 
    selected_values:{
      working_range: "",
      records: [],
    },
    selectData: ['2-5年', '6-10年', '10年以上']
  },

  onReady: function (options) {
    var storage = wx.getStorageSync('partc') || [];
    if (storage.length != 0) {
      this.setData({
        selected_values: storage
      })
    }
  },

  insert: function () {
    var rc = this.data.selected_values.records;
    rc.push({"start_date":"","end_date":"","company":"","occupation":"","role":"","prof_path":""});
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
    this.data.selected_values.working_range = this.data.selectData[index]
  },

  next:function(e){
    var selected = e.detail.value;
    for (var i = 0; i < this.data.selected_values.records.length; i++){
        for(var item in selected){
          if ("start_date"+i == item){
            this.data.selected_values.records[i]["start_date"] = selected[item]
          } else if ("end_date"+i == item){
            this.data.selected_values.records[i]["end_date"] = selected[item]
          } else if ("company" + i == item) {
            this.data.selected_values.records[i]["company"] = selected[item]
          } else if ("occupation" + i == item) {
            this.data.selected_values.records[i]["occupation"] = selected[item]
          } else if ("role" + i == item) {
            this.data.selected_values.records[i]["role"] = selected[item]
          }
        }
    };
    wx.setStorageSync('partc', this.data.selected_values);
    wx.navigateTo({
            url: '/pages/partd/partd',
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