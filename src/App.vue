<template>
  <router-view/>
</template>

<script>
import * as buffer from 'buffer'
import _process from 'src/boot/process-es6.js'
import {defineComponent} from 'vue'

import {useQuasar} from "quasar"
import {provideTerra} from "boot/plugins/terra/terra"
import {initializeApp} from "firebase/app"
import {getAnalytics} from "firebase/analytics"
import {provideWallet} from "boot/plugins/wallet/wallet"

window.Buffer = buffer.Buffer
window.process = _process

export default defineComponent({
  name: 'App',

  setup() {
    const $q = useQuasar()

    $q.dark.set(true)

    const firebaseConfig = {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    }

    const app = initializeApp(firebaseConfig)
    getAnalytics(app)

    provideWallet()
    provideTerra()
  }
})
</script>

