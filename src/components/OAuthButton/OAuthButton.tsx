import React from 'react';
import './OAuthButton.css';
import { oAuthApi } from 'services/api/oAuthApi';

export const OAuthButton = () => {
  return (
    <button
      className="o-auth-yandex"
      onClick={() => {
        oAuthApi.startOauthYandex();
      }}
    >
      <span className="o-auth-yandex__icon" />
      <span className="o-auth-yandex__text">хочу Войти</span>
      <span className="o-auth-yandex__desc">найдеться все?</span>
    </button>
  );
};
