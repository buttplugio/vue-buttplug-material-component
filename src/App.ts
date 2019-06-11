import Vue from "vue";
import { Component } from "vue-property-decorator";
import ConnectionPanel from "./ConnectionPanel";
import { ButtplugClient } from "buttplug";

@Component({
  components: {
    ConnectionPanel,
  },
})
export default class App extends Vue {
  private dialog: boolean = true;
  private client: ButtplugClient = new ButtplugClient("VueTester");
}
