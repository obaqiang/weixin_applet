// pages/index_main_mine/index_main_mine.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data:{
    phone:'',
    birthday:'',
    thumb:'',
    member_name:''

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      phone: app.globalData.phone,
      birthday: app.globalData.birthday,
      thumb: app.globalData.thumb,
      member_name: app.globalData.member_name
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})