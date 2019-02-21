class KeyCombination {
    alt = false
    shift = false
    ctrl = false
    meta = false
    key: PhysicalKey

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
        this.key = PhysicalKey.fromString(key)
    }

    match(e: KeyboardEvent) {
        return (
            e.altKey == this.alt &&
            e.shiftKey == this.shift &&
            e.ctrlKey == this.ctrl &&
            e.metaKey == this.meta &&
            this.key.equals(PhysicalKey.fromEvent(e)))
    }

    html() {
        return [
            this.alt ? '&#x2325;' : '',
            this.shift ? '&#x21e7;' : '',
            this.ctrl ? '&#x2303;' : '',
            this.meta ? '&#x2318;' : '',
            this.key.toHTML()
        ].join('')
    }
}


class PhysicalKey {
    private constructor(private keyCode: number) { }

    static fromEvent(e: KeyboardEvent) {
        return new PhysicalKey(e.keyCode)
    }

    static fromString(s: string) {
        if (s.length == 1) {
            return new PhysicalKey(s.toUpperCase().charCodeAt(0))
        }
        else {
            const code = name2code[s]
            if (code == undefined)
                throw new Error(`unknwon key name: ${s}`)
            else
                return new PhysicalKey(code)
        }
    }

    equals(o: PhysicalKey) {
        return this.keyCode == o.keyCode
    }

    toHTML() {
        const name = code2name[this.keyCode]
        const html = name2html[name]
        return html || name || String.fromCharCode(this.keyCode)
    }
}


class Keybind {
    constructor(readonly kc: KeyCombination, readonly handler: (e: KeyboardEvent) => void) { }
}


const keybinds: Keybind[] = []
document.addEventListener('keydown', e => {
    if (e.target != document.body)
        return
    for (const kb of keybinds) {
        if (kb.kc.match(e)) {
            e.preventDefault()
            kb.handler(e)
        }
    }
})


export function on(source: string, handler: (e: KeyboardEvent) => void) {
    const kb = new Keybind(new KeyCombination(source), handler)
    keybinds.push(kb)
    return () => {
        const i = keybinds.indexOf(kb)
        console.assert(i >= 0, `keybind ${source} is not registered`)
        keybinds.splice(i, 1)
    }
}


export function html(source: string) {
    return (new KeyCombination(source)).html()
}


const name2code = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Escape: 27,
    Space: 32,
    Delete: 46,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
}

const name2html = {
    Tab: '\u21E5',
    Enter: '\u23CE',
    Escape: '\u238B',
}

const code2name = (() => {
    const d: { [code: number]: string } = {}
    for (const name in name2code) {
        d[name2code[name]] = name
    }
    return d
})()