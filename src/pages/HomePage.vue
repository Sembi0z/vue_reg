<template>
  <div class="container">
    <div class="parent">
      <router-link to="/add">
        <BaseButton variant="blue">Новая заявка</BaseButton>
      </router-link>
      <div><BaseSearch @filter-users="filterUsers" /></div>
    </div>
    <div class="table">
      <DataTable :users="users" @delete-user="deleteUser" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { User } from "../types/index";
import { useStore } from "vuex";

const store = useStore();

const users = ref<User[]>([]);
const storeUsers = computed(() => store.state.users);

onMounted(() => {
  users.value = store.state.users;
});

function filterUsers(search: string): void {
  users.value = storeUsers.value.filter((user: User) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
}

function deleteUser(id: number): void {
  store.commit("deleteUser", id);
  users.value = store.state.users;
}
</script>

<style lang="scss" scoped>
.parent {
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table {
  margin-top: 40px;
}
</style>
