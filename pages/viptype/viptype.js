// const app = getApp()
// Page({
//   data:{
//     vipValues:[
//       {"type": "Life Fellow Member (voting membership)", "price": "HK$10,000(one - off)", "selected":false},
//       { "type": "Fellow Member (voting membership)", "price": "HK$ 500/yr", "selected": false},
//       {"type": "Life Full Member (voting membership)", "price": "HK$5,000 (one - off)", "selected": false},
//       { "type": "Full Member (voting membership)", "price": "HK$250/yr", "selected": false},
//       { "type": "Full Member (voting membership)", "price": "HK$400/3yrs", "selected": false}
//     ]
//   }
// })

Page({
  data: {
    radioValues: [
      { "type": "Life Fellow Member (voting membership)", "price": "HK$10,000(one - off)", "selected": false },
      { "type": "Fellow Member (voting membership)", "price": "HK$ 500/yr", "selected": false},
      {"type": "Life Full Member (voting membership)", "price": "HK$5,000 (one - off)", "selected": false},
      { "type": "Full Member (voting membership)", "price": "HK$250/yr", "selected": false},
      { "type": "Full Member (voting membership)", "price": "HK$400/3yrs", "selected": false}
    ]
  },
  onLoad: function (options) {
  },
  radioChange: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var arr = this.data.radioValues;
    for (var v in arr) {
      if (v == index) {
        arr[v].selected = true;
      } else {
        arr[v].selected = false;
      }
    }
    this.setData({
      radioValues: arr
    })
  },
  next:function(e){
    wx.reLaunch({
      url: '/pages/parta/parta',
    })
  }
})