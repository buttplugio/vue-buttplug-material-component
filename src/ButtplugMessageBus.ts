import Vue from "vue";
import { ButtplugMessage, ButtplugClientDevice } from "buttplug";
export const ButtplugMessageBus = new Vue();

export function SendDeviceMessage(aDevice: ButtplugClientDevice, aMessage: ButtplugMessage) {
  ButtplugMessageBus.$emit("devicemessage", aDevice, aMessage);
}

export function StopAllDevices() {
  ButtplugMessageBus.$emit("stopalldevices");
}
