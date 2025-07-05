import { EventEmitter } from "stream";
import { DomainEvent } from "../../domain/event/DomainEvent";
import { EventBus } from "../../domain/event/EventBus";
import { DomainEventSubscriber } from "../../domain/event/DomainEventSubscriber";

export default class NodeJSEventEmitterEventBus implements EventBus{
  private readonly eventEmitter:EventEmitter;
  constructor (){
    this.eventEmitter = new EventEmitter();
  }

  setup(subscribers: DomainEventSubscriber<DomainEvent>[]):void {
    subscribers.forEach(subscriber => {
      subscriber.subscribedTo().forEach(event => {
        this.eventEmitter.on(event.eventName, (event) => {
          subscriber.on(event)
        })
      })
    })
  }

  async publish(event: DomainEvent): Promise<void> {
    this.eventEmitter.emit(event.eventName, event);
  }
}