"use strict";

const util      = require('util');
const spawn     = require('child_process').spawn;
const merge     = require('mout/object/merge');

const Server    = require('./_server');


class GstServer extends Server {

  constructor(server, opts) {
    super(server, merge({
      fps : 12,
    }, opts));
  }

  get_feed() {
    var cmd = 'gst-launch-1.0';
    var args = ['v4l2src', '!',
		'h264parse', '!',
		'video/x-h264, width=960, height=540, framerate=12/1', '!',
		'fdsink'];
    console.log(cmd, args);
    var streamer = spawn( cmd, args);
    streamer.on("exit", function(code){
      console.log("Failure", code);
    });

    return streamer.stdout;
  }

};



module.exports = GstServer;
