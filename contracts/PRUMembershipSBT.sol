// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PRUMembershipSBT
 * @dev Soulbound Token (SBT) representing Piri Reis University Blockchain Club Membership.
 * Non-transferable token that tracks member level, XP, roles, and rozetler.
 */
contract PRUMembershipSBT is ERC721, Ownable {
    uint256 private _nextTokenId = 1000; // Starting SBT token IDs at 1000

    struct MemberProfile {
        uint256 xp;
        uint256 level;
        string role; // "member" or "officer"
        string[] earnedBadges;
    }

    mapping(address => uint256) public addressToTokenId;
    mapping(uint256 => MemberProfile) private _profiles;
    mapping(uint256 => mapping(string => bool)) private _badgeEarned;
    mapping(uint256 => mapping(string => bool)) private _completedQuests;

    mapping(address => bool) public isAuthorizedController;

    event ProfileMinted(address indexed member, uint256 indexed tokenId, string role);
    event XPAwarded(uint256 indexed tokenId, uint256 amount, uint256 newXP, uint256 newLevel);
    event BadgeGranted(uint256 indexed tokenId, string badge);
    event RoleUpdated(uint256 indexed tokenId, string newRole);
    event ControllerStatusChanged(address indexed controller, bool status);

    modifier onlyController() {
        require(owner() == _msgSender() || isAuthorizedController[_msgSender()], "PRUMembershipSBT: Caller is not a controller");
        _;
    }

    constructor() ERC721("PRU Blockchain Club Membership SBT", "PRU-SBT") Ownable(msg.sender) {}

    /**
     * @dev Restrict token transfers to enforce Soulbound status.
     * Tokens can only be minted (from address(0)) or burned (to address(0)).
     */
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("PRUMembershipSBT: Tokens are soulbound and non-transferable");
        }
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Authorize external contract (e.g. Portal coordinator) to update states
     */
    function setControllerStatus(address controller, bool status) external onlyOwner {
        isAuthorizedController[controller] = status;
        emit ControllerStatusChanged(controller, status);
    }

    /**
     * @dev Mint a new Soulbound membership profile card for a student.
     */
    function mintProfile(address member, string calldata role) external onlyController returns (uint256) {
        require(addressToTokenId[member] == 0, "PRUMembershipSBT: Member already has a profile card");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(member, tokenId);
        addressToTokenId[member] = tokenId;

        _profiles[tokenId].level = 1;
        _profiles[tokenId].role = role;

        emit ProfileMinted(member, tokenId, role);
        return tokenId;
    }

    /**
     * @dev Get a member's full profile
     */
    function getProfile(uint256 tokenId) external view returns (
        uint256 xp,
        uint256 level,
        string memory role,
        string[] memory earnedBadges
    ) {
        require(_ownerOf(tokenId) != address(0), "PRUMembershipSBT: Profile does not exist");
        MemberProfile memory profile = _profiles[tokenId];
        return (profile.xp, profile.level, profile.role, profile.earnedBadges);
    }

    function getProfileByAddress(address member) external view returns (
        uint256 tokenId,
        uint256 xp,
        uint256 level,
        string memory role,
        string[] memory earnedBadges
    ) {
        uint256 tid = addressToTokenId[member];
        require(tid != 0, "PRUMembershipSBT: Address has no profile card");
        MemberProfile memory profile = _profiles[tid];
        return (tid, profile.xp, profile.level, profile.role, profile.earnedBadges);
    }

    /**
     * @dev Award XP to a student profile. Triggers level-ups.
     */
    function awardXP(uint256 tokenId, uint256 amount) external onlyController {
        require(_ownerOf(tokenId) != address(0), "PRUMembershipSBT: Profile does not exist");
        MemberProfile storage profile = _profiles[tokenId];
        
        profile.xp += amount;
        uint256 newLevel = (profile.xp / 100) + 1;
        
        if (newLevel > profile.level) {
            profile.level = newLevel;
        }

        emit XPAwarded(tokenId, amount, profile.xp, profile.level);
    }

    /**
     * @dev Grant a Soulbound badge/rozet to a member.
     */
    function grantBadge(uint256 tokenId, string calldata badge) external onlyController {
        require(_ownerOf(tokenId) != address(0), "PRUMembershipSBT: Profile does not exist");
        require(!_badgeEarned[tokenId][badge], "PRUMembershipSBT: Badge already earned");

        _badgeEarned[tokenId][badge] = true;
        _profiles[tokenId].earnedBadges.push(badge);

        emit BadgeGranted(tokenId, badge);
    }

    /**
     * @dev Set a quest status as completed
     */
    function completeQuest(uint256 tokenId, string calldata questId) external onlyController {
        require(_ownerOf(tokenId) != address(0), "PRUMembershipSBT: Profile does not exist");
        _completedQuests[tokenId][questId] = true;
    }

    function isQuestCompleted(uint256 tokenId, string calldata questId) external view returns (bool) {
        return _completedQuests[tokenId][questId];
    }

    function hasEarnedBadge(uint256 tokenId, string calldata badge) external view returns (bool) {
        return _badgeEarned[tokenId][badge];
    }

    /**
     * @dev Update a member's role (e.g. promote to Officer)
     */
    function updateRole(uint256 tokenId, string calldata newRole) external onlyController {
        require(_ownerOf(tokenId) != address(0), "PRUMembershipSBT: Profile does not exist");
        _profiles[tokenId].role = newRole;
        emit RoleUpdated(tokenId, newRole);
    }
}
