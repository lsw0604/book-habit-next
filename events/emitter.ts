class EventEmitter {
  private listeners: Map<EventType, ((data: EventData) => void)[]> = new Map();

  emit(eventType: EventType, data: EventData) {
    const eventListeners = this.listeners.get(eventType);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }

  on(eventType: EventType, listener: (data: EventData) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)?.push(listener);

    return () => {
      const eventListeners = this.listeners.get(eventType);
      if (eventListeners) {
        this.listeners.set(
          eventType,
          eventListeners.filter((l) => l !== listener)
        );
      }
    };
  }
}

export const eventEmitter = new EventEmitter();
