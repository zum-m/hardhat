以下に、2つのデプロイコードの違いについて説明します。

### 元のデプロイコード

```javascript
// scripts/deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    const Contract = await ethers.getContractFactory("YourContractName");
    const contract = await Contract.deploy();

    console.log("Contract deployed to address:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

### 新しいデプロイコード

```javascript
const hre = require("hardhat");

async function main() {
   const deployedContract = await hre.ethers.deployContract("Token");
   await deployedContract.waitForDeployment();
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
});
```

### 違いの説明

1. **インポートの違い**:

   - 元のコードでは、[`ethers`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A29%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")オブジェクトを直接使用しています。
   - 新しいコードでは、[`hre`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A25%2C%22character%22%3A6%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")（Hardhat Runtime Environment）を使用しています。[`hre`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A25%2C%22character%22%3A6%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")は、Hardhatのすべての機能にアクセスするためのオブジェクトです。
2. **デプロイアカウントの取得**:

   - 元のコードでは、[`ethers.getSigners()`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A29%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")を使用してデプロイアカウントを取得しています。
   - 新しいコードでは、デプロイアカウントの取得は行っていません。
3. **アカウント情報の表示**:

   - 元のコードでは、デプロイアカウントのアドレスと残高を表示しています。
   - 新しいコードでは、これらの情報は表示していません。
4. **コントラクトのデプロイ方法**:

   - 元のコードでは、[`ethers.getContractFactory("YourContractName")`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A29%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")を使用してコントラクトのファクトリを取得し、[`Contract.deploy()`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A10%2C%22character%22%3A10%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")を使用してコントラクトをデプロイしています。
   - 新しいコードでは、[`hre.ethers.deployContract("Token")`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A25%2C%22character%22%3A6%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")を使用してコントラクトをデプロイしています。このメソッドは、Hardhatの新しい簡略化されたデプロイ方法です。
5. **デプロイ完了の待機**:

   - 元のコードでは、デプロイ完了の待機は明示的に行っていませんが、デプロイが完了すると自動的に次の行に進みます。
   - 新しいコードでは、`await deployedContract.waitForDeployment()`を使用してデプロイ完了を待機しています。
6. **エラーハンドリング**:

   - 元のコードでは、[`main().then().catch()`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A2%2C%22character%22%3A15%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")を使用してエラーハンドリングを行っています。
   - 新しいコードでは、[`main().catch()`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A2%2C%22character%22%3A15%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")を使用してエラーハンドリングを行っています。

### まとめ

- **元のコード**:

  - デプロイアカウントの取得と表示を行い、コントラクトのファクトリを使用してデプロイします。
  - より詳細な情報を表示します。
- **新しいコード**:

  - [`hre`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ftutorial%2Fscripts%2Fdeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A25%2C%22character%22%3A6%7D%7D%5D%2C%22b27056c7-93fe-42cf-8d33-9151d9388adb%22%5D "Go to definition")オブジェクトを使用して簡略化されたデプロイ方法を使用します。
  - デプロイアカウントの取得や情報の表示は行いません。

どちらの方法も有効ですが、目的や必要な情報に応じて使い分けることができます。新しいコードは、より簡潔で直感的なデプロイ方法を提供しますが、詳細な情報を表示する必要がある場合は元のコードの方が適しています。
