<Route path="/sign-in">
                <Link className="header__link header__menu-link" to="/sign-up">Регистрация</Link>
            </Route>
            <Route path="/sign-up">
                <Link className="header__link header__menu-link" to="/sign-in">Войти</Link>
            </Route>
            <Route exact path="/">
            <ul className="header__navigation">
                <li><p className="header__email">{props.email}</p></li>
                <li><button className="button button_type_logout" onClick={signOut}>Выйти</button></li>
            </ul>
            </Route>