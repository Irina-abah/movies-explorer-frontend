import { Link } from 'react-router-dom';
import Avatar from '../../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="section__about-me" id="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__title">Ирина</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 32 года.</p>
          <p className="about-me__bio">Я родилась, получила образование и первый опыт работы в Украине, сейчас живу в Великобритании. 5 лет до выхода в декрет работала в сфере ИТ на менеджерских позициях. В декрете поняла, что хочу развить давнее увлечение технической части разработки в полноценную профессию. С августа 2020 года изучаю веб-программирование с Яндекс.Практикум. Особый интерес в профессии для меня это сфера электронной коммерции (eCommerce).</p>
          <div className="about-me__social">
            <Link className="about-me__item"to="http://facebook.com">Facebook</Link>
            <Link className="about-me__item"to="http://github.com">Github</Link>
          </div>
        </div>
        <img className="about-me__avatar" src={Avatar} alt="Photo of Irina Abah" />
      </div>
    </section>
  )
};

export default AboutMe;