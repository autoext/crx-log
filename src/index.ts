/**
 * CRX 埋点上报
 */

import { url } from './config';

/** 支持上报的的事件类型 */
enum EventType {
  /** 报活 */
  ACTIVE = 'active',
  /** 事件 */
  CLICK = 'click',
  /** 页面展现 */
  PV = 'pv',
};

interface iCrxInfo {
  /** 名称 */
  name: String,
  /** 版本 */
  version: String,
  /** 日期 */
  date: String,
  /** 事件类型 */
  type: EventType,
  /** 次数 */
  count: String | number,
  /** 浏览器UA */
  UA: String,
  /** 来源 */
  referrer: String,
};

const report = (crxInfo: iCrxInfo) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(crxInfo),
  }).catch(err => {
    console.log(`Crx-Report:${err}`);
  });
};

/**
 * 获取 crx manifest 信息
 */
const getAppInfo = () => {
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