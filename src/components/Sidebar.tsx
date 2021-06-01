import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import routes from '../constants/routes.json';
import { useConfig } from '../contexts/config';
import AdvancedMenu from './AdvancedMenu';

export default function Sidebar({
  menuItems = [],
  isOpen = false,
  onIsOpenChange,
}: {
  menuItems: {
    label: string;
    icon: IconDefinition;
  }[];
  isOpen?: boolean;
  onIsOpenChange: (value: boolean) => void;
}): JSX.Element | null {
  const {
    state: { version, showAdvancedMenu },
  } = useConfig();

  const classes = classNames({
    'w-80 absolute inset-y-0 -right-80 bg-yellow-300 z-50 transition duration-200 ease-in-out transform': true,
    'flex flex-col justify-between': true,
    '-translate-x-80': isOpen,
  });

  return (
    <>
      <div className={classes}>
        <div className="pl-8 mt-16 flex flex-col space-y-6 items-start">
          {menuItems.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              className="text-yellow-1500 text-lg focus:outline-none hover:text-yellow-1200"
            >
              {icon && (
                <FontAwesomeIcon icon={icon} className="mr-3" size="lg" />
              )}
              <span className="font-bold">{label}</span>
            </button>
          ))}
        </div>

        {/* menu footer */}
        <div className="pl-8 mb-4 relative">
          {showAdvancedMenu && (
            <div className="absolute right-8 bottom-0">
              <AdvancedMenu
                menuItems={[
                  { label: 'start', to: routes.START },
                  { label: 'advanced scraping', to: routes.SCRAPING_ADVANCED },
                  { label: 'results', to: routes.RESULTS },
                  { label: 'provider login', to: routes.PROVIDER_LOGIN },
                  {
                    label: 'experiment scraping',
                    to: routes.SCRAPING_EXPERIMENT,
                  },
                  { label: 'settings', to: routes.SETTINGS },
                ]}
              />
            </div>
          )}

          <div className="text-sm text-yellow-1100">
            DataSkop
            <br />
            Version: {version}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        tabIndex={-1}
        className={`absolute inset-0 bg-yellow-1400 bg-opacity-50 z-40 ${
          !isOpen && 'hidden'
        }`}
        onClick={() => onIsOpenChange(false)}
      />
    </>
  );
}
