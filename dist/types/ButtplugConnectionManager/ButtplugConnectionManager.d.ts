import Vue from "vue";
export default class ButtplugConnectionManager extends Vue {
    private isConnected;
    private clientName;
    private address;
    HasBluetooth(): boolean;
    mounted(): void;
    private ConnectWebsocket();
    private ConnectLocal();
    private Disconnect();
}
