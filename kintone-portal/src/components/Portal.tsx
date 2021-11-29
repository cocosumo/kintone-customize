import {useEffect, useState} from 'react';
import {getGroupedAnnouncements} from '../backend/announcement';
import {Accordion} from './accordion/Accordion';
import {AnnouncementsContainer} from './containers/AnnouncementsContainer';
import {MainContainer} from './containers/MainContainer';
import './Portal.css';
import Snowflakes from 'magic-snowflakes';
import FloatingActionButtons from './fab/FloatingActionButton';

const snowflakes = new Snowflakes({
  count: 8, // 100 snowflakes. Default: 50
});

export const Portal = () => {
  snowflakes.start();
  const [data, setData] = useState<GroupAnnouncements | null>();

  useEffect(() => {
    getGroupedAnnouncements().then((resp) => {
      setData(resp);
    });
  }, []);

  return (
    <MainContainer >
      <AnnouncementsContainer>
        <Accordion
          title="NEWS"
          subTitle="お知らせ"
          data={data?.news}
        />
        <Accordion
          title="EVENTS"
          subTitle="イベント"
          data={data?.events}
        />
        {/* todo Add help button
         <FloatingActionButtons /> */}
      </AnnouncementsContainer>
    </MainContainer>
  );
};