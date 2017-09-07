# Keybind
This module provide a way for listening for key combination events with simple API.

# Example (Source of the working demo)

* [Working DEMO](http://michitaro.github.io/keybind)

```typescript
import * as keybind from "@hscmap/keybind"

window.addEventListener('load', () => {
    keybind.on('shift+x', () => alert('shift + X'))
    keybind.on('alt+x', () => alert('alt + X'))
    keybind.on('ctrl+x', () => alert('ctrl + X'))
    keybind.on('meta+x', () => alert('meta + X'))

    // can be triggered only once
    const off = keybind.on('shift+ctrl+x', () => {
        alert('shift + ctrl + X (triggered only once)')
        off()
    })

    const sources = ['shift+x', 'alt+x', 'ctrl+x', 'meta+x', 'shift+ctrl+x']
    for (const s of sources) {
        const html = keybind.html(s)
        const div = document.createElement('div')
        div.innerHTML = html
        document.body.appendChild(div)
    }
})
```