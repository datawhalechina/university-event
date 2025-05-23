<script setup>
import { ref } from 'vue'
import CreateEventForm from '../components/CreateEventForm.vue'
import EditPrizeForm from '../components/EditPrizeForm.vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const prizeDialogVisible = ref(false)
const eventList = ref([])
const currentEvent = ref(null)

const handleCreateEvent = (eventData) => {
  // 将新创建的活动添加到列表中
  eventList.value.push({
    ...eventData,
    id: Date.now(), // 临时ID，实际应用中应该使用后端返回的ID
    createdAt: new Date().toLocaleString(),
    prizes: [] // 初始化奖品列表为空数组
  })
  
  ElMessage({
    type: 'success',
    message: '活动已添加到列表中'
  })
}

const openCreateDialog = () => {
  dialogVisible.value = true
}

const openPrizeDialog = (event) => {
  currentEvent.value = event
  prizeDialogVisible.value = true
}

const handlePrizeUpdate = (prizes) => {
  if (currentEvent.value) {
    currentEvent.value.prizes = prizes
    ElMessage({
      type: 'success',
      message: '奖品信息已更新'
    })
  }
}
</script>

<template>
  <div class="create-event-container">
    <div class="page-header">
      <h1>活动管理</h1>
      <el-button type="primary" @click="openCreateDialog">
        <el-icon><Plus /></el-icon>创建活动
      </el-button>
    </div>
    
    <div class="event-list" v-if="eventList.length > 0">
      <el-table :data="eventList" style="width: 100%">
        <el-table-column prop="title" label="活动名称" />
        <el-table-column prop="type" label="活动类型" width="120" />
        <el-table-column prop="location" label="活动地点" width="150" />
        <el-table-column label="活动时间" width="180">
          <template #default="scope">
            {{ new Date(scope.row.startDate).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="maxParticipants" label="人数上限" width="100" />
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button link type="primary">查看</el-button>
            <el-button link type="primary">编辑</el-button>
            <el-button link type="primary" @click="openPrizeDialog(scope.row)">
              <el-icon><Trophy /></el-icon>编辑奖品
            </el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <el-empty v-else description="暂无活动，请点击创建按钮添加活动" />
    
    <!-- 创建活动弹框 -->
    <CreateEventForm 
      v-model:visible="dialogVisible"
      @created="handleCreateEvent"
    />
    
    <!-- 编辑奖品弹框 -->
    <EditPrizeForm
      v-model:visible="prizeDialogVisible"
      :event="currentEvent"
      @updated="handlePrizeUpdate"
    />
  </div>
</template>

<style scoped>
.create-event-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  color: #1976d2;
  margin: 0;
}

.event-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style>
