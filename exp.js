const { Worker } = require('worker_threads');

exports.ws = function (url, appname, command) {
    const socket = require('socket.io-client')(url);
    var apps = [];
    var w;

    function runService(workerData, app) {
        return new Promise((resolve, reject) => {
            var worker = new Worker(app, { workerData });
            worker.on('message', resolve);
            worker.on('error', (reject) => {
                console.log('on error' + reject)
            });
            worker.on('exit', (code) => {
                console.log('exit code - ' + code)
                if (code !== 0) {
                    reject(new Error(Worker stopped with exit code ${ code }));
        socket.emit('quit', appname);
    }
})

console.log(worker.threadId)
apps.push({ "ID": worker.threadId, "Application": workerData, "Location": app });

w = worker;

socket.emit('init', appname);
    })
  }

async function run(appname, loc) {
    const result = await runService(appname, loc)
    console.log(result);
}

socket.on('connect', function (data) {
    socket.emit('client', appname);
});
socket.on('quit', data => {
    w.terminate()
    apps = [];
});
socket.on('init', data => {
    run('Appname1', command).catch(err => console.error(err))
});
return socket;
}

exports.sendMessage = function (socket, msg) {
    socket.send(msg)
}