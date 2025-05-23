<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'created'])

const eventForm = reactive({
  title: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  maxParticipants: 100,
  type: '线下活动',
})

const eventTypes = [
  { value: '线下活动', label: '线下活动' },
  { value: '线上活动', label: '线上活动' },
  { value: '混合活动', label: '混合活动' },
]

const formRef = ref(null)
const isLoading = ref(false)

const rules = {
  title: [
    { required: true, message: '请输入活动标题', trigger: 'blur' },
    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' },
  ],
  description: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
  location: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
  startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
  endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
  type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
}

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true

      // 这里添加提交表单的逻辑，例如发送API请求
      console.log('提交的表单数据:', eventForm)

      // 模拟API请求
      setTimeout(() => {
        isLoading.value = false
        ElMessage({
          type: 'success',
          message: '活动创建成功！',
        })

        // 通知父组件创建成功
        emit('created', { ...eventForm })

        // 关闭对话框
        closeDialog()

        // 重置表单
        resetForm(formEl)
      }, 1000)
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写表单！',
      })
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const validateEndDate = (rule, value, callback) => {
  if (value && eventForm.startDate && new Date(value) < new Date(eventForm.startDate)) {
    callback(new Error('结束日期不能早于开始日期'))
  } else {
    callback()
  }
}

const closeDialog = () => {
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog
    title="创建活动"
    :model-value="props.visible"
    @update:model-value="emit('update:visible', $event)"
    width="60%"
    :close-on-click-modal="false"
    @closed="resetForm(formRef)"
  >
    <el-form
      ref="formRef"
      :model="eventForm"
      :rules="rules"
      label-width="120px"
      label-position="top"
    >
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="eventForm.title" placeholder="请输入活动标题" />
      </el-form-item>

      <el-form-item label="活动类型" prop="type">
        <el-select v-model="eventForm.type" placeholder="请选择活动类型" style="width: 100%">
          <el-option
            v-for="item in eventTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="活动地点" prop="location">
        <el-input v-model="eventForm.location" placeholder="请输入活动地点" />
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker
              v-model="eventForm.startDate"
              type="datetime"
              placeholder="选择开始日期时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker
              v-model="eventForm.endDate"
              type="datetime"
              placeholder="选择结束日期时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="最大参与人数" prop="maxParticipants">
        <el-input-number
          v-model="eventForm.maxParticipants"
          :min="1"
          :max="1000"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="活动描述" prop="description">
        <el-input
          v-model="eventForm.description"
          type="textarea"
          :rows="4"
          placeholder="请输入活动描述"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)" :loading="isLoading">
          创建活动
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
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
