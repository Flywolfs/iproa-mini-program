//attention.js
//获取应用实例
const app = getApp()

Page({
    data:{ 
      attention:"true"
    },
    next:function(){
      wx.navigateTo({
          url: '/pages/viptype/viptype',
        })
    }
})

