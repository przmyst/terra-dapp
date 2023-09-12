<template>
  <q-page
    class="q-pa-lg"
  >
    <div class="row justify-center">
      <Query />
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import Query from "components/Query.vue"

export default defineComponent({
  name: 'QueryPage',
  components: {Query}
})
</script>

<style scoped>

</style>

