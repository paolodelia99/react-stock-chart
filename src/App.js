import React from 'react';
import FinancialChart from "./components/FinancialChart";

import {Provider} from 'react-redux'
import store from "./store";

const App = () => {

  return (
      <Provider store={store}>
          <div className="App">
              <FinancialChart/>
          </div>
      </Provider>
  );
}

export default App;
