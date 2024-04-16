export class RateLimiter {
  limit = 5; // Limiting requests to 5 per minute per IP
  windowMs = 60 * 1000; // 1 minute
  rateLimitMap = new Map<any, any>();

  setIpData(ip: any) {
    if (!this.rateLimitMap.has(ip)) {
      this.rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    return this.rateLimitMap.get(ip);
  }

  tooManyRequests(ipData: { lastReset: number; count: number; }) {
    if (Date.now() - ipData.lastReset > this.windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= this.limit) {
      return true;
    }

    return false;
  }

  increaseCount(ipData: { lastReset: number; count: number; }) {
    return ipData.count += 1;
  }
}
