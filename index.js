// Require the use of IOTA library
const IOTA = require('iota.lib.js')
var btoa = require('btoa');

const iota = new IOTA({ provider: 'https://nodes.iota.fm:443' })
const tryteAlphabet = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function rtrim(char, str) {
    if (str.slice(str.length - char.length) === char) {
      return rtrim(char, str.slice(0, 0 - char.length));
    } else {
      return str;
    }
}

var sum = 0;
function get_rating(book_addr) {

    iota.api.findTransactionObjects( { addresses: [book_addr]}, function(error,success) { 
        if(error) { 
            console.log(error);
            return; 
        }
        console.log(success)

        tmp = ''
        for (var x = 0; x < success.length; x++) {
            tmp = success[x].signatureMessageFragment;

            tmp = rtrim('9', tmp);
            var res = iota.utils.fromTrytes(tmp);
            console.log(res);
            /*
            var rating = JSON.parse(res);
            sum += rating["rating"];
            */
        }
    });

    console.log(sum)
    return sum;
}

function push_rating(book_addr, rating) {
    const message = iota.utils.toTrytes(rating)

    const transfers = [
        {
          value: 0,
          address: book_addr,
          message: message//,tag: tag
        }
      ]
      
      iota.api.sendTransfer(addr, 3, 14, transfers, (error, success) => {
        if (error) {
          console.log(error)
        } else {
          console.log(success)
        }
      })
}

var addr = 'EMTHZDI9JTFGVXTVDNLUXRXSZAWUPBIR9WURV9EAQNOEBLTGXWNOOPTMMTSZBGXVKNUUM9MKTKECMJCA9';//'EEEHZDI9JTFGVXTVDNLUXRXSZAWUPBIR9WURV9EAQNOEBLTGXWNOOPTMMTSZBGXVKNUUM9MKTKECMJCA9';

var rating = {
    "rating" : 1
};
var rating_json = JSON.stringify(rating);

//push_rating(addr, rating_json);

var sum = get_rating(addr);
console.log("sum %d", sum);