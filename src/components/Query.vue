<template>
  <q-card
    v-if="WalletState.isConnected"
  >
    <q-card-section v-if="TerraState.txhash">
      {{TerraState.txhash}}
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        label="Get Count"
        color="positive"
        @click="Query"
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
  name: 'Query',
  setup() {
    const {WalletState} = useWallet()
    const {TerraState, Query} = useTerra()

    return {
      WalletState,
      TerraState,
      Query
    }
  }
})
</script>
