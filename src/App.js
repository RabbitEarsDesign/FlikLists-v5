import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";
// PAGES
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import User from "./pages/User";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
// COMPONENTS
import MainHeader from "./components/layout/MainHeader";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <MainHeader />

      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/user" />
          </Route>

          <Route path="/auth" exact>
            {!isLoggedIn && <Auth />}
            {isLoggedIn && <Redirect to="/user" />}
          </Route>

          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/moviedetails" exact>
            <MovieDetails />
          </Route>
          {isLoggedIn && (
            <Route path="/mylist" exact>
              <MyList />
            </Route>
          )}
          <Route path="/user" exact>
            {isLoggedIn && <User />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
