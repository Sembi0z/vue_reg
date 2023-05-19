<template>
  <button class="btn">
    <div class="text">Следующая</div>
    <div><img src="@/assets/arrow-right.svg" /></div>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  padding: 8px 14px;
}
.text {
  font-weight: 500;
  font-family: sans-serif;
  font-size: 14px;
  color: black;
}
</style>
