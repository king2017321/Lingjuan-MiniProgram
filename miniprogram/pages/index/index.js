//index.js
const app = getApp()
Page({
  data: {
    /**搜索框val**/
    inputValue: '',
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
    opentype: "navigate", //跳转类型
    /**banner轮播图数据**/
    bannenrImg: [
      { 'image': 'https://z11.tuanimg.com/imagev2/wxyy/750x286.80fef6fd1c5e789fa261983461d2fe7a.jpg', "link": "/pages/list/list",'text':'妈妈'},
      { 'image': 'https://z11.tuanimg.com/imagev2/wxyy/750x286.1402f98194acd462b681a4342cb5d129.jpg', "link": "/pages/list/list",'text': '9.9'},
      { 'image': 'https://z11.tuanimg.com/imagev2/wxyy/750x286.112e3319797eb80c49abc3e22b4d0e6e.jpg', "link": "/pages/list/list",'text': '女'}
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 400,
    t1scaleX:0.5,
    /**nav隐藏显示块data**/
    navTaggle:true,
    /**横向列表数据**/
    djdzllist: [],
    /**纵向列表数据**/
    newtblist:[],
    /**独家优惠券列表pageindex**/
    pageindex:1,
    /**返回顶部**/
    backTopValue: false
  },
  /**************事件开始************/
  /**搜索点击事件**/
  inputBind: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  query:function (){
    let that = this;
    if (that.data.inputValue!=''){
      wx.navigateTo({
        url: '/pages/list/list?urlval='+that.data.inputValue+''
      })
    }else{
      wx.showModal({
        title: '提醒',
        content: '您没有输入任何商品！',
      })
    }
  },

  /**nav右侧点击事件**/
  dropDownClick: function () {
    let that = this;
    that.setData({
      navTaggle: !that.data.navTaggle,
    })
  },
  /**滚动条动态**/
  scrollTouChend:function(e){
    //创建节点选择器
      let query = wx.createSelectorQuery();
      let that = this;
      query.select('.page-nav-swiper').boundingClientRect(function (rect) {
        let scroleft = e.detail.scrollLeft;
        let scroheight = e.detail.scrollWidth;
        if (scroleft + rect.width + 10 >= scroheight) {
          that.setData({
           t1scaleX: 1,
          })
        }else{
          that.setData({
            t1scaleX: 0.5,
          })
        }
      }).exec();  
  },

  /**纵向商品列表clickfunc**/
  bindthelist:function(e){
    var itemIdval = e.currentTarget.dataset.itemid;
    wx.navigateTo({ url: "/pages/topic/topic?itemIdval=" + itemIdval + "" })
  },

 /**底部导航链接**/
  cms_wap_home_down:function(){
    wx.navigateTo({ url: "/pages/index/index?id=1&imgUrl=wooow"})
  },
  cms_wap_nine_down: function () {
    wx.navigateTo({ url: "/pages/list/list?urlval=9.9" })
  },
  cms_wap_classify_down: function () {
    wx.navigateTo({ url: "/pages/list/list?id=3" })
  },
  cms_wap_favorite_down: function () {
    wx.navigateTo({ url: "/pages/mine/mine" })
  },
  cms_wap_mine_down: function () {
    wx.navigateTo({ url: "/pages/mine/mine" })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options) //获取url参数
    let that = this;
    /**大家都在领data**/
    wx.request({
      url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=领&pid=null&pageNum=1&pageSize=12',
      method: 'get',
      success: function (res) {
        that.setData({
          djdzllist: res.data.data
        })
      }
    })

    /**独家优惠券data**/
    wx.request({
      url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=%E7%8B%AC%E5%AE%B6&pid=null&pageNum=' + that.data.pageindex+'&pageSize=16',
      method: 'get',
      success: function (res) {
        that.setData({
          newtblist: res.data.data
        })
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
  
  /**
   *下拉刷新
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=新款&pid=null&pageNum=1&pageSize=12',
      method: 'get',
      success: function (res) {
        that.setData({
          djdzllist: res.data.data
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
    
  },
   /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom:function(){
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
      url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=%E7%8B%AC%E5%AE%B6&pid=null&pageNum=' + that.data.pageindex+'&pageSize=10',
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        if (res.data.data != undefined || res.data.data != ""){
        // 回调函数
        const oldData = that.data.newtblist;
        that.setData({
          newtblist: oldData.concat(res.data.data)
        })
        // 隐藏加载框
        wx.hideLoading();
        }else{
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

