window.actionStack = []; // 用户行为记录

export const startWatching = () => {
  console.log('************监控函数开始运行******************')
  window.onerror = (message, source, lineno, colno, error) => {
    const errorInfo = {
      breadcrumbs: window.actionStack.slice(-20),
      stacktrace: error.stack,
      lineNumber: lineno,
      columnNumber: colno,
      fileName: source,
      message: message,
      userAgent: window.navigator.userAgent
    };

    // console.log(`🤖🤝👽 ~ file: watch.js ~ line 7 ~ startWatching ~ errorInfo`, errorInfo);
  }
  // 重写 onclick 函数
  window.onclick = (event) => {
    const res = {
      type: 'click',
      page: {
        url: window.location.href,
        title: document.title
      },
      detail: {
        outerHtml: event.target.outerHTML,
        tagName: event.target.tagName,
      },
      time: Date.now()
    };
    for (let item of event.target.attributes) {
      res.detail[item.name] = item.value;
    }
    window.actionStack.push(res)
  };

  // 重写 console 函数
  for (const key in console) {
    const cc = console[key];
    console[key] = (...args) => {
      cc.call(this, ...args);
      window.actionStack.push({
        type: 'console',
        time: Date.now(),
        detail: {
          level: key,
          arguments: args,
        },
        page: {
          url: window.location.href,
          title: document.title
        },
      })
    }
  }

  // 重写 fetch 请求
  const oldFetch = window.fetch;
  window.fetch = (input, opts = {}) => {
    return new Promise((resolve, reject) => {
      const info = {
        type: 'fetch',
        page: {
          url: window.location.href,
          title: document.title
        },
        time: Date.now()
      }
      oldFetch(input, opts)
        .then((res) => {
          info.detail = {
            method: opts.method ?? 'GET',
            url: res.url,
            status: res.status,
            statusText: res.statusText
          };
          window.actionStack.push(info);
          resolve(res);
        })
        .catch(error => {
          info.detail = {
            method: opts.method ?? 'GET',
            url: error.url,
            status: error.status,
            statusText: error.statusText
          };
          window.actionStack.push(info);
          reject(error);
        })
    });
  };
};