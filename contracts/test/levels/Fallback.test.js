const FallbackFactory = artifacts.require('./levels/FallbackFactory.sol')
const Fallback = artifacts.require('./attacks/Fallback.sol')

const LiftTicket = artifacts.require('./LiftTicket.sol')
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers')
const utils = require('../utils/TestUtils')

contract('Fallback', function(accounts) {

  let liftTicket
  let level
  let owner = accounts[1]
  let player = accounts[0]

  beforeEach(async function() {
    liftTicket = await LiftTicket.new();
    level = await FallbackFactory.new()
    await liftTicket.registerLevel(level.address)
  });

  it('should allow the player to solve the level', async function() {

    const instance = await utils.createLevelInstance(
      liftTicket, level.address, player, Fallback,
      {from: player}
    )

    assert.equal(await instance.owner(), level.address)
    assert.equal(web3.utils.toWei('1000', 'ether'), (await instance.getContribution({from: level.address})).toString())
    
    await instance.contribute({from: player, value: web3.utils.toWei('0.0001', 'ether')})
    assert.notEqual(0, (await instance.getContribution({from: player})).toNumber())
    assert.notEqual(0, await utils.getBalance(web3, instance.address))
    
    await web3.eth.sendTransaction({from: player, to: instance.address, value: web3.utils.toWei('0.001', 'ether')})
    assert.equal(player, await instance.owner())
    
    await instance.withdraw({from: player})
    assert.equal(0, await utils.getBalance(web3, instance.address))
    // Factory check
    const ethCompleted = await utils.submitLevelInstance(
      liftTicket,
      level.address,
      instance.address,
      player
    )
    assert.equal(ethCompleted, true)
  });
});
