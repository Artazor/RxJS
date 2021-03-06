import {errorObject} from './errorObject';

let tryCatchTarget: Function;

function tryCatcher(): any {
  try {
    return tryCatchTarget.apply(this, arguments);
  } catch (e) {
    errorObject.e = e;
    return errorObject;
  }
}

export function tryCatch(fn: Function): Function {
  tryCatchTarget = fn;
  return tryCatcher;
};