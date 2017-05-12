// pages/index_main_card_package/index_main_card_package.js
var app = getApp();
Page({
  data: {
    store_id:'',
    cardtype_id:'',
    rdata:[]
  },

  GetPacakges: function (store_id, cardtype_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/recharge/GetPacakges',
      data: {
        store_id: store_id,
        cardtype_id: cardtype_id,

      },
      method: 'get',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {

        that.setData({
          rdata:res
        })

      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      store_id: options.store_id,
      cardtype_id: options.cardtype_id
    })
    that.GetPacakges(options.store_id, options.cardtype_id, app.globalData.token)


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})