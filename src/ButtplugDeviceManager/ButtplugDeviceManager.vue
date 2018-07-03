<template>
  <v-layout column>
    <v-subheader>Devices</v-subheader>
    <v-flex>
      <v-checkbox
        v-for="device in devices"
        :key="device.Index"
        :value="device.Index"
        v-model="selectedDevices"
        @change="OnCheckboxChange(device.Index)"
        :label="device.Name"></v-checkbox>
    </v-flex>
    <v-flex>
      <v-btn
        @click="ScanningClicked">{{ scanningText }}</v-btn>
      <span v-show="isScanning">
        <!-- <md-spinner :md-size="40" md-indeterminate /> -->
      </span>
    </v-flex>
    <v-flex v-if="isSimulator">
      <v-btn
        @click="ShowSimulator">Show Simulator Panel</v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" src="./ButtplugDeviceManager.ts">
</script>

<style lang="css">
 .buttplug-device-manager label {
   font-size: 14px;
 }

</style>
