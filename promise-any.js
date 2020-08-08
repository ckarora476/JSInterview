function promiseAny(promises) {

  function promiseFn(resolve, reject) {
    let errors = [];
    let resolved;

    const onFulfill = (value) => {

      if (resolved) {
        return;
      }
      resolved = true;

      resolve(value);
    };

    const onError = (error) => {
      if (resolved) {
        return;
      }

      errors = errors.concat(error);

      if (errors.length === promises.length) {
        reject(errors);
      }
    };

    return promises.forEach((promise) => promise.then(
      onFulfill,
      onError,
    ));
  }

  return new Promise(promiseFn);

}