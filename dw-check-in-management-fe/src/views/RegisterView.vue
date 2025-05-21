<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const register = async () => {
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = '请填写所有必填字段'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }
  
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    // 这里应该是实际的API调用，现在使用模拟数据
    // const response = await axios.post('/api/register', { 
    //   name: name.value,
    //   email: email.value, 
    //   password: password.value 
    // })
    
    // 模拟成功注册
    setTimeout(() => {
      const userData = { id: 1, name: name.value, email: email.value }
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2)
      
      userStore.login(userData, token)
      router.push('/')
      isLoading.value = false
    }, 1000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '注册失败，请重试'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h1>注册</h1>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="name">用户名</label>
          <input 
            id="name" 
            v-model="name" 
            type="text" 
            placeholder="请输入用户名"
            required
          />
        </div>
        
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
        
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input 
            id="confirm-password" 
            v-model="confirmPassword" 
            type="password" 
            placeholder="请再次输入密码"
            required
          />
        </div>
        
        <button type="submit" :disabled="isLoading" class="register-button">
          {{ isLoading ? '注册中...' : '注册' }}
        </button>
      </form>
      
      <div class="login-link">
        已有账号？ <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.register-card {
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

.register-form {
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

.register-button {
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

.register-button:hover {
  background-color: #1565c0;
}

.register-button:disabled {
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

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>