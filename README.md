# Twilight Mode - lightweight & comprehensive JS library for darkmode
# Check Back Later! This lib project is not ready yet!
## API
Init: twilightMode()

Optional Settings (if your setting up one of these values you will want to set up all of them)

twilightMode(nightClass, uiTransSet, startTime, endTime, batteryLevelSet, illuminanceTolerance)

nightClass (String) - the css className of your dark/night mode

uiTransSet (Boolean) - use the default UI transition provided by Twilight Mode JS

startTime (Int) - the hour (24 hour time) in which you want darkmode to start

endTime (Int) - the hour (24 hour time) in which you want darkmode to end

batteryLevelSet (int) - the battery level threshold in which you want dark mode to start

illuminanceTolerance (double/long) - the illuminance value threshold you want darkmode to evoke (we recommend you dont override this value and keep the default)