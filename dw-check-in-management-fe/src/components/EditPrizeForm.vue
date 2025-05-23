<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  event: {
    type: Object,
    default: null,
  }
})

const emit = defineEmits(['update:visible', 'updated'])

const prizeForm = reactive({
  name: '',
  level: '',
  quantity: 1
})

const prizeList = ref([])
const formRef = ref(null)
const isLoading = ref(false)
const editingIndex = ref(-1)

// 奖品等级选项
const prizeLevel = [
  { value: '一等奖', label: '一等奖' },
  { value: '二等奖', label: '二等奖' },
  { value: '三等奖', label: '三等奖' },
  { value: '纪念奖', label: '纪念奖' },
]

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入奖品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  level: [
    { required: true, message: '请选择奖品等级', trigger: 'change' }
  ],
  quantity: [
    { required: true, message: '请输入奖品数量', trigger: 'blur' },
    { type: 'number', min: 1, message: '数量必须大于0', trigger: 'blur' }
  ]
}

// 监听事件变化，更新奖品列表
watch(() => props.event, (newVal) => {
  if (newVal && newVal.prizes) {
    prizeList.value = [...newVal.prizes]
  } else {
    prizeList.value = []
  }
}, { immediate: true })

// 添加奖品
const addPrize = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate((valid) => {
    if (valid) {
      if (editingIndex.value >= 0) {
        // 更新现有奖品
        prizeList.value[editingIndex.value] = { ...prizeForm }
        editingIndex.value = -1
      } else {
        // 添加新奖品
        prizeList.value.push({
          ...prizeForm,
          id: Date.now()
        })
      }
      
      // 重置表单
      resetForm(formEl)
      
      ElMessage({
        type: 'success',
        message: '奖品已添加'
      })
    }
  })
}

// 编辑奖品
const editPrize = (index) => {
  const prize = prizeList.value[index]
  Object.assign(prizeForm, prize)
  editingIndex.value = index
}

// 删除奖品
const removePrize = (index) => {
  prizeList.value.splice(index, 1)
  ElMessage({
    type: 'success',
    message: '奖品已删除'
  })
}

// 保存所有奖品
const savePrizes = () => {
  isLoading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    isLoading.value = false
    emit('updated', prizeList.value)
    closeDialog()
  }, 500)
}

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  editingIndex.value = -1
}

// 关闭对话框
const closeDialog = () => {
  emit('update:visible', false)
  resetForm(formRef.value)
}

// 计算对话框标题
const dialogTitle = computed(() => {
  return props.event ? `编辑 "${props.event.title}" 的奖品` : '编辑奖品'
})
</script>

<template>
  <el-dialog
    :title="dialogTitle"
    :model-value="props.visible"
    @update:model-value="emit('update:visible', $event)"
    width="60%"
    :close-on-click-modal="false"
    @closed="resetForm(formRef)"
  >
    <div class="prize-form-container">
      <el-form
        ref="formRef"
        :model="prizeForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="奖品名称" prop="name">
          <el-input v-model="prizeForm.name" placeholder="请输入奖品名称" />
        </el-form-item>

        <el-form-item label="奖品等级" prop="level">
          <el-select v-model="prizeForm.level" placeholder="请选择奖品等级" style="width: 100%">
            <el-option
              v-for="item in prizeLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="奖品数量" prop="quantity">
          <el-input-number
            v-model="prizeForm.quantity"
            :min="1"
            :max="1000"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addPrize(formRef)">
            {{ editingIndex >= 0 ? '更新奖品' : '添加奖品' }}
          </el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="prize-list" v-if="prizeList.length > 0">
        <h3>奖品列表</h3>
        <el-table :data="prizeList" style="width: 100%">
          <el-table-column prop="name" label="奖品名称" />
          <el-table-column prop="level" label="奖品等级" width="120" />
          <el-table-column prop="quantity" label="奖品数量" width="100" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button link type="primary" @click="editPrize(scope.$index)">编辑</el-button>
              <el-button link type="danger" @click="removePrize(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <el-empty v-else description="暂无奖品，请添加奖品" />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="savePrizes" :loading="isLoading">
          保存奖品设置
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.prize-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.prize-list {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #1976d2;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}

:deep(.el-input-number .el-input__inner) {
  text-align: left;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>