// pages/index_bill/index_bill.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    store_id: '',
    vip_id: '',
    type: '002',
    page_num: 1,
    page_size: 20,
    hidden: false,
    scrollTop: 0,
    scrollHeight: 0,
    begin_time: '',
    end_time: '',
    Items: [],
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

  getVipca: function (store_id, vip_id, type, begin_time, end_time, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/query/getvipca',
      data: {
        store_id: store_id,
        vip_id: vip_id,
        type: type,
        begin_time: begin_time,
        end_time: end_time,
        page_num: page_num,
        page_size: page_size
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        if (page_num == 1) {
          if (res.data.Data.Items == '') {
            wx.showToast({
              title: '暂无数据',
              icon: 'success',
              duration: 1200
            })
            that.setData({
              Items: []
            })
          } else {
            var add_time
            for (var i = 0; i < res.data.Data.Items.length; i++) {
              add_time = res.data.Data.Items[i].add_time;
              add_time = util.userDate(add_time);
              res.data.Data.Items[i].add_time = add_time
            }
            that.setData({
              Items: res.data.Data.Items
            })
          }
        } else {
          var Items = that.data.Items;
          for (var i = 0; i < res.data.Data.Items.length; i++) {
            add_time = res.data.Data.Items[i].add_time;
            add_time = util.userDate(add_time);
            res.data.Data.Items[i].add_time = add_time
            Items.push(res.data.Data.Items[i]);
          }
          that.setData({
            Items: Items
          })
        }
      }
    })
  },


  leftTap: function () {
    var that = this;
    that.setData({
      page_num: 1,
      type: '002'
    })
    that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
  },
  rightTap: function () {
    var that = this;
    that.setData({
      page_num: 1,
      type: '001'
    })
    that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
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
        end_time: end_time,
        page_num:1
      })
      that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, begin_time, end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    } else if (index == 11) {//12月份
      var begin_time = year_time + '-' + 12 + '-' + '01' + ' ' + '00:00:00';
      begin_time = util.datetime_to_unix(begin_time);
      var end_time = year_time + 1 + '-' + 1 + '-' + '01' + ' ' + '00:00:00';
      end_time = util.datetime_to_unix(end_time);
      this.setData({
        mon_status: index,
        begin_time: begin_time,
        end_time: end_time,
        age_num:1
      })
      that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, begin_time, end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    } else {//其他情况
      var beg_mon = index + 1;
      var begin_time = year_time + '-' + beg_mon + '-' + '01' + ' ' + '00:00:00';
      console.log(begin_time);
      begin_time = util.datetime_to_unix(begin_time);
      var end_mon = index + 1 + 1;
      var end_time = year_time + '-' + end_mon + '-' + '01' + ' ' + '00:00:00';
      end_time = util.datetime_to_unix(end_time);
      console.log(end_time);
      this.setData({
        mon_status: index,
        begin_time: begin_time,
        end_time: end_time,
        age_num:1
      })
      that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, begin_time, end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    }

  },
  reFresh: function () {
    var that = this;

    that.setData({
      scrollTop: 0,
      hidden: false,
      page_num: 1
    });
    that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
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
    that.getVipca(that.data.store_id, that.data.vip_id, that.data.type, that.data.begin_time, that.data.end_time, that.data.page_num, that.data.page_size, app.globalData.token);
    that.setData({
      hidden: false,
      page_num: that.data.page_num,
      scrollTop: event.detail.scrollTop,

    });

    console.log('加载更多');
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight,
          store_id: options.store_id,
          vip_id: options.vip_id,
          begin_time: begin_time,
          end_time: end_time
        });
      }
    });
    that.getVipca(options.store_id, options.vip_id, that.data.type, begin_time, end_time, that.data.page_num, that.data.page_size, app.globalData.token);

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