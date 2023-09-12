<template>
  <q-page
    class="q-pa-lg"
  >
    <div class="row justify-center">
      <Instantiate
        class="col-6"
      />
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import Instantiate from "components/Instantiate.vue"

export default defineComponent({
  name: 'InstantiatePage',
  components: {Instantiate}
})
</script>

<style scoped>

</style>

