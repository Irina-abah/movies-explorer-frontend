function AboutProject() {
  return (
    <section className="section about-project" id="about-project">
      <h2 className="section__title">О проекте</h2>
      <ul className="keys">
        <li className="keys__item">
          <h2 className="keys__title">Дипломный проект включал 5 этапов</h2>
          <p className="keys__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="keys__item">
          <h2 className="keys__title">На выполнение диплома ушло 5 недель</h2>
          <p className="keys__info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="timeframe">
        <li className="timeframe__item">
          <h3 className="timeframe__title">1 неделя</h3>
          <p className="timeframe__info">Back-end</p>
        </li>
        <li className="timeframe">
          <h3 className="timeframe__title">4 недели</h3>
          <p className="timeframe__info">Front-end</p>
        </li>
      </ul>
    </section>
  )
};

export default AboutProject;