import Vue from "vue";
export default class ButtplugDeviceManager extends Vue {
    private devices;
    private isServerScanning;
    private isSimulator;
    private isConnected;
    private selectedDevices;
    private scanningText;
    private isScanning;
    private OnServerScanningChange;
    private OnConnectionChange;
    private OnDeviceChange;
    private ScanningClicked;
    private OnCheckboxChange;
    private ShowSimulator;
}
