import Vue from "vue";
export default class ButtplugConnectionManager extends Vue {
    private isConnected;
    private clientName;
    private address;
    mounted(): void;
    private readonly HasBluetooth;
    private ConnectWebsocket();
    private ConnectLocal();
    private Disconnect();
}
