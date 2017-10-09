import Vue from "vue";
import { ButtplugMessage, Device } from "buttplug";
export const ButtplugMessageBus = new Vue();

export function SendDeviceMessage(aDevice: Device, aMessage: ButtplugMessage) {
  ButtplugMessageBus.$emit("devicemessage", aDevice, aMessage);
}

export function StopAllDevices() {
  ButtplugMessageBus.$emit("stopalldevices");
}
