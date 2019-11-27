//attention.js
//获取应用实例
const app = getApp()

Page({
    data:{ 
      attention:"true",
      viptype:"none",
    },
    attention_next:function(e){
      // wx.navigateTo({
      //     url: '/pages/viptype/viptype',
      //   })
      this.setData({attention:"none",viptype:"true"});
    }
})

