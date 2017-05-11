// pages/index_main_message/index_main_message.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    resdata:[],
    type:'001',
    page_num:1,
    page_size:10
  },

  GetMsgList: function (member_id, type,page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/member/GetMsgList',
      data: {
        member_id: member_id,
        type: type,
        page_num: page_num,
        page_size: page_size
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          resdata:res.data.Data
        })
      }
    })
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.GetMsgList(app.globalData.member_id, that.data.type, that.data.page_num, that.data.page_size, app.globalData.token)
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