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
  name,
  version,
  appId,
  type,
  v,
  UA,
}: IReportData) => {
  const clientId = getClientId();

  fetch("https://qn.yunfengdie.com/api/resource/c0af2511-1a7b-4cdc-b51c-469e3c941a49/answer", {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
    },
    "body": JSON.stringify({
      "id": "c0af2511-1a7b-4cdc-b51c-469e3c941a49",
      "clientId": clientId,
      "env": {
        "version": "x",
        "href": "https://render.yunfengdie.cn/p/q/crx/crx.html"
      },
      "answer": {
        "1": name,
        "2": version,
        "3": appId,
        "4": type,
        "10": v,
        "12": UA,
        "14": clientId,
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
    type: EventType.PV,
    UA: window.navigator.userAgent,
    v: process.env.VERSION, // sdk version
  }, crxInfo));
};

const once = (task: () => void) => {
  const isReported = localStorage.getItem('reported');

  if (isReported !== '1' && task) {
    task();
    localStorage.setItem('reported', '1');
  }
};

once(report);