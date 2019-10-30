const app = getApp()
Page({
  data:{
    selectShow: false,
    table_values:[
      {"name":"1.头衔"},
      { "name": "2.中文名" },
      { "name": "3.英文名" },
      { "name": "4.性别" },
      { "name": "5.HKID" },
      { "name": "6.邮箱" },
      { "name": "7.生日" },
      { "name": "8.电话号码" },
      { "name": "9.地址" }
    ],
    index: 0,
    selectData :['先生','女士','小姐','博士']
  },
    selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
    },

  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

    next:function(e){
      wx.reLaunch({
        url: '/pages/partb/partb',
      })
    }
})
