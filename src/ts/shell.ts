const client = require('socket.io-client')
const socket = client.connect('http://localhost:7020');
const ss = require('socket.io-stream');
import{Terminal} from 'xterm'
import 'xterm/css/xterm.css'

const term = new Terminal();
term.open(document.getElementById('terminal'));

socket.on('connect', () => {
  const stream = ss.createStream();
  ss(socket).emit('stream', stream)
  stream.on('data', (data: Uint8Array) => term.write(data));
  term.onData((data) => stream.write(data));
});