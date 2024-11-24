<template>
  <div class="ambient-effects">
    <div class="particles"></div>
    <div class="mystic-glow"></div>
  </div>
</template>

<style lang="scss" scoped>
.ambient-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;

  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, 
                              rgba(183, 110, 121, 0.1) 0%,
                              transparent 70%);
    opacity: 0.5;
  }

  .mystic-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,
                              rgba(183, 110, 121, 0.1) 0%,
                              transparent 50%,
                              rgba(183, 110, 121, 0.1) 100%);
    animation: glowPulse 4s ease-in-out infinite;
  }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
</style>