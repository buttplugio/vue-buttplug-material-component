import { ButtplugClient, ButtplugMessage,
         ButtplugDeviceMessage, Device, Log, StopDeviceCmd, Error as ErrorMsg } from "buttplug";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { ButtplugMessageBus } from "../ButtplugMessageBus";
import ButtplugConnectionManagerComponent from "../ButtplugConnectionManager/ButtplugConnectionManager.vue";
import ButtplugStartConnectEvent from "../ButtplugConnectionManager/ButtplugStartConnectEvent";
import ButtplugDeviceManagerComponent from "../ButtplugDeviceManager/ButtplugDeviceManager.vue";
import ButtplugLogManagerComponent from "../ButtplugLogManager/ButtplugLogManager.vue";

@Component({
  components: {
    ButtplugConnectionManagerComponent,
    ButtplugDeviceManagerComponent,
    ButtplugLogManagerComponent,
  },
})
export class ButtplugPanelType extends Vue {
  private logMessages: string[] = [];
  private devices: Device[] = [];
  private selectedDevices: Device[] = [];
  private isConnected: boolean = false;
  private buttplugClient: ButtplugClient | null = null;
  private isServerScanning: boolean = false;
  private lastErrorMessage: string | null = null;

  public mounted() {
    ButtplugMessageBus.$on("devicemessage", this.SendDeviceMessage);
    ButtplugMessageBus.$on("stopalldevices", this.StopAllDevices);
  }

  public async StopAllDevices() {
    if (this.buttplugClient === null) {
      throw new Error("Not connected to a Buttplug Server.");
    }
    await this.buttplugClient.StopAllDevices();
  }

  public async SendDeviceMessage(aDevice: Device, aMsg: ButtplugDeviceMessage) {
    if (this.buttplugClient === null) {
      throw new Error("Not connected to a Buttplug Server.");
    }
    if (!this.deviceSelected(aDevice)) {
      throw new Error("Tried to send message to device that is not selected.");
    }
    if (aDevice.AllowedMessages.indexOf(aMsg.Type) === -1) {
      throw new Error("Device does not take that type of message.");
    }
    await this.buttplugClient.SendDeviceMessage(aDevice, aMsg);
  }

  public async ConnectWebsocket(aConnectObj: ButtplugStartConnectEvent) {
    this.clearError();
    const buttplugClient = new ButtplugClient(aConnectObj.clientName);
    try {
      this.InitializeClient(buttplugClient);
      await buttplugClient.ConnectWebsocket(aConnectObj.address);
      this.isConnected = true;
      this.buttplugClient = buttplugClient;
    } catch (e) {
      // If we get an error thrown while trying to connect, we won't get much
      // information on why due to browser security contraints. Just explain
      // every possible error that could happen and hope the user figures it
      // out.
      this.setError("Websocket connection failed. This could be due to the server address being wrong, " +
                    "the server not being available, or if this is being hosted from an https site, " +
                    "the SSL certificate not being accepted by the browser. Check your Buttplug Server " +
                    "software to see if there are any errors listed.");
      return;
    }
  }

  public async ConnectLocal(aConnectObj: ButtplugStartConnectEvent) {
    this.clearError();
    const buttplugClient = new ButtplugClient(aConnectObj.clientName);
    await this.InitializeClient(buttplugClient);
    await buttplugClient.ConnectLocal();
    this.isConnected = true;
    this.buttplugClient = buttplugClient;
  }

  public Disconnect() {
    this.clearError();
    this.isConnected = false;
    this.devices = [];
    this.selectedDevices = [];
    if (this.buttplugClient === null) {
      return;
    }
    if (this.buttplugClient.Connected) {
      this.buttplugClient.Disconnect();
    }
    this.buttplugClient = null;
  }

  public async SetLogLevel(logLevel: string) {
    if (this.buttplugClient === null) {
      throw new Error("Not connected to a Buttplug Server!");
    }
    await this.buttplugClient.RequestLog(logLevel);
  }

  public async StartScanning() {
    if (this.buttplugClient === null) {
      throw new Error("Not connected to a Buttplug Server!");
    }
    this.lastErrorMessage = null;
    this.isServerScanning = true;
    try {
      await this.buttplugClient.StartScanning();
    } catch (e) {
      this.lastErrorMessage = (e as ErrorMsg).ErrorMessage;
    }
  }

  public async StopScanning() {
    if (this.buttplugClient === null) {
      throw new Error("Not connected to a Buttplug Server!");
    }
    this.isServerScanning = false;
    await this.buttplugClient.StopScanning();
  }

  private setError(aError: string) {
    this.lastErrorMessage = aError;
  }

  private clearError() {
    this.lastErrorMessage = null;
  }

  private deviceSelected(aDevice: Device): boolean {
    return this.selectedDevices.find((device) => aDevice.Index === device.Index) !== undefined;
  }

  private InitializeClient(aButtplugClient: ButtplugClient) {
    aButtplugClient.addListener("disconnect", this.Disconnect);
    aButtplugClient.addListener("log", this.AddLogMessage);
    aButtplugClient.addListener("deviceadded", this.AddDevice);
    aButtplugClient.addListener("deviceremoved", this.RemoveDevice);
    aButtplugClient.addListener("scanningfinished", this.ScanningFinished);
  }

  private AddLogMessage(logMessage: Log) {
    this.logMessages.push(logMessage.LogMessage);
  }

  private DeviceAlreadyAdded(device: Device): boolean {
    return this.devices.filter((d) => device.Index === d.Index).length !== 0;
  }

  private AddDevice(device: Device) {
    if (!this.DeviceAlreadyAdded(device)) {
      this.devices.push(device);
    }
  }

  private RemoveDevice(device: Device) {
    if (this.devices.indexOf(device) !== -1) {
      this.devices.splice(this.devices.indexOf(device), 1);
    }
  }

  private OnSelectedDevicesChanged(aDeviceList: Device[]) {
    const newSelectedDevices: Device[] = [];
    for (const aDevice of this.selectedDevices) {
      if (aDeviceList.find((device) => aDevice.Index === device.Index) !== undefined ||
          this.buttplugClient === null) {
        newSelectedDevices.push(aDevice);
        continue;
      }
      this.$emit("devicedisconnected", aDevice);
      // If a device is removed from selected devices, send a stop command to it.
      this.buttplugClient.SendDeviceMessage(aDevice, new StopDeviceCmd()).catch((e) => console.log(e));
    }

    aDeviceList.map((aDevice) => {
      if (this.deviceSelected(aDevice)) {
        return;
      }
      newSelectedDevices.push(aDevice);
      this.$emit("deviceconnected", aDevice);
    });
    this.selectedDevices = newSelectedDevices;
  }

  private ScanningFinished() {
    this.isServerScanning = false;
  }
}
