// import store from '@/store';

// import {
//   isValidChecksumAddress as isValidRSKChecksumAddress,
//   toChecksumAddress as toRSKChecksumAddress
// } from 'rskjs-util';
//import { RSK, RSKTEST } from '@/networks/types';
// import web3 from 'web3';

const isAddress = address => {
  
  // const chainID = store.state.main.network
  //   ? store.state.main.network.type.chainID
  //   : 1;
  // if (chainID === RSK.chainID || chainID === RSKTEST.chainID)
  //   return isValidRSKChecksumAddress(address, chainID);
  console.log('valid')
  if(address.indexOf('ms') == 0){
    return true;
  } 
    return false;
  
};
const toChecksumAddress = address => {
  // const chainID = store.state.main.network
  //   ? store.state.main.network.type.chainID
  //   : 1;
  // if (chainID === RSK.chainID || chainID === RSKTEST.chainID)
  //   return toRSKChecksumAddress(address, chainID);
  return address
  //return web3.utils.toChecksumAddress(address);
};
export { isAddress, toChecksumAddress };
