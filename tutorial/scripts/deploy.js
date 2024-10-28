const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("アカウントでコントラクトをデプロイしています:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("アカウントの残高:", balance.toString());

    const Contract = await hre.ethers.getContractFactory("Token");
    const contract = await Contract.deploy();

    // デプロイメントの完了を待つ
    const receipt = await contract.deployTransaction.wait();

    console.log("コントラクトがデプロイされたアドレス:", contract.address);

    // トランザクションIDの確認
    console.log("トランザクションID:", contract.deployTransaction.hash);

    // デプロイのために消費したGasの確認
    console.log("消費されたGas:", receipt.gasUsed.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });