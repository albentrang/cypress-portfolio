const calcDisplay: HTMLInputElement | null =
	document.querySelector('#calc-display')
// Placeholder code: fill in the calcDisplay field with 0 on page load
window.addEventListener('load', () => {
	if (calcDisplay) {
		calcDisplay.value = '0'
	}
})
