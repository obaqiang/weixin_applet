// pages/index_purchase_history/index_purchase_history.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    store_id: '',
    vip_id: '',
    type: 1,
    page_num: 1,
    page_size: 10,
    hasitems: 1,
    Orders: [],
    hidden: false,
    scrollTop: 0,
    scrollHeight: 0,
    titleshow: ''
  },

  GetOrders: function (store_id, vip_id, type, page_num, page_size, hasitems, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/order/GetOrders',
      data: {
        store_id: store_id,
        vip_id: vip_id,
        type: type,
        page_num: page_num,
        page_size: page_size,
        hasitems: hasitems,
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.Data.Orders==''){
          wx.showToast({
            title: '暂无数据',
            icon: 'success',
            duration: 1200
          })
        }
        for (var i = 0; i < res.data.Data.Orders.length; i++) {
          var goods_names = res.data.Data.Orders[i].goods_names
          goods_names = util.cutstr(goods_names, 19)
          res.data.Data.Orders[i].goods_names = goods_names
        }
        that.setData({
          Orders: res.data.Data.Orders,
          hidden:true
        })

      }
    })
  },

  reFresh: function () {
    var that = this;

    that.setData({
      scrollTop: 0,
      hidden: false,
      Tickets: '',
      page_num: 1
    });
    that.GetOrders(that.data.store_id, that.data.vip_id, that.data.type, that.data.page_num, that.data.page_size, that.data.hasitems, app.globalData.token)
    console.log('下拉刷新');
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    // console.log(event.detail.scrollTop);
    // this.setData({
    //   scrollTop: event.detail.scrollTop
    // });
  },
  loadMore: function (event) {
    var that = this;
    that.data.page_num++;
    // that.GetVipTickets(that.data.store_id, that.data.vip_id, that.data.type, that.data.page_num, that.data.page_size, app.globalData.token)
    that.GetOrders(that.data.store_id, that.data.vip_id, that.data.type, that.data.page_num, that.data.page_size, that.data.hasitems, app.globalData.token)
    that.setData({
      hidden: false,
      page_num: that.data.page_num,
      scrollTop: event.detail.scrollTop,

    });
    console.log('加载更多');
  },
  oneTap: function () {
    var that = this
    that.setData({
      type: 1,
      page_num: 1,
      titleshow: 'one',
      hidden: false
    });
    that.GetOrders(that.data.store_id, that.data.vip_id, that.data.type, that.data.page_num, that.data.page_size, that.data.hasitems, app.globalData.token)
  },
  twoTap: function () {
    var that = this
    that.setData({
      type: 2,
      page_num: 1,
      titleshow: 'two',
      hidden: false
    });
    that.GetOrders(that.data.store_id, that.data.vip_id, that.data.type, that.data.page_num, that.data.page_size, that.data.hasitems, app.globalData.token)
  },
  threeTap: function () {
    var that = this
    that.setData({
      type: 3,
      page_num: 1,
      titleshow: 'three',
      hidden: false
    });
    that.GetOrders(that.data.store_id, that.data.vip_id, that.data.type, that.data.page_num, that.data.page_size, that.data.hasitems, app.globalData.token)
  },




  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.GetOrders(options.store_id, options.vip_id, that.data.type, that.data.page_num, that.data.page_size, that.data.hasitems, app.globalData.token)
    wx.getSystemInfo({
      success: function (res) {

        // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight,
          store_id: options.store_id,
          vip_id: options.vip_id
        });
      }
    });



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