<template>
  <v-container id="buttplug-panel">
    <buttplug-connection-manager-component
      width="100%"
      :isConnected="IsConnected"
      @connectwebsocket="ConnectWebsocket"
      @connectlocal="ConnectLocal"
      @connectsimulator="ConnectSimulator"
      @disconnect="Disconnect"/>
    <v-layout column v-show="lastErrorMessage">
      <v-flex>
        <v-subheader block>Error</v-subheader>
      </v-flex>
      <v-flex class="error-message">
        {{ this.lastErrorMessage }}
      </v-flex>
    </v-layout>
    <buttplug-device-manager-component
      v-show="IsConnected"
      :devices="devices"
      :isConnected="IsConnected"
      :isServerScanning="IsServerScanning"
      :isSimulator="isSimulator"
      @deviceSelected="OnDeviceSelected"
      @deviceUnselected="OnDeviceUnselected"
      @startScanning="StartScanning"
      @stopScanning="StopScanning"
      @showSimulator="ShowSimulatorPanel" />
    <buttplug-log-manager-component
      v-show="IsConnected"
      :isConnected="IsConnected"
      :logMessages="logMessages"
      @loglevel="SetLogLevel"/>
  </v-container>
</template>

<script lang="ts">
 import { ButtplugPanelType } from "./ButtplugPanel";
 export default ButtplugPanelType;
</script>

<style lang="css">

 .buttplug-sidebar {
   min-width: 95%;
 }

 .lower-divider {
   padding-bottom: 5px;
   border-bottom: 1px #bbb solid;
 }

 .error-message {
   color: #C00;
   font-size: 12px;
   padding: 5px;
 }
</style>
