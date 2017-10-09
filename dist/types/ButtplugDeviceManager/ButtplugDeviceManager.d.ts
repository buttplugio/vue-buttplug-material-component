import Vue from "vue";
export default class ButtplugDeviceManager extends Vue {
    private devices;
    private isConnected;
    private scanningText;
    private selectedDevices;
    private isScanning;
    private boxChecked;
    private onConnectionChange();
    private ScanningClicked(ev);
    private onCheckboxChange(aChecked, aDeviceId);
}
