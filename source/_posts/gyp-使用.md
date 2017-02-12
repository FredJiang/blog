---
title: gyp 使用
date: 2017-02-12 09:37:44
tags: [gyp, make, build]
---

gyp 是 google 为 chromium 项目开发的管理工具，功能类似于 cmake。gyp 只能产生编译脚本，真正的编译工作还有靠其他工具。

<!--more-->

#### gyp 使用 make

目录结构

```
├── build.gyp
└── template_sample.cpp
```

build.gyp 内容

```
{
   'targets':[
        {
            'target_name':'an',
            'type':'executable',
            'dependencies':[],
            'defines':[],
            'include_dirs':[],
            'sources':[
                'template_sample.cpp',
            ],
            'conditions':[]
        }
    ],
}
```

template_sample.cpp 内容

```
#include <iostream>

using namespace std;

template<typename T>
T add(T a, T b){ return a + b; }

int main()
{
     cout<< add<int>(5,6)<<endl;
     cout<< add<double>(3.4,4.0)<<endl;
     return 0;
}
```

`sudo apt-get install gyp`

`gyp --depth=. build.gyp`

```
├── an.target.mk
├── build.gyp
├── build.Makefile
├── Makefile
└── template_sample.cpp
```


`make`

```
├── an.target.mk
├── build.gyp
├── build.Makefile
├── Makefile
├── out
│   └── Default
│       ├── an
│       └── obj.target
│           └── an
│               └── template_sample.o
└── template_sample.cpp
```


```
➜  gyptest ./out/Default/an
11
7.4
```




#### gyp 使用 ninja

`rm -r -f an.target.mk build.Makefile Makefile  out`

```
├── build.gyp
└── template_sample.cpp
```

`sudo apt-get install ninja-build`

`gyp --depth=. --format=ninja build.gyp`

```
├── build.gyp
├── out
│   └── Default
│       ├── build.ninja
│       └── obj
│           └── an.ninja
└── template_sample.cpp
```

`ninja -C out/Default`

```
├── build.gyp
├── out
│   └── Default
│       ├── an
│       ├── build.ninja
│       └── obj
│           ├── an.ninja
│           └── an.template_sample.o
└── template_sample.cpp
```


```
➜  gyptest ./out/Default/an
11
7.4
```


参考 

* <http://blog.csdn.net/plc_jianghao/article/details/51073124>