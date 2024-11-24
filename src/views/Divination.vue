<template>
  <div class="divination-container">
    <!-- 顶部导航 -->
    <div class="navigation">
      <div class="back-btn" @click="$router.go(-1)">
        <span class="icon">←</span> 返回
      </div>
      <h1>{{ divinationType }}占卜</h1>
    </div>

    <!-- 占卜区域 -->
    <main class="main-content">
      <!-- 选牌阶段 -->
      <div class="card-selection" v-if="!selectedCard">
        <div class="instruction">
          <h2>请选择一张塔罗牌</h2>
          <p>在选择之前，请闭上眼睛，深呼吸，将你的问题默念三遍</p>
        </div>
        
        <div class="cards-grid">
          <div class="card" 
               v-for="n in 6" 
               :key="n"
               :class="{ 'card-hover': hoveredCard === n }"
               @click="selectCard(n)"
               @mouseenter="hoveredCard = n"
               @mouseleave="hoveredCard = null">
            <div class="card-inner">
              <div class="card-front">
                <div class="card-pattern">🎴</div>
              </div>
              <div class="card-back">
                <img :src="getCardImage(n)" alt="塔罗牌">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结果展示阶段 -->
      <div class="result-container" v-else>
        <div class="result-card" :class="{ 'show': showResult }">
          <div class="card-image">
            <img :src="selectedCardData.image" :alt="selectedCardData.name">
          </div>
          <div class="card-info">
            <h2>{{ selectedCardData.name }}</h2>
            <div class="interpretation">
              <div class="meaning">
                <h3>解读结果</h3>
                <p>{{ getInterpretation('meaning') }}</p>
              </div>
              <div class="advice">
                <h3>建议</h3>
                <p>{{ getInterpretation('advice') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="retry-btn" @click="resetDivination">
            <span class="icon">🔄</span> 重新占卜
          </button>
          <button class="save-btn" @click="saveResult">
            <span class="icon">💾</span> 保存结果
          </button>
          <button class="share-btn" @click="shareResult">
            <span class="icon">📤</span> 分享
          </button>
        </div>
      </div>
    </main>

    <!-- 分享弹窗 -->
    <div class="share-modal" v-if="showShareModal" @click.self="showShareModal = false">
      <div class="modal-content">
        <h3>分享到</h3>
        <div class="share-options">
          <button class="share-option" @click="shareToWeChat">
            <span class="icon">📱</span> 微信
          </button>
          <button class="share-option" @click="shareToWeibo">
            <span class="icon">🌐</span> 微博
          </button>
          <button class="share-option" @click="copyLink">
            <span class="icon">🔗</span> 复制链接
          </button>
        </div>
        <button class="close-btn" @click="showShareModal = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { tarotCards } from '../date/tarotCards.js'

export default {
  name: 'DivinationPage',
  data() {
    return {
      divinationType: '',
      selectedCard: null,
      selectedCardData: null,
      hoveredCard: null,
      showResult: false,
      showShareModal: false
    }
  },
  created() {
    // 从路由参数获取占卜类型
    this.divinationType = this.$route.params.type
    if (!this.divinationType) {
      this.$router.push('/home')
    }
  },
  methods: {
    getCardImage(n) {
      // 这里返回卡片背面的图案，后续可以替换为实际的卡片图片
      return `https://dummyimage.com/200x300/b76e79/ffffff.png&text=Card+${n}`
    },
    getInterpretation(type) {
      if (!this.selectedCardData || !this.selectedCardData.interpretations) {
        return '';
      }
      
      // 将路由参数类型映射到解读类型
      const interpretationType = {
        'today': 'today',
        'love': 'love',
        'career': 'career',
        'wealth': 'wealth'
      }[this.divinationType] || 'today';
      
      try {
        return this.selectedCardData.interpretations[interpretationType][type] || '暂无解读';
      } catch (error) {
        console.error('获取解读结果出错:', error);
        return '暂无解读';
      }
    },
    selectCard(n) {
      this.selectedCard = n;
      // 随机选择一张塔罗牌
      const cardNumber = this.getRandomCard();
      this.selectedCardData = tarotCards[cardNumber];
      
      // 确保数据加载完成
      if (this.selectedCardData) {
        // 添加动画延迟
        setTimeout(() => {
          this.showResult = true;
        }, 500);
        // 保存到历史记录
        this.saveToHistory();
      } else {
        console.error('未能加载塔罗牌数据');
        alert('加载数据失败，请重试');
        this.resetDivination();
      }
    },
    getRandomCard() {
      const cardNumbers = Object.keys(tarotCards)
      const randomIndex = Math.floor(Math.random() * cardNumbers.length)
      return cardNumbers[randomIndex]
    },
    resetDivination() {
      this.selectedCard = null
      this.selectedCardData = null
      this.showResult = false
    },
    saveResult() {
      // 保存结果到本地存储
      const result = {
        id: Date.now(),
        type: this.divinationType,
        card: this.selectedCardData,
        date: new Date().toLocaleString()
      }
      const history = JSON.parse(localStorage.getItem('divinationHistory') || '[]')
      history.unshift(result)
      localStorage.setItem('divinationHistory', JSON.stringify(history))
      alert('结果已保存')
    },
    saveToHistory() {
      const result = {
        id: Date.now(),
        type: this.divinationType,
        date: new Date().toLocaleString()
      }
      const history = JSON.parse(localStorage.getItem('divinationHistory') || '[]')
      history.unshift(result)
      localStorage.setItem('divinationHistory', JSON.stringify(history))
    },
    shareResult() {
      this.showShareModal = true
    },
    shareToWeChat() {
      alert('微信分享功能开发中...')
      this.showShareModal = false
    },
    shareToWeibo() {
      alert('微博分享功能开发中...')
      this.showShareModal = false
    },
    copyLink() {
      // 复制当前页面链接
      const url = window.location.href
      navigator.clipboard.writeText(url).then(() => {
        alert('链接已复制到剪贴板')
        this.showShareModal = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.divination-container {
  min-height: 100vh;
  background-color: #fff5f5;
  padding-bottom: 40px;

  .navigation {
    background: white;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: relative;

    .back-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #b76e79;
      }

      .icon {
        font-size: 20px;
      }
    }

    h1 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #b76e79;
      margin: 0;
    }
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;

    .instruction {
      text-align: center;
      margin-bottom: 40px;

      h2 {
        color: #b76e79;
        margin-bottom: 15px;
      }

      p {
        color: #666;
      }
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      padding: 20px;

      .card {
        aspect-ratio: 2/3;
        perspective: 1000px;
        cursor: pointer;

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;

          .card-front,
          .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .card-front {
            background: linear-gradient(135deg, #b76e79, #ffc0cb);
            display: flex;
            align-items: center;
            justify-content: center;

            .card-pattern {
              font-size: 48px;
              color: white;
            }
          }

          .card-back {
            background: white;
            transform: rotateY(180deg);
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        &.card-hover .card-inner {
          transform: rotateY(180deg);
        }
      }
    }

    .result-container {
      .result-card {
        background: white;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;

        &.show {
          opacity: 1;
          transform: translateY(0);
        }

        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 30px;
        padding: 30px;

        .card-image {
          img {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
        }

        .card-info {
          h2 {
            color: #b76e79;
            margin-bottom: 20px;
            font-size: 28px;
          }

          .interpretation {
            display: grid;
            gap: 30px;

            h3 {
              color: #b76e79;
              margin-bottom: 15px;
              font-size: 20px;
            }

            p {
              color: #666;
              line-height: 1.8;
            }
          }
        }
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 40px;

        button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 16px;

          .icon {
            font-size: 20px;
          }

          &.retry-btn {
            background: #fff;
            color: #b76e79;
            border: 2px solid #b76e79;

            &:hover {
              background: #b76e79;
              color: white;
            }
          }

          &.save-btn,
          &.share-btn {
            background: #b76e79;
            color: white;

            &:hover {
              background: #a25964;
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }

  .share-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 15px;
      width: 90%;
      max-width: 400px;

      h3 {
        color: #b76e79;
        margin-bottom: 20px;
        text-align: center;
      }

      .share-options {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 20px;

        .share-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 15px;
          border: none;
          border-radius: 10px;
          background: #fff5f5;
          color: #b76e79;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background: #ffd6d6;
            transform: translateY(-2px);
          }

          .icon {
            font-size: 24px;
          }
        }
      }

      .close-btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 25px;
        background: #b76e79;
        color: white;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #a25964;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .divination-container {
    .main-content {
      .result-container {
        .result-card {
          grid-template-columns: 1fr;

          .card-image {
            max-width: 300px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>