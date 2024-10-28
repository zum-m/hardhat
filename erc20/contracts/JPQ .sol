// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// JPQコントラクトはERC20トークンの実装です。
// このコントラクトは、初期供給量を指定してデプロイすることができます。
// トークンの名前は「stable coin for JPY」、シンボルは「JPQ」です。

contract JPQ is ERC20 {
    // コンストラクタは、コントラクトがデプロイされる際に一度だけ実行されます。
    // initialSupplyは初期供給量を指定するための引数です。
    // ERC20のコンストラクタを呼び出し、トークンの名前とシンボルを設定します。
    // _mint関数を使用して、指定された初期供給量のトークンをデプロイヤーに割り当てます。
    constructor(uint256 initialSupply) ERC20("stable coin for JPY", "JPQ") {
        _mint(msg.sender, initialSupply);
    }
}


