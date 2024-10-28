const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers"); // Hardhat Toolboxのフィクスチャーを利用


describe('Tokenコントラクト', () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    Token = await ethers.getContractFactory('Token');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe('デプロイ', () => {
    it('正しいオーナーが設定されているべき', async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it('トークンの総供給量がオーナーに割り当てられるべき', async () => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('トランザクション', () => {
    it('アカウント間でトークンが転送されるべき', async () => {
      await hardhatToken.transfer(addr1.address, BigInt(50));
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(BigInt(50));

      await hardhatToken.connect(addr1).transfer(addr2.address, BigInt(50));
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(BigInt(50));
    });

    it('送信者が十分なトークンを持っていない場合、失敗するべき', async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, BigInt(1))
      ).to.be.revertedWith('Not enough tokens');

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it('転送後に残高が更新されるべき', async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await hardhatToken.transfer(addr1.address, BigInt(100));
      await hardhatToken.transfer(addr2.address, BigInt(50));

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - BigInt(150));

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(BigInt(100));

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(BigInt(50));
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

