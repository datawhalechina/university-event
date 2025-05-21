<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = '请填写邮箱和密码'
    return
  }
  
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    // 这里应该是实际的API调用，现在使用模拟数据
    // const response = await axios.post('/api/login', { email: email.value, password: password.value })
    
    // 模拟成功登录
    setTimeout(() => {
      const userData = { id: 1, email: email.value, name: email.value.split('@')[0] }
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2)
      
      userStore.login(userData, token)
      router.push('/')
      isLoading.value = false
    }, 1000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '登录失败，请重试'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>登录</h1>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">邮箱</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="请输入邮箱"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="请输入密码"
            required
          />
        </div>
        
        <button type="submit" :disabled="isLoading" class="login-button">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <div class="register-link">
        还没有账号？ <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

h1 {
  color: #1976d2;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 500;
  color: #333;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.login-button {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #1565c0;
}

.login-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.register-link a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>