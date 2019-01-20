'use strict';
var utils = require('./../utils');
var settle = require('./../core/settle');

module.exports = function wechatAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var url = config.url;
    var requestHeaders = {};

    utils.forEach(config.headers, function setRequestHeaders(value, key) {
      if (key.toLowerCase() === 'referer') {
        throw new Error('Can not set referer to header');
      }
      requestHeaders[key] = value;
    });

    wx.request({
      url: url,
      header: requestHeaders,
      method: config.method,
      data: config.data,
      success: function success(response) {
        settle(resolve, reject, {
          headers: response.header,
          data: response.data,
          status: response.statusCode,
          config: config
        });
      }
    });
  });
};
