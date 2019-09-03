---
title: Getting Started with TensorFlow 3 mnist
date: 2019-06-06 17:32:14
tags: [TensorFlow, machine learning, book, mnist]
---

```shell
#              https://github.com/tensorflow/tensorflow/blob/r0.7/tensorflow/examples/tutorials/mnist/input_data.py
cd ~/workspaceBook/ml/getting-started-with-tensorflow/Getting-Started-with-TensorFlow/Chapter\ 3 && \
wget https://raw.githubusercontent.com/tensorflow/tensorflow/r0.7/tensorflow/examples/tutorials/mnist/input_data.py

# http://yann.lecun.com/exdb/mnist/
mkdir -p ~/workspaceBook/ml/getting-started-with-tensorflow/Getting-Started-with-TensorFlow/Chapter\ 3/MNIST_data && \
cd       ~/workspaceBook/ml/getting-started-with-tensorflow/Getting-Started-with-TensorFlow/Chapter\ 3/MNIST_data

aria2c -x16 "http://yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz" && \
aria2c -x16 "http://yann.lecun.com/exdb/mnist/train-labels-idx1-ubyte.gz" && \
aria2c -x16 "http://yann.lecun.com/exdb/mnist/t10k-images-idx3-ubyte.gz" && \
aria2c -x16 "http://yann.lecun.com/exdb/mnist/t10k-labels-idx1-ubyte.gz"
```

<!--more-->

Mnist.py

```python
import input_data
import matplotlib.pyplot as plt
import numpy as np

# Using input_data we load the data sets :
mnist_images = input_data.read_data_sets("MNIST_data/", one_hot=False)

# train.next_batch(10) returns the first 10 images :
pixels, real_values = mnist_images.train.next_batch(10)

# it also returns two lists, the matrix of the pixels loaded,
# and the list that contains the real values loaded :
print("list of values loaded ", real_values)
example_to_visualize = 5
print("element " + str(example_to_visualize + 1) + " of the list plotted")

image = pixels[example_to_visualize, :]
print("image info", type(image), image.shape)
image = np.reshape(image, [28, 28])
plt.imshow(image)
plt.show()
```



KNN.py

```python
import input_data
import numpy as np
import tensorflow as tf

# Build the Training Set
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

train_pixels, train_list_values = mnist.train.next_batch(100)
test_pixels, test_list_of_values = mnist.test.next_batch(10)

train_pixel_tensor = tf.placeholder("float", [None, 784])
test_pixel_tensor = tf.placeholder("float", [784])

# Cost Function and distance optimization
distance = tf.reduce_sum(tf.abs(tf.add(train_pixel_tensor, tf.negative(test_pixel_tensor))), reduction_indices=1)

pred = tf.arg_min(distance, 0)

# Testing and algorithm evaluation
accuracy = 0.
init = tf.initialize_all_variables()
with tf.Session() as sess:
    sess.run(init)
    for i in range(len(test_list_of_values)):
        nn_index = sess.run(pred, feed_dict={train_pixel_tensor: train_pixels,
                                             test_pixel_tensor: test_pixels[i, :]})
        print("Test ", i,
              "Predicted Class: ", np.argmax(train_list_values[nn_index]),
              "True Class: ", np.argmax(test_list_of_values[i]))
        if np.argmax(train_list_values[nn_index]) == np.argmax(test_list_of_values[i]):
            accuracy += 1. / len(test_pixels)
    print("Result = ", accuracy)

```
