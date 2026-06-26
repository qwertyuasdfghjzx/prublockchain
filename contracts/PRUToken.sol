// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PRUToken
 * @dev Piri Reis University Blockchain Club Token (PRU)
 * Includes a supply-capped, halving-enabled faucet and authorization for the coordinator portal.
 */
contract PRUToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 50000 * 10**18;
    uint256 public constant FAUCET_COOLDOWN = 30 seconds; // Short for demonstration/testing

    mapping(address => uint256) public lastFaucetClaim;
    mapping(address => bool) public isAuthorizedMinter;

    event FaucetClaimed(address indexed user, uint256 amount);
    event MinterStatusChanged(address indexed minter, bool status);

    modifier onlyMinter() {
        require(owner() == _msgSender() || isAuthorizedMinter[_msgSender()], "PRUToken: Caller is not a minter");
        _;
    }

    constructor() ERC20("Piri Reis University Blockchain Club Token", "PRU") Ownable(msg.sender) {
        // Pre-mint 1,500 PRU to owner/treasury for initial liquidity
        _mint(msg.sender, 1500 * 10**18);
    }

    /**
     * @dev Set minter authorization status (e.g. for the PRUClubPortal contract)
     */
    function setMinterStatus(address minter, bool status) external onlyOwner {
        isAuthorizedMinter[minter] = status;
        emit MinterStatusChanged(minter, status);
    }

    /**
     * @dev Mint new tokens, restricted to owner or authorized portal coordinator.
     */
    function mint(address to, uint256 amount) external onlyMinter {
        require(totalSupply() + amount <= MAX_SUPPLY, "PRUToken: Maximum supply cap exceeded");
        _mint(to, amount);
    }

    /**
     * @dev Faucet claim method with supply-dependent halving
     */
    function claimFaucet() external {
        require(block.timestamp - lastFaucetClaim[msg.sender] >= FAUCET_COOLDOWN, "PRUToken: Faucet cooldown active");
        
        uint256 reward = getFaucetRewardAmount();
        require(totalSupply() + reward <= MAX_SUPPLY, "PRUToken: Maximum supply cap reached");

        lastFaucetClaim[msg.sender] = block.timestamp;
        _mint(msg.sender, reward);

        emit FaucetClaimed(msg.sender, reward);
    }

    /**
     * @dev Dynamic faucet amount depending on current circulating supply
     */
    function getFaucetRewardAmount() public view returns (uint256) {
        uint256 circulating = totalSupply();
        if (circulating < 5000 * 10**18) {
            return 100 * 10**18;
        } else if (circulating < 15000 * 10**18) {
            return 50 * 10**18;
        } else {
            return 25 * 10**18;
        }
    }
}
