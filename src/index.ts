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

interface ICrxInfo {
  /** 名称 */
  name: string,
  /** 版本 */
  version: string,
  /** app id */
  appId: string,
  /** 事件类型 */
  type: EventType,
};

interface IReportData extends ICrxInfo {
  /** 云凤蝶资源 ID */
  resourceId: string;
  /** SDK version */
  v: string;
  /** User Agent */
  UA: string;
};

const getUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = 16 * Math.random() | 0
      , v = "x" === c ? r : 3 & r | 8;
    return v.toString(16);
  });
};

const getClientId = () => {
  let uuid = localStorage.getItem('yfd-uuid');
  if (!uuid) {
    uuid = getUUID();
    localStorage.setItem('yfd-uuid', uuid);
  }
  return uuid;
};

const yunfengdie = ({
  resourceId,
  name,
  version,
  appId,
  type,
  v,
  UA,
}: IReportData) => {
  const clientId = getClientId();

  fetch(`https://qn.yunfengdie.com/api/resource/${resourceId}/answer`, {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
    },
    "body": JSON.stringify({
      "id": resourceId,
      "clientId": clientId,
      "env": {
        "version": "x",
        "href": "https://render.yunfengdie.cn/p/q/crx/v3323.html"
      },
      "answer": {
        "1": name,
        "2": version,
        "3": appId,
        "4": type,
        "6": v,
        "7": UA,
      }
    }),
    "method": "POST",
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
  };
};

/** 报活 */
const report = () => {
  const crxInfo = getAppInfo();
  return yunfengdie((<any>Object).assign({
    resourceId: 'ef242742-4816-4bf2-937c-ad8ec1cc7809',
    type: EventType.PV,
    UA: window.navigator.userAgent,
    v: process.env.VERSION, // sdk version
  }, crxInfo));
};

const once = (task: () => void) => {
  const KEY = `reported${process.env.VERSION}`;
  const isReported = localStorage.getItem(KEY);

  if (isReported !== '1' && task) {
    task();
    localStorage.setItem(KEY, '1');
  }
};

once(report);