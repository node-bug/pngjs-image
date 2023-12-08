var stream = require('stream');
var util = require('util');

var MemoryStream = function (options) {
	options = options || {};

	stream.Writable.call(this, options);

	this.buffer = Buffer.alloc((options.size || 16 * 1024) * 1);
	this.offset = 0;
};
util.inherits(MemoryStream, stream.Writable);

MemoryStream.prototype._write = function (chunk, encoding, cb) {

	cb = cb || function () {};

	var localBuffer = Buffer.alloc(chunk, encoding);

	// Need to resize memory?
	if (this.buffer.length - this.offset < localBuffer.length) {
		var buffer = Buffer.alloc(this.buffer.length + localBuffer.length);
		this.buffer.copy(buffer, 0, 0, this.buffer.length);
		this.buffer = buffer;
	}

	localBuffer.copy(this.buffer, this.offset, 0, localBuffer.length);
	this.offset += localBuffer.length;

	cb(null, localBuffer);
};

MemoryStream.prototype.getBuffer = function () {
	var localBuffer = Buffer.alloc(this.offset);
	this.buffer.copy(localBuffer, 0, 0, this.offset);
	return localBuffer;
};

module.exports = MemoryStream;
