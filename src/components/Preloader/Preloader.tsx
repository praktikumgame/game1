import React from 'react';

import './Preloader.css';

const Preloader = () => (
  <div className="preloader">
    <div className="preloader__container">
      <div className="preloader__item" />
      <p className="preloader__text">
        Загрузка
        <span className="preloader___point preloader___point_one">.</span>
        <span className="preloader___point preloader___point_two">.</span>
        <span className="preloader___point preloader___point_three">.</span>
      </p>
    </div>
  </div>
);

export { Preloader };
