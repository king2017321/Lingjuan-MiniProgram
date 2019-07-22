// miniprogram/pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**navposifix**/
    navboxposi:true,

    /**nav数据**/
    navData: [
      { 'text': '推荐', "link": "/pages/index/index" },
      { 'text': '女装', "link": "/pages/list/list" },
      { 'text': '男装', "link": "/pages/list/list" },
      { 'text': '母婴儿童', "link": "/pages/list/list" },
      { 'text': '零食', "link": "/pages/list/list" },    
      { 'text': '内衣', "link": "/pages/list/list" },
      { 'text': '家纺', "link": "/pages/list/list" },
      { 'text': '手机', "link": "/pages/list/list" },
      { 'text': '数码', "link": "/pages/list/list" },
      { 'text': '家电', "link": "/pages/list/list" },
      { 'text': '配饰', "link": "/pages/list/list" }, 
      { 'text': '袜子手套', "link": "/pages/list/list" },
      { 'text': '电脑', "link": "/pages/list/list" }, 
      { 'text': '运动', "link": "/pages/list/list" },
      { 'text': '书', "link": "/pages/list/list" },
      { 'text': '中老年', "link": "/pages/list/list" }
    ],
    activeNav: 0,//默认选中
    opentype: "redirect", ////跳转类型
    /**nav隐藏显示块data**/
    navTaggle: true,
    /**listdata**/
    listdata: [],
    /**列表的tag**/
    urlval:'',
    /**listdata**/
    pageindex:1,
    /**返回顶部**/
    backTopValue: false
  },
  
  /**nav右侧点击事件**/
  dropDownClick: function () {
    let that = this;
    that.setData({
      navTaggle: !that.data.navTaggle,
    })
  },

  /**每一个商品的点击事件**/
  list_itemId_click:function(e){
    var itemIdval = e.currentTarget.dataset.itemid;
    wx.navigateTo({ url: "/pages/topic/topic?itemIdval="+itemIdval+""})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //参数index
    var urlid = options.urlid;
    if (urlid == undefined) {
      urlid = 0;
    }

    if (options.urlval == undefined) {
      that.setData({
        urlval: "新"
      })
    }else{
      that.setData({
        urlval: options.urlval
      })
    }

    //设置页面title
    wx.setNavigationBarTitle({
      title: that.data.urlval + '列表'
    })

    /*nav、active*/
    that.setData({
      activeNav: urlid
    })

    wx.request({
      url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=' + that.data.urlval + '&pid=null&pageNum=' + that.data.pageindex+'&pageSize=16',
      method:'get',
      success:function(res){
        that.setData({
          listdata: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    that.setData({
      pageindex: that.data.pageindex + 1,
    })
    wx.request({
      url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=' + that.data.urlval + '&pid=null&pageNum=' + that.data.pageindex + '&pageSize=16',
      method: 'get',
      success: function (res) {
        if (res.data.data != undefined || res.data.data != "") {
          // 回调函数
          const oldData = that.data.listdata;
          that.setData({
            listdata: oldData.concat(res.data.data)
          })
          // 隐藏加载框
          wx.hideLoading();
        } else {
          wx.showModal({
            title: '提示',
            content: '没有更多内容啦！'
          })
          // 隐藏加载框
          wx.hideLoading();
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '',
      path: '',
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 监听滚动条坐标
  onPageScroll: function (e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 800 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },
  // 滚动到顶部
  backTop: function () {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})