---
title: Python Machine Learning Mini-Course
date: 2019-04-11 22:44:16
tags: [python, machine learning]
---

* <https://machinelearningmastery.com/python-machine-learning-mini-course/>

<!--more-->

```shell
sudo -H bash -c "$(which pip) install scikit-learn scipy numpy matplotlib pandas sklearn"
```

version check

```python
# python version
import sys
print('Python: {}'.format(sys.version))
# scipy
import scipy
print('scipy: {}'.format(scipy.__version__))
# numpy
import numpy
print('numpy: {}'.format(numpy.__version__))
# matplotlib
import matplotlib
print('matplotlib: {}'.format(matplotlib.__version__))
# pandas
import pandas
print('pandas: {}'.format(pandas.__version__))
# scikit-learn
import sklearn
print('sklearn: {}'.format(sklearn.__version__))
```

dataframe

```python
import numpy
import pandas
myarray = numpy.array([[1, 2, 3], [4, 5, 6]])
rownames = ['a', 'b']
colnames = ['one', 'two', 'three']
mydataframe = pandas.DataFrame(myarray, index=rownames, columns=colnames)
print(mydataframe)
```

load data

```python
import matplotlib.pyplot as plt
import pandas
from pandas.plotting import scatter_matrix

import pandas
url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
names = ['preg', 'plas', 'pres', 'skin', 'test', 'mass', 'pedi', 'age', 'class']
data = pandas.read_csv(url, names=names)
print(data.shape)

description = data.describe()
print(description)

scatter_matrix(data)
plt.show()
```

iris dataset

* <http://archive.ics.uci.edu/ml/index.php>
* <https://archive.ics.uci.edu/ml/datasets/Iris>

```shell
mkdir -p ${HOME}/workspaceMachineLearning/iris
cd       ${HOME}/workspaceMachineLearning/iris

# https://archive.ics.uci.edu/ml/machine-learning-databases/iris/
wget "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/bezdekIris.data"
wget "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
wget "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.names"

touch iris.py
```

iris.py

```python
import pandas

import matplotlib
matplotlib.use("PS")

from pandas.plotting import scatter_matrix
from matplotlib import pyplot as plt

names = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
data = pandas.read_csv('iris.data', names=names, usecols=[0, 1, 2, 3])

print(data.shape)
print(data.describe())

scatter_matrix(data)
# plt.show()
plt.savefig('iris.png')
```

<https://machinelearningmastery.com/machine-learning-in-python-step-by-step/>

```python
import pandas
from pandas.plotting               import scatter_matrix

import matplotlib
matplotlib.use("PS")
import matplotlib.pyplot as plt

from sklearn                       import model_selection
from sklearn.metrics               import classification_report
from sklearn.metrics               import confusion_matrix
from sklearn.metrics               import accuracy_score
from sklearn.linear_model          import LogisticRegression
from sklearn.tree                  import DecisionTreeClassifier
from sklearn.neighbors             import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes           import GaussianNB
from sklearn.svm                   import SVC

names = ['sepal-length', 'sepal-width', 'petal-length', 'petal-width', 'class']
dataFrame = pandas.read_csv("iris.data", names=names)

# print(dataFrame.shape)
# print(dataFrame.head(20))
# print(dataFrame.describe())
# print(dataFrame.groupby('class').size())

# dataFrame.plot(kind='box',
#                subplots=True,
#                layout=(2, 2),
#                sharex=False,
#                sharey=False)
# plt.savefig('box.png')
# plt.show()

# dataFrame.hist()
# plt.savefig('hist.png')
# plt.show()

# scatter_matrix(dataFrame)
# plt.savefig('scatter_matrix.png')
# plt.show()

# split-out validation dataset
array = dataFrame.values
X = array[:, 0:4]
Y = array[:, 4]
validation_size = 0.20
seed = 7
X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(
    X, Y, test_size=validation_size, random_state=seed)

# print("X_train")
# print(X_train)
# print("X_validation")
# print(X_validation)
# print("Y_train")
# print(Y_train)
# print("Y_validation")
# print(Y_validation)

# spot check algorithms
models = []
models.append(('LR', LogisticRegression(solver='liblinear',
                                        multi_class='ovr')))
models.append(('LDA', LinearDiscriminantAnalysis()))
models.append(('KNN', KNeighborsClassifier()))
models.append(('CART', DecisionTreeClassifier()))
models.append(('NB', GaussianNB()))
models.append(('SVM', SVC(gamma='auto')))

# evaluate each model in turn
results = []
names = []
scoring = 'accuracy'
for name, model in models:
    kfold = model_selection.KFold(n_splits=10, random_state=seed)
    cv_results = model_selection.cross_val_score(model,
                                                 X_train,
                                                 Y_train,
                                                 cv=kfold,
                                                 scoring=scoring)
    results.append(cv_results)
    names.append(name)
    msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
    print(msg)

# compare algorithms
fig = plt.figure()
fig.suptitle('Algorithm Comparison')
ax = fig.add_subplot(111)
plt.boxplot(results)
ax.set_xticklabels(names)
plt.savefig('algorithm_comparison.png')

# make predictions on validation dataset
knn = KNeighborsClassifier()
knn.fit(X_train, Y_train)
predictions = knn.predict(X_validation)
print(accuracy_score(Y_validation, predictions))
print(confusion_matrix(Y_validation, predictions))
print(classification_report(Y_validation, predictions))
```
