import React, {useState} from 'react'
import {ethers} from 'ethers'

function WalletCard() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [connButtonText, setConnButtonText] = useState('Connect Wallet')

  function connectWalletHandler() {
    if (window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0])
      })
    } else {
      setErrorMessage(prev => 'Install Metamask')
    }
  }

  function accountChangedHandler(newAccount) {
    setDefaultAccount(newAccount)
    getUserBalance(newAccount.toString())
  }

  function getUserBalance(address) {
    window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    .then(balance => {
      setUserBalance(prev => ethers.utils.formatEther(balance))
    })
  }

  // Reloads the page
  function chainChangedHandler() {
    window.location.reload()
  }

  // When user changes the chain they are on, chainChangedHandler is called
  window.ethereum.on('chainChanged', chainChangedHandler)

  return (
    <div className='walletCard'>
      <h4>{"Connection to MetaMask using window.ethereum methods"} </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3> Address: {defaultAccount} </h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>
    {errorMessage}
  </div>
  )
}

export default WalletCard
