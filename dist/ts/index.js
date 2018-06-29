import { ButtplugPanelType } from "./ButtplugPanel/ButtplugPanel";
import ButtplugPanelComponent from "./ButtplugPanel/ButtplugPanel.vue";
import { SendDeviceMessage, StopAllDevices } from "./ButtplugMessageBus";
export { ButtplugPanelComponent, ButtplugPanelType };
export function install(vue, options = { prefix: "buttplug" }) {
    const { prefix } = options;
    vue.component(`${prefix}-panel`, ButtplugPanelComponent);
    vue.Buttplug = {
        SendDeviceMessage,
        StopAllDevices,
    };
}
//# sourceMappingURL=index.js.map