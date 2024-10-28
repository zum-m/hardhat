const { expect } = require('chai'); // Chaiのexpect関数をインポート
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers"); // Hardhat Toolboxのフィクスチャーを利用

describe('Tokenコントラクト', () => { // Tokenコントラクトのテストスイートを定義
  let Token; // コントラクトのファクトリを格納する変数
  let hardhatToken; // デプロイされたコントラクトのインスタンスを格納する変数
  let owner; // コントラクトのオーナーアカウント
  let addr1; // テストに使用するアカウント1
  let addr2; // テストに使用するアカウント2
  let addrs; // その他のテストに使用するアカウント

  beforeEach(async () => { // 各テストの前に実行されるセットアップコード
    Token = await ethers.getContractFactory('Token'); // Tokenコントラクトのファクトリを取得
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); // テストに使用するアカウントを取得

    hardhatToken = await Token.deploy(); // Tokenコントラクトをデプロイ
  });

  describe('デプロイ', () => { // デプロイに関するテスト
    it('正しいオーナーが設定されているべき', async () => { // コントラクトのオーナーが正しく設定されているかを確認
      expect(await hardhatToken.owner()).to.equal(owner.address); // オーナーアドレスが正しいかを確認
    });

    it('トークンの総供給量がオーナーに割り当てられるべき', async () => { // トークンの総供給量がオーナーに割り当てられているかを確認
      const ownerBalance = await hardhatToken.balanceOf(owner.address); // オーナーのトークン残高を取得
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // 総供給量がオーナーの残高と一致するかを確認
    });
  });

  describe('トランザクション', () => { // トランザクションに関するテスト
    it('アカウント間でトークンが転送されるべき', async () => { // アカウント間でトークンが正しく転送されるかを確認
      await hardhatToken.transfer(addr1.address, 50); // addr1に50トークンを転送
      const addr1Balance = await hardhatToken.balanceOf(addr1.address); // addr1のトークン残高を取得
      expect(addr1Balance).to.equal(50); // addr1の残高が50であることを確認

      await hardhatToken.connect(addr1).transfer(addr2.address, 50); // addr1からaddr2に50トークンを転送
      const addr2Balance = await hardhatToken.balanceOf(addr2.address); // addr2のトークン残高を取得
      expect(addr2Balance).to.equal(50); // addr2の残高が50であることを確認
    });

    it('送信者が十分なトークンを持っていない場合、失敗するべき', async () => { // トークンが不足している場合に転送が失敗するかを確認
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address); // オーナーの初期トークン残高を取得

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1) // addr1がオーナーに1トークンを転送しようとする
      ).to.be.revertedWith('Not enough tokens'); // トークン不足でエラーが発生することを確認

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance // オーナーの残高が変わっていないことを確認
      );
    });

    it('転送後に残高が更新されるべき', async () => { // 転送後に残高が正しく更新されるかを確認
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address); // オーナーの初期トークン残高を取得

      await hardhatToken.transfer(addr1.address, 100); // addr1に100トークンを転送
      await hardhatToken.transfer(addr2.address, 50); // addr2に50トークンを転送

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address); // オーナーの最終トークン残高を取得
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150); // オーナーの残高が正しく減少していることを確認

      const addr1Balance = await hardhatToken.balanceOf(addr1.address); // addr1のトークン残高を取得
      expect(addr1Balance).to.equal(100); // addr1の残高が100であることを確認

      const addr2Balance = await hardhatToken.balanceOf(addr2.address); // addr2のトークン残高を取得
      expect(addr2Balance).to.equal(50); // addr2の残高が50であることを確認
    });
  });

  // Hardhat Toolboxを使用したテスト
  describe('Hardhat Toolboxを使用したテスト', () => {
    // テスト用のフィクスチャーを定義
    async function deployTokenFixture() {
      // 複数のテスト用アカウントを取得
      const [owner, addr1, addr2] = await ethers.getSigners();
      // Tokenコントラクトをデプロイ
      const hardhatToken = await ethers.deployContract("Token");
      // テストに有用なフィクスチャーを返す
      return { hardhatToken, owner, addr1, addr2 };
    }

    it('トークンの総供給量が所有者に割り当てられていること', async function () {
      // フィクスチャーをデプロイ
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      // オーナーのトークン残高を取得
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      // トークンの総供給量がオーナーの残高と等しいことを確認
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it('アカウント間でトークンが転送されること', async function () {
      // フィクスチャーをデプロイ
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

      // 50トークンをオーナーからaddr1に送金
      await expect(
        hardhatToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

      // 50トークンをaddr1からaddr2に送金
      // .connect(signer)を利用してトランザクションを送信
      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    });
  });
});

