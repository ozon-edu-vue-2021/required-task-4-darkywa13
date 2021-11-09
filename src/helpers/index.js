export function debounce(f, t) {
  const calls = {};

  return function (args) {
    let previousCall = calls.lastCall;
    calls.lastCall = Date.now();

    if (previousCall && calls.lastCall - previousCall <= t) {
      clearTimeout(calls.lastCallTimer);
    }

    calls.lastCallTimer = setTimeout(() => f(args), t);
  };
}
