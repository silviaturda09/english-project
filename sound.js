export function playSound(sound) {
    const audio = new Audio(`./sounds/${sound}`);
    audio.currentTime = 0;
    audio.play().catch(()=>{});
}