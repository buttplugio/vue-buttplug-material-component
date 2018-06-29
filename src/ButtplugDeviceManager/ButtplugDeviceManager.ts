import { Device } from "buttplug";
import Vue from "vue";
import { Component, Model, Prop, Watch } from "vue-property-decorator";

@Component
export default class ButtplugDeviceManager extends Vue {
  @Prop()
  private devices!: Device[];

  @Prop()
  private isServerScanning!: boolean;

  @Prop()
  private isConnected!: boolean;

  private selectedDevices: number[] = [];
  private scanningText: string = "Start Scanning";
  private isScanning: boolean = false;

  @Watch("isServerScanning")
  private onServerScanningChange() {
    if (!this.isServerScanning) {
      this.isScanning = false;
      this.scanningText = "Start Scanning";
    }
  }

  @Watch("isConnected")
  private onConnectionChange() {
    if (this.isConnected) {
      return;
    }
    this.isScanning = false;
    this.scanningText = "Start Scanning";
    this.selectedDevices = [];
  }

  @Watch("devices")
  private onDeviceChange() {
    const deviceIndexes = this.devices.map((x) => x.Index);
    const difference = this.selectedDevices.filter((x) => deviceIndexes.indexOf(x) === -1);
    this.selectedDevices = this.selectedDevices.filter((x) => difference.indexOf(x) !== -1);
  }

  private ScanningClicked(ev: Event) {
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

  private onCheckboxChange(aDeviceId: number) {
    if (this.selectedDevices.indexOf(aDeviceId) >= 0) {
      this.$emit("deviceSelected", aDeviceId);
      return;
    }
    this.$emit("deviceUnselected", aDeviceId);
  }
}
