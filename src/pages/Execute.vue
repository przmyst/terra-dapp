<template>
  <q-page
    class="q-pa-lg"
  >
    <div class="row justify-center">
      <Execute
        class="col-6"
      />
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import Execute from "components/Execute.vue"

export default defineComponent({
  name: 'ExecutePage',
  components: {Execute}
})
</script>

<style scoped>

</style>

