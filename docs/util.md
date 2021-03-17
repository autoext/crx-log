```js
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

const version = process.env.VERSION;

const once = (task: () => void) => {
  const KEY = `reported${version}`;
  const isReported = localStorage.getItem(KEY);

  if (isReported !== '1' && task) {
    task();
    localStorage.setItem(KEY, '1');
  }
};

```