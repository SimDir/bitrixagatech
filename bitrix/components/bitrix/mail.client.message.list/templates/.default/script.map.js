{"version":3,"sources":["script.js"],"names":["BX","namespace","Mail","Client","Message","List","options","this","gridId","mailboxId","canMarkSpam","canDelete","moveBtnMailIdPrefix","connectedMailboxesLicenseInfo","ERROR_CODE_CAN_NOT_DELETE","ERROR_CODE_CAN_NOT_MARK_SPAM","disabledClassName","userInterfaceManager","UserInterfaceManager","reloadGrid","bind","resetGridSelection","isSelectedRowsHaveClass","getGridInstance","addEventHandlers","id","prototype","ajax","UpdatePageData","addCustomEvent","data","getSubMenu","getPopupWindow","getPopupContainer","gridRowId","getMenuWindow","showLicensePopup","code","B24","licenseInfoPopup","show","message","onCrmClick","selectedIds","getRows","getSelectedIds","row","getById","node","addToCrm","isAddToCrmActionAvailable","messageIdNode","querySelector","dataset","messageId","isAddingToCrmInProgress","runComponentAction","mode","then","json","notify","onBindingCreated","errors","length","map","item","join","onCrmBindingDeleted","onViewClick","undefined","SidePanel","Instance","open","width","onDeleteClick","showSettingsSlider","onSuccess","ids","isCurrentFolderTrash","confirmPopup","getConfirmDeletePopup","runAction","onMoveToFolderClick","event","folderOptions","currentTarget","popupSubmenu","findParent","className","isDisabled","JSON","parse","folderPath","multiSelectedIds","resultIds","filterRowsByClassName","params","folder","onReadClick","actionName","onMessagesRead","action","updateUnreadCounters","keepRows","successParams","onSpamClick","popupConfirm","buttons","PopupWindowButton","text","events","click","delegate","close","PopupWindow","zIndex","autoHide","closeByEsc","titleBar","content","create","html","onPopupClose","destroy","onPopupDestroy","unselectAll","onCustomEvent","i","columns","getElementsByClassName","isReversed","resIds","Array","isArray","push","delay","top","UI","Notification","Center","autoHideDelay","tableFade","optionsKeys","Object","keys","nextIndex","len","nextKey","desc","getOwnPropertyDescriptor","enumerable","response","onSuccessRequest","onError","onErrorRequest","checkErrorRights","errorMessage","gridInstance","apply_filter","reloadTable","url","util","add_url_param","cacheable","allowChangeHistory","onDisabledGroupActionClick","onUnreadCounterClick","onDirsMenuItemClick","el","filter","getFilterInstance","filterApi","getApi","setFields","DIR","apply","onMailboxMenuClick","Main","gridManager","instance"],"mappings":"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","file":"script.map.js"}