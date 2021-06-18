/**
 * 埋点上报
 */

/** 支持上报的的事件类型 */
enum EventType {
  /** 报活 */
  ACTIVE = 'active',
  /** 更新 */
  UPDATE = 'update',
  /** 安装 */
  INSTALL = 'install',
  /** 卸载 */
  UNINSTALL = 'uninstall',
  /** 事件 */
  CLICK = 'click',
  /** 页面展现 */
  PV = 'pv',
};

export enum ILogType {
  CRX = 'crx',
  // NODE = 'node',
};

export interface ICrxInfo {
  /** app id */
  appId: string,
  /** 版本 */
  version: string,
  /** 名称 */
  name?: string,
};

interface ICommonPayload extends ICrxInfo {
  /** user agent */
  ua: string;
  /** log type */
  type: ILogType;
}

export interface IPayload {
  event: EventType;
}

// interface IHttpPayload extends ICommonPayload, IPayload { }
type IHttpPayload<ICustomCommonPayload> = ICommonPayload & ICustomCommonPayload;

interface IHttpUtil<ICustomCommonPayload, IRespData> {
  get(url: string, data: IHttpPayload<ICustomCommonPayload>): Promise<IRespData>;
  post(url: string, data: IHttpPayload<ICustomCommonPayload>): Promise<IRespData>;
}

export interface IBaseConfig<ICustomCommonPayload, IRespData> {
  urlPrefix: string;
  httpUtil: IHttpUtil<ICustomCommonPayload, IRespData>;
  commonPayload: ICustomCommonPayload;
};

class Log<ICustomCommonPayload, IRespData> {
  urlPrefix: string;
  commonPayload: ICustomCommonPayload;
  httpUtil: IHttpUtil<ICustomCommonPayload, IRespData>;

  constructor({ urlPrefix, httpUtil, commonPayload }: IBaseConfig<ICustomCommonPayload, IRespData>) {
    this.urlPrefix = urlPrefix;
    this.httpUtil = httpUtil;
    this.commonPayload = commonPayload;
  }

  /** 上报 */
  report(payload: IPayload) {
    const url = `${this.urlPrefix}/log/report`;
    return this.httpUtil.get(url,
      Object.assign({}, this.commonPayload, payload) as unknown as IHttpPayload<ICustomCommonPayload>
    );
  }

  /** 报活 */
  active() {
    return this.report({
      event: EventType.ACTIVE,
    });
  }

  /** 更新 */
  update() {
    return this.report({
      event: EventType.UPDATE,
    });
  }

  /** 安装 */
  install() {
    return this.report({
      event: EventType.INSTALL,
    });
  }

  /** 卸载 */
  uninstall() {
    return this.report({
      event: EventType.UNINSTALL,
    });
  }

}

export default Log;