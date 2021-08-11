'use strict';

//from w3schools
function randomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Donator(name,amount){
  this.name=name;
  this.amount=amount;
  this.ageArr=[];
  Donator.allDonators.push(this);
}

let Donator.allDonators=[];

function saveToLocalStorage(){
    let stringArr=JSON.stringify(Donator.allDonators);
    localStorage.setItem('Donator',stringArr);
}

function getItems(){
    let data=localStorage.getItem('Donator');
    let parsedArr=JSON.parse(data);
    if(parsedArr!==null){
        Donator.allDonators=[];
        for(let i=0;i<parsedArr.length;i++){
            let newDonator=new Donator(parsedArr[i].name,parsedArr[i].amount);

        }
    }
}

Donator.prototype.calcAge=function(){
    for(let i=0;i<Donator.allDonators.length;i++){
        this.ageArr.push(randomAge(20,60));
    }
}

let table =document.getElementById('resultTable');
Donator.prototype.render=function(){
    let dataRow=document.createElement('tr');
    table.appendChild(dataRow);
    let firstTd=document.createElement('td');
    dataRow.appendChild(firstTd);
    firstTd.textContent=this.name;
    let secondTd=document.createElement('td');
    dataRow.appendChild(secondTd);
    secondTd.textContent=this.amount;
    let thirdTd=document.createElement('td');
    dataRow.appendChild(thirdTd);
    thirdTd.textContent=this.ageArr;
}

let submitButton=document.getElementById('submitButton');
submitButton.addEventListener('click',generateDonator)
function generateDonator(event){
    event.preventDefault();
    let name=event.target.donatorNameField.value;
    let amount=parseInt(event.target.donationAmount.value);
    let addedDonator=new Donator(name,amount);
    table.textContent='';
    submitButton.removeEventListener('click',generateDonator);
    for(let i=0;i<Donator.allDonators.length;i++){
        Donator.allDonators[i].calcAge();
        getItems();
        Donator.allDonators[i].render();
    }
}

saveToLocalStorage();

