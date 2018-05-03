import * as tslib_1 from "tslib";
import { ButtplugClient, StopDeviceCmd } from "buttplug";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ButtplugMessageBus } from "../ButtplugMessageBus";
import ButtplugConnectionManagerComponent from "../ButtplugConnectionManager/ButtplugConnectionManager.vue";
import ButtplugDeviceManagerComponent from "../ButtplugDeviceManager/ButtplugDeviceManager.vue";
import ButtplugLogManagerComponent from "../ButtplugLogManager/ButtplugLogManager.vue";
let ButtplugPanelType = class ButtplugPanelType extends Vue {
    constructor() {
        super(...arguments);
        this.logMessages = [];
        this.devices = [];
        this.selectedDevices = [];
        this.isConnected = false;
        this.buttplugClient = null;
        this.isServerScanning = false;
        this.lastErrorMessage = null;
    }
    mounted() {
        ButtplugMessageBus.$on("devicemessage", this.SendDeviceMessage);
        ButtplugMessageBus.$on("stopalldevices", this.StopAllDevices);
    }
    StopAllDevices() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.buttplugClient === null) {
                throw new Error("Not connected to a Buttplug Server.");
            }
            yield this.buttplugClient.StopAllDevices();
        });
    }
    SendDeviceMessage(aDevice, aMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.buttplugClient === null) {
                throw new Error("Not connected to a Buttplug Server.");
            }
            if (!this.deviceSelected(aDevice.Index)) {
                throw new Error("Tried to send message to device that is not selected.");
            }
            if (aDevice.AllowedMessages.indexOf(aMsg.Type) === -1) {
                throw new Error("Device does not take that type of message.");
            }
            yield this.buttplugClient.SendDeviceMessage(aDevice, aMsg);
        });
    }
    ConnectWebsocket(aConnectObj) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.clearError();
            const buttplugClient = new ButtplugClient(aConnectObj.clientName);
            try {
                this.InitializeClient(buttplugClient);
                yield buttplugClient.ConnectWebsocket(aConnectObj.address);
                this.isConnected = true;
                this.buttplugClient = buttplugClient;
            }
            catch (e) {
                // If we get an error thrown while trying to connect, we won't get much
                // information on why due to browser security contraints. Just explain
                // every possible error that could happen and hope the user figures it
                // out.
                this.setError("Websocket connection failed. This could be due to the server address being wrong, " +
                    "the server not being available, or if this is being hosted from an https site, " +
                    "the SSL certificate not being accepted by the browser. Check your Buttplug Server " +
                    "software to see if there are any errors listed.");
                return;
            }
        });
    }
    ConnectLocal(aConnectObj) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.clearError();
            const buttplugClient = new ButtplugClient(aConnectObj.clientName);
            yield this.InitializeClient(buttplugClient);
            yield buttplugClient.ConnectLocal();
            this.isConnected = true;
            this.buttplugClient = buttplugClient;
            this.$emit("connected");
        });
    }
    Disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.clearError();
            this.isConnected = false;
            for (const deviceIndex of this.selectedDevices) {
                yield this.OnDeviceUnselected(deviceIndex);
            }
            for (const device of this.devices) {
                this.RemoveDevice(device);
            }
            this.devices = [];
            if (this.buttplugClient === null) {
                return;
            }
            if (this.buttplugClient.Connected) {
                this.buttplugClient.Disconnect();
            }
            this.buttplugClient = null;
            this.$emit("disconnected");
        });
    }
    SetLogLevel(logLevel) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.buttplugClient === null) {
                throw new Error("Not connected to a Buttplug Server!");
            }
            yield this.buttplugClient.RequestLog(logLevel);
        });
    }
    StartScanning() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.buttplugClient === null) {
                throw new Error("Not connected to a Buttplug Server!");
            }
            this.lastErrorMessage = null;
            this.isServerScanning = true;
            try {
                yield this.buttplugClient.StartScanning();
            }
            catch (e) {
                this.lastErrorMessage = e.ErrorMessage;
            }
        });
    }
    StopScanning() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.buttplugClient === null) {
                throw new Error("Not connected to a Buttplug Server!");
            }
            this.isServerScanning = false;
            yield this.buttplugClient.StopScanning();
            this.isServerScanning = false;
        });
    }
    deviceSelected(deviceId) {
        return this.selectedDevices.indexOf(deviceId) > -1;
    }
    setError(aError) {
        this.lastErrorMessage = aError;
    }
    clearError() {
        this.lastErrorMessage = null;
    }
    InitializeClient(aButtplugClient) {
        aButtplugClient.addListener("disconnect", this.Disconnect);
        aButtplugClient.addListener("log", this.AddLogMessage);
        aButtplugClient.addListener("deviceadded", this.AddDevice);
        aButtplugClient.addListener("deviceremoved", this.RemoveDevice);
        aButtplugClient.addListener("scanningfinished", this.ScanningFinished);
    }
    AddLogMessage(logMessage) {
        this.logMessages.push(logMessage.LogMessage);
    }
    DeviceAlreadyAdded(device) {
        return this.devices.filter((d) => device.Index === d.Index).length !== 0;
    }
    AddDevice(device) {
        if (this.DeviceAlreadyAdded(device)) {
            return;
        }
        this.devices.push(device);
    }
    RemoveDevice(device) {
        if (this.devices.indexOf(device) === -1) {
            return;
        }
        this.devices.splice(this.devices.indexOf(device), 1);
        if (this.selectedDevices.indexOf(device.Index) === -1) {
            return;
        }
        this.selectedDevices.splice(this.selectedDevices.indexOf(device.Index), 1);
        this.$emit("devicedisconnected", device);
    }
    OnDeviceSelected(deviceId) {
        const device = this.devices.find((d) => (d.Index) === deviceId);
        this.selectedDevices.push(deviceId);
        this.$emit("deviceconnected", device);
    }
    OnDeviceUnselected(deviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const device = this.devices.find((d) => (d.Index) === deviceId);
            yield this.SendDeviceMessage(device, new StopDeviceCmd());
            this.selectedDevices.splice(this.selectedDevices.indexOf(deviceId), 1);
            this.$emit("devicedisconnected", device);
        });
    }
    ScanningFinished() {
        this.isServerScanning = false;
    }
};
ButtplugPanelType = tslib_1.__decorate([
    Component({
        components: {
            ButtplugConnectionManagerComponent,
            ButtplugDeviceManagerComponent,
            ButtplugLogManagerComponent,
        },
    })
], ButtplugPanelType);
export { ButtplugPanelType };
//# sourceMappingURL=ButtplugPanel.js.map