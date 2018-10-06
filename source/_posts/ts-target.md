---
title: ts target
date: 2018-06-07 11:43:55
tags: [typescript, javascript, commonjs, ES2015]
---

* <https://www.tutorialspoint.com/typescript/typescript_modules.htm>

<!--more-->

{% asset_img "1.png" "" %}

Car.ts

```
export class Car {
    engine: string;

    constructor(engine: string) {
        this.engine = engine;
    }

    disp(): void {
        console.log("Engine is : " + this.engine);
    }
}
```

CarTest.ts

```
import car = require("./Car");

new car.Car("level 1").disp();
```


module 用 `"module": "ES2015"` 的话, 需要用如下命令执行

`node --experimental-modules CarTest.mjs`

