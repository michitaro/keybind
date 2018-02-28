class KeyCombination {
    alt = false
    shift = false
    ctrl = false
    meta = false
    key: string

    constructor(source: string) {
        const MODIFIERS = ['alt', 'shift', 'ctrl', 'meta']
        const keys = source.split('+')
        for (const m of MODIFIERS) {
            const i = keys.indexOf(m)
            if (i >= 0) {
                (this as any)[m] = true
                keys.splice(i, 1)
            }
        }
        if (keys.length != 1)
            throw new Error(`invalid keybind source: ${source}`)
        const key = keys[0]
        if (key.length != 1)
            throw new Error(`invalid keybind source: ${source}`)
        this.key = keyCode2code(key.charCodeAt(0))
    }

    match(e: KeyboardEvent) {
        return (
            e.altKey == this.alt &&
            e.shiftKey == this.shift &&
            e.ctrlKey == this.ctrl &&
            e.metaKey == this.meta &&
            whichKey(e) == this.key)
    }

    html() {
        const m = this.key.match(/^Key([A-Z1-9])$/)
        const key = m ? m[1] : this.key
        return [
            this.alt ? '&#x2325;' : '',
            this.shift ? '&#x21e7;' : '',
            this.ctrl ? '&#x2303;' : '',
            this.meta ? '&#x2318;' : '',
            key
        ].join('')
    }
}


function whichKey(e: KeyboardEvent) {
    // if (e.code)
    //     return e.code
    return keyCode2code(e.keyCode)
}


function keyCode2code(keyCode: number) {
    const key = String.fromCharCode(keyCode).toUpperCase()
    return `Key${key}`
}


class Keybind {
    constructor(readonly kc: KeyCombination, readonly handler: (e: KeyboardEvent) => void) { }
}


const keybinds: Keybind[] = []
document.addEventListener('keydown', e => {
    if (e.target != document.body)
        return
    for (const kb of keybinds)
        if (kb.kc.match(e)) {
            e.preventDefault()
            kb.handler(e)
        }
})


export function on(source: string, handler: (e: KeyboardEvent) => void) {
    const kb = new Keybind(new KeyCombination(source), handler)
    keybinds.push(kb)
    return () => {
        const i = keybinds.indexOf(kb)
        console.assert(i >= 0)
        keybinds.splice(i, 1)
    }
}


export function html(source: string) {
    return (new KeyCombination(source)).html()
}