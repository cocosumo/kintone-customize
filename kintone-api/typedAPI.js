/* Typescript */
export var isMobile = (window.location.href).includes('k/m');
export var onEdit = [
    'app.record.edit.show',
    'mobile.app.record.edit.show',
];
export var onCreate = [
    'app.record.create.show',
    'mobile.app.record.create.show',
];
export var onEditSubmit = [
    'app.record.edit.submit',
    'mobile.app.record.edit.submit',
];
export var onEditSubmitSuccess = [
    'app.record.edit.submit.success',
    'mobile.app.record.edit.submit.success',
];
export var onCreateSubmit = [
    'app.record.create.submit',
    'mobile.app.record.create.submit',
];
export var onCreateSubmitSuccess = [
    'app.record.create.submit.success',
    'mobile.app.record.create.submit.success',
];
export var onEditOrCreate = onEdit.concat(onCreate);
export var onSubmit = onEditSubmit.concat(onCreateSubmit);
export var onSubmitSuccess = onEditSubmitSuccess.concat(onCreateSubmitSuccess);
export var getPortalSpaceElement = function () { return (isMobile
    ? kintone.mobile.portal.getContentSpaceElement()
    : kintone.portal.getContentSpaceElement()); };
