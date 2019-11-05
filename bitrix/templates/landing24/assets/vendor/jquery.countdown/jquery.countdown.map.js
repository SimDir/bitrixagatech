{"version":3,"sources":["jquery.countdown.js"],"names":["factory","define","amd","jQuery","$","instances","matchers","defaultOptions","precision","elapse","defer","push","source","RegExp","join","parseDateString","dateString","Date","String","match","Number","replace","Error","DIRECTIVE_KEY_MAP","Y","m","n","d","w","W","H","M","S","D","I","N","T","escapedRegExp","str","sanitize","toString","strftime","offsetObject","format","directives","i","len","length","directive","regexp","modifier","plural","value","hasOwnProperty","pluralize","count","singular","split","Math","abs","Countdown","el","finalDate","options","this","$el","interval","offset","extend","instanceNumber","data","on","setFinalDate","start","prototype","clearInterval","self","update","setInterval","call","stop","dispatchEvent","toggle","pause","resume","remove","countdownInstance","closest","hasEventsAttached","_data","undefined","now","newTotalSecsLeft","getTime","ceil","totalSecsLeft","elapsed","seconds","minutes","floor","hours","days","daysToWeek","daysToMonth","weeks","weeksToMonth","months","years","getFullYear","totalDays","totalHours","totalMinutes","totalSeconds","eventName","event","Event","trigger","fn","countdown","argumentsArray","Array","slice","arguments","each","instance","method","apply","error"],"mappings":"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","file":"jquery.countdown.map.js"}