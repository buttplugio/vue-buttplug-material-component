<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      max-width="60%"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>
      <v-toolbar dark color="purple" v-if="$vuetify.breakpoint.smAndDown">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <v-tabs
        class="main-tabs main-dialog"
        color="purple"
        dark
        slider-color="blue">
        <slot name="pre"></slot>
        <v-tab
          ripple>
          Devices
        </v-tab>
        <v-tab-item>
          <v-card class="tab-card">
            <buttplug-panel
              :client="client">
            </buttplug-panel>
          </v-card>
        </v-tab-item>
        <slot name="post"></slot>
        <v-tab
          ripple>
          About
        </v-tab>
        <v-tab
          ripple>
          Help
        </v-tab>
      </v-tabs>
    </v-dialog>
  </v-app>
</template>

<script lang="ts" src="./App.ts">
</script>

<style lang="css">
 .main-tabs {
   width: 100%;
   height: 100%;
 }

 .tab-card {
   padding: 10px;
   overflow: auto;
 }
</style>

