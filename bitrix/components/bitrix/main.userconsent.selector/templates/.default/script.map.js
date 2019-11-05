{"version":3,"sources":["script.js"],"names":["MainUserConsentSelectorManager","params","this","selectors","init","actionRequestUrl","initSlider","contexts","document","querySelectorAll","BX","convert","nodeListToArray","forEach","initByContext","context","selector","querySelector","linkEdit","linkView","push","bind","onChange","initSliderButtons","style","display","value","fillHrefByTemplate","a","path","getAttribute","href","replace","RegExp","fillDropDownControl","node","items","skipExistedFirstElement","firstChildElement","children","innerHTML","appendChild","item","caption","option","createElement","selected","innerText","list","slider","bindOpen","caller","top","addCustomEvent","SidePanel","Instance","close","onSliderClose","sendActionRequest","data","selectorNode","selectedValue","ID","map","NAME","toString","fireEvent","bindAnchors","rules","condition","loader","stopParameters","onSaved","onClose","element","openHref","e","preventDefault","open","url","reloadAfterClosing","cacheable","events","action","sendData","callbackSuccess","callbackFailure","sessid","bitrix_sessid","ajax","method","timeout","dataType","processData","onsuccess","proxy","error","apply","onfailure","text"],"mappings":"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","file":"script.map.js"}