<template>
  <q-card class="col-xs-12 col-md-8 col-lg-6" flat>
    <q-card-section>
      <div
        class="row justify-center q-mt-md">
        {{ TemplateState.message }}
      </div>
      <div
        class="row justify-center q-mt-md">
        <q-btn
          label="Do Something"
          color="primary"
text-color="black"
          @click="() => DoSomething('done')"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {useTemplate} from "boot/plugins/template/template";

export default {
  name: "Template",
  setup() {
    const { TemplateState, DoSomething } = useTemplate()


    return {
      TemplateState,
      DoSomething
    }
  }
}
</script>
