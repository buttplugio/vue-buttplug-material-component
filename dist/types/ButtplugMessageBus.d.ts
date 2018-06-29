import Vue from "vue";
import { ButtplugMessage, Device } from "buttplug";
export declare const ButtplugMessageBus: import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
export declare function SendDeviceMessage(aDevice: Device, aMessage: ButtplugMessage): void;
export declare function StopAllDevices(): void;
