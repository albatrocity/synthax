# synthax

_very_ early development stages, no documentation.

A MIDI patching/mixing library. Intended to be used to send control change signals generated by a variety of modulation sources.

### Roadmap
* **done** <del>MIDI I/O device selection</del>
* **done**<del>Patchbay to route modulation sources to MIDI category values</del>
* **done** <del>Submixer to blend multiple modulation sources together</del>
* More Core modulators (better LFO with more shapes, audio input, video input, etc.)
* More Core mappers (config standard synthesizer MIDI ports for things like Filter cutoff, resonance, envelopes, etc.) - reference the [Moog Sub Phatty Manual](http://www.moogmusic.com/sites/default/files/SUB_PHATTY_MANUAL_6_13.pdf) for its MIDI OPERATIONS section
* Multiple channel output
* More Core Device configurations (in the case where a device deviates from "standard" MIDI channels)