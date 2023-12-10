import { ArrowIcon } from '@assets/icons/arrow-icon';
import './accordion.css';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface AccordionProps {
  sectionName: string;
  children: ReactNode;
}

export const Accordion = ({ sectionName, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>();

  useEffect(() => {
    if (contentRef.current && isOpen) {
      return setContentHeight(`${contentRef.current.scrollHeight + 150}px`);
    }

    return setContentHeight('0px');
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion'>
      <div className='accordion-header' onClick={toggleAccordion}>
        <h2>{sectionName}</h2>
        <ArrowIcon className={isOpen ? 'arrow down' : 'arrow'} />
      </div>
      <div
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{ maxHeight: contentHeight }}
      >
        <div className='content-inner' ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};
