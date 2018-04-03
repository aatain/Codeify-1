import React from 'react';
import {BrowserRouter, Route }from 'react-router-dom';
import PlaceholderGallery from '../placeholderGallery.jsx';

export default () => {
    <Router>
        <Route path='/placeholder' component={PlaceholderGallery} />
    </Router>
};