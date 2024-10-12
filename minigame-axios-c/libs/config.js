// config.js
module.exports = {
  interval: 30,
  maxRetries: 2,
  retryDelay: 1000,
  cleanupThresholdSeconds: 3600,
  endpointLadder: "http://speedgame2.com/game/pdari/output/result.json",
  endpointLM: "http://speedgame2.com/world/lm/result/result.json",
  endpointSplit: "http://speedgame2.com/game/split/output/result.json",
}
