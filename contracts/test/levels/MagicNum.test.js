const MagicNumFactory = artifacts.require("./levels/MagicNumFactory.sol");
const MagicNum = artifacts.require("./levels/MagicNum.sol");
const MagicNumSolver = artifacts.require("./attacks/MagicNumSolver.sol");
const MagicNumBadSolver = artifacts.require("./attacks/MagicNumBadSolver.sol");

const LiftTicket = artifacts.require("./LiftTicket.sol");
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers')
const utils = require('../utils/TestUtils')

contract("MagicNum", function(accounts) {

  let liftTicket
  let level
  let instance
  let player = accounts[0]

  before(async function() {
    liftTicket = await LiftTicket.new();
    level = await MagicNumFactory.new()
    await liftTicket.registerLevel(level.address)
    instance = await utils.createLevelInstance(
      liftTicket, level.address, player, MagicNum,
      {from: player}
    )
  });

  describe("instance", function() {

    it("should not be solvable with a contract created regularly", async function() {

      const badSolver = await MagicNumBadSolver.new();

      await instance.setSolver(badSolver.address);

      const completed = await utils.submitLevelInstance(
        liftTicket,
        level.address,
        instance.address,
        player
      );

      assert.isFalse(completed);
    });

    it("should be solvable with a manually constructed contract", async function() {

      const solver = await MagicNumSolver.new();

      await instance.setSolver(solver.address);

      const completed = await utils.submitLevelInstance(
        liftTicket,
        level.address,
        instance.address,
        player
      );

      assert.isTrue(completed);
    });
  });
});
