<template>
  <div class="root">
    <header>YoWorld Art BETA</header>
    <nav>
      <router-link class="link" to="/">
        <Button type="primary" icon="home" size="large" block>Home</Button>
      </router-link>
      <router-link class="link" to="/info">
        <Button type="primary" icon="question-circle" size="large" block>How to use</Button>
      </router-link>
    </nav>

    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'

export default {
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
$primary: #5b76b5;
$secondary: #46609c;

// Transition
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(25px);
  opacity: 0;
}

.root {
  width: 450px;
}

header {
  font-size: 18px;
  background: $primary;
  color: white;
  padding: 10px;
  text-align: center;
}

nav {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .link {
    button {
      border-radius: 0;
      outline: none;
      border: none;
    }

    &.router-link-exact-active {
      button {
        background: $secondary;
      }
    }
  }
}
</style>
