import Vue from "vue";
import { Component } from "vue-property-decorator";
import ButtplugPanel from "./ButtplugPanel";
import { ButtplugClient } from "buttplug";

@Component({
  components: {
    ButtplugPanel,
  },
})
export default class App extends Vue {
  private dialog: boolean = true;
  private client: ButtplugClient = new ButtplugClient("VueTester");
}
