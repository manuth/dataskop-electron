import {
  faBars,
  faChartPieAlt,
  faInfoCircle,
  faPaperPlane,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import ProcessIndicator from '../components/ProcessIndicator';
import ScrapingProgressBar from '../components/ScrapingProgressBar';
import Sidebar from '../components/Sidebar';
import routes from '../constants/routes.json';
import { useConfig, useNavigation } from '../contexts';
import { useScraping } from '../contexts/scraping';
import logo from '../static/images/logos/dslogo.svg';
import { postEvent } from '../utils/networking';

const sidebarMenu = [
  {
    label: 'Menüpunkt 1',
    icon: faChartPieAlt,
  },
  {
    label: 'Menüpunkt 2',
    icon: faPaperPlane,
  },
  {
    label: 'Menüpunkt 3',
    icon: faInfoCircle,
  },
];

export default function Base({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [sectionKey, setSectionKey] = useState('');
  const { pathname } = useLocation();
  const {
    state: { campaign },
  } = useScraping();
  const {
    state: { trackEvents, platformUrl },
  } = useConfig();
  const {
    state: { pageIndex, sections },
    dispatch,
    getCurrentPage,
    getPageIndexByPath,
  } = useNavigation();

  // read config for current route
  useEffect(() => {
    const nextPageIndex = getPageIndexByPath(pathname);

    // set page index
    if (nextPageIndex !== -1) {
      dispatch({ type: 'set-page-index', pageIndex: nextPageIndex });
    }

    if (trackEvents && campaign !== null && platformUrl !== null) {
      postEvent(platformUrl, campaign.id, pathname, {});
    }
  }, [pathname]);

  useEffect(() => {
    const page = getCurrentPage();

    // set dark mode
    if (page.isDarkMode) {
      if (page.isDarkMode === true) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // set processIndicator
    if (typeof page.sectionKey !== 'undefined') {
      if (page.sectionKey === null) {
        setSectionKey('');
      } else {
        setSectionKey(page.sectionKey);
      }
    }
  }, [pageIndex]);

  return (
    <div className="relative flex flex-col h-screen justify-between">
      <header
        className={classNames('flex items-center py-4 px-6 z-20', {
          'opacity-0': pathname === routes.START,
        })}
      >
        <div>
          <img src={logo} style={{ width: '8rem' }} alt="Dataskop Logo" />
        </div>
        <div className="flex items-center ml-auto mr-6">
          <div className="mr-4">
            <ScrapingProgressBar />
          </div>

          {/* MyData vault */}
          <div>
            <Button
              key="my-data"
              size="small"
              theme="blue"
              onClick={() => false}
            >
              Meine Daten
            </Button>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="focus:outline-none text-yellow-800 hover:text-yellow-900"
            onClick={() => setMenuIsOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </header>

      <Sidebar
        menuItems={sidebarMenu}
        isOpen={menuIsOpen}
        onIsOpenChange={(val: boolean) => setMenuIsOpen(val)}
      />

      {/*  h-full hides the debug button for long pages */}
      <main className="flex flex-grow flex-col justify-between overflow-auto pt-4">
        {children}
      </main>

      <footer>
        <ProcessIndicator steps={sections} currentStep={sectionKey} />
      </footer>
    </div>
  );
}
