//attention.js
//获取应用实例
const app = getApp()

Page({
    data:{ 
    },
    next:function(){
      wx.reLaunch({
          url: '/pages/viptype/viptype',
        })
    }
})

