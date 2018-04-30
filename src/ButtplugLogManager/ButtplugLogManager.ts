import Vue from "vue";
import { Component, Model, Prop, Watch } from "vue-property-decorator";
import { ButtplugLogLevel } from "buttplug";

@Component({})
export default class ButtplugLogManager extends Vue {
  @Prop()
  private logMessages!: string[];

  @Prop()
  private isConnected!: boolean;

  private logLevel: string = "Off";

  private logLevels = ["Off", "Fatal", "Error", "Warn", "Info", "Debug", "Trace"];

  private lastLogLevel: string = "Off";

  @Watch("isConnected")
  private onConnectionChange() {
    // Reset state on disconnect
    if (this.isConnected) {
      return;
    }
    (this.$refs.logArea as HTMLTextAreaElement).value = "";
    this.logLevel = "Off";
  }

  private LogLevelChange() {
    if (this.logLevel === this.lastLogLevel) {
      return;
    }
    this.$emit("loglevel", this.logLevel);
    this.lastLogLevel = this.logLevel;
  }
}
