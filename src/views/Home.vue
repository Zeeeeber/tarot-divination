<template>
  <div class="home-container">
    <!-- 顶部横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1>星运占卜</h1>
        <p>探索你的命运，寻找生活的答案</p>
      </div>
    </div>

    <!-- 每日运势推荐 -->
    <section class="daily-fortune">
      <div class="section-title">
        <h2>今日运势</h2>
        <span class="date">{{ currentDate }}</span>
      </div>
      <div class="fortune-card" @click="goToDailyFortune">
        <div class="card-content">
          <div class="card-icon">🌟</div>
          <h3>{{ dailyCard.name }}</h3>
          <p>{{ dailyCard.brief }}</p>
          <button class="view-more">查看详情</button>
        </div>
      </div>
    </section>

    <!-- 占卜类型区域 -->
    <section class="divination-types">
      <div class="section-title">
        <h2>选择占卜类型</h2>
      </div>
      <div class="type-grid">
        <div v-for="type in divinationTypes" 
             :key="type.key"
             class="type-card"
             @click="startDivination(type.key)">
          <div class="type-icon">{{ type.icon }}</div>
          <h3>{{ type.title }}</h3>
          <p>{{ type.description }}</p>
          <span class="popularity">{{ type.popularity }}人已测</span>
        </div>
      </div>
    </section>

    <!-- 用户反馈展示 -->
    <section class="testimonials">
      <div class="section-title">
        <h2>用户反馈</h2>
      </div>
      <div class="testimonial-slider">
        <div v-for="feedback in userFeedback" 
             :key="feedback.id"
             class="testimonial-card">
          <div class="user-avatar">{{ feedback.avatar }}</div>
          <div class="feedback-content">
            <p class="quote">{{ feedback.content }}</p>
            <div class="user-info">
              <span class="name">{{ feedback.name }}</span>
              <span class="date">{{ feedback.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      dailyCard: {
        name: '命运之轮',
        brief: '今天的运势显示机遇与变化并存，保持开放心态迎接挑战。'
      },
      divinationTypes: [
        {
          key: 'today',
          icon: '🌟',
          title: '今日运势',
          description: '解读你的今日运程，提供指引与建议',
          popularity: '12,345'
        },
        {
          key: 'love',
          icon: '💕',
          title: '姻缘占卜',
          description: '揭示你的感情运势，指引感情方向',
          popularity: '8,976'
        },
        {
          key: 'career',
          icon: '💼',
          title: '事业运势',
          description: '预测职场发展，助你把握机遇',
          popularity: '6,789'
        },
        {
          key: 'wealth',
          icon: '💰',
          title: '财运预测',
          description: '解读财富机遇，助你趋吉避凶',
          popularity: '9,876'
        }
      ],
      userFeedback: [
        {
          id: 1,
          avatar: '👤',
          name: '小明',
          content: '占卜结果非常准确，给了我很大的启发和帮助！',
          date: '2024-01-15'
        },
        {
          id: 2,
          avatar: '👤',
          name: '小红',
          content: '界面很漂亮，解读很详细，每天都会来看看运势。',
          date: '2024-01-14'
        },
        {
          id: 3,
          avatar: '👤',
          name: '小华',
          content: '很专业的占卜网站，推荐给身边的朋友们！',
          date: '2024-01-13'
        }
      ]
    }
  },
  methods: {
    startDivination(type) {
      this.$router.push(`/divination/${type}`)
    },
    goToDailyFortune() {
      this.$router.push('/divination/today')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: #fff5f5;

  .banner {
    background: linear-gradient(135deg, #b76e79 0%, #ff9eaa 100%);
    padding: 60px 20px;
    text-align: center;
    color: white;

    .banner-content {
      max-width: 800px;
      margin: 0 auto;

      h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.2em;
        opacity: 0.9;
      }
    }
  }

  section {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;

    .section-title {
      text-align: center;
      margin-bottom: 30px;

      h2 {
        color: #b76e79;
        font-size: 1.8em;
        margin-bottom: 10px;
      }

      .date {
        color: #666;
      }
    }
  }

  .daily-fortune {
    .fortune-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      cursor: pointer;
      transition: transform 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);

      &:hover {
        transform: translateY(-5px);
      }

      .card-icon {
        font-size: 40px;
        margin-bottom: 20px;
      }

      h3 {
        color: #b76e79;
        margin-bottom: 15px;
      }

      p {
        color: #666;
        margin-bottom: 20px;
      }

      .view-more {
        background: #b76e79;
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 25px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #a25964;
        }
      }
    }
  }

  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;

    .type-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);

      &:hover {
        transform: translateY(-5px);
      }

      .type-icon {
        font-size: 40px;
        margin-bottom: 20px;
      }

      h3 {
        color: #b76e79;
        margin-bottom: 15px;
      }

      p {
        color: #666;
        margin-bottom: 15px;
      }

      .popularity {
        color: #999;
        font-size: 0.9em;
      }
    }
  }

  .testimonials {
    .testimonial-slider {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;

      .testimonial-card {
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);

        .user-avatar {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .feedback-content {
          .quote {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.6;
          }

          .user-info {
            display: flex;
            justify-content: space-between;
            color: #999;
            font-size: 0.9em;

            .name {
              color: #b76e79;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-container {
    .banner {
      padding: 40px 20px;

      .banner-content {
        h1 {
          font-size: 2em;
        }
      }
    }

    .type-grid {
      grid-template-columns: 1fr;
    }

    .testimonial-slider {
      grid-template-columns: 1fr;
    }
  }
}
</style>