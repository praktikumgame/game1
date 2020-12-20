import React, { useCallback } from 'react';
import './OAuthButton.css';
import { oAuthApi } from 'services/api/oAuthApi';

export const OAuthButton = () => {
  const memoizedOnClick = useCallback(async () => {
    await oAuthApi.startOAuthYandex();
  }, []);

  return (
    <button className="o-auth-yandex" onClick={memoizedOnClick}>
      <span className="o-auth-yandex__icon" />
      <span className="o-auth-yandex__text">хочу Войти</span>
      <span className="o-auth-yandex__desc">найдеться все?</span>
    </button>
  );
};
