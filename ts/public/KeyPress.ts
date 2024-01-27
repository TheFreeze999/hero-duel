const keys = new Map<string, boolean>();

export default function keyIsDown(key: string): boolean {
	return keys.get(key) ?? false;
}

document.addEventListener('keydown', (e) => {
	e.preventDefault();
	keys.set(e.key, true);
})
document.addEventListener('keyup', (e) => {
	keys.set(e.key, false);
})