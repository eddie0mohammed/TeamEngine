import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Overview from "../Overview";
import Create from "../Create";
import View from "../View";
import { AppWrapper, GlobalStyle } from "../styled";
import { ROUTES } from "./Constants";

WebFont.load({
  google: {
    families: ["Open Sans:400,600,700", "sans-serif"],
  },
});

const App = () => {
  return (
    <Router>
      <AppWrapper>
        <Switch>
          <Route path={ROUTES.CREATE_PAGE} component={Create} />
          <Route path={`${ROUTES.EDIT_PAGE}/:employeeId`} component={Create} />
          <Route path={ROUTES.VIEW_PAGE} component={View} />
          <Route path={ROUTES.HOME_PAGE} component={Overview} />
        </Switch>
      </AppWrapper>
      <GlobalStyle />
    </Router>
  );
};

export default App;
