/* eslint-disable */
<template>
  <div class="register-container">
    <div class="register-box">
      <h2>用户注册</h2>
      <form @submit.prevent="handleRegister">
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
        <div class="form-group">
          <input
            type="password"
            v-model="form.confirmPassword"
            placeholder="请确认密码"
            @input="validateConfirmPassword"
            required
          />
          <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>
        <div class="form-group">
          <input
            type="date"
            v-model="form.birthday"
            placeholder="请选择生日"
            @input="validateBirthday"
            required
          />
          <span class="error-message" v-if="errors.birthday">{{ errors.birthday }}</span>
        </div>
        <button type="submit" class="submit-btn" :disabled="!isFormValid">注册</button>
      </form>
      <div class="links">
        <router-link to="/login">已有账号？立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        confirmPassword: "",
        birthday: ""
      },
      errors: {
        phone: "",
        password: "",
        confirmPassword: "",
        birthday: ""
      }
    };
  },
  computed: {
    isFormValid() {
      return this.form.phone && 
             this.form.password && 
             this.form.confirmPassword &&
             this.form.birthday &&
             !this.errors.phone && 
             !this.errors.password &&
             !this.errors.confirmPassword &&
             !this.errors.birthday;
    }
  },
  methods: {
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
      if (this.form.confirmPassword) {
        this.validateConfirmPassword();
      }
    },
    validateConfirmPassword() {
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = "请确认密码";
      } else if (this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = "两次输入的密码不一致";
      } else {
        this.errors.confirmPassword = "";
      }
    },
    validateBirthday() {
      if (!this.form.birthday) {
        this.errors.birthday = "请选择生日";
      } else {
        const birthDate = new Date(this.form.birthday);
        const today = new Date();
        if (birthDate > today) {
          this.errors.birthday = "生日不能晚于今天";
        } else {
          this.errors.birthday = "";
        }
      }
    },
    handleRegister() {
      this.validatePhone();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateBirthday();
      
      if (this.isFormValid) {
        console.log("注册信息：", this.form);
        // 这里后续会添加实际的注册逻辑
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// ... 保持原有样式 ...

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.submit-btn {
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    
    &:hover {
      background-color: #ccc;
    }
  }
}
</style>