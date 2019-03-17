import Vue from "vue";

import { ButtplugPanelType } from "./ButtplugPanel/ButtplugPanel";
import ButtplugPanelComponent from "./ButtplugPanel/ButtplugPanel.vue";
import { StopAllDevices } from "./ButtplugMessageBus";

export { ButtplugPanelComponent,
         ButtplugPanelType };

export function install(vue: typeof Vue, options = { prefix: "buttplug" }) {
  const { prefix } = options;
  vue.component(`${prefix}-panel`, ButtplugPanelComponent);
  (vue as any).Buttplug = {
    StopAllDevices,
  };
}
