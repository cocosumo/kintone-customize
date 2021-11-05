import MUIAccordion from '@mui/material/Accordion';
import AccordionContents from './AccordionContents';
import AccordionFooter from './AccordionFooter';
import AccordionHeader from './AccordionHeader';

interface AccordionItemProps {
  expanded: boolean,
  item : kintone.types.Fields,
  onChange : (title: string)=>any
}

export const AccordionItem = ({
  expanded,
  item,
  onChange
}: AccordionItemProps) => {

  const {
    所属: {value: affiliate},
    文字列＿タイトル: {value: title},
    日時＿開始: {value: startDate},
    リッチ＿内容: {value: contents},
    添付ファイル: attachment
  } = item;

  console.log(attachment);

  return (
    <MUIAccordion expanded={expanded} onChange={onChange(title)}>
      <AccordionHeader {...{title, affiliate, startDate}} />
      <AccordionContents {...{contents}} />
      <AccordionFooter {...{attachment}} />
    </MUIAccordion>
  );
};