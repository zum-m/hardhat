# [`constructor`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkazumamiura%2F2024%2FBC%2Fproject%2Fhardhat%2Ferc20%2Fcontracts%2FJPQ%20.sol%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A4%7D%7D%5D%2C%227021fc58-10da-422f-bb7a-5ef25483019b%22%5D "Go to definition")

は、Solidityにおけるコンストラクタ関数です。コンストラクタは、コントラクトがデプロイされる際に一度だけ実行される特別な関数です。以下に詳細を説明します。

### コンストラクタの役割

1. **初期化**: コントラクトの初期状態を設定します。
2. **初期値の設定**: コントラクトの状態変数に初期値を設定します。
3. **外部からのパラメータ受け取り**: デプロイ時に外部から渡されるパラメータを受け取ります。

### JPQコントラクトのコンストラクタの例

以下は、あなたが提供したJPQコントラクトのコンストラクタです。

```solidity
constructor(uint256 initialSupply) ERC20("stable coin for JPY", "JPQ") {
    _mint(msg.sender, initialSupply);
}
```

### このコンストラクタの詳細

1. **引数**: `uint256 initialSupply`という引数を受け取ります。これは、初期供給量を指定するためのものです。
2. **親コントラクトのコンストラクタ呼び出し**: `ERC20("stable coin for JPY", "JPQ")`は、親コントラクト（この場合はERC20）のコンストラクタを呼び出し、トークンの名前とシンボルを設定します。
3. **トークンのミント**: `_mint(msg.sender, initialSupply)`は、指定された初期供給量のトークンをコントラクトのデプロイヤー（`msg.sender`）に割り当てます。

### まとめ

コンストラクタは、コントラクトのデプロイ時に一度だけ実行される特別な関数で、コントラクトの初期化や初期値の設定を行います。JPQコントラクトのコンストラクタでは、初期供給量を設定し、トークンの名前とシンボルを指定し、初期供給量のトークンをデプロイヤーに割り当てています。
