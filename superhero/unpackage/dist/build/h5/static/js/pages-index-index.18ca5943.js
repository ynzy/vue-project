(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0de7":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page-block super-hot"},[i("v-uni-view",{staticClass:"hot-title-warpper"},[i("v-uni-image",{staticClass:"hot-ico",attrs:{src:e.icon}}),i("v-uni-view",{staticClass:"hot-title"},[e._v(e._s(e.title))])],1)],1)},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},"1b6f":function(e,t,i){"use strict";i.r(t);var a=i("6af7"),n=i("489b");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("e6c9");var o=i("2877"),r=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"6142bb96",null);t["default"]=r.exports},3458:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"titleBar",props:{title:"",icon:""},data:function(){return{}}};t.default=a},3565:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=s(i("1b6f")),n=s(i("ccfb"));function s(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{meuntitle:[{title:"热门超英",icon:"../../static/icos/hot.png"},{title:"热门预告",icon:"../../static/icos/interest.png"},{title:"猜你喜欢",icon:"../../static/icos/guess-u-like.png"}],carouselList:[],hotSuperheroList:[],hotTrailerList:[],guessULikeList:[],animationData:{},animationDataArr:[{},{},{},{},{}]}},onUnload:function(){this.animationData={},this.animationDataArr=[{},{},{},{},{}]},onPullDownRefresh:function(){this.refresh()},onHide:function(){this.videoContext&&this.videoContext.pause()},onLoad:function(){var e=this,t=this.serverUrl;uni.request({url:t+"/index/carousel/list",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{qq:"466481615"},success:function(t){if(200==t.data.status){var i=t.data.data;e.carouselList=i}}}),uni.request({url:t+"/index/movie/hot",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{type:"superhero",qq:"466481615"},success:function(t){if(200==t.data.status){var i=t.data.data;e.hotTrailerList=i}}}),uni.request({url:t+"/index/movie/hot",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{type:"trailer",qq:"466481615"},success:function(t){if(200==t.data.status){var i=t.data.data;e.hotSuperheroList=i}}}),this.refresh()},methods:{meIsPlaying:function(e){var t=this,i="";e&&(i=e.currentTarget.dataset.playingindex,t.videoContext=uni.createVideoContext(i));for(var a=t.hotTrailerList,n=0;n<a.length;n++){var s=a[n].id;s!=i&&uni.createVideoContext(s).pause()}},refresh:function(){var e=this;uni.showLoading({title:"加载中...",mask:!0});var t=this.serverUrl;uni.request({url:t+"/index/guessULike",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{qq:"466481615"},success:function(t){if(200==t.data.status){var i=t.data.data;e.guessULikeList=i}},complete:function(){uni.hideLoading(),uni.stopPullDownRefresh()}})},praiseMe:function(e){}},components:{trailerStars:a.default,titleBar:n.default}};t.default=o},"489b":function(e,t,i){"use strict";i.r(t);var a=i("7b70"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a},"510a":function(e,t,i){var a=i("5d5e");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("7a76f873",a,!0,{sourceMap:!1,shadowMode:!1})},"5d5e":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".movie-score-warpper[data-v-6142bb96]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.movie-score-warpper .start-ico[data-v-6142bb96]{width:%?20?%;height:%?20?%;margin-top:%?6?%}.movie-score-warpper .movie-score[data-v-6142bb96]{font-size:12px;color:grey;margin-left:%?8?%}",""])},"6af7":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticClass:"movie-score-warpper"},[e._l(e.yelloScore,function(e,t){return i("v-uni-image",{key:t,staticClass:"start-ico",attrs:{src:"../../static/icos/star-yellow.png"}})}),e._l(e.grayScore,function(e,t){return i("v-uni-image",{key:t,staticClass:"start-ico",attrs:{src:"../../static/icos/star-gray.png"}})}),1==e.showNum?i("v-uni-view",{staticClass:"movie-score"},[e._v(e._s(e.innerScore))]):e._e()],2)],1)},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},"7b70":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"trailerStars",props:{myval:{type:String},innerScore:0,showNum:0},data:function(){return{yelloScore:0,grayScore:5}},created:function(){var e=0;null!=this.innerScore&&void 0!=this.innerScore&&""!=this.innerScore&&(e=this.innerScore);var t=parseInt(e/2),i=5-t;this.yelloScore=t,this.grayScore=i}};t.default=a},"8cc7":function(e,t,i){var a=i("edad");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("49b17572",a,!0,{sourceMap:!1,shadowMode:!1})},9184:function(e,t,i){"use strict";var a=i("e59f"),n=i.n(a);n.a},"91f6":function(e,t,i){"use strict";i.r(t);var a=i("f912"),n=i("a6ef");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("d72c");var o=i("2877"),r=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"556d7ac9",null);t["default"]=r.exports},a6ef:function(e,t,i){"use strict";i.r(t);var a=i("3565"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a},ccfb:function(e,t,i){"use strict";i.r(t);var a=i("0de7"),n=i("f07b");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("9184");var o=i("2877"),r=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"073c7032",null);t["default"]=r.exports},cf75:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".super-hot[data-v-073c7032]{margin-top:%?12?%;padding:%?12?%}.super-hot .hot-title-warpper[data-v-073c7032]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.super-hot .hot-title-warpper .hot-ico[data-v-073c7032]{width:%?30?%;height:%?30?%;margin-top:%?15?%}.super-hot .hot-title-warpper .hot-title[data-v-073c7032]{font-size:20px;margin-left:%?20?%;font-weight:500}",""])},d72c:function(e,t,i){"use strict";var a=i("8cc7"),n=i.n(a);n.a},e59f:function(e,t,i){var a=i("cf75");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("4c16c7f4",a,!0,{sourceMap:!1,shadowMode:!1})},e6c9:function(e,t,i){"use strict";var a=i("510a"),n=i.n(a);n.a},edad:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".ellipsis-1[data-v-556d7ac9]{overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}.carousel[data-v-556d7ac9]{width:100%;height:%?440?%}\n/* 热门超英 start */.hot[data-v-556d7ac9]{width:100%;white-space:nowrap}.single-poster[data-v-556d7ac9]{display:inline-block;margin-left:%?20?%}.single-poster .poster-warpper[data-v-556d7ac9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.single-poster .poster-warpper .movie-name[data-v-556d7ac9]{width:%?200?%;margin-top:%?10?%;font-size:14px;font-weight:700;\n  /* name超出则省略 */overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}\n/* 热门超英 end */\n/* 热门预告 start */.hot-movies[data-v-556d7ac9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:0 %?20?% %?20?% %?20?%}.hot-movies .hot-movie-single[data-v-556d7ac9]{width:%?350?%;height:%?220?%;margin-top:%?10?%}\n/* 热门预告 end */\n/* 猜你喜欢 start */.guess-u-like[data-v-556d7ac9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.guess-u-like .single-like-movie[data-v-556d7ac9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:%?30?% %?20?%}.guess-u-like .single-like-movie .like-movie[data-v-556d7ac9]{width:%?180?%;height:%?240?%;border-radius:3%}.guess-u-like .single-like-movie .movie-desc[data-v-556d7ac9]{width:%?340?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.guess-u-like .single-like-movie .movie-desc .movie-title[data-v-556d7ac9]{overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}.guess-u-like .single-like-movie .movie-desc .movie-info[data-v-556d7ac9]{color:grey;font-size:14px}.guess-u-like .single-like-movie .movie-oper[data-v-556d7ac9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:%?140?%;border-left:dashed 2px #edece8}.guess-u-like .single-like-movie .movie-oper .praise-ico[data-v-556d7ac9]{width:%?40?%;height:%?40?%;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.guess-u-like .single-like-movie .movie-oper .praise-me[data-v-556d7ac9]{font-size:14px;color:#febc32;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.animation-opacity[data-v-556d7ac9]{font-weight:700;opacity:0}\n/* 猜你喜欢 end */",""])},f07b:function(e,t,i){"use strict";i.r(t);var a=i("3458"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a},f912:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page"},[i("v-uni-swiper",{staticClass:"carousel",attrs:{"indicator-dots":!0,autoplay:!0,interval:3e3,duration:1e3}},e._l(e.carouselList,function(e){return i("v-uni-swiper-item",{key:e.id},[i("v-uni-navigator",{attrs:{"open-type":"navigate",url:"../movie/movie?trailerId="+e.movieId}},[i("v-uni-image",{staticClass:"carousel",attrs:{src:e.image}})],1)],1)}),1),i("titleBar",{attrs:{title:e.meuntitle[0].title,icon:e.meuntitle[0].icon}}),i("v-uni-scroll-view",{staticClass:"page-block hot",attrs:{"scroll-x":"true"}},e._l(e.hotSuperheroList,function(t){return i("v-uni-view",{key:t.id,staticClass:"single-poster"},[i("v-uni-view",{staticClass:"poster-warpper"},[i("v-uni-navigator",{attrs:{"open-type":"navigate",url:"../movie/movie?trailerId="+t.id}},[i("v-uni-image",{staticClass:"poster",attrs:{src:t.cover}})],1),i("v-uni-view",{staticClass:"movie-name"},[e._v(e._s(t.name))]),i("trailerStars",{attrs:{innerScore:t.score,showNum:1}})],1)],1)}),1),i("titleBar",{attrs:{title:e.meuntitle[1].title,icon:e.meuntitle[1].icon}}),i("v-uni-view",{staticClass:"hot-movies page-block"},e._l(e.hotTrailerList,function(t){return i("v-uni-video",{key:t.id,staticClass:"hot-movie-single",attrs:{id:t.id,"data-playingIndex":t.id,src:t.trailer,poster:t.poster,controls:""},on:{play:function(t){t=e.$handleEvent(t),e.meIsPlaying(t)}}})}),1),i("titleBar",{attrs:{title:e.meuntitle[2].title,icon:e.meuntitle[2].icon}}),i("v-uni-view",{staticClass:"guess-u-like page-block"},e._l(e.guessULikeList,function(t,a){return i("v-uni-view",{key:t.id,staticClass:"single-like-movie"},[i("v-uni-navigator",{attrs:{"open-type":"navigate",url:"../movie/movie?trailerId="+t.id}},[i("v-uni-image",{staticClass:"like-movie",attrs:{src:t.cover}})],1),i("v-uni-view",{staticClass:"movie-desc"},[i("v-uni-view",{staticClass:"movie-title"},[e._v(e._s(t.name))]),i("trailerStars",{attrs:{innerScore:t.score,showNum:0}}),i("v-uni-view",{staticClass:"movie-info"},[e._v(e._s(t.basicInfo))]),i("v-uni-view",{staticClass:"movie-info"},[e._v(e._s(t.releaseDate))])],1),i("v-uni-view",{staticClass:"movie-oper",attrs:{"data-gIndex":a},on:{click:function(t){t=e.$handleEvent(t),e.praiseMe(t)}}},[i("v-uni-image",{staticClass:"praise-ico",attrs:{src:"../../static/icos/praise.png"}}),i("v-uni-view",{staticClass:"praise-me"},[e._v("点赞")]),i("v-uni-view",{staticClass:"praise-me animation-opacity",attrs:{animation:e.animationDataArr[a]}},[e._v("+1")])],1)],1)}),1)],1)},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})}}]);