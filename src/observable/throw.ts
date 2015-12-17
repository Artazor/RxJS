import {Scheduler} from '../Scheduler';
import {Observable} from '../Observable';

export class ErrorObservable<T> extends Observable<T> {

  static create<T>(error: any, scheduler?: Scheduler) {
    return new ErrorObservable(error, scheduler);
  }

  static dispatch({ error, subscriber }) {
    subscriber.error(error);
  }

  constructor(public error: any, private scheduler?: Scheduler) {
    super();
  }

  _subscribe(subscriber) {

    const error = this.error;
    const scheduler = this.scheduler;

    if (scheduler) {
      subscriber.add(scheduler.schedule(ErrorObservable.dispatch, 0, {
        error, subscriber
      }));
    } else {
      subscriber.error(error);
    }
  }
}
