import React, { useContext } from 'react'

import { CurrencyConverterFormCryptoProps } from '../../types'
import { ThemeContext } from '../../contexts'

import './style.scss'

const CurrencyConverterFormCrypto = ({
  cryptos,
  handleSubmit,
  amount,
  handleChange,
  selectCurrency,
  handleSwitch,
  warning,
  result,
  resultSymbol,
  isSaveButtonShowing,
  saveCurrencyConversion
  
}: CurrencyConverterFormCryptoProps) => {
  const { theme } = useContext(ThemeContext)
  for(const crypto of cryptos) {
    console.log(crypto.RAW)
  }
  return (
    <form
      className="currency-converter-form"
      onSubmit={handleSubmit}
      style={{ backgroundImage: theme.currencyCalcColor }}
    >
      <label htmlFor="Amount in USD" style={{ color: theme.text }}>
            Amount in USD
      </label>
      <div className="inputs-arrows__container">
        <input
          type="text"
          name="amount"
          value={amount}
          placeholder="amount in $"
          onChange={handleChange}
          style={{ backgroundColor: theme.inputColor, color: theme.text }}
        />
        <button className="switch" onClick={handleSwitch}>
          <i className="fas fa-long-arrow-alt-up fa-3x arrow"></i>
          <i className="fas fa-long-arrow-alt-down fa-3x arrow"></i>
        </button>
      </div>
      <label htmlFor="currency" style={{ color: theme.text }}>
            Currency
      </label>
      <select
        className="select-currency"
        onBlur={selectCurrency}
        style={{ backgroundColor: theme.inputColor, color: theme.text }}
      >
        <option>---Choose Currency</option>
        {cryptos.map((crypto: any) => (
          <option key={crypto.CoinInfo.Id} value={crypto.CoinInfo.Name}>
            {crypto.CoinInfo.FullName} {crypto.RAW !== undefined && crypto.RAW.USD.PRICE} 
          </option>
        ))}
      </select>

      <div className="currency-converter-form__btn-container">
        <button
          className="calculate-btn"
          style={{ backgroundColor: theme.bigBtnColor }}
        >
              Calculate
        </button>
        {isSaveButtonShowing && <button onClick={saveCurrencyConversion} 
          className="currency-converter-form__btn-save">
          <i className="fas fa-plus-circle grow"></i></button>}
      </div>
      <div className="warning">{warning}</div>
      <div className="result-container">
        {result > 0 && (
          <h2 className="result-symbol">
            {result} {resultSymbol}
          </h2>
        )}
      </div>
    </form>
  )
}

export default CurrencyConverterFormCrypto