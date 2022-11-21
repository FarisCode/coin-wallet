const main = async () => {
    const coinContractFactory = await hre.ethers.getContractFactory("CoinPortal");
    const coinContract = await coinContractFactory.deploy();
    await coinContract.deployed();

    console.log("Contract deployed to:", coinContract.address);

    let waveCount = await coinContract.getTotalCoins();
    console.log(waveCount.toNumber());

    let coinTxn = await coinContract.sendCoin("Here's a coin for you");
    await coinTxn.wait();
    
    const [_, randomPerson] = await hre.ethers.getSigners();
    coinTxn = await coinContract.connect(randomPerson).sendCoin("Another coin incoming!");
    await coinTxn.wait();

    let allCoins = await coinContract.getAllCoins();
    console.log(allCoins);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();