/* Typescript */

export const isMobile : boolean = (window.location.href).includes('k/m');

export const onEdit : string[] = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
];

export const onCreate : string[] = [
  'app.record.create.show',
  'mobile.app.record.create.show',
];

export const onEditSubmit = [
  'app.record.edit.submit',
  'mobile.app.record.edit.submit',
];

export const onEditSubmitSuccess : string[] = [
  'app.record.edit.submit.success',
  'mobile.app.record.edit.submit.success',
];

export const onCreateSubmit : string[] = [
  'app.record.create.submit',
  'mobile.app.record.create.submit',
];

export const onCreateSubmitSuccess : string[] = [
  'app.record.create.submit.success',
  'mobile.app.record.create.submit.success',
];


export const onEditOrCreate : string[] = onEdit.concat(onCreate);
export const onSubmit : string[] = onEditSubmit.concat(onCreateSubmit);
export const onSubmitSuccess : string[] = onEditSubmitSuccess.concat(onCreateSubmitSuccess);

export const getPortalSpaceElement = () => (
  isMobile
    ? kintone.mobile.portal.getContentSpaceElement()
    : kintone.portal.getContentSpaceElement()
);