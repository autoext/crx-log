# crx log
> 通用 crx 埋点上报

# Install
> npm i --save git+ssh://git@gitee.com:g8up/crx-log.git#v1.6.0

# Usage
```js
import CrxLog from 'crx-log';

const crxLog = new CrxLog({
  resourceId: 'xxx',
  form: {
    // ...
  },
});

// 报活1次
crxLog.active({
  // key: val
});
```
- [form 字段提取](https://gitee.com/g8up/crx-log/wikis/%E4%BA%91%E5%87%A4%E8%9D%B6?sort_id=2220325)

# 常用字段(form)
| 字段名 | 描述 |
|---|---|
| name | crx 名称 |
| version | crx 版本 |
| appId | crx ID |
| type | 事件类型 |
| v | SDK 版本 |