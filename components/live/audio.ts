"use client";

// Tiny Web Audio synth for the live quiz: looping background music (lobby,
// question, podium) and sound effects. Everything is generated in the
// browser, so there are no audio files to host or license. Browsers only
// allow sound after a user gesture, so call `unlock()` from a click.

export type BgmTrack = "lobby" | "question" | "podium";
export type Sfx = "join" | "tick" | "go" | "correct" | "wrong" | "reveal" | "drumroll" | "fanfare" | "place" | "pop";

const midi = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

type Track = { bpm: number; chords: number[][]; bass: "half" | "eighths"; arp: "up" | "updown" | "fast"; lead: OscillatorType; hats: boolean };

const TRACKS: Record<BgmTrack, Track> = {
  // C – Am – F – G, relaxed
  lobby: { bpm: 112, chords: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]], bass: "half", arp: "updown", lead: "triangle", hats: true },
  // Am – Am – F – E, pulsing and tense
  question: { bpm: 144, chords: [[57, 60, 64], [57, 60, 64], [53, 57, 60], [52, 56, 59]], bass: "eighths", arp: "fast", lead: "square", hats: true },
  // C – F – G – C, triumphant
  podium: { bpm: 120, chords: [[60, 64, 67], [65, 69, 72], [67, 71, 74], [60, 64, 67]], bass: "half", arp: "up", lead: "square", hats: false },
};

class LiveAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: number | null = null;
  private track: BgmTrack | null = null;
  private step = 0;
  private nextTime = 0;
  muted = false;

  /** Create/resume the audio context. Call from a user gesture. */
  unlock() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.8;
      this.master.connect(this.ctx.destination);
      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = 0.32;
      this.musicBus.connect(this.master);
      this.sfxBus = this.ctx.createGain();
      this.sfxBus.gain.value = 0.9;
      this.sfxBus.connect(this.master);
      const len = this.ctx.sampleRate;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  get ready() {
    return !!this.ctx && this.ctx.state === "running";
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(muted ? 0 : 0.8, this.ctx.currentTime, 0.05);
  }

  // --- building blocks ------------------------------------------------------

  private tone(freq: number, at: number, dur: number, type: OscillatorType, vol: number, bus: GainNode | null, slideTo?: number) {
    if (!this.ctx || !bus) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, at + dur);
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(vol, at + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(env).connect(bus);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  private hiss(at: number, dur: number, vol: number, bus: GainNode | null, freq = 7000, q = 0.8, sweepTo?: number) {
    if (!this.ctx || !bus || !this.noise) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq, at);
    if (sweepTo) filter.frequency.exponentialRampToValueAtTime(sweepTo, at + dur);
    filter.Q.value = q;
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(vol, at + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(filter).connect(env).connect(bus);
    src.start(at, Math.random() * 0.5);
    src.stop(at + dur + 0.02);
  }

  // --- music ----------------------------------------------------------------

  playBgm(track: BgmTrack) {
    if (this.track === track && this.timer !== null) return;
    this.stopBgm();
    const ctx = this.unlock();
    if (!ctx) return;
    this.track = track;
    this.step = 0;
    this.nextTime = ctx.currentTime + 0.08;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stopBgm() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    this.track = null;
  }

  private schedule() {
    if (!this.ctx || !this.track) return;
    const t = TRACKS[this.track];
    const sixteenth = 60 / t.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + 0.12) {
      const s = this.step % 16;
      const chord = t.chords[Math.floor(this.step / 16) % t.chords.length];
      const at = this.nextTime;
      // bass
      if (t.bass === "half" ? s % 8 === 0 : s % 2 === 0) this.tone(midi(chord[0] - 24), at, sixteenth * (t.bass === "half" ? 6 : 1.6), "triangle", 0.5, this.musicBus);
      // arpeggio
      const pattern = t.arp === "updown" ? [0, 1, 2, 1] : t.arp === "up" ? [0, 1, 2, 2] : [0, 2, 1, 2];
      if (t.arp === "fast" || s % 2 === 0) {
        const note = chord[pattern[(t.arp === "fast" ? s : s / 2) % 4]] + (t.arp === "fast" ? 12 : 0);
        this.tone(midi(note), at, sixteenth * 1.8, t.lead, t.lead === "square" ? 0.09 : 0.2, this.musicBus);
      }
      // podium melody accents
      if (this.track === "podium" && s % 4 === 0) this.tone(midi(chord[(s / 4) % 3] + 12), at, sixteenth * 3, "triangle", 0.18, this.musicBus);
      // hats & kick
      if (t.hats && s % 4 === 2) this.hiss(at, 0.04, 0.25, this.musicBus);
      if (s % 8 === 0) this.tone(140, at, 0.12, "sine", 0.55, this.musicBus, 45);
      this.nextTime += sixteenth;
      this.step++;
    }
  }

  // --- sound effects ----------------------------------------------------------

  sfx(name: Sfx) {
    const ctx = this.unlock();
    if (!ctx) return;
    const t = ctx.currentTime + 0.01;
    const bus = this.sfxBus;
    switch (name) {
      case "join":
      case "pop":
        this.tone(660, t, 0.12, "sine", 0.5, bus, 1320);
        break;
      case "tick":
        this.tone(1250, t, 0.05, "square", 0.18, bus);
        break;
      case "go":
        this.tone(midi(72), t, 0.16, "square", 0.25, bus);
        this.tone(midi(79), t + 0.16, 0.3, "square", 0.25, bus);
        break;
      case "correct":
        this.tone(midi(76), t, 0.14, "triangle", 0.5, bus);
        this.tone(midi(84), t + 0.12, 0.3, "triangle", 0.5, bus);
        this.tone(midi(91), t + 0.24, 0.35, "sine", 0.25, bus);
        break;
      case "wrong":
        this.tone(220, t, 0.18, "sawtooth", 0.25, bus, 180);
        this.tone(175, t + 0.18, 0.35, "sawtooth", 0.25, bus, 110);
        break;
      case "reveal":
        this.hiss(t, 0.45, 0.5, bus, 600, 1.2, 6000);
        break;
      case "drumroll":
        for (let i = 0; i < 32; i++) this.hiss(t + i * 0.05, 0.05, 0.12 + (i / 32) * 0.35, bus, 1800, 0.6);
        this.hiss(t + 1.62, 0.5, 0.6, bus, 3000, 0.4);
        this.tone(90, t + 1.6, 0.4, "sine", 0.7, bus, 40);
        break;
      case "fanfare":
        [72, 76, 79].forEach((n, i) => this.tone(midi(n), t + i * 0.13, 0.16, "square", 0.22, bus));
        [72, 76, 79, 84].forEach((n) => this.tone(midi(n), t + 0.42, 0.9, "square", 0.14, bus));
        this.hiss(t + 0.42, 0.6, 0.35, bus, 5000, 0.5);
        break;
      case "place":
        this.tone(midi(67), t, 0.12, "triangle", 0.45, bus);
        this.tone(midi(72), t + 0.1, 0.3, "triangle", 0.45, bus);
        break;
    }
  }
}

let shared: LiveAudio | null = null;
/** One audio engine per tab. */
export function liveAudio(): LiveAudio {
  if (!shared) shared = new LiveAudio();
  return shared;
}
