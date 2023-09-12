<template>
  <q-page
    class="q-pa-lg"
  >
    <q-card
      v-if="WalletState.isConnected"
    >
      <q-card-section class="text-center">
        {{ WalletState.address }}
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          label="Log In"
          @click="SignBytes"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

import {useWallet} from "boot/plugins/wallet/wallet";


export default defineComponent({
  name: 'IndexPage',
  setup() {

    const {WalletState, SignBytes} = useWallet()

    return {
      WalletState,
      SignBytes
    }
  }
})
</script>
