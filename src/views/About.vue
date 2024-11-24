/* eslint-disable */
<template>
  <div class="about-container">
    <header class="header">
      <div class="back-btn" @click="$router.go(-1)">
        <span class="icon">←</span> 返回
      </div>
      <h1>关于星运占卜</h1>
    </header>

    <main class="main-content">
      <div class="about-section">
        <h2>占卜说明</h2>
        <div class="content-card">
          <h3>🔮 占卜类型</h3>
          <ul>
            <li><strong>今日运势：</strong>解读你的今日运程，为你指明方向</li>
            <li><strong>姻缘占卜：</strong>揭示你的感情运势，指引感情发展</li>
            <li><strong>事业运势：</strong>预测你的职场发展，助你把握机遇</li>
            <li><strong>财运预测：</strong>分析你的财运走向，提供理财建议</li>
          </ul>
        </div>

        <div class="content-card">
          <h3>📖 使用说明</h3>
          <ol>
            <li>选择想要占卜的类型</li>
            <li>保持平静的心态，专注于你的问题</li>
            <li>从牌阵中选择一张最吸引你的牌</li>
            <li>仔细阅读解读结果和建议</li>
            <li>可以保存结果以便日后查看</li>
          </ol>
        </div>

        <div class="content-card">
          <h3>⭐️ 注意事项</h3>
          <ul>
            <li>占卜结果仅供参考，关键决策还需理性判断</li>
            <li>建议每天占卜不超过3次，保持适度</li>
            <li>保持积极乐观的心态，相信美好的事物</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style lang="scss" scoped>
.about-container {
  min-height: 100vh;
  background-color: #fff5f5;

  .header {
    background-color: white;
    padding: 15px 40px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);

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
      color: #b76e79;
      margin: 0 auto;
      font-size: 24px;
    }
  }

  .main-content {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;

    .about-section {
      h2 {
        color: #b76e79;
        margin-bottom: 30px;
        text-align: center;
      }

      .content-card {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        margin-bottom: 30px;

        h3 {
          color: #b76e79;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        ul, ol {
          padding-left: 20px;
          
          li {
            color: #666;
            line-height: 1.8;
            margin-bottom: 15px;

            &:last-child {
              margin-bottom: 0;
            }

            strong {
              color: #b76e79;
            }
          }
        }
      }
    }
  }
}
</style>