# Version 1.0.3 - 2020/08/25

- Update to buttplug-js 0.13.2 (Android workaround)

# Version 1.0.2 - 2019/10/05

- Update to buttplug-js 0.12.1 (Motorbunny support)
- Fix bug with intiface desktop websocket loading

# Version 1.0.1 - 2019/07/27

- Update to buttplug-js 0.12.0
- Try loading device config from web CDN by default

# Version 1.0.0 - 2019/06/10

- Rebuild component from the ground up, using vue-cli
- Now brings in ButtplugClient as a prop, does not actually own object
- Embeddable in dialog, nav bar, or otherwise
- Can try connecting to many addresses at one, first one to connect wins race
- Can start scanning on connect, saves a click

# Version 0.3.1 - 2019/05/27

- Update dependencies, including Buttplug 0.11.6
- Remove simulator support completely, will now build into intiface

# Version 0.3.0 - 2019/03/16

- Update dependencies, including Buttplug to 0.11.0

# Version 0.2.5 - 2018/07/06

- Readd uglify hack for for-each compression fix

# Version 0.2.4 - 2018/07/01

- Fix CSS addition that wasn't needed
- Fix webpack external paths

# Version 0.2.3 - 2018/07/01

- Add Simulator options

# Version 0.2.2 - 2018/06/28

- Update dependencies, requiring Buttplug 0.8.0 as a peer dependency
- Fix issue with devices not deregistering on websocket disconnect
- Fix issue with devices coming up selected on reconnect
- Make error messages more descriptive

# Version 0.2.1 - 2018/05/03

- Add workaround for uglify minification bug
- Fix webpack output location
- Fix classname minification bug

# Version 0.2.0 - 2018/05/02

- Move from vue-material to vuetify
- Add cookie storage of websocket server address
- Move to Webpack 4
- Clean up components
- Fix disconnect/ping timeout/device stop issues

# Version 0.1.1 - 2018/02/17

- Fix bug with devices already connected to server not showing up on websocket reconnect
- Fix bug with websocket server disconnect not updating GUI

# Version 0.1.0 - 2018/01/25

- Update dependencies
- Update Buttplug dependency to 0.5.x (rolling minor version due to change)

# Version 0.0.5 - 2017/11/26

- Fix prop/model issues that popped up on dependency changes

# Version 0.0.4 - 2017/11/26

- Show error if websocket connection fails
- Fix disconnect button for websocket connections
- Notify user if bluetooth isn't available
- Update dependencies

# Version 0.0.3 - 2017/10/28

- Update Start/Stop Scanning Button state on scanningfinished event/message

# Version 0.0.2 - 2017/10/08

- Change globals to hang off Vue.Buttplug object.
- Add ability for users to call StopAllDevices easily.

# Version 0.0.1 - 2017/10/08

- Initial release
- Provides basic connection/device management/log viewing functionality
