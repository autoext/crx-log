/**
 * CRX 埋点上报
 */
interface IForm {
    [key: string]: string;
}
interface IReportData {
    /** 云凤蝶资源 ID */
    resourceId: string;
    form: IForm;
}
/** 报活 */
export declare const report: ({ form, resourceId }: IReportData) => void;
declare class CrxLog {
    resourceId: string;
    form: IForm;
    constructor(form: IForm, resourceId: string);
    /** 报活，只上报一次 */
    active(): void;
    /** 上报 */
    report(): void;
}
export default CrxLog;
