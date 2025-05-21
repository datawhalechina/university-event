import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
  const isLoggedIn = computed(() => !!token.value)

  // 登录方法
  function login(userData, userToken) {
    user.value = userData
    token.value = userToken
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userToken)
  }

  // 注销方法
  function logout() {
    user.value = {}
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, token, isLoggedIn, login, logout }
})