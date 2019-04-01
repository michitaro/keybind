import * as keybind from "../src"

window.addEventListener('load', () => {
    keybind.on('shift+x', () => alert('shift + X'))
    keybind.on('Tab', () => alert('Tab'))
    keybind.on('ctrl+x', () => alert('ctrl + X'))
    keybind.on('meta+x', () => alert('meta + X'))
    keybind.on('F11', () => alert('F11'))

    // can be triggered only once
    const off = keybind.on('shift+ctrl+x', () => {
        alert('shift + ctrl + X (triggered only once)')
        off()
    })

    const sources = ['shift+x', 'Tab', 'ctrl+x', 'meta+x', 'shift+ctrl+x', 'F11']
    for (const s of sources) {
        const html = keybind.html(s)
        const div = document.createElement('div')
        div.innerHTML = html
        document.body.appendChild(div)
    }
})