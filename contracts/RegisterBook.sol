// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract RegisterBook{

//0x374A5F45BE56B8B372e6380163A49AE952eef749
    mapping (uint => mapping (string => mapping(string=>bool)))  public registermapping;


    function setBook(uint _x,string memory _title,string memory _author, bool _availablity) public {

        registermapping[_x][_title][_author] = _availablity;

    }


function getBook(uint _y,string memory _titleget,string memory _authorget) public view returns(bool){
   return  registermapping[_y][_titleget][_authorget];
}






}