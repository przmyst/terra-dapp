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
        label="Count"
        v-model="TerraState.model.count"
        outlined
      />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        label="Set Count"
        color="positive"
        @click="Execute"
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
  name: 'Execute',
  setup() {

    const {WalletState} = useWallet()
    const {TerraState, Execute} = useTerra()

    return {
      WalletState,
      TerraState,
      Execute
    }
  }
})
</script>
