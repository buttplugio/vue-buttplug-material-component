import { ButtplugDeviceMessage, Device } from "buttplug";
import Vue from "vue";
import ButtplugStartConnectEvent from "../ButtplugConnectionManager/ButtplugStartConnectEvent";
export declare class ButtplugPanelType extends Vue {
    private logMessages;
    private devices;
    private selectedDevices;
    private isConnected;
    private buttplugClient;
    private isServerScanning;
    mounted(): void;
    StopAllDevices(): Promise<void>;
    SendDeviceMessage(aDevice: Device, aMsg: ButtplugDeviceMessage): Promise<void>;
    ConnectWebsocket(aConnectObj: ButtplugStartConnectEvent): Promise<void>;
    ConnectLocal(aConnectObj: ButtplugStartConnectEvent): Promise<void>;
    Disconnect(): void;
    SetLogLevel(logLevel: string): Promise<void>;
    StartScanning(): Promise<void>;
    StopScanning(): Promise<void>;
    private deviceSelected(aDevice);
    private InitializeConnection(aButtplugClient);
    private AddLogMessage(logMessage);
    private DeviceAlreadyAdded(device);
    private AddDevice(device);
    private RemoveDevice(device);
    private OnSelectedDevicesChanged(aDeviceList);
    private ScanningFinished();
}
