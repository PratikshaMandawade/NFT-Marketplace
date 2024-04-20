const hre = require("hardhat");

const tokens = (nToken) => {
  return ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main() {
  //THE BLOCKCHAIN CODERS
  const _initialSupply = tokens(50000000);
  const TheBlockchainCoders = await hre.ethers.getContractFactory(
    "TheBlockchainCoders"
  );

  const theBlockchainCoders = await TheBlockchainCoders.deploy(_initialSupply);
  await theBlockchainCoders.deployed();
  console.log("@THEBBLOCKCAINCODERS:", theBlockchainCoders.address);

  //NFT MARKETPLACE
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();
  console.log("@NFTMARKETPLACE:", nftMarketplace.address);

  //TOKEN SALE
  const _tokenPrice = tokens(1);
  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(
    theBlockchainCoders.address,
    _tokenPrice
  );
  await tokenSale.deployed();
  console.log("@TOKENSALE:", tokenSale.address);

  //COMMUNITY
  const Community = await hre.ethers.getContractFactory("Community");
  const community = await Community.deploy();
  await community.deployed();
  console.log("@COMMUNITY:", community.address);

  //TRANSFER FUNDS
  const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
  const transferFunds = await TransferFunds.deploy();
  await transferFunds.deployed();
  console.log("@TRANSFERFUNDS:", transferFunds.address);

  //SUPPORT
  const Support = await hre.ethers.getContractFactory("Support");
  const support = await Support.deploy();
  await support.deployed();
  console.log("@SUPPORT:", support.address);

  //DONATION
  const Donation = await hre.ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  await donation.deployed();
  console.log("@DONATION:", donation.address);
}

// npx hardhat run scripts/deploy.js --network polyon_amoy

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
