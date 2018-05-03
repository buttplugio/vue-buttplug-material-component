import * as tslib_1 from "tslib";
import Vue from "vue";
const VueCookies = require("vue-cookie");
Vue.use(VueCookies);
import { Component, Prop } from "vue-property-decorator";
let ButtplugConnectionManager = class ButtplugConnectionManager extends Vue {
    constructor() {
        super(...arguments);
        this.clientName = "Generic Buttplug Client";
        this.address = "ws://localhost:12345/buttplug";
    }
    mounted() {
        if (VueCookies.get("address")) {
            this.address = VueCookies.get("address");
        }
        else if (location.protocol === "https:") {
            // This can easily be spoofed, but we're doing this for conveinence more
            // than security here.
            this.address = "wss://localhost:12345/buttplug";
        }
    }
    get HasBluetooth() {
        return (navigator !== undefined &&
            "bluetooth" in navigator);
    }
    CookieAddress(address) {
        VueCookies.set("address", address, { expires: "1Y" });
    }
    ConnectWebsocket() {
        this.$emit("connectwebsocket", { address: this.address,
            clientName: this.clientName });
    }
    ConnectLocal() {
        this.$emit("connectlocal", { address: this.address,
            clientName: this.clientName });
    }
    Disconnect() {
        this.$emit("disconnect");
    }
};
tslib_1.__decorate([
    Prop(),
    tslib_1.__metadata("design:type", Boolean)
], ButtplugConnectionManager.prototype, "isConnected", void 0);
ButtplugConnectionManager = tslib_1.__decorate([
    Component
], ButtplugConnectionManager);
export default ButtplugConnectionManager;
//# sourceMappingURL=ButtplugConnectionManager.js.map