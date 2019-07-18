let night, day, manualMode = false;
function twilightMode(nightClass, uiTransSet, startTime, endTime, batteryLevelSet, illuminanceTolerance) {
   //checks if the OS is enforcing dark or light mode (if API exists)
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
    let isNight, modeNight = false , charging = false,  batteryLevel = 100, override = false, logs = '',batteryInWindow = false, toggle = false;
    let body = document.getElementsByTagName('body')[0];
    var uiTrans = () => { };

    //sets arguments not defined to default values
    nightClass = typeof nightClass !== 'undefined' ? nightClass : 'night';
    uiTransSet = typeof uiTransSet !== 'undefined' ? uiTransSet : 'false';
    startTime = typeof startTime !== 'undefined' ? startTime : 21;
    endTime = typeof endTime !== 'undefined' ? endTime : 4;
    batteryLevelSet = typeof batteryLevelSet !== 'undefined' ? batteryLevelSet : 35;
    illuminanceTolerance = typeof illuminanceTolerance !== 'undefined' ? illuminanceTolerance : 16.257;

    //Smooth UI transition from dark to light mode
    if(uiTransSet){
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML =
        `
        body.transition, body.transition *, body.transition * :before, body.transition * :after {
            transition: all 750ms !important;
            transition-delay: 0 !important;
        }
        `;
        uiTrans = () => {
         document.getElementsByTagName('head')[0].appendChild(style);
        body.classList.add('transition');
        window.setTimeout(() => {
          body.classList.remove('transition')
        }, 1000)
    }
    }
     night = (manualModee) =>{
        //console.log('changed to night')
        if (!modeNight) {
          uiTrans()
          document.body.classList.add(nightClass)
          modeNight = true
        }
        manualMode = manualModee
    }
     day = (manualModee) =>{
        //console.log('changed to day')
        if(true){
        uiTrans()
        document.body.classList.remove(nightClass)
        modeNight = false
        }
        manualMode = manualModee
    }
    const setColorScheme = () => {
        window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
        window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())

        if(isDarkMode) activateDarkMode()
        if(isLightMode) activateLightMode()
        if(isNotSpecified || hasNoSupport) {
          //console.log('No suppoert for color scheme or no pref. Set to ALS, Low Batt, and Clock')
          now = new Date();
          hour = now.getHours();
          if ((hour <= endTime || hour >= startTime) && !manualMode) {
            setInterval(function(){
            night(false)}, 1000)
            override = true;
          }else{
            if(!modeNight){
              modeNight = true;
              override = false;
              day(false);
            }
          }
        }
    }
    if ('AmbientLightSensor' in window) {
        const sensor = new AmbientLightSensor();
        sensor.onreading = () => {
        //console.log('illuminance value :', sensor.illuminance);
        if(!manualMode){
          if (sensor.illuminance <= 16.257 && !override) {
            night(false);
          } else {
            if(batteryInWindow){
              navigator.getBattery().then(function(battery) {
                let batteryLevel = battery.level * 100;
                if(batteryLevel <= batteryLevelSet && !override){
                 night(false);
                }else{
                  if(!override){
                    day(false);
                  }
                }
            });
            }else{
              if(!override){
              day(false)
              }
            }
          }
        };
      };
        sensor.onerror = (event) => {
          //console.log(event.error.name, event.error.message);
        };
        sensor.start();
      }
      setColorScheme()
      setInterval(function(){
      setColorScheme()}, 120000)
}
