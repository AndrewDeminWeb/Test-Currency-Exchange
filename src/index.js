import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App'
import { CurrencyContext } from './context/CurrencyContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Provider store={store}>
      <CurrencyContext>
        <App />
      </CurrencyContext>
    </Provider>
  </StrictMode>
)
