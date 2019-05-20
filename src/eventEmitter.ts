interface Listener {
  action: (...args: any[]) => void;
  after?: () => void;
}

export class CustomEventEmitter {
  listeners = new Map<string, Listener[]>();

  on(name: string, fn: (...args: any[]) => void, after?: () => void) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, []);
    }
    if (!this.includes(fn, this.listeners.get(name))) {
      this.listeners.get(name).push({action: fn, after});
    }
  }

  emit(name: string, ...args: any[]) {
    if (this.listeners.has(name)) {
      const namedListeners = this.listeners.get(name);
      console.log(
          `There are ${namedListeners.length} items in the ${name} array`);
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

  off(name: string, fn: (...args: any[]) => void) {
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

  once(name: string, fn: (...args: any[]) => any) {
      this.on(name, fn, () => {this.off(name, fn)});
  }

  shout(name: string, fn: (...args: any[]) => void) {
    this.on(name, fn, () => {console.log(`${name.toUpperCase()} WAS CALLED`)});
  }

  includes(query: any, existing: Listener[]): boolean {
    const found = existing.filter(lst => lst.action === query);
    return found.length > 0;
  }

  find(query: any, existing: Listener[]): number {
    let foundIndex = -1;
    existing.forEach((item, index) => {
      if (item.action === query) {
        foundIndex = index;
      }
    });
    return foundIndex;
  }
}