import Vue from "vue";
const VueMaterial = require("vue-material");

import ButtplugPanelType from "./ButtplugPanel/ButtplugPanel";
import ButtplugPanelComponent from "./ButtplugPanel/ButtplugPanel.vue";
import { SendDeviceMessage, StopAllDevices } from "./ButtplugMessageBus";
Vue.use(VueMaterial);

export { ButtplugPanelComponent,
         ButtplugPanelType };

export function install(vue: typeof Vue, options = { prefix: "buttplug" }) {
  const { prefix } = options;
  vue.component(`${prefix}-panel`, ButtplugPanelComponent);
  (vue as any).Buttplug = {
    SendDeviceMessage,
    StopAllDevices,
  };
}
