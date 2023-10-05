CHANGELOG
=========

v1.1.0 - 2023-10-05
* Remove use of deprecated require.extensions

v1.0.0 - 2023-09-25
* Upgrade dependencies
* Replace dynamic requires
* Drop ability to load from URL to remove request dependency

v0.11.6 - 2015-06-05
* Speed improvements
* Convert processor arrays to internal 16-bit buffers

v0.11.5 - 2015-05-29
* Various Bug-fixes for encoder and decoder
* Encoder and decoder is stable - not anymore experimental

v0.11.4 - 2015-05-23
* Add simple url support for readImage
* Refactor decoder - fully dynamic
* Complete encoder - also fully dynamic
* Add support for custom chunks including JSON chunk
* Add instrumentation for require

v0.11.3 - 2015-05-23

v0.11.2 - 2015-04-21
* Bugfix for decoder: filter-revert from previous-line

v0.11.1 - 2015-04-20
* Add rotateCW/rotateCCW methods
* Add experimental feature
  * Add synchronous PNG loader (readImageSync)

v0.11.0 - 2015-04-19
* Add experimental features:
  * Add PNG decoder supporting true-color (+alpha) and index-color (with palette); supports auxiliary chunk tRNS
  * Add PNG encoder - currently saving always in true-color with alpha-channel
  * Add synchronous PNG loader (loadImageSync)
  * Add synchronous PNG writer (writeFileSync)
  * Add synchronous PNG dump (toBlobSync)

v0.10.0 - 2015-03-28
* General cleanup
* Add support for Node 0.12
* Add support for IO.js

v0.9.3 - Initial release 2014-11-04
