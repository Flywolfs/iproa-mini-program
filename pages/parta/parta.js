const app = getApp()
Page({
  data:{
    selectShow: false,
    table_values:[
      {"name":"头衔"},
      { "name": "中文名" },
      { "name": "英文名" },
      { "name": "性别" },
      { "name": "HKID" },
      { "name": "邮箱" },
      { "name": "生日" },
      { "name": "电话号码" },
      { "name": "地址" }
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
    let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: index,
      selectShow: !this.data.selectShow
    });
  },

    next:function(e){
      wx.reLaunch({
        url: '/pages/partb/partb',
      })
    }
})
