import {AccordionContainer} from '../containers/AccordionContainer';
import {AccordionItem} from './AccordionItem';
import {useState} from 'react';


type AccordionProps = {
  title : string,
  subTitle: string
  data: Announcements
}

export const Accordion = ({title, subTitle, data} : AccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
  (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <AccordionContainer title={title} subTitle={subTitle}>
      {data?.map(item=>{
        const announcementTitle = item.文字列＿タイトル.value;
        return (
          <AccordionItem
            expanded={expanded === announcementTitle}
            key={announcementTitle}
            item={item}
            onChange={handleChange}
          />
        );
      })}
    </AccordionContainer>
  );
};