// config.js
module.exports = {
  interval: 1,
  maxRetries: 3,
  retryDelay: 1000,
  cleanupThresholdSeconds: 3600,
  endpointLAD:
    "https://minigame-result.alphagame.co.kr/v1/ladder/latest?type=1&",
  endpointPK: "https://minigame-result.alphagame.co.kr/v1/pk/latest?type=1&",
}
