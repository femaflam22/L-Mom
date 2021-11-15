import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponent } from './components';
import { Home, Order } from './pages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavbarComponent />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="order" element={<Order />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;