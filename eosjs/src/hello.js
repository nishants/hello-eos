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

const delegateBandwidth = ({from, receiver, cpuTokens, netTokens}) => ({
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
            actor: 'eoszenmaster',
            permission: 'active',
        }],
        data: {
            from,
            receiver,
            stake_cpu_quantity: `${cpuTokens || '0.0000'} EOS`,
            stake_net_quantity: `${netTokens || '0.0000'} EOS`,
            transfer: from !== receiver,
        }
    }
);

(async () => {
    try {
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        const result = await api.transact({
            actions: [
                buyRam({payer: 'eoszenmaster', receiver: 'eoszenmaster', tokens: '0.5000'}),
                delegateBandwidth({from: 'eoszenmaster', receiver: 'eoszenmaster', cpuTokens: '1.1000'})
            ]
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


