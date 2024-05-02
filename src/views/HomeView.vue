<template>
  <el-container>
    <el-header class="header">
      <HeaderComponent/>
    </el-header>
    <el-main class="content-container">
      <IpsTable v-if="ipStore.hasIpsData"/>
      <GetIpsForm v-else/>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import {useIpStore} from "@/store/ip";
import IpsTable from "@/components/IpsTable.vue";
import GetIpsForm from "@/components/GetIpsForm.vue";

const ipStore = useIpStore()
</script>

<style  scoped>
.content-container {
  padding: 100px;
}

.header {
  padding: 0;
}
</style>