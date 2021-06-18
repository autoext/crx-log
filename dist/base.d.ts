/**
 * 埋点上报
 */
/** 支持上报的的事件类型 */
declare enum EventType {
    /** 报活 */
    ACTIVE = "active",
    /** 更新 */
    UPDATE = "update",
    /** 安装 */
    INSTALL = "install",
    /** 卸载 */
    UNINSTALL = "uninstall",
    /** 事件 */
    CLICK = "click",
    /** 页面展现 */
    PV = "pv"
}
export declare enum ILogType {
    CRX = "crx"
}
export interface ICrxInfo {
    /** app id */
    appId: string;
    /** 版本 */
    version: string;
    /** 名称 */
    name?: string;
}
interface ICommonPayload extends ICrxInfo {
    /** user agent */
    ua: string;
    /** log type */
    type: ILogType;
}
export interface IPayload {
    event: EventType;
}
declare type IHttpPayload<ICustomCommonPayload> = ICommonPayload & ICustomCommonPayload;
interface IHttpUtil<ICustomCommonPayload, IRespData> {
    get(url: string, data: IHttpPayload<ICustomCommonPayload>): Promise<IRespData>;
    post(url: string, data: IHttpPayload<ICustomCommonPayload>): Promise<IRespData>;
}
export interface IBaseConfig<ICustomCommonPayload, IRespData> {
    urlPrefix: string;
    httpUtil: IHttpUtil<ICustomCommonPayload, IRespData>;
    commonPayload: ICustomCommonPayload;
}
declare class Log<ICustomCommonPayload, IRespData> {
    urlPrefix: string;
    commonPayload: ICustomCommonPayload;
    httpUtil: IHttpUtil<ICustomCommonPayload, IRespData>;
    constructor({ urlPrefix, httpUtil, commonPayload }: IBaseConfig<ICustomCommonPayload, IRespData>);
    /** 上报 */
    report(payload: IPayload): Promise<IRespData>;
    /** 报活 */
    active(): Promise<IRespData>;
    /** 更新 */
    update(): Promise<IRespData>;
    /** 安装 */
    install(): Promise<IRespData>;
    /** 卸载 */
    uninstall(): Promise<IRespData>;
}
export default Log;
