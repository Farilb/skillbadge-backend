// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SkillBadge {
    struct Badge {
        string name;
        string skill;
        string level;
        address issuer;
        uint256 issuedAt;
        bool active;
    }

    mapping(address => Badge[]) public studentBadges;
    mapping(address => bool) public authorizedIssuers;
    address public owner;

    event BadgeIssued(address indexed student, string name, string level, address issuer);
    event BadgeRevoked(address indexed student, uint256 index);

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    modifier onlyAuthorized() {
        require(authorizedIssuers[msg.sender], "Non autorisé");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Seul le owner peut faire cela");
        _;
    }

    function authorizeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = true;
    }

    function revokeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
    }

    function issueBadge(
        address _student,
        string memory _name,
        string memory _skill,
        string memory _level
    ) external onlyAuthorized {
        studentBadges[_student].push(Badge({
            name: _name,
            skill: _skill,
            level: _level,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            active: true
        }));
        
        emit BadgeIssued(_student, _name, _level, msg.sender);
    }

    function revokeBadge(address _student, uint256 _index) external onlyAuthorized {
        require(_index < studentBadges[_student].length, "Index invalide");
        require(studentBadges[_student][_index].active, "Badge déjà révoqué");
        
        studentBadges[_student][_index].active = false;
        emit BadgeRevoked(_student, _index);
    }

    function getStudentBadges(address _student) external view returns (Badge[] memory) {
        return studentBadges[_student];
    }

    function getBadgeCount(address _student) external view returns (uint256) {
        return studentBadges[_student].length;
    }

    function isBadgeActive(address _student, uint256 _index) external view returns (bool) {
        require(_index < studentBadges[_student].length, "Index invalide");
        return studentBadges[_student][_index].active;
    }
}