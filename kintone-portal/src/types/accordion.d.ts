interface AccordionItemProps {
  expanded: boolean,
  item : kintone.types.Fields,
  onChange : (title: string)=>any
}

interface AccordionFooterProps {
  attachment: kintone.fieldTypes.File,
  $id: kintone.fieldTypes.Id
}

interface AttachmentChip {
  name: string,
  fileKey: string
  openPDFViewerHandler: (fileKey: string)=>void
}