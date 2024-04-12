<template>
  <h2 class="section-title">Як зробити замовлення?</h2>
  <div class="rules-container">
    <div class="rule">
      <img src="@/assets/images/logo/logo-order1.png" />
      <p>Обирайте апетитні суші чи інші страви в меню, додаєте їх в кошик</p>
    </div>
    <div class="rule">
      <img src="@/assets/images/logo/logo-order2.png" />
      <p>Оформлюєте замовлення через кошик, вносите Ваші контактні дані</p>
    </div>
    <div class="rule">
      <img src="@/assets/images/logo/logo-order3.png" />
      <p>Наш менеджер перезвонить Вам для уточнення деталей</p>
    </div>
    <div class="rule">
      <img src="@/assets/images/logo/logo-order4.png" />
      <p>Очікуєте кур'єра з Вашим замовленням і насолоджуєтесь смаком</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .rules-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;
  }
  .rule {
    text-align: center;
    font-size: clamp(0.875rem, 0.75rem + 0.625vw, 1.25rem);
    flex: 1 1 200px;
    img {
      display: block;
      margin: 0.5rem auto;
      width: clamp(3.125rem, 2.083rem + 5.208vw, 6.25rem);
    }
  }
</style>
