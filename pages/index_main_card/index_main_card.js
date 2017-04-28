// pages/index_main_setting/index_main_setting.js
var app = getApp();
Page({
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    hidden: true,
    token: '',
    GetMemberInfo_url: '',
    page_num: 1,
    page_size: 10,
    Vips: ''
  },

  GetMemberInfo: function (token) {//获取用户信息接口
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/aliwx/GetMemberInfo', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        var MemberInfo = res.data.Data.MemberInfo;
        app.globalData.member_id = MemberInfo.id;
        that.GetVips(app.globalData.member_id, that.data.page_num, that.data.page_size, app.globalData.token);
      }
    })
  },
  GetVips: function (member_id, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/member/GetVips',
      data: {
        member_id: member_id,
        page_num: page_num,
        page_size: page_size,
        token: token
      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data);
        if (page_num == 1) {
          that.setData({
            Vips: res.data.Data.Vips,
            hidden: true
          });
        } else if (page_num > 1) {
          var Vips = that.data.Vips;

          console.log('有页面加载出来');


          for (var i = 0; i < res.data.Data.Vips.length; i++) {
            console.log(Vips);
            Vips.push(res.data.Data.Vips[i]);
            console.log(999);
          }
          var need_scrollTop = that.data.scrollTop;
          that.setData({
            Vips: Vips,
            hidden: true,
            scrollTop: need_scrollTop
          });

          


        }



      }
    })
  },



  reFresh: function () {
    var that = this;
    console.log('刷新');
    that.setData({
      scrollTop: 0,
      hidden: false,
      Vips: '',
      page_num: 1
    });
    that.GetVips(app.globalData.member_id, that.data.page_num, that.data.page_size, app.globalData.token);
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    // console.log(event.detail.scrollTop);

  },
  loadMore: function (event) {
    console.log('加载更多');
    var that = this;
    that.data.page_num++;

    console.log(that.data.page_num);
    that.GetVips(app.globalData.member_id, that.data.page_num, that.data.page_size, app.globalData.token);
    that.setData({
      hidden: false,
      page_num: that.data.page_num,
      scrollTop: event.detail.scrollTop
    });

  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(app.globalData.token);
    this.GetMemberInfo(app.globalData.token);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('全是坑');
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

  },
  onReady: function () {
    // 页面渲染完成
    console.log(this.data.Vips);
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