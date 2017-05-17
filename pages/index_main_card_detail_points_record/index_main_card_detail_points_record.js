// pages/index_main_card_detail_points_record/index_main_card_detail_points_record.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    rdata: [],
    page_num: 1,
    page_size: 10,
    type: 1,
    store_id:'',
    vip_id:'',
    status:'等待确认'
  },

  GetExchanges: function (store_id, vip_id, page_num, page_size, type, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/exchange/GetExchanges',
      data: {
        store_id: store_id,
        vip_id: vip_id,
        page_num: page_num,
        page_size: page_size,
        type: type,
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        for (var i = 0; i < res.data.Data.Exchanges.length; i++) {
          var add_time = res.data.Data.Exchanges[i].add_time;
          add_time = util.getNowFormatDate(add_time);
          res.data.Data.Exchanges[i].add_time = add_time
        }
        that.setData({
          rdata: res.data
        })
      }
    })
  },
  oneTap:function(){
    var that = this;
    that.setData({
      type:1,
      status:'等待确认'
    })
    that.GetExchanges(that.data.store_id, that.data.vip_id, that.data.page_num, that.data.page_size, that.data.type, app.globalData.token)
  },
  twoTap: function () {
    var that = this;
    that.setData({
      type: 2,
      status: '已确认'
    })
    that.GetExchanges(that.data.store_id, that.data.vip_id, that.data.page_num, that.data.page_size, that.data.type, app.globalData.token)
  },
  threeTap: function () {
    var that = this;
    that.setData({
      type: 4,
      status: '已取消'
    })
    that.GetExchanges(that.data.store_id, that.data.vip_id, that.data.page_num, that.data.page_size, that.data.type, app.globalData.token)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      store_id: options.store_id,
      vip_id: options.vip_id
    })
    that.GetExchanges(options.store_id, options.vip_id, that.data.page_num, that.data.page_size, that.data.type, app.globalData.token)

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