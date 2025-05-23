<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()

const loginForm = ref({
  email: '',
  password: ''
})
const formRef = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
  ]
}

const login = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true
      errorMessage.value = ''
      
      try {
        await userStore.login(loginForm.value.email, loginForm.value.password)
        router.push('/')
      } catch (error) {
        errorMessage.value = error.message || '登录失败，请检查邮箱和密码'
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h1>登录</h1>
      </template>
      
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        :closable="false"
        class="mb-4"
      />
      
      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="loginForm.email"
            placeholder="请输入邮箱"
            prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            :loading="isLoading" 
            @click="login(formRef)"
            class="login-button"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="register-link">
        还没有账号？ <router-link to="/register">立即注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--el-bg-color-page);
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-card :deep(.el-card__header) {
  padding: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 24px;
  color: var(--el-color-primary);
}

.mb-4 {
  margin-bottom: 16px;
}

.login-button {
  width: 100%;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  color: var(--el-text-color-secondary);
}

.register-link a {
  color: var(--el-color-primary);
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>