// +----------------------------------------------------------------------
// | 集群
// +----------------------------------------------------------------------
// |
// +----------------------------------------------------------------------
// | 网址 http://www.6336338.com
// +----------------------------------------------------------------------
// | Author: si <50208308@qq.com> 15/3/4.
// +----------------------------------------------------------------------

var cluster = require('cluster');

function startWorker() {
    var worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

if(cluster.isMaster) {
    require('os').cpus().forEach(function(){
        startWorker();
    });

    cluster.on('disconnect', function(worker){
        console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('CLUSTER: Worker %d died with exit cod %d (%s)', worker.id, code, signal);
        startWorker();
    });
} else {
    require('./app.js')();
}