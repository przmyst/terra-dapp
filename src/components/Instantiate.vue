<template>
  <q-card
    v-if="WalletState.isConnected"
  >
    <q-card-section v-if="TerraState.txhash">
      {{TerraState.txhash}}
    </q-card-section>

    <q-card-section
      class="q-gutter-md"
    >
      <q-input
        label="Admin Address"
        v-model="TerraState.model.admin"
        outlined
      />
      <q-input
        label="Contract Label"
        v-model="TerraState.model.label"
        outlined
      />
      <q-input
        label="Contract Code"
        v-model="TerraState.model.code"
        outlined
        type="number"
      />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        label="Instantiate"
        color="positive"
        @click="Instantiate"
        text-color="black"
        :loading="TerraState.loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'
import {useWallet} from "boot/plugins/wallet/wallet";
import {useTerra} from "boot/plugins/terra/terra";

export default defineComponent({
  name: 'Instantiate',
  setup() {

    const {WalletState} = useWallet()
    const {TerraState, Instantiate} = useTerra()

    return {
      WalletState,
      TerraState,
      Instantiate
    }
  }
})
</script>
