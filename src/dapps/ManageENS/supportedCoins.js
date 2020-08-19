import { formatsByName } from '@ensdomains/address-encoder';
import MultiCoinValidator from 'multicoin-address-validator';
import {
  isValidChecksumAddress as isValidRSKChecksumAddress,
  toChecksumAddress as toRSKChecksumAddress
} from 'rskjs-util';
//import { RSK } from '@/networks/types';

class MValidator {
  constructor(type) {
    this.type = type;
  }
  validate(address) {
    if (!address) return false;
    return MultiCoinValidator.validate(address, this.type);
  }
}
// class RSKUtils {
//   constructor(chainID) {
//     this.chainID = chainID;
//   }
//   validate(address) {
//     return (
//       /^0x[0-9a-f]{40}$/.test(address) ||
//       isValidRSKChecksumAddress(address, this.chainID)
//     );
//   }
//   toChecksumAddress(address) {
//     return toRSKChecksumAddress('0x' + address.toString('hex'), this.chainID);
//   }
// }
//const rskUtils = null;
export default {
  ETH: {
    id: 60,
    symbol: 'ETH',
    name: 'Ethereum',
    validator: new MValidator('Ethereum'),
    encode: formatsByName['ETH'].encoder,
    decode: formatsByName['ETH'].decoder
  }
};
