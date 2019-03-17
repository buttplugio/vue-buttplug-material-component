import Vue from "vue";
export const ButtplugMessageBus = new Vue();

export function StopAllDevices() {
  ButtplugMessageBus.$emit("stopalldevices");
}
