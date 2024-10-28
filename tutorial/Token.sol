//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// スマートコントラクトの定義
contract Token {
    // トークンのタイプとシンボル名
    string public name = "Kindai Token";
    string public symbol = "KT";
    // トークンの総量
    uint256 public totalSupply = 1000000;
    // オーナーのアドレス
    address public owner;
    // アカウントごとのトークンの所持金を管理するマップ
    mapping(address => uint256) balances;
    // チェーンの外部にこのコントラクトの状況を伝えるためのイベント
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * コントラクトの初期化
     */
    constructor() {
        // トークンの総量がこのコントラクトをデプロイするトランザクションの送信者に割り当てられる
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * トークンを送金する関数
     *
     * `external` の指定によりコントラクトの外部からのみアクセス可能な関数
     */
    function transfer(address to, uint256 amount) external {
        // トランザクションの送金者が十分な所持金を持っていることをチェックする
        // 不十分なら失敗する
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // 指定した金額を送金者の所持金から減額し送金先の所持金を増額する
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // 処理結果を外部に通知するイベント
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * アカウントのトークン残高を知るための読みだし専用関数
     * `view` の指定によりコントラクトの状態を更新できない
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
