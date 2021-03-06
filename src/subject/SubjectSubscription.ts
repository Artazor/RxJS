import {Subject} from '../Subject';
import {Subscription} from '../Subscription';
import {Observer} from '../Observer';
import {Subscriber} from '../Subscriber';

export class SubjectSubscription<T> extends Subscription {
  isUnsubscribed: boolean = false;

  constructor(public subject: Subject<T>, public observer: Observer<any>) {
    super();
  }

  unsubscribe() {
    if (this.isUnsubscribed) {
      return;
    }

    this.isUnsubscribed = true;

    const subject = this.subject;
    const observers = subject.observers;

    this.subject = void 0;

    if (!observers || observers.length === 0 || subject.isUnsubscribed) {
      return;
    }

    if (this.observer instanceof Subscriber) {
      (<Subscriber<T>> this.observer).unsubscribe();
    }
    const subscriberIndex = observers.indexOf(this.observer);

    if (subscriberIndex !== -1) {
      observers.splice(subscriberIndex, 1);
    }
  }
}