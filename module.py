import socketio
import subprocess

sio = socketio.Client()

class Process:
    def __init__(self, command):
        self.command = command
        self.process = ''

    def start(self):
        self.process = subprocess.Popen("python " + self.command, stderr=subprocess.STDOUT, stdout=subprocess.PIPE)

        return self.process

    def stop(self):
        self.process.kill()

        return self.process

def ws(url, appname, command):
    print(url, appname, command)

    process = Process(command)

    @sio.event
    def disconnect():
        print('disconnected from server')

    @sio.on('init')
    def message():
        print('initialized!')
        process.start()
        # print(proc)
        sio.emit('init', appname)

    
    @sio.on('quit')
    def message():
        print('quit!')
        print(process.stop())
        sio.emit('quit', appname)


    sio.connect('http://' + url)
    sio.emit('client', appname)
    # sio.wait()
