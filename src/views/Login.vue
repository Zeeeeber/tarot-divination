/* eslint-disable */
<template>
  <div class="login-container">
    <div class="login-box">
      <h2>星运占卜</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            type="text"
            v-model="form.phone"
            placeholder="请输入手机号"
            @input="validatePhone"
            required
          />
          <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            @input="validatePassword"
            required
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
        <div class="form-options">
          <label class="remember-me">
            <input 
              type="checkbox" 
              v-model="form.rememberMe"
            > 记住密码
          </label>
          <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">忘记密码？</a>
        </div>
        <button 
          type="submit" 
          class="submit-btn" 
          :disabled="!isFormValid || isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div class="links">
        <router-link to="/register">还没有账号？立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        rememberMe: false
      },
      errors: {
        phone: "",
        password: ""
      },
      isLoading: false
    };
  },
  computed: {
    isFormValid() {
      return this.form.phone && 
             this.form.password && 
             !this.errors.phone && 
             !this.errors.password;
    }
  },
  created() {
    // 页面加载时检查是否有保存的登录信息
    this.checkSavedCredentials();
  },
  methods: {
    checkSavedCredentials() {
      const savedCredentials = localStorage.getItem('userCredentials');
      if (savedCredentials) {
        const { phone, password } = JSON.parse(savedCredentials);
        this.form.phone = phone;
        this.form.password = password;
        this.form.rememberMe = true;
      }
    },
    validatePhone() {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!this.form.phone) {
        this.errors.phone = "手机号不能为空";
      } else if (!phoneRegex.test(this.form.phone)) {
        this.errors.phone = "请输入正确的手机号";
      } else {
        this.errors.phone = "";
      }
    },
    validatePassword() {
      if (!this.form.password) {
        this.errors.password = "密码不能为空";
      } else if (this.form.password.length < 6) {
        this.errors.password = "密码长度不能少于6位";
      } else {
        this.errors.password = "";
      }
    },
    handleForgotPassword() {
      // 暂时用 alert 提示
      alert('忘记密码功能开发中...');
    },
    async handleLogin() {
      this.validatePhone();
      this.validatePassword();
      
      if (this.isFormValid) {
        try {
          this.isLoading = true;
          
          // 保存或清除登录信息
          if (this.form.rememberMe) {
            localStorage.setItem('userCredentials', JSON.stringify({
              phone: this.form.phone,
              password: this.form.password
            }));
          } else {
            localStorage.removeItem('userCredentials');
          }

          // 模拟登录请求
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 保存登录状态
          localStorage.setItem('isLoggedIn', 'true');
          
          // 登录成功后跳转
          this.$router.push('/home');
          
        } catch (error) {
          console.error('登录失败：', error);
          alert('登录失败，请重试');
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff5f5;

  .login-box {
    width: 90%;
    max-width: 400px;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    h2 {
      color: #b76e79;
      text-align: center;
      margin-bottom: 30px;
      font-size: 24px;
    }

    .form-group {
      margin-bottom: 20px;

      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ffe4e1;
        border-radius: 8px;
        font-size: 16px;

        &:focus {
          outline: none;
          border-color: #ffc0cb;
        }
      }
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      .remember-me {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        cursor: pointer;

        input[type="checkbox"] {
          cursor: pointer;
        }
      }

      .forgot-password {
        color: #b76e79;
        text-decoration: none;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .submit-btn {
      width: 100%;
      padding: 12px;
      background-color: #ffc0cb;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #b76e79;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.7;
        
        &:hover {
          background-color: #ccc;
        }
      }
    }

    .links {
      text-align: center;
      margin-top: 20px;

      a {
        color: #b76e79;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .error-message {
      color: #ff4d4f;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }
  }
}
</style>