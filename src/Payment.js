const Util = require('./Util');
const User = require('./User');
const articlesTable = Util.getTableName('articles');
const commentsTable = Util.getTableName('comments');
const uuidv4 = require('uuid/v4');

const {ApiPromise} = require("@polkadot/api");
const {WsProvider} = require("@polkadot/rpc-provider");
const {options} = require("@reef-defi/api");
const {Keyring} = require("@polkadot/api");
const {Provider} = require("@reef-defi/evm-provider");

const {mnemonicGenerate} = require("@polkadot/util-crypto");

async function createWallet() {
    const keyring = new Keyring({type: "sr25519"});
    // const seed = mnemonicGenerate();
    // eslint-disable-next-line max-len
    const seed = "actress lonely proof wood smoke fiber undo sick broccoli struggle rabbit abandon";

    return keyring.addFromMnemonic(seed);
}

async function payWallet(amount, address, wallet, provider) {
    return new Promise(async (resolve, reject) => {
        const unsub = await provider.api.tx.balances
            .transfer(address, amount)
            .signAndSend(wallet, async (result) => {
                console.log(`Current status is ${result.status}`);
                if (result.status.isInBlock) {
                    // eslint-disable-next-line max-len
                    console.log(`tx included at blockHash ${result.status.asInBlock}`);
                    resolve(result);
                    unsub();
                }
            });
    });
}

/**
 * @module Comment
 */
module.exports = {
    /** Get comments for an article */
    async processPayment(event) {
        console.log(event);

        async function main() {
            const provider = new Provider({
                provider: new WsProvider("wss://rpc-testnet.reefscan.com/ws"),
            });
            await provider.api.isReadyOrError;
            const wallet = createWallet();

            console.log("Initiating payment from:", wallet.address);

            const address = process.env.REEF_ADDRESS;
            const amount = process.env.REEF_AMOUNT;

            console.log("Paying wallet:", address, amount);
            payWallet(amount, address, wallet, provider).then((res) => {
                console.log(
                    "Payment transfered successfully!",
                    JSON.stringify(res, null, 2)
                );
                process.exit();
            });
        }

        main().then(console.log).catch(console.error);
    },
};
