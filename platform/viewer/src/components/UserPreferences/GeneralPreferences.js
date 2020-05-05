import React, { useState, useSelector } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

import i18n from '@ohif/i18n';

import { TabFooter, LanguageSwitcher, useSnackbarContext } from '@ohif/ui';
import { useTranslation } from 'react-i18next';

import './GeneralPreferences.styl';

/**
 * General Preferences tab
 * It renders the General Preferences content
 *
 * @param {object} props component props
 * @param {function} props.onClose
 */
function GeneralPreferences({ onClose }) {
  const { t } = useTranslation('UserPreferencesModal');
  const snackbar = useSnackbarContext();
  const currentLanguage = i18n.language;
  const defaultColor = { r: 0, g: 255, b: 0 };
  const currentColor =
    JSON.parse(localStorage.getItem('coveraViewerViewportCursorColor')) ||
    defaultColor;
  const { availableLanguages } = i18n;

  const [language, setLanguage] = useState(currentLanguage);
  const [color, setColor] = useState(currentColor);

  const handleColorChange = newColor => setColor(newColor.rgb);

  const onResetPreferences = () => {
    setLanguage(i18n.defaultLanguage);
    setColor(defaultColor);
  };

  const onSave = () => {
    i18n.changeLanguage(language);
    localStorage.setItem(
      'coveraViewerViewportCursorColor',
      JSON.stringify(color)
    );

    onClose();

    snackbar.show({
      message: t('SaveMessage'),
      type: 'success',
    });
  };

  const hasErrors = false;

  return (
    <React.Fragment>
      <div className="GeneralPreferences">
        <div className="language">
          <label htmlFor="language-select" className="languageLabel">
            Language
          </label>
          <LanguageSwitcher
            language={language}
            onLanguageChange={setLanguage}
            languages={availableLanguages}
          />
        </div>
        <br />
        <div className="color">
          <label htmlFor="color-select" className="colorLabel">
            Viewport Cursor Color
          </label>
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
        </div>
      </div>
      <TabFooter
        onResetPreferences={onResetPreferences}
        onSave={onSave}
        onCancel={onClose}
        hasErrors={hasErrors}
        t={t}
      />
    </React.Fragment>
  );
}

GeneralPreferences.propTypes = {
  onClose: PropTypes.func,
};

export { GeneralPreferences };
