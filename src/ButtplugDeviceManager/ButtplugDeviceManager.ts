import { Device } from "buttplug";
import Vue from "vue";
import { Component, Model, Prop, Watch } from "vue-property-decorator";

@Component
export default class ButtplugDeviceManager extends Vue {
  @Prop()
  private devices: Device[];

  @Prop()
  private isServerScanning: boolean;

  @Prop()
  private isConnected: boolean;

  @Model()
  private scanningText: string = "Start Scanning";

  private selectedDevices: Device[] = [];
  private isScanning: boolean = false;
  private boxChecked: boolean = false;

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

  private onCheckboxChange(aChecked: boolean, aDeviceId: number) {
    if (aChecked) {
      for (const device of this.devices) {
        if (device.Index === aDeviceId &&
            this.selectedDevices.indexOf(device) === -1) {
          this.selectedDevices.push(device);
          break;
        }
      }
    } else {
      this.selectedDevices = this.selectedDevices.filter((d) => {
        return d.Index !== aDeviceId;
      });
    }
    this.$emit("selectedDevicesChanged", this.selectedDevices);
  }
}
