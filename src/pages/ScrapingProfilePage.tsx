import React, { useState } from 'react';
import Scraping from '../components/scraping/Scraping';
import routes from '../constants/routes.json';
import { useConfig } from '../contexts/config';
import SlideBase from '../layout/SlideBase';

export default function ScrapingProfilePage(): JSX.Element {
  const [sessionId, setSessionId] = useState(null);

  const {
    state: { scrapingConfig },
  } = useConfig();

  const onlyProfileScraper = {
    ...scrapingConfig,
    procedureConfig: {
      ...scrapingConfig.procedureConfig,
      seedVideosDynamic: [],
      seedVideosFixed: [],
    },
  };

  const footerNav =
    sessionId !== null
      ? [
          {
            label: 'weiter zu Visualisierung',
            clickHandler: (x) =>
              x.push(
                routes.VISUALIZATION_PROFILE.replace(':sessionId', sessionId),
              ),
          },
        ]
      : [];

  return (
    <SlideBase footerNav={footerNav}>
      <Scraping
        scrapingConfig={onlyProfileScraper}
        onDone={(x) => setSessionId(x)}
      />
    </SlideBase>
  );
}
