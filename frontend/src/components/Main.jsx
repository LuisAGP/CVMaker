import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Menu from './widgets/Menu.jsx';
import Home from './views/Home.jsx';
import Resume from './views/Resume.jsx';
import Templates from './views/Templates.jsx';


const Main = () => {
  return (
    <div>
        <Router>
            <Menu />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/resume" exact element={<Resume />} />
                <Route path="/templates" exact element={<Templates />} />
            </Routes>
        </Router>
    </div>
  )
}

export default Main;