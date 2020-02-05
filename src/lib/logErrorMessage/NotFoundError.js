class NotFoundError extends Error {
  constructor(resource = 'resource', body = null) {
    super();

    Error.captureStackTrace(this, NotFoundError);

    this.name = this.constructor.name;
    this.message = `Related ${resource} does not exist.`;
    this.status = 404;
    this.skip = true;
    this.body = body;
  }

  set body(v) {
    this._body = v;
  }

  get body() {
    return this._body || {};
  }

  toObject() {
    return {
      status: this.status,
      body: {
        message: this.message,
        ...this.body,
        err: this.normalizeNativeError(),
      },
    };
  }

  getNativeError() {
    return this.body.err || {};
  }

  normalizeNativeError() {
    const nativeError = this.getNativeError();
    const { stack, componentStack, ...error } = Object.getOwnPropertyNames(nativeError).reduce(
      (obj, key) => ({ ...obj, [key]: nativeError[key] }),
      {},
    );

    return error;
  }
}

export default NotFoundError;
