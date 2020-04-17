# crx log
> 通用 crx 埋点上报

# Install
> npm i -D git+ssh://git@gitee.com:g8up/crx-log.git#master

# Usage
```js
import crxLog from 'crx-log';

crxLog.report();
```

# Data
| 字段名 | 描述 |
|---|---|
| name | crx 名称 |
| version | crx 版本 |
| appId | crx ID |
| type | 事件类型 |
| v | SDK 版本 |