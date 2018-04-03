---
title: javascript 代码检测
date: 2017-09-25 08:13:13
tags: [javascript, eslint, npm-check, node.js]
---


### <https://github.com/eslint/eslint>

```
npm install -g eslint eslint-plugin-react babel-eslint
cd
npm init
npm install eslint
eslint --init
```

<!--more-->

```
find . \
-type f \
-name '*.js' \
! -name '*min.js' \
! -path "*/\.git/*" \
! -path "*/docs/*" \
! -path "*/node_modules/*" \
! -path "*/test/*" \
-exec eslint {} +
```


### <https://github.com/dylang/npm-check>

```
npm install -g npm-check
```

```
find . \
-name '*package.json' \
-type f \
! -path "*/\.git/*" \
! -path "*/docs/*" \
! -path "*/node_modules/*" \
! -path "*/test/*" \
| xargs -I param \
sh -c 'echo "check $(dirname param)\n" && npm-check $(dirname param)'
```



### <https://github.com/beautify-web/js-beautify>

<https://github.com/victorporof/Sublime-HTMLPrettify>


### <https://github.com/standard/standard>

```
npm install standard snazzy -g
```


```
standard --verbose --global g_logger --global g_projectDir app.js | snazzy
```


```
find . \
-type f \
-name '*.js' \
! -name '*min.js' \
! -path "*/\.git/*" \
! -path "*/docs/*" \
! -path "*/node_modules/*" \
! -path "*/test/*" \
| xargs -I param \
sh -c 'echo "param\n" && standard --verbose --global g_logger --global g_projectDir param | grep -v ": Extra semicolon. (semi)" | snazzy'
```


* <https://standardjs.com/awesome.html>
* <https://standardjs.com/rules.html>
* <https://github.com/standard/standard#are-there-text-editor-plugins>

### <https://github.com/standard/eslint-config-standard>

```
npm install -g eslint eslint-plugin-react babel-eslint
cd
npm init
npm install eslint
eslint --init
```

`.eslintrc.js`

```
module.exports = {
  "extends": "standard",
  "globals": {
    "g_logger": true,
    "g_projectDir": true
  },
  "rules": {
    // "camelcase": 0,
    // "semi": [2, "never"]
    // "semi": [2, "always"]
    // disable the rule
    "semi": 0
  }
};
```


### Sublime Text 配置 eslint

* SublimeLinter
* SublimeLinter-eslint
* ESLint-Formatter

Sublime Text -> Prefences -> Package Settings -> SublimeLinter -> Settings-Default or Settings-User

```
        "paths": {
            "linux": [],
            "osx": ["/Users/Fred/.nvm/versions/node/v6.2.2/bin"],
            "windows": []
        },
```

另外可以右键，选择 SublimeLinter 菜单开配置相应的选项

参考 

* <http://jonathancreamer.com/setup-eslint-with-es6-in-sublime-text/>