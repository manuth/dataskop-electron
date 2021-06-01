import {
  faBars,
  faChartPieAlt,
  faInfoCircle,
  faPaperPlane,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useEffect, useState } from 'react';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import logo from '../static/logos/dslogo.svg';

export default function Base({
  children,
  isDarkMode = false,
}: {
  children: ReactNode;
  isDarkMode?: boolean;
}): JSX.Element {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
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

  useEffect(() => {
    if (isDarkMode === true) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="relative flex flex-col h-screen justify-between px-6">
      <header className="flex py-4 items-center">
        <div>
          <img src={logo} style={{ width: '8rem' }} alt="Dataskop Logo" />
        </div>
        <div className="ml-auto mr-6">
          <Button key="my-data" size="small" theme="blue" onClick={() => false}>
            Meine Daten
          </Button>
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
      <main className="pt-4 flex flex-grow flex-col">{children}</main>

      {/* <footer className="pt-6 pb-4 flex justify-between items-center">
      </footer> */}
    </div>
  );
}
