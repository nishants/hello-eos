const {Api, JsonRpc, RpcError, JsSignatureProvider} = require('eosjs');
const fetch = require('node-fetch');                            // node only; not needed in browsers
const {TextDecoder, TextEncoder} = require('text-encoding');  // node, IE11 and IE Edge Browsers

const defaultPrivateKey = process.env.EOS_CRYPTOKYLIN_PRIVATE_KEY;
!defaultPrivateKey && console.error("EOS_CRYPTOKYLIN_PRIVATE_KEY is missing")

const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://kylin.eoscanada.com', {fetch});


const buyRam = ({payer, receiver, tokens}) => ({
    account: 'eosio',
    name: 'buyram',
    authorization: [{
        actor: payer,
        permission: 'active',
    }],
    data: {
        payer,
        receiver,
        quant: `${tokens} EOS`,
    },
});

(async () => {
    try {
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        const result = await api.transact({
            actions: [buyRam({payer: 'eoszenmaster', receiver: 'eoszenmaster', tokens: '0.5000'})]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log("Result: ", result);
    } catch (e) {
        console.error('\nCaught exception: ' + e);
        if (e instanceof RpcError)
            console.error(JSON.stringify(e.json, null, 2));
    }

})();


