import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';
import routes from './constants/routes.json';
import HomePage from './pages/HomePage';
import ScrapingPage from './pages/ScrapingPage';
import VisualizationDetailsPage from './pages/VisualizationDetailsPage';
import VisualizationPage from './pages/VisualizationPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={routes.SCRAPING} component={ScrapingPage} />
        <Route
          path={routes.VISUALIZATION_DETAILS}
          component={VisualizationDetailsPage}
        />
        <Route path={routes.VISUALIZATION} component={VisualizationPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </Router>
  );
}
