import {url} from './config';

// 支持上报的的事件类型
type EventType = 'active' // 报活
  | 'click' // 事件
  | 'pv' // 页面展现
;

interface iCrxInfo {
  name: String, // 名称
  version: String, // 版本
  date: String, // 日期
  type: EventType, // 事件类型
  count: String | number, // 次数
  UA: String, // 浏览器UA
  referrer: String, // 来源
};

const report = (crxInfo: iCrxInfo) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(crxInfo),
  }).catch(err=>{
    console.log( `Crx-Report:${err}` );
  });
};

/**
 * 获取 crx manifest 信息
 */
const getAppInfo = ()=>{
  const {
    name,
    version,
  } = chrome.runtime.getManifest();
  return {
    name,
    version,
  };
};

export default {
  report,
  getAppInfo,
}