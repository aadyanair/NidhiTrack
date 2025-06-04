//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract NidhiSubsidy {
    address public government;  //will store ethereum address

    struct Subsidy{   //custome data type
        string recipientID;
        uint256 amount;
        uint256 date;
        string purpose;
    }

    Subsidy[] public subsidies;     //array list to store all subsidies
    //making it public allows anyone to view it - transparency

    constructor(){      //runs only once - when the contract is deployed
        government = msg.sender;        //msg.sender is the address that deployed the contract
        //It sets that address as the owner
        //It ensures only the deployer (govt) has authority to add subsidies
    }

    modifier onlyGov(){     //custome rule
        require(msg.sender == government,"Only government can add"); //checks that only the government can run the function
        //If not it throws "Only government can add
        _;      //means: "then run the rest of the function"
    }

    function addSubsidy(string memory _recipientID, uint256 _amount, string memory _purpose) public onlyGov{
        subsidies.push(Subsidy({
            recipientID: _recipientID,
            amount: _amount,
            date: block.timestamp,
            purpose: _purpose
        }));
    }
//this above whole functions adds a new subsidy to the blockchain.
//only the government can call it ('onlyGov')
//It creates a new subsidy and pushes it into the list


    function fetAllSubsidies() public view returns (Subsidy[] memory){
        return subsidies;
    }
//this above function returns the entire list of subsidies
//anyone can call it - it's public
//it doesn't change the blockchain - just view dat 
}