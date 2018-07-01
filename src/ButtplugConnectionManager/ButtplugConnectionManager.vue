<template>
  <v-layout column id="buttplug-connection-manager" class="buttplug-sidebar">
    <v-subheader>Connection</v-subheader>
    <v-flex v-if="!isConnected">
      <v-text-field
        label="Client Name"
        class="form-text"
        v-model="clientName"
        placeholder="Generic Buttplug Client">
      </v-text-field>
    </v-flex>
    <v-flex row v-if="!isConnected">
      <v-text-field
        label="Server Address"
        class="form-text"
        v-model="address"
        @change="CookieAddress">
      </v-text-field>
    </v-flex>
    <v-btn
      v-if="!isConnected"
      @click="ConnectWebsocket">Connect Websocket</v-btn>
    <v-btn
      v-if="!isConnected"
      id="ConnectLocalButton"
      :disabled="!this.HasBluetooth"
      @click="ConnectLocal">Connect Local</v-btn>
    <v-btn
      v-if="!isConnected"
      id="ConnectSimulatorButton"
      @click="ConnectSimulator">Connect Simulator</v-btn>
    <v-btn
      v-if="isConnected"
      id="DisconnectButton"
      @click="Disconnect">Disconnect</v-btn>
  </v-layout>
</template>

<script lang="ts" src="./ButtplugConnectionManager.ts">
</script>

<style lang="css">
</style>
