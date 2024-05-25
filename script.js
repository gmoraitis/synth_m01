document.addEventListener("DOMContentLoaded", () => {

    // Initialize synth
    const synth1 = new Tone.Synth().toDestination();
    const synth2 = new Tone.Synth().toDestination();
    
    // Synth1 controls
    document.getElementById("waveform1").addEventListener("change", (e) => {
        synth1.oscillator.type = e.target.value;
    });

    document.getElementById("octave1").addEventListener("input", (e) => {
        synth1.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
    });

    // Synth2 controls
    document.getElementById("waveform2").addEventListener("change", (e) => {
        synth2.oscillator.type = e.target.value;
    });

    document.getElementById("octave2").addEventListener("input", (e) => {
        synth2.set({ oscillator: { detune: e.target.value * 1200 } }); // 1200 cents per octave
    });





    // Function to play the synth
    function playSynth() {
        const note = "C4"; // Change the note if needed
        synth1.triggerAttackRelease(note, "8n");
        synth2.triggerAttackRelease(note, "2n");
    }

    // Call playSynth function when a button is clicked (for demonstration)
    document.getElementById("play").addEventListener("click", playSynth);
});
