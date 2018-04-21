pragma solidity ^0.4.23;

contract GrainOfSalt {
    
  /* STATE VARIABLES */
  address public owner;
  
  /* MAPPINGS*/
  mapping(bytes32 => bool) public users;
  mapping(bytes32 => uint) public scoreOf;
  mapping(bytes32 => uint) public lastUpdated;
  mapping(bytes32 => bytes32[]) postsOf;
  
  /* MODIFIERS */
  modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }
  
  /* EVENTS */
  event AddedUser(bytes32 name);
  event UpdatedScore(bytes32 name, uint score);
  event AddedPost(bytes32 user, bytes32 post);
  
  
  constructor() public {
    owner = msg.sender;
  }
  
  function addUser(bytes32 name) onlyOwner public {
    require(users[name] == false);
    users[name] = true;
    scoreOf[name] = 0;
    lastUpdated[name] = now;
    emit AddedUser(name);
    emit UpdatedScore(name, 0);
  }
  
  function addPost(bytes32 name, bytes32 post) onlyOwner public {
    require(users[name] == true);
    postsOf[name].push(post);
    emit AddedPost(name, post);
  }
  
  function updateScore(bytes32 name, uint score) onlyOwner public {
    require(users[name] == true);
    scoreOf[name] = score;
    lastUpdated[name] = now;
    emit UpdatedScore(name, score);
  }
  
  function getPosts(bytes32 name) view public returns(bytes32[]) {
    require(users[name] == true);
    return postsOf[name];
  }
    
}