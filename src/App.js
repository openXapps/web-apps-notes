import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NoteProvider from './context/NoteProvider';

// Components
import Header from './components/Header';
import Content from './components/Content';
import Open from './components/Open';
import Save from './components/Save';
import Download from './components/Download';
import Upload from './components/Upload';
import PageNotFound from './components/PageNotFound';

function App() {
  // https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1
  const root = '/apps/web-apps-notes';
  // https://reacttraining.com/blog/react-router-v5-1/
  return (
    <NoteProvider>
      <Router basename={root}>
        <Header />
        <Switch>
          <Route path="/open"><Open /></Route>
          <Route path="/save/:noteId"><Save /></Route>
          <Route path="/save"><Save /></Route>
          <Route path="/download"><Download /></Route>
          <Route path="/upload"><Upload /></Route>
          <Route path="/"><Content /></Route>
          <Route><PageNotFound /></Route>
        </Switch>
      </Router>
    </NoteProvider>
  );
}

export default App;
