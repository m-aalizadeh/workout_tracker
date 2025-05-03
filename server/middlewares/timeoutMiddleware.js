const timeoutMiddleware = (maxTimeMs = 5000) => {
  return (req, res, next) => {
    const startTime = Date.now();
    let isResponseSent = false;

    // Set timeout to check for slow responses
    const timeout = setTimeout(() => {
      if (!isResponseSent) {
        isResponseSent = true;
        const elapsed = Date.now() - startTime;

        if (!res.headersSent) {
          console.error(
            `Timeout after ${elapsed}ms on ${req.method} ${req.url}`
          );
          return res.status(503).json({
            error: "Service Unavailable",
            message: `Response time exceeded ${maxTimeMs}ms`,
            code: "RESPONSE_TIME_EXCEEDED",
          });
        } else {
          console.error("Timeout fired, but headers were already sent");
        }
      }
    }, maxTimeMs);

    // Track response finish
    const originalEnd = res.end;
    res.end = function (...args) {
      if (isResponseSent) return;
      isResponseSent = true;
      clearTimeout(timeout);

      const elapsed = Date.now() - startTime;

      // Log performance
      console.log(`${req.method} ${req.url} - ${elapsed}ms`);

      // Warn if close to limit
      if (elapsed > maxTimeMs * 0.8) {
        console.warn(`Warning: Slow response (${elapsed}ms)`);
      }

      originalEnd.apply(this, args);
    };

    next();
  };
};

module.exports = timeoutMiddleware;
