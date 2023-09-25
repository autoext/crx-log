import { URL_PRIFIX } from './config';
import Log, { ILogType, ICrxInfo, IBaseConfig } from './Log';

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

class CrxLog<ICustomCommonPayload, IRespData> extends Log<ICustomCommonPayload, IRespData> {
  constructor({ urlPrefix, httpUtil, commonPayload }: Pick<IBaseConfig<ICustomCommonPayload, IRespData>, 'httpUtil' | 'commonPayload'> & { urlPrefix?: string }) {

    super({
      urlPrefix: urlPrefix || URL_PRIFIX,
      httpUtil,
      commonPayload: Object.assign({
        ua: window.navigator.userAgent,
        type: ILogType.CRX,
      },
        getAppInfo(),
        commonPayload
      )
    });
  }
}

export default CrxLog;