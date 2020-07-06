/**
 * CRX 埋点上报
 */

// import { URL } from './config';

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
};

// interface IForm extends ICrxInfo {
//   /** 云凤蝶资源 ID */
//   resourceId: string;
//   /** SDK version */
//   v: string;
//   /** User Agent */
//   UA: string;
//   /** 事件类型 */
//   type: EventType,
// }

interface IReportData {
  /** 云凤蝶资源 ID */
  resourceId: string;
  form: any,
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
  form,
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
      "answer": form,
    }),
    "method": "POST",
  });
};

/**
 * 获取 crx manifest 信息
 */
const getAppInfo = (): ICrxInfo => {
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

const {
  name: crxName,
  version,
  appId,
} = getAppInfo();

/** 报活 */
const report = () => {

  const type = EventType.PV;
  const UA = window.navigator.userAgent;
  const v = process.env.VERSION; // sdk version

  return yunfengdie({
    resourceId: 'ef242742-4816-4bf2-937c-ad8ec1cc7809',
    form: {
      "1": crxName,
      "2": version,
      "3": appId,
      "4": type,
      "6": v,
      "7": UA,
    }
  });
};

const once = (task: () => void) => {
  const KEY = `reported${version}`;
  const isReported = localStorage.getItem(KEY);

  if (isReported !== '1' && task) {
    task();
    localStorage.setItem(KEY, '1');
  }
};

once(report);