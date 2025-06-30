<template>
  <div class="greetings">
    <el-form>
      <el-form-item label="姓名">
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <span>{{ fullName }}</span>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleChange">修改样式</el-button>
    <!-- <el-date-picker v-model="fieldvalue" type="datetime" :default-value="new Date()" placeholder="选择日期时间"></el-date-picker> -->
  </div>
</template>

<script setup lang="ts" name="HelloWorld">
  import { ref, computed } from 'vue';
  const name = ref('莫荣包')
  const age = ref(18)
  let fullName = computed(() => {
    return `${name.value} - ${age.value}`
  })
  function handleChange() {
  }
  /**
   * @param {character[][]} board
   * @param {string} word
   * @return {boolean}
   */
  /**
   * 1. 二叉树
   * 2. 满二叉树
   * 3. 完全二叉树
   * 4. 二叉搜索树
   * 5. 平衡二叉树
   * 6. 二叉树存储
   * 用数组来存储二叉树如何遍历的呢？
   * 如果父节点的数组下标是 i，那么它的左孩子就是 i * 2 + 1，右孩子就是 i * 2 + 2。
   * 如果子节点的数组下标是 i，那么它的父节点就是 (i - 1) / 2。
   * 7. 二叉树遍历
   * 7.1. 深度优先遍历：先往深走，遇到叶子节点再往回走。
   * 7.1.1. 前序遍历：根节点 -> 左子树 -> 右子树（中左右 --> 递归）
   * 7.1.2. 中序遍历：左子树 -> 根节点 -> 右子树（左中右 --> 递归）
   * 7.1.3. 后序遍历：左子树 -> 右子树 -> 根节点（左右中 --> 递归）
   * 7.2. 广度优先遍历：一层一层的去遍历
   * 
   * 
   * 前序遍历的递归
   * function preOrderTraversal(root) {
   *  if (!root) return []
   *  return [root.val, ...preOrderTraversal(root.left), ...preOrderTraversal(root.right)]
   * }
   * 
   * 
   * 
   * 
   * 
   */
</script>

<style scoped>

</style>
