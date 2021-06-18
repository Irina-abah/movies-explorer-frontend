import PromoIcon from '../../../images/promo-icon.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <img className="promo__image" src={PromoIcon} alt="Main page promo logo" />
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
    </section>
  )
};

export default Promo;