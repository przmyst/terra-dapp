<template>
  <q-page
    class="q-pa-lg"
  >
    <div class="row justify-center">
      <Template/>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import Template from "components/Template.vue";

export default defineComponent({
  name: 'TemplatePage',
  components: {Template},

  setup() {


    return {}
  }
})
</script>

<style scoped>

</style>

