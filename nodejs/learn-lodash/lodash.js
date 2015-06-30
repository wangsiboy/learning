var _ = require('lodash');

var users = [
  { 'name': 'barney',  'age': 36 },
  { 'name': 'fred',    'age': 40 },
  { 'name': 'pebbles', 'age': 18 }
];

//1.获取所有用户名字，并以”，“分割
var names = _.chain(users)
  .map(function(user){
    return user.user;
  })
  .join(" , ")
  .value();
console.log(names);

/**
 *在这里首先将users对象包装成为lodash对象，
 *再map获取所有用户的名称，并最后利用join将用户名称以”，“连接在一起。
 *注意这里只是一串方法链，如果你没有显样的调用value方法，使其立即执行，
 *你将会得到如下的LodashWrapper延迟表达式：

 LodashWrapper {__wrapped__: LazyWrapper, __actions__: Array[1], __chain__: true, constructor: function, after: function…}

 **/


 //2. 获取最年轻的用户

 var youngest = _.chain(users)
  .min(function(user){
    return user.age;
  })
  .value();
console.log(youngest);

//用户数组到用户Map的转换

//在开发中我们经常会有把一堆素组形式的数据转换为Object形式的数组，便于根据属性key值查找，下面将以user对象来演示：

var userObj = _.chain(users)
  .map(function(user){
    return [user.name, user.age];
  })
  .zipObject()
  .value();
console.log(userObj);
//利用lodash首先将user数组map为[key, value]的数组集合，最后利用zipObject将结果转换为Object对象，zipObject会利用结果集的第一项作为key，第二项作为value生产Object。