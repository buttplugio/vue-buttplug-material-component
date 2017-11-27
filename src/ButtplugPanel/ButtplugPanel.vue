<template>
  <div id="buttplug-panel">
    <md-list>
      <md-subheader>Connection</md-subheader>
      <md-list-item class="lower-divider">
        <buttplug-connection-manager-component
          width="100%"
          :isConnected="isConnected"
          @connectwebsocket="ConnectWebsocket"
          @connectlocal="ConnectLocal"
          @disconnect="Disconnect"/>
      </md-list-item>
      <div v-show="lastErrorMessage">
        <md-subheader>Error</md-subheader>
        <md-list-item class="lower-divider">
          <div class="error-message">
            {{ this.lastErrorMessage }}
          </div>
        </md-list-item>
      </div>
      <div v-show="isConnected">
      <md-subheader>Devices</md-subheader>
      <md-list-item class="lower-divider">
        <buttplug-device-manager-component
          :devices="devices"
          :isConnected="isConnected"
          :isServerScanning="isServerScanning"
          @selectedDevicesChanged="OnSelectedDevicesChanged"
          @startScanning="StartScanning"
          @stopScanning="StopScanning" />
      </md-list-item>
      </div>
      <div v-show="isConnected">
      <md-subheader>Log Messages</md-subheader>
      <md-list-item class="lower-divider">
        <buttplug-log-manager-component
          :isConnected="isConnected"
          :logMessages="logMessages"
          @loglevel="SetLogLevel"/>
      </md-list-item>
      </div>
    </md-list>
  </div>
</template>

<script lang="ts">
 import { ButtplugPanelType } from "./ButtplugPanel"
 export default ButtplugPanelType
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
