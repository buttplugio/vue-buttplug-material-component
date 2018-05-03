import * as tslib_1 from "tslib";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
let ButtplugDeviceManager = class ButtplugDeviceManager extends Vue {
    constructor() {
        super(...arguments);
        this.selectedDevices = [];
        this.scanningText = "Start Scanning";
        this.isScanning = false;
    }
    onServerScanningChange() {
        if (!this.isServerScanning) {
            this.isScanning = false;
            this.scanningText = "Start Scanning";
        }
    }
    onConnectionChange() {
        if (this.isConnected) {
            return;
        }
        this.isScanning = false;
        this.scanningText = "Start Scanning";
        this.selectedDevices = [];
    }
    ScanningClicked(ev) {
        if (!this.isScanning) {
            this.isScanning = true;
            this.scanningText = "Stop Scanning";
            this.$emit("startScanning");
            return;
        }
        this.isScanning = false;
        this.scanningText = "Start Scanning";
        this.$emit("stopScanning");
    }
    onCheckboxChange(aDeviceId) {
        if (this.selectedDevices.indexOf(aDeviceId) >= 0) {
            this.$emit("deviceSelected", aDeviceId);
            return;
        }
        this.$emit("deviceUnselected", aDeviceId);
    }
};
tslib_1.__decorate([
    Prop(),
    tslib_1.__metadata("design:type", Array)
], ButtplugDeviceManager.prototype, "devices", void 0);
tslib_1.__decorate([
    Prop(),
    tslib_1.__metadata("design:type", Boolean)
], ButtplugDeviceManager.prototype, "isServerScanning", void 0);
tslib_1.__decorate([
    Prop(),
    tslib_1.__metadata("design:type", Boolean)
], ButtplugDeviceManager.prototype, "isConnected", void 0);
tslib_1.__decorate([
    Watch("isServerScanning"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ButtplugDeviceManager.prototype, "onServerScanningChange", null);
tslib_1.__decorate([
    Watch("isConnected"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ButtplugDeviceManager.prototype, "onConnectionChange", null);
ButtplugDeviceManager = tslib_1.__decorate([
    Component
], ButtplugDeviceManager);
export default ButtplugDeviceManager;
//# sourceMappingURL=ButtplugDeviceManager.js.map