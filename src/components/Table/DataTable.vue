<template>
  <div class="table">
    <div class="tableName">Заявки</div>
    <div class="tableButtons">
      <div>
        <BackButton
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        />
      </div>
      <div class="pagination">
        <div
          v-for="page in totalPages"
          :key="page"
          :class="page === currentPage ? 'active' : ''"
          @click="goToPage(page)"
        >
          {{ page }}
        </div>
      </div>
      <div>
        <NextButton
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        />
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th class="thMain">
            Заявитель
          </th>
          <th class="thMain">
            Приоритет
          </th>
          <th class="thMain">
            Тип аварии
          </th>
          <th class="thMain">
            Адрес
          </th>
          <th class="thMain">
            Номер телефона
          </th>
          <th class="thMain">
            Действия
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td class="tdParent">
            <div class="tdContent">
              {{ user.name }}
            </div>
          </td>
          <td class="tdParent">
            <div class="tdContent">
              {{ user.prioritet }}
            </div>
          </td>
          <td class="tdParent">
            <div class="tdContent">
              {{ user.tip }}
            </div>
          </td>
          <td class="tdParent">
            <div class="tdContent">
              {{ user.address }}
            </div>
          </td>
          <td class="tdParent">
            <div class="tdContent">
              {{ user.phone }}
            </div>
          </td>
          <td class="tdParent">
            <div class="actions">
              <div @click="$emit('deleteUser', user.id)">
                <img src="@/assets/trash-2.svg" />
              </div>
              <router-link :to="'/edit/'+user.id"><img src="@/assets/edit-2.svg" /></router-link>
            </div>
          </td>
        </tr>
        <tr v-if="paginatedUsers.length === 0">
          <td class="tdParent">
            <div class="tdContent">
              No users found
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { User } from "../../types/index";

const props = defineProps({
  users: {
    type: Array as () => User[],
    required: true,
  },
});

const perPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.users.length / perPage));

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  return props.users.slice(startIndex, endIndex);
});

function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  } else if (page < 1) {
    currentPage.value = 1;
  } else {
    currentPage.value = totalPages.value;
  }
}

onMounted(() => {
  currentPage.value = 1; // Reset current page when component is mounted
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  div {
    height: 40px;
    width: 40px;
    color: #667085;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .active {
    color: #667085;
    background: #f9f5ff;
  }
}
.table {
  padding: 20px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #eaecf0;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.tableName {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
}

.tableButtons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.thMain {
  border-bottom: 1px solid #e2e2e2;
  padding: 15px 0;
  font-size: 12px;
  color: #667085;
  background: #f9fbfd;
  text-align: left;

  &:nth-child(1) {
    padding-left: 20px;
  }
}

.tdParent {
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  padding: 15px 0;

  &:nth-child(1) {
    padding-left: 20px;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 28px;
}

.actions div img {
  cursor: pointer;
}
</style>
