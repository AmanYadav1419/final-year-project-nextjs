// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DecentralisedMusicSharing {
    // created a struct to store the Messages data
    struct Message {
        uint id;
        address from;
        address to;
        string Msgcontent;
        uint createdAt;
    }

    // at the first stage we are storing all mappings and variable to public , for easy acess
    // later on we will update/modify them as need

    // created mapping to store the messages , and that is dyanmic array, value part is Message Struct
    // to basically ek address jitne chaiye utne message send kar sakta hai esliye Message[] dyanmic array hai.
    mapping(address => Message[]) public conversations;

    // created global variables
    uint nextMessageId;

    // function to that will present as internal in smart contract only
    function _sendMessage(
        address _from,
        address _to,
        string memory _content
    ) internal {
        // to basically ham conversations me from ke address ko he point kar ke work kar rahe hai,
        // and kyuki ye dynamic array hai to yaha pe push() method ka use hoga
        // and ess push me ham Message array me push karenge, push karte wakt jase struct define hai wase he push karna hoga
        // and for timestamp we are using block.timestamp for getting and storing the current time , this stores in unix timestamp
        conversations[_from].push(
            Message(nextMessageId, _from, _to, _content, block.timestamp)
        );

        // after the message send and store hone ke badd nextMessageId ko increment by 1 karna hoga so that no conflicts will occur
        // so that new message will get store on new nextMessageId
        nextMessageId++;
    }

    // function to call the above internal function
    function sendMessage(address _to, string memory _content) public {
        // msg.sender basically user hai jisne wo message send kiya hai uska address
        // and reamining one parameters as same the recived
        _sendMessage(msg.sender, _to, _content);
    }
}
