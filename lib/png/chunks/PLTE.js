// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

// PLTE - Palette

var BufferedStream = require('../bufferedStream');

/**
 * @class PLTE
 * @module PNG
 * @submodule PNGChunks
 */
module.exports = {

	/**
	 * Gets the chunk-type as string
	 *
	 * @method getType
	 * @return {string}
	 */
	getType: function () {
		return 'PLTE';
	},

	/**
	 * Gets the chunk-type as id
	 *
	 * @method getTypeId
	 * @return {int}
	 */
	getTypeId: function () {
		return 0x504c5445;
	},

	/**
	 * Gets the sequence
	 *
	 * @method getSequence
	 * @return {int}
	 */
	getSequence: function () {
		return 250;
	},


	/**
	 * Gets the color at specified index
	 *
	 * @method getColorByIndex
	 * @param {int} index
	 * @return {object}
	 */
	getColorByIndex: function (index) {

		var internalIndex = index * 3,
			data = this._palette;

		if (internalIndex > this._palette.length) {
			throw new Error('Palette index of ' + index + ' is out of bounds.');
		}

		return {
			red: data.readUInt8(internalIndex),
			green: data.readUInt8(internalIndex + 1),
			blue: data.readUInt8(internalIndex + 2)
		}
	},

	/**
	 * Searches the platte to find the index of a color
	 *
	 * @method findColor
	 * @param {object} color Color object with red, green, and blue components
	 * @return {int|null}
	 */
	findColor: function (color) {

		var i, len;

		for (i = 0, len = this._palette.length * 3; i < len; i += 3) {

			if ((color.red === this._palette.readUInt8(i)) &&
				(color.green === this._palette.readUInt8(i + 1)) &&
				(color.blue === this._palette.readUInt8(i + 2))) {

				return i;
			}
		}

		return null;
	},

	/**
	 * Gets the number of colors available in the palette
	 *
	 * @method getColorCount
	 * @return {int}
	 */
	getColorCount: function () {
		return this._palette.length / 3;
	},


	/**
	 * Encoding of chunk data
	 *
	 * @method encode
	 * @param {BufferedStream} stream Data stream
	 */
	encode: function (stream) {
		//TODO
	},

	/**
	 * Decoding of chunk data
	 *
	 * @method decode
	 * @param {BufferedStream} stream Data stream
	 * @param {int} length Length of chunk data
	 * @param {boolean} strict Should parsing be strict?
	 */
	decode: function (stream, length, strict) {

		var headerChunk;

		// Validation
		if (!this.getFirstChunk('IHDR', false) === null) {
			throw new Error('Chunk ' + this.getType() + ' requires the IHDR chunk.');
		}

		if (this.getFirstChunk(this.getType(), false) !== null) {
			throw new Error('Only one ' + this.getType() + ' is allowed in the data.');
		}

		// Palette length should be divisible by three (each of r, g, b has one byte)
		if ((length % 3) !== 0) {
			throw new Error('Palette length should be a multiple of 3. Length: ' + length);
		}

		headerChunk = this.getHeaderChunk();

		// Check for valid palette color-types
		if (!headerChunk.hasPalette()) {
			throw new Error('Palette is not allowed to appear with this color-type: ' + headerChunk.getColorType());
		}

		// Make sure palette is big enough
		if (Math.pow(2, headerChunk.getBitDepth()) > (length / 3)) {
			throw new Error('Bit-depth greater than the size of the palette.');
		}

		// Copy palette
		this._palette = new Buffer(length);
		data.copy(this._palette, 0, offset, offset + length);
	},


	/**
	 * Will be called once for each chunk after decoding
	 *
	 * @param {Buffer} image
	 * @return {Buffer}
	 */
	postDecode: function (image) {

		var i, len,
			internalIndex,
			palette = this._palette,
			paletteLength = this._palette.length,
			imageStream = new BufferedStream(image),
			outputStream = new BufferedStream(null, null, image.length);

		for (i = 0, len = image.length; i < len; i++) {

			// Get index from input
			internalIndex = imageStream.readUInt8() * 3;
			if (internalIndex >= paletteLength) {
				throw new Error('Palette: Index of color out of bounds.');
			}

			// Write to image
			outputStream.writeUInt8(palette.readUInt8(internalIndex));
			outputStream.writeUInt8(palette.readUInt8(internalIndex + 1));
			outputStream.writeUInt8(palette.readUInt8(internalIndex + 2));
		}

		return outputStream.toBuffer();
	}
};