import React from 'react';
import FinancialItem from "./components/FinancialItem";

import {Provider} from 'react-redux'
import store from "./store";

function App(){
  return (
      <Provider store={store}>
          <div className="App">
              <FinancialItem/>
          </div>
      </Provider>
  );
}

export default App;
