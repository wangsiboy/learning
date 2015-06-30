# JavaScript工具库之Lodash

https://lodash.com/docs

lodash主要使用了延迟计算，使得lodash其性能远远超过Underscore。

在lodash中延迟计算意味着在我们的链式方法在显示或隐式的value()调用之前是不会执行的。

由于这种执行的延后，因此lodash可以进行shortcut fusion这样的优化，通过合并链式iteratee大大降低迭代的次数。从而大大提供其执行性能。