创建mongodb数据库

mkdir mongodb_cailian

cd mongodb_cailian/

``

$ mkdir log

$ mkdir data

$ mkdir conf

$ mkdir bin

``

cp ~/mongo/bin/mongod bin/

cd conf/
vim mongod.conf
port = 12345
dbpath = data
logpath = log/mongod.log
fork = true
：wq

./bin/mongod -f conf/mongod.conf

cd log
tail mongod.log 

./bin/mongo —help

./bin/mongo 127.0.0.1:12345/moondb
db.shutdownServer()
tail -f log/mongod.log

numactl —interleave=all bin/mongod -f conf/mongod.conf

———————
> show dbs
> use moon
> db.dropDatabase()
> db.moon_collection.insert({x:1})
> show collections
> db.moon_collection.count()
> db.moon_collection.skip(3).limit(2).sort({x:2})
> db.moon_collection.getIndexes()
> db.moon_collection.ensureIndex({time:1},{expireAfterSeconds:30})

2dsphere索引
>db.collection.ensureIndex({w:2dsphere})

mongostat工具,查看运行状态
> mongostat -h 127.0.0.1:12345
idx miss

profile集合
> db.getProfilingStatus()
3个级别，0不记录，2记录所有操作
> db.system.profile.find().sort({$natural:-1}).limit(1)

日志

explain()

read,readWrite,dbAdmin,dbOwner,userAdmin
> db.createUser({user:”wangsi”,pwd:”wangsi”,customData:”admin”,roles:[{role:”userAdmin”,db:”admin"}]})
