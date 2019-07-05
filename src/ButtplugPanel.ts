import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ButtplugClient, IButtplugClientConnector, ButtplugBrowserWebsocketClientConnector,
         ButtplugEmbeddedClientConnector,
         ButtplugClientDevice} from "buttplug";
Vue.use(require("vue-cookies"));

class ConnectionAddress {
  public static FromObject(aObj: any): ConnectionAddress {
    return new ConnectionAddress(aObj.Host, aObj.Port, aObj.Insecure, aObj.Secure);
  }

  private static sIdNumber: number = 0;
  public Id: number;

  public constructor(public Host: string,
                     public Port: number,
                     public Insecure: boolean,
                     public Secure: boolean) {
    this.Id = ConnectionAddress.sIdNumber;
    ConnectionAddress.sIdNumber += 1;
  }

  public AsObject(): object {
    return {
      Host: this.Host,
      Port: this.Port,
      Insecure: this.Insecure,
      Secure: this.Secure,
    };
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

enum UiMessageType {
  Error,
  Status,
}

@Component({})
export default class ButtplugPanel extends Vue {

  @Prop()
  private client: ButtplugClient;
  private isScanning: boolean = false;
  // 30 second scanning limit
  private scanTime: number = 30000;
  private scanOnConnect: boolean = true;
  private selectedDevices: number[] = [];
  // Blank array when disconnected. Mirrors ButtplugClient device array
  // otherwise. Takes some extra logic to get vue to keep up with it.
  private clientDevices: ButtplugClientDevice[] = [];
  private desktopAddresses = [new ConnectionAddress("localhost", 12345, true, true),
                              new ConnectionAddress("localhost", 12346, true, true)];
  private uiMessage: [UiMessageType, string] | null = null;
  private cookies: any = (window as any).$cookies;

  public mounted() {
    this.cookies.config("999d");
    try {
      const addresses = JSON.parse(this.cookies.get("intiface-addresses"));
      if (addresses && Array.isArray(addresses) && addresses.length > 0) {
        this.RetrieveAddressCookie(addresses);
      } else {
        console.log("Don't have an addresses!");
        this.StoreAddressCookie();
      }
    } catch {
      console.log("Can't load cookie!");
      this.StoreAddressCookie();
    }
  }

  public async ConnectToIntifaceDesktop() {
    const connectPromises: Array<Promise<boolean>> = [];
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
      this.SetErrorMessage("Cannot connect to Intiface Desktop. Is the application up, and is the server running?");
      return;
    }
  }

  private StoreAddressCookie() {
    const addrs: object[] = [];
    for (const addr of this.desktopAddresses) {
      addrs.push(addr.AsObject());
    }
    this.cookies.set("intiface-addresses", JSON.stringify(addrs));
  }

  private RetrieveAddressCookie(aAddrs: object[]) {
    this.desktopAddresses = [];
    for (const addr of aAddrs) {
      this.desktopAddresses.push(ConnectionAddress.FromObject(addr));
    }
  }

  private SetErrorMessage(aMsg: string) {
    this.uiMessage = [UiMessageType.Error, aMsg];
  }

  private SetStatusMessage(aMsg: string) {
    this.uiMessage = [UiMessageType.Status, aMsg];
  }

  private get HasWebBluetooth(): boolean {
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
    this.client.addListener("deviceadded", this.OnDeviceListChanged);
    this.client.addListener("deviceremoved", this.OnDeviceListChanged);
    this.client.addListener("scanningfinished", this.OnScanningFinished);
    this.client.addListener("disconnect", this.RemoveListeners);
    try {
      await this.client.Connect(aConnector);
    } catch (e) {
      this.RemoveListeners();
      throw e;
    }
    // If we don't connect successfully, the above line will throw. Assume that
    // we're connected if we get this far.
    this.clientDevices = this.client.Devices;
    await this.StartScanning();
  }

  private RemoveListeners() {
    this.client.removeListener("deviceremoveed", this.OnDeviceListChanged);
    this.client.removeListener("deviceremoved", this.OnDeviceListChanged);
    this.client.removeListener("scanningfinished", this.OnScanningFinished);
    this.client.removeListener("disconnect", this.RemoveListeners);
    this.clientDevices = [];
    this.selectedDevices = [];
  }

  private get Connected() {
    return this.client.Connected;
  }

  private async StartScanning() {
    await this.client.StartScanning();
    setTimeout(async () => await this.StopScanning(), this.scanTime);
    this.isScanning = true;
  }

  private async StopScanning() {
    await this.client.StopScanning();
    this.isScanning = false;
  }

  private OnScanningFinished() {
    this.isScanning = false;
  }

  private async ToggleScanning() {
    if (this.isScanning) {
      await this.StopScanning();
      return;
    }
    await this.StartScanning();
  }

  private async Disconnect() {
    await this.client.Disconnect();
    this.RemoveListeners();
    this.SetStatusMessage("Client disconnected.");

  }

  private RemoveAddress(index: number) {
    this.desktopAddresses = this.desktopAddresses.filter((x) => x.Id !== index);
    this.StoreAddressCookie();
  }

  private AddAddress() {
    this.desktopAddresses.push(new ConnectionAddress("", 0, true, true));
    this.StoreAddressCookie();
  }

  private ResetAddresses() {
    this.desktopAddresses = [new ConnectionAddress("localhost", 12345, true, true),
                             new ConnectionAddress("localhost", 12346, true, true)];
    this.StoreAddressCookie();
  }

  private FireChange() {
    const devices = this.clientDevices.filter((x: ButtplugClientDevice) =>
                                              this.selectedDevices.indexOf(x.Index) !== -1);
    this.$emit("selecteddeviceschange", devices);
  }

  private CloseUiMessage() {
    this.uiMessage = null;
  }
}
