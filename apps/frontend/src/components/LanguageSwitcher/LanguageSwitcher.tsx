import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation<'en'|'pl'>();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button className='action-button' onClick={() => changeLanguage('en')}>English</button>
      <button className='action-button' onClick={() => changeLanguage('pl')}>Polski</button>
    </div>
  );
};

export default LanguageSwitcher;
