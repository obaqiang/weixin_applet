// pages/index_main_card_products_detail/index_main_card_products_detail.js
Page({
  data:{
    goods_name:'',
    goods_desc:'',
    goods_price:'',
    unit_name:'',
    thumb:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      goods_name: options.goods_name,
      goods_desc: options.goods_desc,
      goods_price: options.goods_price,
      unit_name: options.unit_name,
      thumb: options.thumb,
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