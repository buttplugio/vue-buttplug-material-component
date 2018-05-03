# Version 0.2.0 - 2017/05/02

- Move from vue-material to vuetify
- Add cookie storage of websocket server address
- Move to Webpack 4
- Clean up components
- Fix disconnect/ping timeout/device stop issues

# Version 0.1.1 - 2017/02/17

- Fix bug with devices already connected to server not showing up on websocket reconnect
- Fix bug with websocket server disconnect not updating GUI

# Version 0.1.0 - 2017/01/25

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
