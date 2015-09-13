'use strict';

var log = console.log;
var mb = require('../modbus.js').create();

var memwatch = require('memwatch');

memwatch.on('leak', function(info) {
  console.error('Memory leak detected: ', info);
});

mb.onError(function (msg) {
  log('ERROR', msg);
});

var bit = true;
// create master device
var ctx = mb.createMaster({

  // connection type and params
  //con: mb.createConTcp('127.0.0.1', 1502),
  con: mb.createConRtu(2, '/dev/serial/rs485-1', 115200, 'N', 8, 1, mb.MODBUS_RTU_RS485, mb.MODBUS_RTU_RTS_NONE),

  // callback functions
  onConnect: function () {
    log('onConnect');
    setInterval(function(){
      ctx.setSlave(2);
      //ctx.getInputReg(50);
      var buf = new Buffer(4);
      var data = ctx.getRegs(32,2);
      buf.writeUInt16LE(data[0], 0);
      buf.writeUInt16LE(data[1], 2);
      log(buf.readUInt32LE(0));
      ctx.setSlave(3);
      ctx.setBit(816,bit = !bit);
    },100);
    //ctx.setBit(1, false);
    //ctx.destroy();
  },
  onDestroy: function () {
    log('onDestroy');
  }
});