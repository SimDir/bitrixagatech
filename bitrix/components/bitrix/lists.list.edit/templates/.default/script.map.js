{"version":3,"sources":["script.js"],"names":["BX","namespace","Lists","ListsEditClass","parameters","this","randomString","iblockTypeId","iblockId","socnetGroupId","jsClass","listsUrl","listAction","listTemplateEditUrl","init","prototype","ajaxUrl","actionButton","actionPopupItems","actionPopupObject","actionPopupId","bind","delegate","showListAction","length","k","push","text","onclick","action","PopupMenu","getMenuById","buttonRect","getBoundingClientRect","create","closeByEsc","angle","offsetLeft","width","events","onPopupShow","proxy","addClass","onPopupClose","removeClass","popupWindow","show","copyIblock","popup","PopupWindow","titleBar","message","closeIcon","autoHide","content","buttons","UI","Button","size","Size","MEDIUM","color","Color","SUCCESS","button","event","setWaiting","ajax","runAction","data","iblock_type_id","iblock_id","socnet_group_id","then","response","replace","Notification","Center","notify","util","htmlspecialchars","position","closeButton","close","errors","pop","LINK","deleteIblock","form_id","_form","_flag","modalWindow","modalId","title","draggable","contentClassName","contentStyle","padding","destroy","props","className","click","value","submit","PopupWindowManager","getCurrentPopup","migrateList","formId"],"mappings":"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","file":"script.map.js"}