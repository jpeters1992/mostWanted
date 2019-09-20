"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people, traits){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByAttributes(traits); 
      break;
    default:
      app(people); // restart app
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayOption = displayPerson(person)
      break;
    case "family":
      displayOption = displayFamily(family)
      break;
    case "descendants":
      displayOption = displayDescendants(descendants)
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered 
  return foundPerson;
}

function searchByAttributes(traits){
  let height = promptFor("How tall is the person?");
  let weight = promptFor("How much does the person weight?");
  let eyeColor = promptFor("What eye color does this person have?");
  let gender = promptFor("What is the gender?");
  let dob = promptFor("How old is this person?");
  let occupation = promptFor("What's this persons occupation?");
  
  let foundTraits = traits.filter(function(traits){
    if(traits.height === height || traits.weight === weight || traits.eyeColor === eyeColor || traits.gender === gender || traits.dob === dob || traits.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  // Might need some additional stuff. 
  return foundTraits;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}


function displayFamily(family){
  //code block
}
function displayDescendants(descendants){
  //code block hint: might be by last name. some are related. 
}













// function that prompts and validates user input
function promptFor(question, valid){
  let response = "";
  do{
    response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}



app();