---
title: es6 class this is undefined
date: 2017-05-09 11:40:41
tags: [es6, class, js, javascript]
---

先看一段会报错的代码

```
'use strict';

class Parent {
  constructor(options) {
    this.name = options.name;
  }

  saySomething(something) {
    console.log(`Parent: ${this.name} say ${something}`)
  }
}

class Child extends Parent {
  constructor(options) {
    super(options);
  }

  saySomething(something) {
    const self_this = this;
    let super_saySomething = super.saySomething;
    // 在实际业务中，后面的代码是异步的，所以这里先把 this 和 super.saySomething 先保存起来
    super_saySomething(something);
    console.log(`Child: ${self_this.name} say ${something}`)
  }
}

let child = new Child({ name: 'fred' })
child.saySomething('hello')
```

<!--more-->


运行程序

`node testClass.js`

查看结果

```
/Users/Fred/Desktop/nodetest/testClass.js:78
    console.log(`Parent: ${this.name} say ${something}`)
                               ^

TypeError: Cannot read property 'name' of undefined
    at saySomething (/Users/Fred/Desktop/nodetest/testClass.js:78:32)
    at Child.saySomething (/Users/Fred/Desktop/nodetest/testClass.js:91:5)
    at Object.<anonymous> (/Users/Fred/Desktop/nodetest/testClass.js:98:7)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Module.runMain (module.js:575:10)
    at run (node.js:348:7)
```


修改代码

```
'use strict';

class Parent {
  constructor(options) {
    this.name = options.name;
  }

  saySomething(something) {
    console.log(`Parent: ${this.name} say ${something}`)
  }
}

class Child extends Parent {
  constructor(options) {
    super(options);
  }

  saySomething(something) {
    const self_this = this;
    let super_saySomething = super.saySomething;
    // 在实际业务中，后面的代码是异步的，所以这里先把 this 和 super.saySomething 先保存起来
    super.saySomething(something);
    console.log(`Child: ${self_this.name} say ${something}`)
  }
}

let child = new Child({ name: 'fred' })
child.saySomething('hello')
```

运行程序

`node testClass.js`

查看结果

```
Parent: fred say hello
Child: fred say hello
```

这样是可以的


根据 <http://www.cnblogs.com/rainman/archive/2009/05/03/1448392.html>

* 首先分析 this 所在的函数是当做哪个对象的方法调用的，则该对象就是 this 所引用的对象
* `super.saySomething(something);` super 在调用，所以 this 为 super
* `super_saySomething(something);` 没有谁在调用，所欲 this 为 undefined



或者使用 `call` 和 `apply`

```
'use strict';

class Parent {
  constructor(options) {
    this.name = options.name;
  }

  saySomething(something) {
    console.log(`Parent: ${this.name} say ${something}`)
  }
}

class Child extends Parent {
  constructor(options) {
    super(options);
  }

  saySomething(something) {
    const self_this = this;
    let super_saySomething = super.saySomething;
    // 在实际业务中，后面的代码是异步的，所以这里先把 this 和 super.saySomething 先保存起来
    // super.saySomething(something);
    // super_saySomething(something);
    // super_saySomething.call(self_this, something)
    // super_saySomething.apply(self_this, [something])
    console.log(`Child: ${self_this.name} say ${something}`)
  }
}

let child = new Child({ name: 'fred' })
child.saySomething('hello')
```




