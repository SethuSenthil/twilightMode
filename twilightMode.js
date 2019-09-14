let night, day, manualMode = false;
//args.nightClass, args.uiTransSet, args.startTime, args.endTime, args.batteryLevelSet, args.illuminanceTolerance
function twilightMode(args) {
   //checks if the OS is enforcing dark or light mode (if API exists)
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
    let isNight, modeNight = false , charging = false,  batteryLevel = 100, override = false, logs = '',batteryInWindow = false, toggle = false;
    let body = document.getElementsByTagName('body')[0];
    var uiTrans = () => { };

    //sets arguments not defined to default values
    if(args === null || args === undefined) {
      args = {
        nightClass : 'night',
        uiTransSet : 'false',
        startTime : 21,
        endTime : 4,
        batteryLevelSet : 35,
        illuminanceTolerance : 16.257
      }
     }

    //Smooth UI transition from dark to light mode
    if(args.uiTransSet){
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
          document.body.classList.add(args.nightClass)
          modeNight = true
        }
        manualMode = manualModee
    }
     day = (manualModee) =>{
        //console.log('changed to day')
        if(true){
        uiTrans()
        document.body.classList.remove(args.nightClass)
        modeNight = false
        }
        manualMode = manualModee
    }
    const setColorScheme = () => {
        window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
        window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())

        if(isDarkMode) night()
        if(isLightMode) day()
        if(isNotSpecified || hasNoSupport) {
          //console.log('No suppoert for color scheme or no pref. Set to ALS, Low Batt, and Clock')

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
                    if(batteryLevel <= args.batteryLevelSet && !override){
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

          now = new Date();
          hour = now.getHours();
          if ((hour <= args.endTime || hour >= args.startTime) && !manualMode) {
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
      setColorScheme()
      setInterval(function(){
      setColorScheme()}, 120000)
}
