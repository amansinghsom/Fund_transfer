// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Funder{

    receive() external payable{}

  
    
    function withdraw(uint withdrawAmount) external{
        require(withdrawAmount<=2 ether,"2 ether required");
        payable(msg.sender).transfer(withdrawAmount);
    }   

}











