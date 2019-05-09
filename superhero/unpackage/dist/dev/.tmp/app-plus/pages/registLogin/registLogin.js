(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/registLogin/registLogin"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {};
  },
  methods: {
    appOAuthLogin: function appOAuthLogin(e) {
      var me = this;
      // 获取用户的登录类型
      var logintype = e.currentTarget.dataset.logintype;

      // 授权登录
      uni.login({
        provider: logintype,
        success: function success(loginRes) {
          // 授权登录成功以后，获取用户的信息
          uni.getUserInfo({
            provider: logintype,
            success: function success(info) {
              // console.log(JSON.stringify(info));

              var userInfo = info.userInfo;
              var face = '';
              var nickname = '';
              var openIdOrUid = '';
              if (logintype == 'weixin') {
                face = userInfo.avatarUrl;
                nickname = userInfo.nickName;
                openIdOrUid = userInfo.openId;
              } else if (logintype == 'qq') {
                openIdOrUid = userInfo.openId;
                nickname = userInfo.nickname;
                face = userInfo.figureurl_qq_2;
              } else if (logintype == 'sinaweibo') {
                openIdOrUid = userInfo.id;
                nickname = userInfo.nickname;
                face = userInfo.avatar_large;
              }

              // 调用开发者后台，执行一键注册或登录
              uni.request({
                url: me.serverUrl + '/appUnionLogin/' + logintype + '?qq=466481615',
                data: {
                  openIdOrUid: openIdOrUid,
                  nickname: nickname,
                  face: face },

                method: 'POST',
                success: function success(result) {
                  if (result.data.status == 200) {
                    var userInfo = result.data.data;
                    // 保存用户信息到全局的缓存中
                    uni.setStorageSync('globalUser', userInfo);
                    // 切换页面跳转，使用tab切换的api
                    uni.switchTab({
                      url: '../me/me' });

                  } else if (userResult.data.status == 500) {
                    uni.showModal({
                      title: '提示',
                      content: userResult.data.message,
                      success: function success(res) {
                        if (res.confirm) {
                          // console.log('用户点击确定');
                        } else if (res.cancel) {
                          // console.log('用户点击取消');
                        }
                      } });

                  }
                } });

            } });

        } });

    },
    // 实现在微信小程序端的微信登录
    wxLogin: function wxLogin(e) {
      var me = this;
      console.log(e, " at pages\\registLogin\\registLogin.vue:126");
      // 通过微信开发能力，获得微信用户的基本信息
      var userInfo = e.detail.userInfo;

      // 实现微信登录
      uni.login({
        provider: 'weixin',
        success: function success(loginResult) {
          // console.log(loginResult);
          // 获得微信登录的code：授权码
          var code = loginResult.code;
          // 设置登录到哪个对于的微信小程序，大家可以根据自己的后端去实现业务参数
          // [0:NEXT超英预告][1:超英预告][2:NEXT学院电影预告]
          var loginToWhichMP = 1;
          uni.request({
            url: me.serverUrl + '/mpWXLogin/' + code + '?qq=466481615',
            header: {
              'content-type': 'application/json;charset=utf-8' },

            data: {
              avatarUrl: userInfo.avatarUrl,
              nickName: userInfo.nickName,
              whichMP: loginToWhichMP },

            method: 'POST',
            success: function success(userResult) {
              console.log(userResult, " at pages\\registLogin\\registLogin.vue:152");
              if (userResult.data.status == 200) {
                var userInfo = userResult.data.data;
                // 保存用户信息到全局的缓存中
                uni.setStorageSync('globalUser', userInfo);
                // 切换页面跳转，使用tab切换的api
                uni.switchTab({
                  url: '../me/me' });

              } else if (userResult.data.status == 500) {
                uni.showModal({
                  title: '提示',
                  content: userResult.data.message,
                  success: function success(res) {
                    if (res.confirm) {
                      // console.log('用户点击确定');
                    } else if (res.cancel) {
                      // console.log('用户点击取消');
                    }
                  } });

              }
            } });

        } });

    },
    formSubmit: function formSubmit(e) {
      var me = this;
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      // console.log(username)
      // console.log(password)

      uni.showLoading({
        title: '加载中...',
        mask: true });

      uni.showNavigationBarLoading();

      var serverUrl = this.serverUrl;
      // 猜你喜欢
      uni.request({
        url: serverUrl + '/user/registOrLogin?qq=466481615',
        method: 'POST',
        header: {
          'content-type': 'application/json;charset=utf-8' },

        data: {
          username: username,
          password: password },

        success: function success(res) {
          console.log(res.data, " at pages\\registLogin\\registLogin.vue:205");
          // 获取真实数据之前，务必判断状态是否为200
          if (res.data.status == 200) {
            var userInfo = res.data.data;
            // console.log(userInfo)
            //保存用户信息到全局的缓存中
            uni.setStorageSync('globalUser', userInfo);
            //tabBar页面跳转
            uni.switchTab({
              url: '../me/me' });

          } else if (res.data.status == 500) {
            // uni.showToast({
            // 	title: res.data.msg,
            // 	duration: 2000,
            // 	image: "../../static/icos/error.png"
            // })
            uni.showModal({
              title: '提示',
              content: res.data.msg,
              success: function success(res) {
                if (res.confirm) {
                  // console.log('用户点击确定');
                } else if (res.cancel) {
                  // console.log('用户点击取消');
                }
              } });

          }
        },
        complete: function complete() {
          uni.hideNavigationBarLoading();
          uni.hideLoading();
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=style&index=0&lang=less&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue?vue&type=style&index=0&lang=less& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=template&id=443193f5&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue?vue&type=template&id=443193f5& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue":
/*!*****************************************************************************!*\
  !*** G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registLogin_vue_vue_type_template_id_443193f5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registLogin.vue?vue&type=template&id=443193f5& */ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=template&id=443193f5&");
/* harmony import */ var _registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registLogin.vue?vue&type=script&lang=js& */ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registLogin.vue?vue&type=style&index=0&lang=less& */ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _registLogin_vue_vue_type_template_id_443193f5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _registLogin_vue_vue_type_template_id_443193f5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./registLogin.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************!*\
  !*** G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!./registLogin.vue?vue&type=style&index=0&lang=less& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=template&id=443193f5&":
/*!************************************************************************************************************!*\
  !*** G:/study-code/vue-project/superhero/pages/registLogin/registLogin.vue?vue&type=template&id=443193f5& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_template_id_443193f5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./registLogin.vue?vue&type=template&id=443193f5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!G:\\study-code\\vue-project\\superhero\\pages\\registLogin\\registLogin.vue?vue&type=template&id=443193f5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_template_id_443193f5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_develop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_registLogin_vue_vue_type_template_id_443193f5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["G:\\study-code\\vue-project\\superhero\\main.js?{\"page\":\"pages%2FregistLogin%2FregistLogin\"}","common/runtime","common/vendor"]]]);