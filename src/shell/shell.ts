import '../shared/styles/tailwind.css';
import 'xterm/css/xterm.css';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:7020');
const ss = require('socket.io-stream');


const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('section-shell-terminal'));


socket.on('connect', () => {
  const stream = ss.createStream();
  ss(socket).emit('stream', stream);
  stream.on('data', (data: Uint8Array) => term.write(data));
  term.onData((data) => stream.write(data));
});
