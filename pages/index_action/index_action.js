// pages/index_action/index_action.js
var app = getApp();
Page({
  data: {
    activity_type: '000',
    activity_status: 0,
    page_num: 1,
    page_size: 10,
    ActivityCommonList: [],
    hidden: false,
    titleshow: 'none',
    scrollTop: 0,
    scrollHeight: 0



  },

  GetActivityCommonList: function (store_id, vip_id, activity_type, activity_status, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/ActivityCommon/GetActivityCommonList',
      data: {
        store_id: store_id,
        vip_id: vip_id,
        activity_type: activity_type,
        activity_status: activity_status,
        page_num: page_num,
        page_size: page_size,


      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        
        if (page_num == 1) {
          that.setData({
            ActivityCommonList: res.data.Data.ActivityCommonList,
            hidden: true
          });
        } else if (page_num > 1) {

          var ActivityCommonList = that.data.ActivityCommonList;
          for (var i = 0; i < res.data.Data.ActivityCommonList.length; i++) {

            ActivityCommonList.push(res.data.Data.ActivityCommonList[i]);
          }
          var need_scrollTop = that.data.scrollTop;
          that.setData({
            ActivityCommonList: ActivityCommonList,
            hidden: true,
            scrollTop: need_scrollTop
          });
        }




      }
    })
  },
  reFresh: function () {
    var that = this;

    that.setData({
      scrollTop: 0,
      hidden: false,
      ActivityCommonList: '',
      page_num: 1
    });
    that.GetActivityCommonList(that.data.store_id, that.data.vip_id, that.data.activity_type, that.data.activity_status, that.data.page_num, that.data.page_size, app.globalData.token);
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


    that.GetActivityCommonList(that.data.store_id, that.data.vip_id, that.data.activity_type, that.data.activity_status, that.data.page_num, that.data.page_size, app.globalData.token)
    that.setData({
      hidden: false,
      page_num: that.data.page_num,
      scrollTop: event.detail.scrollTop,

    });
    console.log('加载更多');
  },

  leftCho: function () {
    var that = this;
    if (that.data.titleshow == 'left') {
      that.setData({
        titleshow: 'none'

      });

    } else {
      that.setData({
        titleshow: 'left'

      });
    }
  },
  rightCho: function () {
    var that = this;
    if (that.data.titleshow == 'right') {
      that.setData({
        titleshow: 'none'

      });

    } else {
      that.setData({
        titleshow: 'right'

      });
    }
  },
  leftAct: function () {

  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    //暂时上拉刷新下拉加载功能搁置

    this.GetActivityCommonList(options.store_id, options.vip_id, this.data.activity_type, this.data.activity_status, this.data.page_num, this.data.page_size, app.globalData.token)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {

        console.info(res.windowHeight);
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