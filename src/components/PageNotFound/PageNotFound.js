import { useHistory } from 'react-router-dom';

function PageNotFound() {

  const history = useHistory();

  return (
    <section className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__title">Страница не найдена</p>
      <button className="button button_type_back" onClick={() => history.goBack()}>Назад</button>
    </section>
  )
};

export default PageNotFound;