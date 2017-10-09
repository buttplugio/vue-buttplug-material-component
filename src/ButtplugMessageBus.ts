import Vue from "vue";
import { ButtplugMessage, Device } from "buttplug";
export const ButtplugMessageBus = new Vue();

export function SendMessageToDevice(aDevice: Device, aMessage: ButtplugMessage) {
  ButtplugMessageBus.$emit("devicemessage", aDevice, aMessage);
}
