---
title: Getting Started with TensorFlow
date: 2019-05-31 16:43:43
tags: [TensorFlow, machine learning, book]
---

* <https://github.com/arpitjindal97/technology_books/blob/master/Machine-Learning/Getting-Started-with-TensorFlow.pdf>
* <https://github.com/PacktPublishing/Getting-Started-with-TensorFlow>

<!--more-->

download code

```sh
mkdir -p ~/workspaceBook/ml/getting-started-with-tensorflow && \
cd       ~/workspaceBook/ml/getting-started-with-tensorflow && \
git clone https://github.com/PacktPublishing/Getting-Started-with-TensorFlow
```

`~/workspaceBook/ml/getting-started-with-tensorflow/test.py`

```python
import tensorflow as tf
hello = tf.constant("hello TensorFlow!")
with tf.Session() as session:
    print(session.run(hello))
```

run

```sh
cd /home/fred/workspaceBook/ml/getting-started-with-tensorflow
dockertensorflowbash
python test.py
```
