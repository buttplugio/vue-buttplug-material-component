<template>
  <v-container>
    <div v-if="!client.Connected">
      <v-btn
        color="red lighten-2"
        @click="ConnectToIntifaceDesktop"
        class="white--text"
      >
        Connect To Intiface Desktop
      </v-btn>
      <v-btn
        color="red lighten-2"
        @click="ConnectInBrowser"
        :disabled="!HasWebBluetooth"
        class="white--text"
      >
        {{ HasWebBluetooth ? "Connect In Browser" : "Requires WebBluetooth" }}
      </v-btn>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            Advanced Settings
          </template>
          <v-container>
            <v-checkbox
              v-model="scanOnConnect"
              label="Start Scanning On Connect">
            </v-checkbox>
            <v-divider />
            <v-subheader>
              Websocket Addresses
            </v-subheader>
            <v-layout
              v-for="address in desktopAddresses"
              :class="address.IsValidURL ? 'address-line-correct address-line' : 'address-line-incorrect address-line'"
              :key="address.Id"
            >
              <v-flex class="address-entry">
                <v-text-field
                  label="Host"
                  v-model="address.Host"
                ></v-text-field>
              </v-flex>
              <v-flex class="address-entry">
                <v-text-field
                  label="Port"
                  mask="#####"
                  v-model="address.Port"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-checkbox
                  v-model="address.Insecure"
                  label="Insecure">
                </v-checkbox>
              </v-flex>
              <v-flex>
                <v-checkbox
                  v-model="address.Secure"
                  label="Secure">
                </v-checkbox>
              </v-flex>
              <v-flex shrink>
                <v-btn
                  @click="RemoveAddress(address.Id)">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-btn
              @click="AddAddress()">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn
              @click="ResetAddresses()">
              Reset
            </v-btn>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <div v-if="client.Connected">
      <v-btn
        color="red lighten-2"
        dark
        @click="Disconnect"
      >
        Disconnect
      </v-btn>
      <v-btn
        color="red lighten-2"
        dark
        @click="ToggleScanning"
      >
        {{ isScanning ? "Stop Scanning" : "Start Scanning" }}
      </v-btn>
      <v-subheader>
        Device List
      </v-subheader>
      <div v-if="clientDevices.length === 0">No Devices Available</div>
      <v-checkbox
        v-for="device in clientDevices"
        v-model="selectedDevices"
        @change="FireChange"
        :key="device.Index"
        :value="device.Index"
        :label="device.Name"></v-checkbox>
    </div>
  </v-container>
</template>

<script lang="ts" src="./ButtplugPanel.ts">
</script>

<style lang="css">
 .address-entry {
   padding-left: 5px;
   padding-right: 5px;
 }

 @media screen and (max-width: 640px) {
   .address-line {
     flex-direction: column;
   }
 }

 .address-line-correct {
   background: #ffffff;
 }

 .address-line-incorrect {
   background: #ffeeee;
 }
</style>
