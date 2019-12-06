import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NoteProvider from './context/NoteProvider';

// Components
import Header from './components/Header';
import Content from './components/Content';
import PageNotFound from './components/PageNotFound';

function App() {
  // https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1
  const root = '/apps/web-apps-bookmarker';
  return (
    <NoteProvider>
      <BrowserRouter basename={root}>
        <Header home={root} />
        <Switch>
          <Route path="/" exact component={Content} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </NoteProvider>
  );
}

export default App;
