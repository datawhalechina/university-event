<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const formRef = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.value.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, message: '用户名长度不能少于2个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
}

const register = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true
      errorMessage.value = ''
      
      try {
        await userStore.register(
          registerForm.value.name,
          registerForm.value.email,
          registerForm.value.password
        )
        router.push('/')
      } catch (error) {
        errorMessage.value = error.message || '注册失败，请稍后再试'
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <h1>注册</h1>
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
        :model="registerForm"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <el-form-item label="用户名" prop="name">
          <el-input 
            v-model="registerForm.name"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            :loading="isLoading" 
            @click="register(formRef)"
            class="register-button"
          >
            {{ isLoading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-link">
        已有账号？ <router-link to="/login">立即登录</router-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--el-bg-color-page);
}

.register-card {
  width: 100%;
  max-width: 400px;
}

.register-card :deep(.el-card__header) {
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

.register-button {
  width: 100%;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  color: var(--el-text-color-secondary);
}

.login-link a {
  color: var(--el-color-primary);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>