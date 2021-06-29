import Arrow from '../../../images/arrow-icon.svg';

function Portfolio() {
  return (
    <section className="section portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__content">
        <div className="portfolio__item">
          <a className="portfolio__item-name" href="https://github.com/Irina-abah/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт
          </a>
          <img className="portfolio__icon" src={Arrow} alt="Arrow icon" />
        </div>
        <div className="portfolio__item">
          <a className="portfolio__item-name" href="https://irina-abah.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">Адаптивный сайт
          </a>
          <img className="portfolio__icon" src={Arrow} alt="Arrow icon" />
        </div>
        <div className="portfolio__item">
          <a className="portfolio__item-name" href="https://github.com/Irina-abah/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение
          <img className="portfolio__icon" src={Arrow} alt="Arrow icon" />
          </a>
        </div>
      </div>
    </section>
  )
};

export default Portfolio;