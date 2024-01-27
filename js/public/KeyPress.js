const keys = new Map();
export default function keyIsDown(key) {
    return keys.get(key) ?? false;
}
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys.set(e.key, true);
});
document.addEventListener('keyup', (e) => {
    keys.set(e.key, false);
});
