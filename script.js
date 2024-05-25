document.addEventListener("DOMContentLoaded", () => {

    // Initialize synth
    const synth1 = new Tone.Synth().toDestination();

    // Synth controls
    document.getElementById("waveform1").addEventListener("change", (e) => {
        synth1.oscillator.type = e.target.value;
    });

    document.getElementById("octave1").addEventListener("input", (e) => {
        synth1.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
    });

    // Function to play the synth
    function playSynth() {
        const note = "C4"; // Change the note if needed
        synth1.triggerAttackRelease(note, "8n");
    }

    // Call playSynth function when a button is clicked (for demonstration)
    document.getElementById("play").addEventListener("click", playSynth);
});
