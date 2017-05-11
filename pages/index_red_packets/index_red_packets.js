// pages/index_red_packets/index_red_packets.js

var app = getApp();
var util = require('../../utils/util.js');
Page({

  data: {
    scrollTop: 0,
    scrollHeight: 0,
    vip_id: '',
    begin_time: '',
    end_time: '',
    page_num: 1,
    page_size: 10,
    Items: [],
    InMoney: '',
    OutMoney: '',
    total_money: '',
    mon_status: '',
    hotList: [
      {
        month: '1月',

        index: 0

      }, {
        month: '2月',

        index: 1

      }, {
        month: '3月',

        index: 2

      }, {
        month: '4月',

        index: 3

      }, {
        month: '5月',

        index: 4

      }, {
        month: '6月',

        index: 5

      }, {
        month: '7月',

        index: 6

      }, {
        month: '8月',

        index: 7

      }, {
        month: '9月',

        index: 8

      }, {
        month: '10月',

        index: 9

      }, {
        month: '11月',

        index: 10

      }, {
        month: '12月',

        index: 11

      }, {
        month: '全部',

        index: 12

      }
    ],




  },

  GetRedpacketItemsOfVip: function (vip_id, begin_time, end_time, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/redpacket/GetRedpacketItemsOfVip',
      data: {
        vip_id: vip_id,
        begin_time: begin_time,
        end_time: end_time,
        page_num: page_num,
        page_size: page_size,
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log('开始时间：' + begin_time);
        console.log('结束时间：' + end_time);
        console.log(res.data);
        that.setData({
          InMoney: res.data.Data.InMoney,
          OutMoney: res.data.Data.OutMoney,
          total_money: res.data.Data.InMoney + res.data.Data.OutMoney
        })
        if (page_num == 1) {
          if (res.data.Data.Items == '') {
            wx.showToast({
              title: '暂无数据',
              icon: 'success',
              duration: 1200
            })
          } else {
            that.setData({
              Items: res.data.Data.Items
            })
          }
        } else {
          var Items = that.data.Items;
          for (var i = 0; i < res.data.Data.Items.length; i++) {
            Items.push(res.data.Data.Items[i]);
          }
        }



      }
    })
  },

  monCho: function (event) {
    var myDate = new Date();
    var year_time = myDate.getFullYear();

    // console.log(event);
    var that = this;
    var index = event.currentTarget.dataset.index;

    if (index == 12) {//全部情况

      var begin_time = year_time + '-' + 1 + '-' + '01' + ' ' + '00:00:00';
      begin_time = util.datetime_to_unix(begin_time);
      var end_time = year_time + '-' + 12 + '-' + '01' + ' ' + '00:00:00';
      end_time = util.datetime_to_unix(end_time);
      this.setData({
        mon_status: index,
        begin_time: begin_time,
        end_time: end_time
      })
      that.GetRedpacketItemsOfVip(that.data.vip_id, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    } else if (index == 11) {//12月份
      var begin_time = year_time + '-' + 12 + '-' + '01' + ' ' + '00:00:00';
      begin_time = util.datetime_to_unix(begin_time);
      var end_time = year_time + 1 + '-' + 1 + '-' + '01' + ' ' + '00:00:00';
      end_time = util.datetime_to_unix(end_time);
      this.setData({
        mon_status: index,
        begin_time: begin_time,
        end_time: end_time
      })
      that.GetRedpacketItemsOfVip(that.data.vip_id, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    } else {//其他情况
      var beg_mon = index + 1;
      var begin_time = year_time + '-' + beg_mon + '-' + '01' + ' ' + '00:00:00';
      begin_time = util.datetime_to_unix(begin_time);
      var end_mon = index + 1 + 1;
      var end_time = year_time + '-' + end_mon + '-' + '01' + ' ' + '00:00:00';
      end_time = util.datetime_to_unix(end_time);
      this.setData({
        mon_status: index,
        begin_time: begin_time,
        end_time: end_time
      })
      that.GetRedpacketItemsOfVip(that.data.vip_id, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    }

  },

  reFresh: function () {
    var that = this;

    that.setData({
      scrollTop: 0,
      hidden: false,
      page_num: 1
    });
    that.GetRedpacketItemsOfVip(options.vip_id, begin_time, end_time, that.data.page_num, that.data.page_size, app.globalData.token);
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
    that.GetRedpacketItemsOfVip(options.vip_id, begin_time, end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    that.setData({
      hidden: false,
      page_num: that.data.page_num,
      scrollTop: event.detail.scrollTop,

    });

    console.log('加载更多');
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
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
    var myDate = new Date();
    var time_time = myDate.getTime();
    var month_time = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    this.setData({
      mon_status: month_time
    })

    var year_time = myDate.getFullYear();
    month_time += 1;
    // monthShow(month_time);
    console.log('需要的时间：' + month_time);
    var sec_time = time_time / 1000;
    sec_time = parseInt(sec_time);
    if (month_time < 10) {
      month_time = '0' + month_time;
    }
    var begin_time = year_time + '-' + month_time + '-' + '01' + ' ' + '00:00:00';
    begin_time = util.datetime_to_unix(begin_time);
    var end_time = sec_time;

    this.GetRedpacketItemsOfVip(options.vip_id, begin_time, end_time, this.data.page_num, this.data.page_size, app.globalData.token);

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