import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState } from 'react';

export default function Explainer({
  isOpen = false,
  onIsOpenChange,
  children,
}: {
  isOpen?: boolean;
  onIsOpenChange: (value: boolean) => void;
  children: React.ReactNode;
}): JSX.Element | null {
  const [isToggleHover, setIsToggleHover] = useState(false);

  return (
    <div
      className={classNames({
        'absolute inset-0 z-50 overflow-y-scroll bg-yellow-1400 bg-opacity-50':
          isOpen,
      })}
    >
      <div
        className={classNames({
          'w-2/3 inset-y-0 min-h-full bg-white z-30': true,
          '-left-2/3 absolute': !isOpen,
          'left-0 relative': isOpen,
          'transition-all duration-200 ease-in-out': true,
          'flex flex-col justify-between': true,
          'box-content border-r-8': true,
          'border-yellow-600': !isToggleHover,
          'border-yellow-800': isToggleHover,
        })}
      >
        {/* Open/close toggle */}
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <button
          type="button"
          onClick={() => onIsOpenChange(!isOpen)}
          onMouseOver={() => setIsToggleHover(true)}
          onMouseOut={() => setIsToggleHover(false)}
          className={classNames({
            'w-10 h-10 absolute top-24 focus:outline-none': true,
            'transition-all duration-200 ease-in-out': true,
            '-right-6': isOpen,
            '-right-12': !isOpen,
            'bg-yellow-600': !isToggleHover,
            'bg-yellow-800': isToggleHover,
          })}
        >
          <FontAwesomeIcon
            icon={isOpen ? faChevronLeft : faChevronRight}
            className="text-yellow-1500"
            size="lg"
          />
        </button>

        {/* Content */}
        <div className="px-8 py-16">{children}</div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          tabIndex={-1}
          className="fixed inset-0 h-full z-10"
          onClick={() => onIsOpenChange(false)}
        />
      )}
    </div>
  );
}
