import React, { useState, useContext } from 'react'

import useDailyPairs from '../../hooks/useDailyPairs'
import useTopFiveSymbols from '../../hooks/useTopFiveSymbols'
import useDailyExchangeVol from '../../hooks/useDailyExchangeVol'
import DailyPairsForm from '../../components/DailyPairsForm'
import DailyPairsTable from '../../components/DailyPairsTable'
import DailyPairsChart from '../../components/DailyPairsChart'
import DailyExchangeVolForm from '../../components/DailyExchangeVolForm'
import DailyExchangeVolChart from '../../components/DailyExchangeVolChart'
import TopFiveSymbolsForm from '../../components/TopFiveSymbolsForm'
import TopFiveSymbolsChart from '../../components/TopFiveSymbolsChart'
import TopFiveSymbolsTable from '../../components/TopFiveSymbolsTable'
import { ThemeContext } from '../../contexts'

import './style.scss'

const HistoricalData = () => {

  const [errDailyPairs, dailyPairs] = useDailyPairs()
  const [errDailyExchangeVolume, dailyExchangeVol] = useDailyExchangeVol()
  const [errTopFiveSymbols, topFiveSymbols] = useTopFiveSymbols()
  const [isDailyPairsTableShowing, setIsDailyPairsTableShowing] = useState(false)
  const [isTopFiveSymbolsTableShowing, setIsTopFiveSymbolsTableShowing] = useState(false)
  const { theme } = useContext(ThemeContext)
  const [showDailyGraph, setShowDailyGraph] = useState(false)
  console.log('daily pairs', dailyPairs)
  console.log('daily exchange volum', dailyExchangeVol)
  console.log('top five symbols', topFiveSymbols)

  const [isDailyPairsShowing, setIsDailyPairsShowing] = useState(true)
  const [isDailyExchangeVolShowing, setIsDailyExchangeVolShowing] = useState(false)
  const [isTopFiveSymbolsShowing, setIsTopFiveSymbolsShowing] = useState(false)

  const showDailyPairs = () => {
    setIsDailyPairsShowing(true)
    setIsDailyExchangeVolShowing(false)
    setIsTopFiveSymbolsShowing(false)
  }

  const showDailyExchangeVol = () => {
    setIsDailyPairsShowing(false)
    setIsDailyExchangeVolShowing(true)
    setIsTopFiveSymbolsShowing(false)
  }

  const showTopFiveSymbols = () => {
    setIsDailyPairsShowing(false)
    setIsDailyExchangeVolShowing(false)
    setIsTopFiveSymbolsShowing(true)
  }

  const showDailyPairsTable = () => {
    setIsDailyPairsTableShowing(!isDailyPairsTableShowing)
  }

  const showTopFiveSymbolsTable = () => {
    setIsTopFiveSymbolsTableShowing(!isTopFiveSymbolsTableShowing)
  }

  const showDailyGraphOnSubmit = () => {
    setShowDailyGraph(true)
    console.log(showDailyGraph)
  }
  
  if(errDailyPairs || errTopFiveSymbols || errDailyExchangeVolume) {
    return (
      <h1>Page Not Found</h1>
    )
  }

  return (
    <div
      className="historical-data"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <h2 className="news-list__header" 
        style={{ color: theme.text}}>Historical Data</h2>
      <div className="historical-data__tabs-wrapper">
        <button onClick={showDailyPairs} 
          className="historical-data__btn historical-data__btn--daily-pairs">
            Daily Pairs
        </button>
        <button onClick={showDailyExchangeVol} className="historical-data__btn historical-data__btn--daily-exchange-vol">Daily Exchange Vol. </button>
        <button onClick={showTopFiveSymbols} className="historical-data__btn historical-data__btn--top-five">Top 5 Symbols </button>
      </div>
      <div className="historical-data__wrapper">
        {
          isDailyPairsShowing &&
          <div className="historical-data__daily">
            <h4>Search for daily pairs to view price history</h4>
            <p>If you want to view the entire price history of the selected crypto, enter 2000 as limit</p>
            <DailyPairsForm showDailyGraphOnSubmit={showDailyGraphOnSubmit}/>
            <div className="historical-data__results">
              <div>
                {
                  showDailyGraph && <DailyPairsChart /> 
                }
              </div>
              { isDailyPairsTableShowing ? 
                <button onClick={showDailyPairsTable}
                  className="historical-data__show-table-btn">Hide Table</button>
                :
                <button onClick={showDailyPairsTable}
                  className="historical-data__show-table-btn">Show Table</button>
              }
              { isDailyPairsTableShowing &&
               <div>
                 <DailyPairsTable dailyPairs={dailyPairs}/>
               </div> 
              }
            </div>
          </div>
        }
        { isDailyExchangeVolShowing && 
           <div className="historical-data__daily">
             <h4>Search Daily Exchange Vol (daily Volume)</h4>
             <p>Get the total volume of daily historical exchange data.</p>
             <DailyExchangeVolForm />
             <div className="historical-data__results">
               <div>
                 {dailyExchangeVol && <DailyExchangeVolChart /> } 
               </div>
             </div>  
           </div>
        }
        { isTopFiveSymbolsShowing && 
           <div className="historical-data__daily">
             <h4>Search Top 5 Symbols per Exchange</h4>
             <p>Search the top five symbols per exchange</p>
             <TopFiveSymbolsForm />
             <div className="historical-data__results">
               <div>
                 { topFiveSymbols && <TopFiveSymbolsChart /> }   
               </div> 
               { isTopFiveSymbolsTableShowing ? 
                 <button onClick={showTopFiveSymbolsTable} 
                   className="historical-data__show-table-btn">Hide Table</button>
                 :
                 <button onClick={showTopFiveSymbolsTable}
                   className="historical-data__show-table-btn">Show Table</button>
               }
               { isTopFiveSymbolsTableShowing &&
               <div>
                 <TopFiveSymbolsTable topFiveSymbols={topFiveSymbols}/>
               </div> 
               }
             </div>  
           </div>
        }
      </div>
    </div>
  )
}

export default HistoricalData
