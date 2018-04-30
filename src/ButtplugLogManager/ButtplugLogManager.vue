<template>
  <v-layout column id="buttplug-log-manager">
    <v-flex>
      <v-subheader>Log Messages</v-subheader>
    </v-flex>
    <v-flex>
      <textarea ref="logArea">{{ logMessages.join("\n") }}</textarea>
    </v-flex>
    <v-flex>
      <v-select
        v-model="logLevel"
        @change="LogLevelChange"
        :items="logLevels">
      </v-select>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" src="./ButtplugLogManager.ts">
</script>

<style lang="css">
 #buttplug-log-manager textarea {
   width:28em;
   height:20em;
   overflow: auto;
   font-size: 9px;
   white-space: pre;
 }
</style>
