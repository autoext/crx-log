/**
 * CRX 埋点上报
 */

import { URL } from './config';

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
  name: string,
  /** 版本 */
  version: string,
  /** app id */
  appId: string,
  /** 事件类型 */
  type: EventType,
};

const sendReq = <T>(url: string, data: T) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
    version, // crx version
    appId: chrome.runtime.id,
    v: process.env.VERSION, // sdk version
  };
};

/** 报活 */
const report = (url = URL) => {
  const crxInfo = getAppInfo();
  return sendReq<iCrxInfo>(url, (<any>Object).assign({
    type: EventType.PV,
  }, crxInfo));
};

export default {
  report,
}