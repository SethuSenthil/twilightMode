# Twilight Mode - lightweight & comprehensive JS library for darkmode
# Beta v0.3
## API
Init: twilightMode()

All settings are optional

```javascript
//all of these or default settings (so if your going to use these exact same values don't pass in any params)
let twilightSettings = {
nightClass = "night",
uiTransSet = false, //false means it uses the default smooth UI transition
startTime = 21, //the start time for twilight
endTime = 4, //the end time for twilight
batteryLevelSet = 35, //the battery percent threshold in which twilight mode will launch
illuminanceTolerance = 16.257 //the ambient light sensor value threshold you want twilight to launch
}

twilightMode(twilightSettings)
```


nightClass (String) - the css className of your dark/night mode

uiTransSet (Boolean) - use the default UI transition provided by Twilight Mode JS

startTime (Int) - the hour (24 hour time) in which you want darkmode to start

endTime (Int) - the hour (24 hour time) in which you want darkmode to end

batteryLevelSet (int) - the battery level threshold in which you want dark mode to start

illuminanceTolerance (double/long) - the illuminance value threshold you want darkmode to evoke (we recommend you dont override this value and keep the default)

# Development
To compile the library your self:
` npm i` - to instal the compiler dependencies
`npm start` - to build the library
