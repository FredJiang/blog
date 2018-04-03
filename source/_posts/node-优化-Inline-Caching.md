---
title: node 优化 Inline Caching
date: 2017-11-14 17:58:58
tags: [node.js, optimize]
---


<https://livoris.net/node/65>

> To summarize it, the usual property lookup of a JavaScript object can be naively implemented with a kind of dictionary, like e.g. a hash map. The way it is done in V8 is to store the properties inside the JavaScript object on the heap. The byte offset that is needed to access the property inside the object is stored in map. This map is shared between JavaScript object with similar memory layout and therefore can be considered a hidden class system. After two successful lookups, the call-side of the accessed property is patched at runtime to omit the lookup and instead add the offset to the object pointer and jump directly to the memory address (in case of a method call). This technique is not easy to implement, but it is really effective as can be seen by the benchmark results below.




node --trace-opt-verbose inlineCaching.js