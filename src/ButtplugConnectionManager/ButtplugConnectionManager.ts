import Vue from "vue";
const VueCookies = require("vue-cookie");
Vue.use(VueCookies);
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ButtplugConnectionManager extends Vue {
  @Prop()
  private isConnected: boolean;
  private clientName: string = "Buttplug Playground";
  private address: string = "ws://localhost:12345/buttplug";

  public mounted() {
    if (VueCookies.get("address")) {
        this.address = VueCookies.get("address");
    } else if (location.protocol === "https:") {
      // This can easily be spoofed, but we're doing this for conveinence more
      // than security here.
      this.address = "wss://localhost:12345/buttplug";
    }
  }

  private get HasBluetooth() {
    return (navigator !== undefined &&
            "bluetooth" in navigator);
  }

  private CookieAddress(address: string) {
      VueCookies.set("address", address, { expires: "1Y" });
  }

  private ConnectWebsocket() {
    this.$emit("connectwebsocket", {address: this.address,
                                    clientName: this.clientName});
  }
  private ConnectLocal() {
    this.$emit("connectlocal", {address: this.address,
                                clientName: this.clientName});
  }
  private Disconnect() {
    this.$emit("disconnect");
  }
}
