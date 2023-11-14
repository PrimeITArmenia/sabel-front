const throttle = function (func, rate) {
  let lastTime = new Date();
  const getTime = function () {
    const now = new Date();
    return {
      now: now,
      time: now - lastTime,
    };
  };

  func = func || function () {};
  rate = rate || 1000;
  // the inner method and api
  const api = function () {
    const t = getTime();
    if (t.time >= rate) {
      func(t.time);
      lastTime = t.now;
    }
  };

  // now method
  api.now = function () {
    const t = getTime();
    func(t.time);
    lastTime = t.now;
  };
  // setRate
  api.setRate = function (r) {
    rate = r;
  };
  return api;
};

export default throttle;
