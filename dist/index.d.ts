/**
 * CRX 埋点上报
 */
/** 支持上报的的事件类型 */
declare enum EventType {
    /** 报活 */
    ACTIVE = "active",
    /** 事件 */
    CLICK = "click",
    /** 页面展现 */
    PV = "pv"
}
interface IForm {
    [key: string]: string;
}
export interface IReportData {
    /** 云凤蝶资源 ID */
    resourceId: string;
    form: IForm;
}
/** 报活 */
export declare const report: ({ form, resourceId }: IReportData) => void;
declare class CrxLog {
    resourceId: string;
    form: IForm;
    EventType: typeof EventType;
    constructor({ resourceId, form }: IReportData);
    /** 报活，只上报一次 */
    active(formPartial?: Partial<IForm>): void;
    /** 上报 */
    report(formPartial?: Partial<IForm>): void;
}
export default CrxLog;
