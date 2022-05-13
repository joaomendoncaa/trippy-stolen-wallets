import fetch from 'node-fetch';
import fs from 'fs';

(async function main() {
    const toSol = (lamports) => lamports / 1e9;

    const FUNDS_WALLET = "CEKH35twWa5LTnsuu8cFUfKJ4k168GRZxWYGN6ASmh7S";

    const txData = await fetch(`https://public-api.solscan.io/account/solTransfers?account=${FUNDS_WALLET}&offset=0&limit=9999`).then(response => response.json());

    let drainageMap = {};
    let drainageTotal = 0;

    txData.data.forEach(tx => {
        drainageMap[tx.src] = toSol(tx.lamport);
        drainageTotal += toSol(tx.lamport);
    })

    fs.writeFile('drainage-map.json', JSON.stringify(drainageMap, null, 2), 'utf8', (err) => {
        if (err) throw err;
    });
})();