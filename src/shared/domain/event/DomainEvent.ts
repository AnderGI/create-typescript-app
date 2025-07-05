export class DomainEvent {
	public readonly occurredOn: Date;
  public readonly eventName: string;

	protected constructor(
		occurredOn?: Date,
	) {
    this.eventName = this.getEventName()
		this.occurredOn = occurredOn ?? new Date();
	}

  protected getEventName():string {
    return "event";
  };

}