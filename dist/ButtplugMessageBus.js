import Vue from "vue";
export const ButtplugMessageBus = new Vue();
export function SendDeviceMessage(aDevice, aMessage) {
    ButtplugMessageBus.$emit("devicemessage", aDevice, aMessage);
}
export function StopAllDevices() {
    ButtplugMessageBus.$emit("stopalldevices");
}
//# sourceMappingURL=ButtplugMessageBus.js.map