<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-grey-10"
    >
      <q-toolbar>

        <q-toolbar-title
          class="text-positive"
        >
          Terra Firebase Dapp
        </q-toolbar-title>
        <q-space />
        <q-btn
          label="Connect Wallet"
          @click="ConnectWallet"
          v-if="!WalletState.isConnected"
          :loading="WalletState.loading"
          color="positive"
          text-color="black"
        />
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="WalletState.isConnected"
          text-color="positive"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      side="right"
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {useWallet} from "boot/plugins/wallet/wallet"
import {useTerra} from "boot/plugins/terra/terra"
import {getChainOptions, WalletController} from "@terra-money/wallet-controller"
import {
  verifyBytes
} from '@terra-money/wallet-provider'
import {LCDClient, MsgExecuteContract, MsgInstantiateContract} from "@terra-money/terra.js"

const linksList = [
  {
    title: 'Instantiate',
    link: '/instantiate'
  },
  {
    title: 'Execute',
    link: '/execute'
  },
  {
    title: 'Query',
    link: '/execute'
  }
]


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)


    const {InjectTerra} = useTerra()
    InjectTerra(LCDClient, MsgExecuteContract, MsgInstantiateContract)

    const {WalletState, ConnectWallet, InjectWallet} = useWallet()
    InjectWallet(getChainOptions, WalletController, verifyBytes)


    return {
      ConnectWallet,
      WalletState,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
