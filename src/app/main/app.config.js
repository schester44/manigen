// Apply some global configuration...
export const otherwiseConfigBlock = ['$urlRouterProvider', $urlRouterProvider => { $urlRouterProvider.otherwise('/generator'); }];
export const html5ModeConfigBlock = ['$locationProvider', $locationProvider => { $locationProvider.html5Mode(true); }];

// Enable tracing of each TRANSITION... (check the javascript console)
// This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
// Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
export const traceRunBlock = ['$trace', $trace => { $trace.enable(1); }];
