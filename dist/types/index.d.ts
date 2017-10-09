import Vue from "vue";
import ButtplugPanelType from "./ButtplugPanel/ButtplugPanel";
import ButtplugPanelComponent from "./ButtplugPanel/ButtplugPanel.vue";
import { SendMessageToDevice } from "./ButtplugMessageBus";
export { ButtplugPanelComponent, ButtplugPanelType, SendMessageToDevice };
export declare function install(vue: typeof Vue, options?: {
    prefix: string;
}): void;
