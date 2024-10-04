import React, { createContext, useState, useEffect } from 'react';


import WalletStorage from '../contracts/temp.json';
const { ethers } = require('ethers');

const contractAddress = '0x7db799c2cda2aAddC0F7CE5cA00B251e14De315c';
const contractABI = WalletStorage;

export const AccountContext = createContext();

 

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState('0x0');
  const handleAccountChanged = (account) => {
    setAccount(account);
    console.log('Account changed: ', account);
  }; 
  return (
    <AccountContext.Provider value={{ account, setAccount,handleAccountChanged, contractAddress, contractABI, ethers, WalletStorage }}>
      {children}
    </AccountContext.Provider>
  );
};
