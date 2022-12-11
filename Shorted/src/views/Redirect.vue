<template>
    <div>
        <h1 class="flex justify-center">Wait a sec</h1>
    </div>
</template>

<script>
  import {useApp} from '../stores/index';
  export default {
    setup() {
      const App = useApp();
      return {
        App,
      }
    },
    created() {
      this.App.direct();
    },
  }
</script>

