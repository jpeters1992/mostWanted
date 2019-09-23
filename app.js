"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTraits(people); 
      break;
    default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for

  mainMenu(searchResults[0], people); 
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  else {
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  }

  switch(displayOption){
    case "info":
      displayOption = displayPerson(person)
      break;
    case "family":
      // TODO: get person's family (display the names of the family members and their relation to the found person.)
      displayOption = display()
      break;
    case "descendants":
      // TODO: get person's descendants  // USING RECURSION (display the names of the descendants)
      displayOption = displayDescendants()
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

//person in function(person), is an item argument - it's a reference to the current element in the array as filter() checks it against the condition. This is useful for accessing properties, in the case of objects. If the current item passes the condition, it gets sent to the new array.

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

// make a switch case
function searchByTraits(people, originalData = null){
  let displayOptionForTraits = promptFor("If you know any of these traits about your desired person, type the trait name: 'gender', 'age', 'height', 'weight', 'eye color', or type 'restart' or 'quit'", chars);
  let searchResults;
  switch(displayOptionForTraits){
    case 'gender':
      searchResults = searchByGender(people);
      break;
    case 'eye color':
      searchResults = searchByEyeColor(people);
      break;
    case 'height':
      searchResults = searchByHeight(people);
      break;
    case 'weight':
      searchResults = searchByWeight(people);
      break;
    case 'age':
      searchResults = searchByAge(people); 
      break;
    case 'restart':
      app(people); // restart
      break;
    case 'quit':
      return; // stop execution
    default:
      return searchByTraits(people); // ask again  
  }
  // work on this part tonight 9/23/19
  if(searchResults.length > 1 ){
    if (people.length < 22){
     return searchByTraits(searchResults, originalData);
    }
    else{
      return searchByTraits(searchResults, people);
    }
  }
  else if(searchResults.length === 1){
    return searchResults;
  }
  else if(searchResults.length === 0){
    if(people.length < 22){
    }
    alert("starting over");
    app(people);
  }
}


//-----------------------------------------------------------------------------------------------------------------
// these 5 functions are for the fucntion searchByTraits above.

function searchByGender(people){
  let genderInput = promptFor("Male or Female?", chars);

  let foundGenderType = people.filter(function(person){
    if(person.gender === genderInput){
      return true;
    }
    else{
      return false;
    }
  })

  return foundGenderType;
}

function searchByEyeColor(people){
  let EyeColorInput = promptFor("What is the eye color?", chars);

  let foundEyeColorType = people.filter(function(person){
    if(person.eyeColor === EyeColorInput){
      return true;
    }
    else{
      return false;
    }
  })

  return foundEyeColorType;
}

function searchByHeight(people){
  let heightInput = promptFor("What is the approximate height(CM)?", chars);

  let foundHeightType = people.filter(function(person){
    if(person.height == heightInput){
      return true;
    }
    else{
      return false;
    }
  })

  return foundHeightType;
}


function searchByWeight(people){
  let weightInput = promptFor("What is the approximate weight(lbs)?", chars);

  let foundWeightType = people.filter(function(person){
    if(person.weight == weightInput){
      return true;
    }
    else{
      return false;
    }
  })

  return foundWeightType;
}

function searchByAge(people){
  let ageInput = promptFor("What is the age of the desired person?", chars);

  let foundAgeType = people.filter(function(person){
    if(person.dob === ageInput){
      return true;
    }
    else{
      return false;
    }
  })

  return foundAgeType;
}

//-----------------------------------------------------------------------------------------------------------------




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
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
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






// prompt() // built in function with only one parameter
// promptFor("ask/ string",chars or yesNo ) // has two parameters  