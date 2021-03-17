import Log, { IBaseConfig } from './base';
declare class CrxLog<ICustomCommonPayload, IRespData> extends Log<ICustomCommonPayload, IRespData> {
    constructor({ urlPrefix, httpUtil, commonPayload }: Pick<IBaseConfig<ICustomCommonPayload, IRespData>, 'httpUtil' | 'commonPayload'> & {
        urlPrefix?: string;
    });
}
export default CrxLog;
