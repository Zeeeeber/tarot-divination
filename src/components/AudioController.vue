<template>
  <div class="audio-controller">
    <button class="audio-btn" @click="toggleBGM">
      <span class="icon">{{ isBGMPlaying ? '🔊' : '🔇' }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AudioController',
  data() {
    return {
      bgm: null,
      isBGMPlaying: false,
      cardFlipSound: null
    }
  },
  created() {
    // 创建音频对象
    this.bgm = new Audio('/audio/background.mp3')
    this.bgm.loop = true
    this.cardFlipSound = new Audio('/audio/card-flip.mp3')
  },
  methods: {
    toggleBGM() {
      if (this.isBGMPlaying) {
        this.bgm.pause()
      } else {
        this.bgm.play()
      }
      this.isBGMPlaying = !this.isBGMPlaying
    },
    playCardFlip() {
      this.cardFlipSound.currentTime = 0
      this.cardFlipSound.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-controller {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;

  .audio-btn {
    background: rgba(183, 110, 121, 0.8);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(183, 110, 121, 1);
      transform: scale(1.1);
    }

    .icon {
      font-size: 20px;
      color: white;
    }
  }
}
</style>