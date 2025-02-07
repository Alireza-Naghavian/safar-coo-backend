export default class Controller {
  constructor() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((method) => {
      if (typeof (this as any)[method] === "function") {
        (this as any)[method] = (this as any)[method].bind(this);
      }
    });
  }
};

