import Arrow from '../../../images/arrow-icon.svg';

function Portfolio() {
  return (
    <section className="section portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__content">
        <div className="portfolio__item">
          <p className="portfolio__item-name">Статичный сайт</p>
          <a className="link" href="https://github.com/Irina-abah/how-to-learn" target="_blank" rel="noreferrer">
          <img className="portfolio__icon" src={Arrow} alt="Arrow icon" />
          </a>
        </div>
        <div className="portfolio__item">
          <p className="portfolio__item-name">Адаптивный сайт</p>
          <a className="link" href="https://irina-abah.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">
          <img className="portfolio__icon" src={Arrow} alt="Arrow icon" />
          </a>
        </div>
        <div className="portfolio__item">
          <p className="portfolio__item-name">Одностраничное приложение</p>
          <a className="link" href="https://github.com/Irina-abah/react-mesto-api-full" target="_blank" rel="noreferrer">
            <img className="portfolio__icon" src={Arrow} alt="Arrow icon" />
          </a>
          
        </div>
      </div>
    </section>
  )
};

export default Portfolio;