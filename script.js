document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const stopButton = document.getElementById("stop-button");
  const appContainer = document.getElementById("app-container");
  const morphControl = document.getElementById('adsrMorph');

  let synth1, synth2, filter1, filter2, reverb, delay, chorus, distortion;

  function createSynths() {
    // Create synths
    synth1 = new Tone.Synth();
    synth2 = new Tone.Synth();

    // Create filters
    filter1 = new Tone.Filter(2000, "lowpass").toDestination();
    filter2 = new Tone.Filter(2000, "lowpass").toDestination();
    

    // Connect synths to filters
    synth1.connect(filter1);
    synth2.connect(filter2);

    // Define reverb and delay effects
    reverb = new Tone.Reverb().toDestination();
    delay = new Tone.FeedbackDelay().toDestination();
    chorus = new Tone.Chorus().toDestination().start();
    distortion = new Tone.Distortion().toDestination();

    // Set initial values for effects
    reverb.decay = 2;
    delay.delayTime = 0.5;
    chorus.frequency = 1.5;
    chorus.depth = 0.7;
    distortion.distortion = 0.4;

    // Set initial wet values for effects
    reverb.wet.value = 0;
    delay.wet.value = 0;
    chorus.wet.value = 0;
    distortion.wet.value = 0;

    // Set initial volume for synths
    synth1.volume.value = -12;
    synth2.volume.value = -12;

    // Connect filters to effects
    filter1.chain(reverb, delay, chorus, distortion);
    filter2.chain(reverb, delay, chorus, distortion);
  }

  function playSound(synth, note) {
    const morphValue = parseFloat(morphControl.value);
    const attack = morphValue * 0.5;
    const decay = 0.5 * (morphValue * 0.5);
    const sustain = 0.7 * (1 - morphValue);
    // make realease time longer for more pad sound
    const release = 0.5 + (morphValue * 8); 

    synth.envelope.attack = attack;
    synth.envelope.decay = decay;
    synth.envelope.sustain = sustain;
    synth.envelope.release = release;

    console.log(synth.envelope.attack, synth.envelope.decay, synth.envelope.sustain, synth.envelope.release);

    synth.triggerAttack(note);
  }

  function stopSound(synth) {
    synth.triggerRelease();
  }

  startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Hide the start button
    appContainer.classList.remove("hidden"); // Show the application container
    createSynths(); // Initialize the synths
  });

  stopButton.addEventListener("click", () => {
    startButton.style.display = "block"; // Show the start button
    appContainer.classList.add("hidden"); // Hide the application container
    if (synth1) synth1.triggerRelease();
    if (synth2) synth2.triggerRelease();
  });

  // Filter controls
  document.getElementById("filter-frequency").addEventListener("input", (e) => {
    if (filter1) filter1.frequency.value = e.target.value;
    if (filter2) filter2.frequency.value = e.target.value;
  });

  document.getElementById("filter-type").addEventListener("change", (e) => {
    if (filter1) filter1.type = e.target.value;
    if (filter2) filter2.type = e.target.value;
  });

  document.getElementById("filter-q").addEventListener("input", (e) => {
    if (filter1) filter1.Q.value = e.target.value;
    if (filter2) filter2.Q.value = e.target.value;
  });

  // Synth and mixer controls
  document.getElementById("waveform1").addEventListener("change", (e) => {
    if (synth1) synth1.oscillator.type = e.target.value;
  });

  document.getElementById("waveform2").addEventListener("change", (e) => {
    if (synth2) synth2.oscillator.type = e.target.value;
  });

  
  document.getElementById("octave1").addEventListener("input", (e) => {
    if (synth1) synth1.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
  });

  document.getElementById("octave2").addEventListener("input", (e) => {
    if (synth2) synth2.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
  });

  // Reverb and delay controls
  document.getElementById("reverb").addEventListener("input", (e) => {
    if (reverb) reverb.wet.value = parseFloat(e.target.value);
  });

  document.getElementById("delay").addEventListener("input", (e) => {
    if (delay) delay.wet.value = parseFloat(e.target.value);
  });

  document.getElementById("chorus").addEventListener("input", (e) => {
    if (chorus) chorus.wet.value = parseFloat(e.target.value);
  });

  document.getElementById("distortion").addEventListener("input", (e) => {
    if (distortion) distortion.wet.value = parseFloat(e.target.value);
  });

  // Volume control for each channel
  document.getElementById("volume1").addEventListener("input", (e) => {
    if (synth1) synth1.volume.value = Tone.gainToDb(e.target.value / 100);
  });

  document.getElementById("volume2").addEventListener("input", (e) => {
    if (synth2) synth2.volume.value = Tone.gainToDb(e.target.value / 100);
  });

  // Keyboard functionality
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    key.addEventListener("mousedown", () => {
      const note = key.dataset.note;
      if (synth1) playSound(synth1, note);
      if (synth2) playSound(synth2, note);
    });
    key.addEventListener("mouseup", () => {
      if (synth1) stopSound(synth1);
      if (synth2) stopSound(synth2);
    });
  });

  // Show/hide keyboard button
  document.getElementById("toggle-keyboard").addEventListener("click", () => {
    const keyboard = document.getElementById("keyboard");
    if (keyboard.style.display === "none") {
      keyboard.style.display = "flex";
    } else {
      keyboard.style.display = "none";
    }
  });

  // Play notes with PC keyboard
  const noteMap = {
    'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
    'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
    'u': 'A#4', 'j': 'B4', 'k': 'C5'
  };

  document.addEventListener("keydown", (e) => {
    if (noteMap[e.key]) {
      const note = noteMap[e.key];
      if (synth1) playSound(synth1, note);
      if (synth2) playSound(synth2, note);
    }
  });

  document.addEventListener("keyup", (e) => {
    if (noteMap[e.key]) {
      if (synth1) stopSound(synth1);
      if (synth2) stopSound(synth2);
    }
  });
});
