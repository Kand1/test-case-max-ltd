<script setup lang="ts">
import {computed, h, markRaw, ref, VNode, watch} from "vue";
import {useIpStore} from "@/store/ip";
import { debounce } from 'vue-debounce';
import { Search, Check, Close, Refresh } from '@element-plus/icons-vue'
import {IpData, IpDataStatus, IPS_QUERY_PARAM} from "@/core/entities/ip";
import {useRoute, useRouter} from "vue-router";

const LAST_COLUMN_INDEX = 4

const ipStore = useIpStore()

const searchInput = ref('')
const selectedIpData = ref<IpData[]>([])

const route = useRoute()
const router = useRouter()

const tableData = computed(() => {
  return ipStore.ipsDataArray
})

const filteredTableData = ref(tableData.value)

const filterTableData = () => {
  const search = searchInput.value.toLowerCase()

  filteredTableData.value = tableData.value.filter((data) => {
    return data.ip.toLowerCase().includes(search) ||
        data.country.toLowerCase().includes(search) ||
        data.city.toLowerCase().includes(search)
  })
}

const filterSearchTableData = debounce(filterTableData, 400)

const handleSelectionChange = (value: IpData[]) => {
  selectedIpData.value = value
}

const whenDeleteClick = async () => {
  const ipsToDelete = selectedIpData.value.map((value) => value.ip)
  const newIps = tableData.value.map((value) => value.ip).filter((ip) => !ipsToDelete.includes(ip))
  await setQuery(newIps)
  ipStore.deleteIpsData(selectedIpData.value)
}

const setQuery = async (ips: string[]) => {
  const encodedArray = encodeURIComponent(JSON.stringify(ips))

  await router.push({
    path: route.path,
    query: {
      [IPS_QUERY_PARAM]: ips.length ? encodedArray : undefined,
    },
  })
}

watch(tableData, () => filterTableData())

const mapIpStatusToIcon: Record<IpDataStatus, VNode> = {
  [IpDataStatus.Loaded]: Check,
  [IpDataStatus.Error]: Close,
  [IpDataStatus.Pending]: Refresh,
}

const mapIpStatusToStyles: Record<IpDataStatus, string> = {
  [IpDataStatus.Loaded]: 'loaded',
  [IpDataStatus.Error]: 'error',
  [IpDataStatus.Pending]: 'pending',
}

const mapIpStatusToTooltipText: Record<IpDataStatus, string> = {
  [IpDataStatus.Loaded]: 'Успешно',
  [IpDataStatus.Error]: 'Не успешно',
  [IpDataStatus.Pending]: 'В процессе',
}

// TODO Почему то оно не рабоатет
const getCellClassName = (cell) => {
  if (cell.columnIndex === LAST_COLUMN_INDEX) {
    return `${mapIpStatusToStyles[cell.row.status]} status-cell`
  }
}

</script>

<template>
<div class="container">
  <el-input
      class="inputSearch"
      v-model="searchInput"
      @input="filterSearchTableData"
      size="large"
      placeholder="Поиск по таблице..."
      :prefix-icon="Search"
  />
<!--TODO Не разобрался как переназначить хедер таблице  -->
  <div class="delete-button">
    <el-button
        v-show="selectedIpData.length"
        type="danger"
        plain
        @click="whenDeleteClick"
    >
        Удалить выбранные
    </el-button>
  </div>
  <el-table
      :data="filteredTableData"
      class="table"
      border
      @selection-change="handleSelectionChange"
      :cell-class-name="getCellClassName"
  >
    <el-table-column type="selection"/>
    <el-table-column
        label="IP"
        prop="ip"
    />
    <el-table-column label="Country" prop="country"/>
    <el-table-column label="City/Town" prop="city"/>
    <el-table-column class="icon-column" width="48" class-name="icon-cell">
      <template #default="scope">
        <el-tooltip
            effect="light"
            placement="top"
            :content="mapIpStatusToTooltipText[scope.row.status]"
        >
          <div :class="`icon-cell ${mapIpStatusToStyles[scope.row.status]}`">
            <component class="icon" :is="mapIpStatusToIcon[scope.row.status]"/>
          </div>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style scoped>
.container {
  position: relative;

  display: flex;

  flex-direction: column;

  gap: 16px;
}

.inputSearch {
  width: 620px;
}

.table {
  width: 100%;
}

.icon {
  width: 16px;
  height: 16px;
}

.icon-cell {
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.delete-button {
  position: absolute;

  z-index: 100;

  top: 60px;
  left: 500px;
}

.loaded {
  color: var(--el-color-success-dark-2)
}

.pending {
  color: var(--el-color-warning-dark-2)
}

.error {
  color: var(--el-color-danger-dark-2)
}

.loaded:hover {
  background-color: var(--el-color-success-light-8) !important;
}

.pending:hover {
  background-color: var(--el-color-warning-light-8)
}

.error:hover {
  background-color: var(--el-color-danger-light-8)
}
</style>