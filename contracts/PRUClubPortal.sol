// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PRUToken.sol";
import "./PRUMembershipSBT.sol";

/**
 * @title PRUClubPortal
 * @dev Main coordinator contract for the Piri Reis University Blockchain Club portal.
 * Integrates PRU ERC-20 tokenomics and Soulbound membership details.
 */
contract PRUClubPortal is Ownable {
    PRUToken public pruToken;
    PRUMembershipSBT public sbtContract;

    struct Submission {
        uint256 id;
        address student;
        string questId;
        string questTitle;
        string title;
        string detail;
        uint256 xp;
        uint256 pru;
        bool approved;
        bool rejected;
    }

    struct StoreItem {
        uint256 id;
        string name;
        uint256 cost;
        uint256 stock;
        string category;
    }

    struct Proposal {
        string iprId;
        string title;
        string desc;
        uint256 yesVotes;
        uint256 noVotes;
        bool closed;
        address creator;
    }

    struct EventItem {
        uint256 id;
        string name;
        string date;
        uint256 xp;
        uint256 pru;
        uint256 attendees;
    }

    uint256 public nextSubmissionId = 1;
    uint256 public nextEventId = 1;

    Submission[] public submissions;
    StoreItem[] public storeInventory;
    Proposal[] public proposals;
    EventItem[] public eventsList;

    // proposalIndex => voterAddress => voted
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    // eventId => memberAddress => attended
    mapping(uint256 => mapping(address => bool)) public hasAttendedEvent;

    event SubmissionCreated(uint256 indexed id, address indexed student, string questId, string title);
    event SubmissionApproved(uint256 indexed id, address indexed student, uint256 xp, uint256 pru);
    event SubmissionRejected(uint256 indexed id, address indexed student);
    
    event StoreItemAdded(uint256 indexed id, string name, uint256 cost, uint256 stock);
    event StoreRedeemed(address indexed student, uint256 indexed itemId, string voucherCode, uint256 cost);

    event ProposalCreated(uint256 indexed index, string iprId, string title, address indexed creator);
    event VoteCast(uint256 indexed index, address indexed voter, bool support, uint256 weight);

    event EventCreated(uint256 indexed id, string name, uint256 xp, uint256 pru);
    event AttendanceClaimed(uint256 indexed id, address indexed member, uint256 xp, uint256 pru);

    modifier onlyOfficer() {
        require(sbtContract.addressToTokenId(msg.sender) != 0, "PRUClubPortal: Not registered");
        (, , , string memory role, ) = sbtContract.getProfileByAddress(msg.sender);
        require(
            keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("officer")) || owner() == msg.sender,
            "PRUClubPortal: Caller is not an officer"
        );
        _;
    }

    constructor(address _pruToken, address _sbtContract) Ownable(msg.sender) {
        pruToken = PRUToken(_pruToken);
        sbtContract = PRUMembershipSBT(_sbtContract);

        // Prepopulate store inventory
        storeInventory.push(StoreItem(1, "PRU Blockchain Hoodie (Sweatshirt)", 300 * 10**18, 12, "Giyim / Merch"));
        storeInventory.push(StoreItem(2, unicode"Kampüs Kafeterya Kahve Kuponu", 50 * 10**18, 85, "Kafeterya Ayriciligi"));
        storeInventory.push(StoreItem(3, "Web3 Baslangic Donanim Cuzdani", 750 * 10**18, 3, "Teknoloji Kitleri"));
    }

    /**
     * @dev Register profile and auto-claim onboarding bonus on real chain
     */
    function registerProfile(string calldata role) external {
        uint256 tokenId = sbtContract.mintProfile(msg.sender, role);
        
        // Onboarding Welcome Bonus: +100 PRU, +25 XP
        sbtContract.awardXP(tokenId, 25);
        pruToken.mint(msg.sender, 100 * 10**18);
        sbtContract.completeQuest(tokenId, "registration");
    }

    // --- SUBMISSIONS (SEYIR DEFTERI) ---

    function submitQuestReport(
        string calldata questId,
        string calldata questTitle,
        string calldata title,
        string calldata detail,
        uint256 xpAmount,
        uint256 pruAmount
    ) external {
        uint256 tokenId = sbtContract.addressToTokenId(msg.sender);
        require(tokenId != 0, "PRUClubPortal: Register profile first");
        require(!sbtContract.isQuestCompleted(tokenId, questId), "PRUClubPortal: Quest already completed");

        submissions.push(Submission({
            id: nextSubmissionId,
            student: msg.sender,
            questId: questId,
            questTitle: questTitle,
            title: title,
            detail: detail,
            xp: xpAmount,
            pru: pruAmount,
            approved: false,
            rejected: false
        }));

        emit SubmissionCreated(nextSubmissionId, msg.sender, questId, title);
        nextSubmissionId++;
    }

    function approveSubmission(uint256 subIndex) external onlyOfficer {
        require(subIndex < submissions.length, "PRUClubPortal: Invalid index");
        Submission storage sub = submissions[subIndex];
        require(!sub.approved && !sub.rejected, "PRUClubPortal: Already finalized");

        sub.approved = true;
        uint256 tokenId = sbtContract.addressToTokenId(sub.student);
        
        sbtContract.awardXP(tokenId, sub.xp);
        pruToken.mint(sub.student, sub.pru * 10**18);
        sbtContract.completeQuest(tokenId, sub.questId);
        sbtContract.grantBadge(tokenId, sub.questId);

        emit SubmissionApproved(sub.id, sub.student, sub.xp, sub.pru);
    }

    function rejectSubmission(uint256 subIndex) external onlyOfficer {
        require(subIndex < submissions.length, "PRUClubPortal: Invalid index");
        Submission storage sub = submissions[subIndex];
        require(!sub.approved && !sub.rejected, "PRUClubPortal: Already finalized");

        sub.rejected = true;
        emit SubmissionRejected(sub.id, sub.student);
    }

    // --- STORE REDEMPTIONS ---

    function purchaseStoreItem(uint256 itemId, string calldata voucherCode) external {
        require(itemId > 0 && itemId <= storeInventory.length, "PRUClubPortal: Invalid item");
        StoreItem storage item = storeInventory[itemId - 1];
        require(item.stock > 0, "PRUClubPortal: Item out of stock");

        // Burn PRU from buyer
        pruToken.burnFrom(msg.sender, item.cost);
        item.stock--;

        emit StoreRedeemed(msg.sender, itemId, voucherCode, item.cost);
    }

    function addStoreItem(string calldata name, uint256 cost, uint256 stock, string calldata category) external onlyOfficer {
        uint256 nextId = storeInventory.length + 1;
        storeInventory.push(StoreItem(nextId, name, cost * 10**18, stock, category));
        emit StoreItemAdded(nextId, name, cost * 10**18, stock);
    }

    // --- DAO PROPOSALS & VOTING ---

    function createDAOProposal(string calldata iprId, string calldata title, string calldata desc) external {
        // Burn fee of 50 PRU
        pruToken.burnFrom(msg.sender, 50 * 10**18);

        proposals.push(Proposal({
            iprId: iprId,
            title: title,
            desc: desc,
            yesVotes: 0,
            noVotes: 0,
            closed: false,
            creator: msg.sender
        }));

        emit ProposalCreated(proposals.length - 1, iprId, title, msg.sender);
    }

    function castDAOVote(uint256 proposalIndex, bool support) external {
        uint256 tokenId = sbtContract.addressToTokenId(msg.sender);
        require(tokenId != 0, "PRUClubPortal: Must own SBT to vote");
        require(proposalIndex < proposals.length, "PRUClubPortal: Invalid index");
        Proposal storage prop = proposals[proposalIndex];
        require(!prop.closed, "PRUClubPortal: Proposal closed");
        require(!hasVoted[proposalIndex][msg.sender], "PRUClubPortal: Already voted");

        (, uint256 level, , ) = sbtContract.getProfile(tokenId);
        uint256 weight = level; // Voting weight equals level

        if (support) {
            prop.yesVotes += weight;
        } else {
            prop.noVotes += weight;
        }

        hasVoted[proposalIndex][msg.sender] = true;
        emit VoteCast(proposalIndex, msg.sender, support, weight);
    }

    // --- EVENTS MANAGEMENT ---

    function registerEvent(string calldata name, string calldata date, uint256 xp, uint256 pru) external onlyOfficer {
        eventsList.push(EventItem({
            id: nextEventId,
            name: name,
            date: date,
            xp: xp,
            pru: pru,
            attendees: 0
        }));
        emit EventCreated(nextEventId, name, xp, pru);
        nextEventId++;
    }

    function claimEventAttendance(uint256 eventId) external {
        uint256 tokenId = sbtContract.addressToTokenId(msg.sender);
        require(tokenId != 0, "PRUClubPortal: Must own SBT to register attendance");
        
        // Find event
        uint256 evIdx = 999999;
        for (uint256 i = 0; i < eventsList.length; i++) {
            if (eventsList[i].id == eventId) {
                evIdx = i;
                break;
            }
        }
        require(evIdx != 999999, "PRUClubPortal: Event not found");
        require(!hasAttendedEvent[eventId][msg.sender], "PRUClubPortal: Attendance already claimed");

        EventItem storage ev = eventsList[evIdx];
        hasAttendedEvent[eventId][msg.sender] = true;
        ev.attendees++;

        // Add completed quest event flag
        string memory eventQuestId = string(abi.encodePacked("event_", uintToStr(eventId)));
        sbtContract.completeQuest(tokenId, eventQuestId);

        // Disburse rewards
        sbtContract.awardXP(tokenId, ev.xp);
        pruToken.mint(msg.sender, ev.pru * 10**18);

        emit AttendanceClaimed(eventId, msg.sender, ev.xp, ev.pru);
    }

    // --- GEOLOCATION MEVCUDIYET KANITI ---

    function claimLocationCheckin() external {
        uint256 tokenId = sbtContract.addressToTokenId(msg.sender);
        require(tokenId != 0, "PRUClubPortal: Must own SBT");
        require(!sbtContract.isQuestCompleted(tokenId, "location"), "PRUClubPortal: Already checked in");

        sbtContract.completeQuest(tokenId, "location");
        sbtContract.awardXP(tokenId, 15);
        pruToken.mint(msg.sender, 50 * 10**18);
    }

    // --- HELPERS ---

    function getSubmissionsCount() external view returns (uint256) {
        return submissions.length;
    }

    function getProposalsCount() external view returns (uint256) {
        return proposals.length;
    }

    function getEventsCount() external view returns (uint256) {
        return eventsList.length;
    }

    function uintToStr(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (uint8)(48 + _i % 10);
            bytes1 b = bytes1(temp);
            bstr[k] = b;
            _i /= 10;
        }
        return string(bstr);
    }
}
