import Vue from "vue";
import { ButtplugMessage, Device } from "buttplug";
export declare const ButtplugMessageBus: Vue;
export declare function SendDeviceMessage(aDevice: Device, aMessage: ButtplugMessage): void;
export declare function StopAllDevices(): void;
