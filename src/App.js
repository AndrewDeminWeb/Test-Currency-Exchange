import { Currencies } from './components/Currencies'
import styles from './css/currencies_styles.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.currenciesBlock}>
        <Currencies />
      </div>
    </div>
  )
}

export { App }
