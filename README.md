# crx log
> 通用 crx 埋点上报

# Install
> npm i --save git+ssh://git@gitee.com:g8up/crx-log.git#v2.0.0

# Usage
```js
import CrxLog from 'crx-log/src';

const crxLog = new CrxLog({
  urlPrifx: 'http://g8up.chromedevtools.com',
  httpUtil: xxx, // 请求工具
  commonPayload: {},
});

// 报活
crxLog.active();

// 卸载
crxLog.uninstall();
```

# 默认上报字段
| 字段名 | 描述 |
|---|---|
| name | crx 名称 |
| version | crx 版本 |
| appId | crx ID |
| type | 上报类型('crx') |
| event | 事件类型('active', 'uninstall') |