<script setup lang="ts">
import {ref} from "vue";
import { Search } from '@element-plus/icons-vue'

const ipInput = ref('')
</script>

<template>
<div class="header-container">
  <div class="header-content">
    <el-text class="logo logo-font">
      IP-PN.COM
    </el-text>
<!--TODO Увеличить иконку-->
    <el-input
        v-model="ipInput"
        class="ip-input"
        size="large"
        placeholder="95.213.138.174"
        :prefix-icon="Search"
    />
    <div class="navigation">
      <el-text class="text-500 navigation-option">
        Documentation
      </el-text>
      <el-text class="text-500 navigation-option">
        Contacts
      </el-text>
      <el-text class="text-500 navigation-option-selected">
        Log in
      </el-text>
    </div>
  </div>
</div>
</template>

<style scoped>
@import '../assets/styles/fonts.css';

.logo {
  color: var(--text-dark)
}

.ip-input {
  width: 460px;
  height: 48px;
}

.navigation {
  display: flex;

  align-items: center;
  gap: 32px;
}

.navigation-option {
  color: var(--text-caption);
}

.navigation-option-selected {
  color: var(--text-dark);
}

.header-content {
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 100px;
}

.header-container {
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100px;

  background-color: var(--background-color);

  border-radius: 0 0 16px 16px;
}
</style>