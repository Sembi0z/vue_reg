<template>
  <header class="header">
    <div class="container">
      <router-link to="/">Регистрация заявок</router-link>
      <div>
        <router-link to="/">Журнал</router-link>
        <router-link to="/map/39.70732721786235/47.23260132167479/12"
          >Карта</router-link
        >
      </div>
    </div>
  </header>

 
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #007aff;
  z-index: 3;

  .container {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 28px;
    &:not(:last-child) {
      margin-right: 80px;
    }
  }
}
</style>
