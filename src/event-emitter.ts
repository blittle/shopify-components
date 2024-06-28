class EventEmitter {
  target: EventTarget;

  constructor() {
    this.target = new EventTarget();
  }
  on(eventName: string, listener: EventListenerOrEventListenerObject) {
    return this.target.addEventListener(eventName, listener);
  }
  once(eventName: string, listener: EventListenerOrEventListenerObject) {
    return this.target.addEventListener(eventName, listener, { once: true });
  }
  off(eventName: string, listener: EventListenerOrEventListenerObject) {
    return this.target.removeEventListener(eventName, listener);
  }
  emit(eventName: string, detail: unknown) {
    return this.target.dispatchEvent(
      new CustomEvent(eventName, { detail, cancelable: true })
    );
  }
}

export const cartEmitter = new EventEmitter();
