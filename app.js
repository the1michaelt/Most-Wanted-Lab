/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person for whom you are searching?\nEnter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = capitalizeFirstLetter(promptFor("What is the person's first name?", chars));
  let lastName = capitalizeFirstLetter(promptFor("What is the person's last name?", chars));

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  personInfo += `Parents: ${person.parents}\n`;
  personInfo += `Current Spouse: ${person.currentSpouse}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  alert(personInfo);
}
// End of displayPerson()

function findPersonFamily(person, people) {
  findSpouse(person, people)
  findParent(person, people)
  findSibling(person, people)
}

// Found Spouse

function findSpouse(person, people) {
  let spouseId = person.currentSpouse;
  let foundSpouse = people.filter(function (el) {
    if (spouseId === el.id) {
      return true;
    }
    else {
      return false;
    }
  })

  if (foundSpouse.length > 0) {
    displayPeople(foundSpouse)
  }
  else {
    alert("No spouse found")
  }
}

// Found Parent(s)

function findParent(person, people) {
  let parentId = person.parents;
  let foundParents = people.filter(function (el) {
    if (parentId.includes(el.id)) {
      return true;
    }
    else {
      return false;
    }
  })

  if (foundParents.length > 0) {
    displayPeople(foundParents)
  }
  else {
    alert("No parent(s) found")
  }
}

// Found Siblings

function findSibling(person, people) {
  let personParents = person.parents;
  let foundSiblings = people.filter(function (potentialSibling) {
    if (personParents.includes(potentialSibling.parents[0]) || personParents.includes(potentialSibling.parents[1])) {
      return true;
    }
    else {
      return false;
    }
  })

  if (foundSiblings.length > 0) {
    displayPeople(foundSiblings)
  }
  else {
    alert("No sibling(s) found")
  }
}

// End of findPersonFamily()

function findPersonDescendants(person, people) {
   let findPerson = findChildren(person, people)
  let findGrand = findGrandchild(findPerson, people)
  let findDescendants = descendantsList(findPerson, findGrand)
}

// End of findPersonDescendants()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function searchByTraits(people) {
  let userCount = Number(prompt("By how many of the person's traits would you like to search?\nTo search a single trait, enter '1'\nTo search more, please enter '2', '3', '4', or '5'"));
  if (userCount >= 1 && userCount < 5) {
    for (let i = 1; i <= userCount; i++) {
      let userChoice = promptFor("Select your search trait:\nGender, DOB, Height, Weight, Eye Color, or Occupation\nQuit", chars).toLowerCase();
      let foundMatches;
      switch (userChoice) {
        case "gender":
          foundMatches = searchByGender(people);
          displayPeople(foundMatches);
          break;
        case "dob":
          foundMatches = searchByDob(people);
          displayPeople(foundMatches);
          break;
        case "eye color":
          foundMatches = searchByEyeColor(people);
          displayPeople(foundMatches);
          break;
        case "height":
          foundMatches = searchByHeight(people);
          displayPeople(foundMatches);
          break;
        case "weight":
          foundMatches = searchByWeight(people);
          displayPeople(foundMatches);
          break;
        case "occupation":
          foundMatches = searchByOccupation(people);
          displayPeople(foundMatches);
          break;
        case "quit":
          return;
        default:
          // Prompt user again. Another instance of recursion
          return searchByTraits(people);
      }
    };
  }
  else
    return searchByTraits(people)
}

function searchByGender(people) {
  let genderChoice = promptFor("Please enter 'male' or 'female' for your gender search", chars);
  let foundMatches = people.filter(function (el) {
    if (el.gender.toLowerCase() === genderChoice.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundMatches;
}

function searchByDob(people) {
  let inputDob = promptFor("Please enter the person's DOB (date of birth, format: m/d/yyyy)", chars);
  let foundMatches = people.filter(function (el) {
    if (el.dob === inputDob) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundMatches;
}

function searchByEyeColor(people) {
  let inputColor = promptFor("Please enter the person's eye color: \nBlack, Blue, Brown, or Hazel", chars);
  let foundMatches = people.filter(function (el) {
    if (el.eyeColor.toLowerCase() === inputColor.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundMatches;
}

function searchByHeight(people) {
  let inputHeight = Number(promptFor("Please enter an integer for the person's height (format: ##)", chars));
  let foundMatches = people.filter(function (el) {
    if (el.height === inputHeight) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundMatches;
}

function searchByWeight(people) {
  let inputWeight = Number(promptFor("Please enter an integer for the person's weight (format: ###)", chars));
  let foundMatches = people.filter(function(el){
      if (el.weight === inputWeight){
        return true;
      }
      else{
        return false;
    }
  })
  return foundMatches;
}

function searchByOccupation(people) {
  let inputOccupation = promptFor("Please enter the person's occupation:\nArchitect, Assistant, Doctor, Landscaper, Nurse, Politician, Programmer,\nor Student", chars);
  let foundMatches = people.filter(function (el) {
    if (el.occupation.toLowerCase() === inputOccupation.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundMatches;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function findChildren(person, people) {
  let childParent = person.id;
  let foundChildren = people.filter(function (potentialChild) {
    if (potentialChild.parents.includes(childParent)) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundChildren;
}
 
function findGrandchild(findPerson, people) {
  let foundChildren = findPerson;
  let grandChild;
  for (let i = 0; i < foundChildren.length; i++) {
    grandChild = people.filter(function (potentialGrandChild) {
      if (potentialGrandChild.parents.includes(foundChildren[i].id)) {
        return true;
      }
      else {
        return false;
      }
    })
  }
  return grandChild
}

function descendantsList(findPerson, findGrand) {
  let foundChildren = findPerson;
  let grandChild = findGrand;
  if (foundChildren.length > 0 || grandChild.length > 0) {
    foundChildren = foundChildren.concat(grandChild)
    displayPeople(foundChildren)
  }
  else {
    alert("No descendant(s) found")
  }
}
