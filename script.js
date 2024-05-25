document.addEventListener("DOMContentLoaded", () => {

    // Initialize synths  
    /// Synth 1
    const synth1 = new Tone.Synth().connect(new Tone.Volume(0)).toDestination();

    /// Synth2
    const synth2 = new Tone.Synth().connect(new Tone.Volume(0)).toDestination();


    // Define reverb and delay effects
    const reverb1 = new Tone.Reverb().connect(new Tone.Volume(0)).toDestination();
    const delay1 = new Tone.FeedbackDelay().connect(new Tone.Volume(0)).toDestination();

    // Define reverb and delay effects
    const reverb2 = new Tone.Reverb().connect(new Tone.Volume(0)).toDestination();
    const delay2 = new Tone.FeedbackDelay().connect(new Tone.Volume(0)).toDestination();

    // Connect synths to effects
    synth1.chain(reverb1, delay1);
    synth2.chain(reverb2, delay2);


    // Create volume nodes for each channel
    const synth1Vol = synth1.volume;
    const synth2Vol = synth2.volume;

    // Synth and mixer controls
    document.getElementById("waveform1").addEventListener("change", (e) => {
        synth1.oscillator.type = e.target.value;
    });

    document.getElementById("waveform2").addEventListener("change", (e) => {
        synth2.oscillator.type = e.target.value;
    });

    document.getElementById("octave1").addEventListener("input", (e) => {
        synth1.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
    });

    document.getElementById("octave2").addEventListener("input", (e) => {
        synth2.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
    });


    // Reverb and delay controls for synth1
    document.getElementById("reverb1").addEventListener("input", (e) => {
        reverb1.wet.value = parseFloat(e.target.value);
    });

    document.getElementById("delay1").addEventListener("input", (e) => {
        delay1.wet.value = parseFloat(e.target.value);
    });

    // Reverb and delay controls for synth2
    document.getElementById("reverb2").addEventListener("input", (e) => {
        reverb2.wet.value = parseFloat(e.target.value);
    });

    document.getElementById("delay2").addEventListener("input", (e) => {
        delay2.wet.value = parseFloat(e.target.value);
    });

    // Volume control for each channel
    document.getElementById("volume1").addEventListener("input", (e) => {
        synth1Vol.value = Tone.gainToDb(e.target.value / 100);
    });

    document.getElementById("volume2").addEventListener("input", (e) => {
        synth2Vol.value = Tone.gainToDb(e.target.value / 100);
    });

    // Keyboard functionality
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.addEventListener("mousedown", () => {
            const note = key.dataset.note;
            synth1.triggerAttack(note);
            synth2.triggerAttack(note);
        });
        key.addEventListener("mouseup", () => {
            synth1.triggerRelease();
            synth2.triggerRelease();
        });
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
            synth1.triggerAttack(note);
            synth2.triggerAttack(note);
        }
    });

    document.addEventListener("keyup", (e) => {
        if (noteMap[e.key]) {
            synth1.triggerRelease();
            synth2.triggerRelease();
        }
    });

});


