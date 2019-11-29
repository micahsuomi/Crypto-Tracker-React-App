import React, {Component} from 'react';
import './TopCryptoByMarketCap.css';
import CryptoMarketCap from './CryptoMarketCap';

class TopCryptoByMarketCap extends Component {
    constructor() {
        super();
        this.state = {cryptoMarketCap : [],
            loading: false,
            marketCapTitle: "Top Crypto By Market Cap"}

    }

    componentDidMount() {

        this.setState({loading: true})
        fetch("https://api.coinmarketcap.com/v1/ticker/?limit=8")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                cryptoMarketCap: data,
                loading: false
            })
        })
    }


    render() {
        const cryptoMarketCap = this.state.cryptoMarketCap.map(crypto => (
            <CryptoMarketCap 
            key={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol}
            marketCap={Math.floor(crypto.market_cap_usd)}
            price={(Math.round(100*crypto.price_usd)/100)}
            supply={Math.floor((Math.round(crypto.total_supply)*0.000001))}


            />
        ))
        return(
            <div className="market-cap-crypto-container" id="top5MarketCap">
                <h2 className="main-center-header">{this.state.marketCapTitle}</h2>
                <div className="market-cap-wrapper">
                        <ul className="market-cap-card-details">
                            {cryptoMarketCap}
                        </ul>
                    </div>
                </div>
        )
    }
}

export default TopCryptoByMarketCap;