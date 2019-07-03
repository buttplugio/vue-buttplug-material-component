import Vue from "vue";

import ButtplugPanelComponent from "./ButtplugPanel.vue";

const ButtplugPanel = ButtplugPanelComponent;

export default ButtplugPanel;

export function install(vue: typeof Vue, options = { prefix: "buttplug" }) {
  const { prefix } = options;
  vue.component(`${prefix}-panel`, ButtplugPanelComponent);
}
