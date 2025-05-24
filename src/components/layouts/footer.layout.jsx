import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config';
import React from 'react';
import Icon from '../ui/icon';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <div className="bg-secondary">
      <footer className="container">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(190px,1fr))] py-4 gap-6">
          {FOOTER_SECTION.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold">{section.title}</h3>
              <ul className="flex flex-col gap-1">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a className="text-sm hover:underline" href={link.href}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div
        className="bg-brand p-4 mx-auto container flex flex-col flex-wrap justify-center items-center gap-4 
      sm:flex-row sm:justify-between max-w-7xl"
      >
        <div className="flex gap-4 justify-center items-center">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              href={link.href}
              key={index}
              className="text-slate-100 hover:text-slate-300 transition-colors"
            >
              <Icon icon={link.icon} size="18" />
            </a>
          ))}
        </div>
        <div>
          <p>
            Copyright &copy;{' '}
            {`${dayjs().year()} Booking.com All rights reserved.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
