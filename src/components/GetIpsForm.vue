<script setup lang="ts">
  import {useGetIpsDataUseCase} from "@/core/use-cases/get-ips-data";
  import {computed, onMounted, ref} from "vue";
  import { MAIN_COLOR } from '../assets/styles/colors'
  import {useRoute, useRouter} from "vue-router";
  import {IPS_QUERY_PARAM} from "@/core/entities/ip";

  const getIpDataUseCase = useGetIpsDataUseCase()

  const route = useRoute()
  const router = useRouter()

  const ipsPlainText = ref('7.7.7.7\n' +
      '8.8.8.8\n' +
      '24.48.0.1\n' +
      '195.16.32.227\n')
  const selectedIps = computed(() => {
    const ips = ipsPlainText.value.split('\n').map((ip) => ip.trim())

    return ips.filter((ip) => ip.length)
  })

  onMounted(async () => {
    try {
      const decodedIps = JSON.parse(decodeURIComponent(route.query[IPS_QUERY_PARAM]))
      if (Array.isArray(decodedIps)) {
        await getIpDataUseCase.getIpsData(decodedIps)
      }
    } catch (e) {
      console.error(e)
    }
  })

  const setQuery = () => {
    const encodedArray = encodeURIComponent(JSON.stringify(selectedIps.value))

    router.push({
      path: route.path,
      query: {
        [IPS_QUERY_PARAM]: encodedArray,
      },
    })
  }

  const whenFormSubmit = () => {
    setQuery()
    getIpDataUseCase.getIpsData(selectedIps.value)
  }
</script>

<template>
<div class="container">
  <el-input
      size="large"
      class="textarea"
      v-model="ipsPlainText"
      type="textarea"
      placeholder="Введите IP адреса"
      rows="4.5"
  />
  <el-button
      class="button"
      size="large"
      @click="whenFormSubmit"
      type="info"
      :color="MAIN_COLOR"
  >
    <div class="text-400">
      Отправить
    </div>
  </el-button>
</div>
</template>

<style scoped>
.button {
  width: fit-content;
}

.container {
  display: flex;

  flex-direction: column;

  gap: 16px;
}

.textarea {
  max-width: 620px;
}
</style>