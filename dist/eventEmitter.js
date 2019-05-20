"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomEventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(name, fn, after) {
        if (!this.listeners.has(name)) {
            this.listeners.set(name, []);
        }
        if (!this.includes(fn, this.listeners.get(name))) {
            this.listeners.get(name).push({ action: fn, after });
        }
    }
    emit(name, ...args) {
        if (this.listeners.has(name)) {
            const namedListeners = this.listeners.get(name);
            console.log(`There are ${namedListeners.length} items in the ${name} array`);
            // Clone the found array so that deletions during the event loop won't
            // break expected functionality.
            this.listeners.get(name).slice().forEach(item => {
                item.action(...args);
                if (item.after) {
                    item.after();
                }
            });
        }
    }
    off(name, fn) {
        if (this.listeners.has(name)) {
            let namedListeners = this.listeners.get(name);
            const index = this.find(fn, namedListeners);
            if (index >= 0 && index < namedListeners.length) {
                namedListeners.splice(index, 1);
                this.listeners.set(name, namedListeners);
                console.log(`Removed an item from ${name}`);
            }
        }
    }
    once(name, fn) {
        this.on(name, fn, () => { this.off(name, fn); });
    }
    shout(name, fn) {
        this.on(name, fn, () => { console.log(`${name.toUpperCase()} WAS CALLED`); });
    }
    includes(query, existing) {
        const found = existing.filter(lst => lst.action === query);
        return found.length > 0;
    }
    find(query, existing) {
        let foundIndex = -1;
        existing.forEach((item, index) => {
            if (item.action === query) {
                foundIndex = index;
            }
        });
        return foundIndex;
    }
}
exports.CustomEventEmitter = CustomEventEmitter;
//# sourceMappingURL=eventEmitter.js.map