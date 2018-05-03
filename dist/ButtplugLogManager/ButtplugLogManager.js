import * as tslib_1 from "tslib";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
let ButtplugLogManager = class ButtplugLogManager extends Vue {
    constructor() {
        super(...arguments);
        this.logLevel = "Off";
        this.logLevels = ["Off", "Fatal", "Error", "Warn", "Info", "Debug", "Trace"];
        this.lastLogLevel = "Off";
    }
    onConnectionChange() {
        // Reset state on disconnect
        if (this.isConnected) {
            return;
        }
        this.$refs.logArea.value = "";
        this.logLevel = "Off";
    }
    LogLevelChange() {
        if (this.logLevel === this.lastLogLevel) {
            return;
        }
        this.$emit("loglevel", this.logLevel);
        this.lastLogLevel = this.logLevel;
    }
};
tslib_1.__decorate([
    Prop(),
    tslib_1.__metadata("design:type", Array)
], ButtplugLogManager.prototype, "logMessages", void 0);
tslib_1.__decorate([
    Prop(),
    tslib_1.__metadata("design:type", Boolean)
], ButtplugLogManager.prototype, "isConnected", void 0);
tslib_1.__decorate([
    Watch("isConnected"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ButtplugLogManager.prototype, "onConnectionChange", null);
ButtplugLogManager = tslib_1.__decorate([
    Component({})
], ButtplugLogManager);
export default ButtplugLogManager;
//# sourceMappingURL=ButtplugLogManager.js.map