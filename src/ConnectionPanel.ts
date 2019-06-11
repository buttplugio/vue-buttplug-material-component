import Vue from "vue";
import { Component, Prop, Model } from "vue-property-decorator";
import { ButtplugClient, IButtplugClientConnector, ButtplugBrowserWebsocketClientConnector,
  ButtplugEmbeddedClientConnector,
  ButtplugClientDevice} from "buttplug";

class ConnectionAddress {
  private static sIdNumber: number = 0;
  public Id: number;

  public constructor(public Host: string,
                     public Port: number,
                     public Insecure: boolean,
                     public Secure: boolean) {
    this.Id = ConnectionAddress.sIdNumber;
    ConnectionAddress.sIdNumber += 1;
  }

  public get IsValidURL(): boolean {
    try {
      const url = new URL(`ws://${this.Host}:${this.Port}`);
      return true;
    } catch (e) {
      return false;
    }
  }
}

@Component({})
export default class ConnectionPanel extends Vue {
  @Prop()
  private client: ButtplugClient;
  // 30 second scanning limit
  private scanTime: number = 30000;
  private scanOnConnect: boolean = true;
  private selectedDevices: ButtplugClientDevice[] = [];
  // Blank array when disconnected. Mirrors ButtplugClient device array
  // otherwise. Takes some extra logic to get vue to keep up with it.
  private clientDevices: ButtplugClientDevice[] = [];
  private desktopAddresses = [new ConnectionAddress("localhost", 12345, true, true),
                              new ConnectionAddress("localhost", 12346, true, true)];

  public async ConnectToIntifaceDesktop() {
    const connectPromises: Array<Promise<boolean>> = [];
    this.client.addListener("deviceadded", this.OnDeviceListChanged);
    this.client.addListener("deviceremoved", this.OnDeviceListChanged);
    for (const address of this.desktopAddresses) {
      const baseUrl = `${address.Host}:${address.Port}`;
      const urls: string[] = [];
      if (address.Insecure) {
        urls.push(`ws://${baseUrl}`);
      }
      if (address.Secure) {
        urls.push(`wss://${baseUrl}`);
      }
      for (const url of urls) {
        connectPromises.push(this.Connect(new ButtplugBrowserWebsocketClientConnector(`${url}`))
                             .then(() => Promise.resolve(true), (e) => Promise.resolve(false)));
      }
    }
    const connectReturns = await Promise.all(connectPromises);
    if (connectReturns.indexOf(true) === -1) {
      console.log("No valid connection!");
      return;
    }
  }

  private get HasWebBluetooth(): boolean {
    console.log(typeof(window) !== "undefined" &&
           typeof(window.navigator) !== "undefined" &&
                (navigator as any).bluetooth !== undefined);
    return typeof(window) !== "undefined" &&
           typeof(window.navigator) !== "undefined" &&
           (navigator as any).bluetooth !== undefined;
  }

  private OnDeviceListChanged(aDevice: ButtplugClientDevice) {
    // Just reset our internal device array.
    this.clientDevices = this.client.Devices;
  }

  private async ConnectInBrowser(): Promise<void> {
    await this.Connect(new ButtplugEmbeddedClientConnector());
  }

  private async Connect(aConnector: IButtplugClientConnector): Promise<void> {
    await this.client.Connect(aConnector);
    // If we don't connect successfully, the above line will throw. Assume that
    // we're connected if we get this far.
    this.clientDevices = this.client.Devices;
    await this.StartScanning();
  }

  private get Connected() {
    return this.client.Connected;
  }

  private async StartScanning() {
    await this.client.StartScanning();
    setTimeout(async () => await this.StopScanning(), this.scanTime);
    console.log("Starting scanning");
  }

  private async StopScanning() {
    await this.client.StopScanning();
    console.log("Stopping scanning");
  }

  private async ToggleScanning() {
  }

  private async Disconnect() {
    await this.client.Disconnect();
  }

  private RemoveAddress(index: number) {
    this.desktopAddresses = this.desktopAddresses.filter((x) => x.Id != index);
  }

  private AddAddress() {
    this.desktopAddresses.push(new ConnectionAddress("", 0, true, true));
  }

  private ResetAddresses() {
   this.desktopAddresses = [new ConnectionAddress("localhost", 12345, true, true),
                            new ConnectionAddress("localhost", 12346, true, true)];
 }
}
