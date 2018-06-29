import Vue from "vue";
export default class ButtplugDeviceManager extends Vue {
    private devices;
    private isServerScanning;
    private isConnected;
    private selectedDevices;
    private scanningText;
    private isScanning;
    private onServerScanningChange;
    private onConnectionChange;
    private onDeviceChange;
    private ScanningClicked;
    private onCheckboxChange;
}
