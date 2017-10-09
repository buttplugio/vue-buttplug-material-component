import Vue from "vue";
import { ButtplugMessage, Device } from "buttplug";
export declare const ButtplugMessageBus: Vue;
export declare function SendMessageToDevice(aDevice: Device, aMessage: ButtplugMessage): void;
