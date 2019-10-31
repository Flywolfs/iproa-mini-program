const app = getApp()
Page({
  data: {
    selectShow: false,
    table_values: [
      { "name": "最高教育水平" },
      { "name": "最高教育院校1" },
      { "name": "最高教育毕业时间1" },
      { "name": "最高教育专业1" },
      { "name": "最高教育院校2*" },
      { "name": "最高教育毕业时间2*" },
      { "name": "最高教育专业2*" },
      { "name": "授权机构1*" },
      { "name": "证书名称1*" },
      { "name": "获取日期1*" },
      { "name": "授权机构2*" },
      { "name": "证书名称2*" },
      { "name": "获取日期2*" }
    ],
    index: 0,
    selectData: ['副学士','学士','硕士','博士']
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

  next: function (e) {
    wx.reLaunch({
      url: '/pages/partc/partc',
    })
  }
})