console.log("page loaded!");

// connect button listeners
var showButton = document.getElementById('show');
showButton.onmouseup = makeNetworkCallToDormApi("all");

var allButton = document.getElementById('all');
allButton.onmouseup = getName;


function getName(){
    console.log('entered getName.');

    // get name from user
    var name = document.getElementById('name').value;
    console.log(name);
    // make network call to age api with the user name
    if(name) {
        makeNetworkCallToDormApi(name);
    }
} // end of getFormInfo


function makeNetworkCallToDormApi(name){
    console.log("entered makeNetworkCallToDormApi...");
    var url = "http://localhost:51027/dorms/";

    var xhr = new XMLHttpRequest(); // 1. create xhr object
    xhr.open("GET", url, true); // 2. configure the object

    xhr.onload = function(e){
        console.log('age api onload triggered');
        //console.log('network response received = ' + xhr.responseText);
        if(name == "all") showAll(xhr.responseText);
        else getIDFromName(name, xhr.responseText);
    } // end of xhr.onload

    xhr.onerror = function(e){
        console.log('age api onerror triggered' + xhr.statusText);
    } // end of xhr.onerror

    xhr.send(); // this actually sends the request
} // end of makeNetworkCallToAgeApi

function showAll(response_text) {
    var response_json = JSON.parse(response_text);
    
    let allDorms = '';
    for(let i = 1; i <= 33; i++) {
        allDorms = allDorms + "\n" + response_json[i]['name'];
    }
    
    let response_item = document.getElementById("dorm-names"); 
    let text = document.createTextNode(allDorms);
    response_item.innerHTML = text;

}


function getIDFromName(name, response_text){
    // extract age information from json response
    var response_json = JSON.parse(response_text);
    console.log("STEDS: " + response_json[30]['name'])
    //console.log("response: " + response_text)

    for (let i = 1; i <= 33; i++) {
        if (response_json[i]['name'].toLowerCase() == name.toLowerCase()) {
            var d_id = i;
        }
    }

    let no_dorm_item = document.getElementById("not-a-dorm"); 
    no_dorm_item.innerHTML = '';
    let response_item = document.getElementById("response");
    response_item.innerHTML = '';


    if(d_id != null) {
        var yearButton = document.getElementById('year');
        var sexButton = document.getElementById('sex');
        var quadButton = document.getElementById('quad');
        var mascotButton = document.getElementById('mascot');
        showOptions(yearButton, sexButton, quadButton, mascotButton);

        var name = response_json[d_id]['name'];
        var year = response_json[d_id]['year'];
        console.log("year = " + year);
        var sex = response_json[d_id]['gender'];
        var quad = response_json[d_id]['quad'];
        var mascot = response_json[d_id]['mascot'];
        yearButton.onmouseup = function() {
            var response_string = name + " Hall was established in " + year + ".";
            response_item.innerHTML = response_string;
        }
        sexButton.onmouseup = function() {
            var response_string = name + " Hall currently houses " + sex.toLowerCase() + " students.";
            response_item.innerHTML = response_string;
        }
        quadButton.onmouseup = function() {
            var response_string = name + " Hall is located on " + quad + " Quad.";
            response_item.innerHTML = response_string;
        }
        mascotButton.onmouseup = function() {
            var response_string = name + " Hall is represented by the " + mascot + ".";
            response_item.innerHTML = response_string;
        }

    }
    else {
        var no_dorm_string = name + " is not a dorm at ND. Try again.";
        let text = document.createTextNode(no_dorm_string);
        no_dorm_item.appendChild(text);
    }
 
}

function showOptions(year, sex, quad, mascot) {
    console.log("entered showOptions");
    year.innerHTML = "YEAR EST.";
    sex.innerHTML = "GENDER HOUSED";
    quad.innerHTML = "QUAD LOCATED";
    mascot.innerHTML = "MASCOT";
}

function getYear(response) {
    console.log('entered getYear');
    return response['year'];
}
    // update label with it
    //var box = document.getElementById('number1');
    //box.setAttribute("style", "color: teal");

function getAll(response_json) {
    var name = response_json['name'];
    var year = response_json['year'];
    var sex = response_json['gender'];
    var quad = response_json['quad'];
    var mascot = response_json['name'];

    let response_string = name + " Hall is a " + sex.toLowerCase() + " dorm founded in " + year + ". It resides on " + quad + " Quad and is represented by the mascot " + mascot + ". ";
    return response_string;
}

/*function showResponse(response) {

    let response_item = document.getElementById("response"); // "label" is a class name
    //label_item.setAttribute("id", "dynamic-label-1");
    //response_item.setAttribute("style", "text-align: center");
    let text = document.createTextNode(response);
    //label_item.appendChild(item_text);
    response_item.appendChild(text);

    //var response_div = document.getElementById("response-div");
    //response_div.appendSibling(label_item);
}*/
    //box.setAttribute("style", "color: white");
    //label1.innerHTML = "We prefer this number: " + response_json['data'] + "\n";
    
    /*var num2 = response_json['data'];
    console.log("num2: " + num2);
    // and make nw call to numbers api
    //makeNetworkCallToCatApi(num2);
}


/*
function makeNetworkCallToCatApi(num2){
    console.log("entered makeNetworkCallToNumbersApi num2 = " + num2);
    // TODO
    var url = "https://catfact.ninja/fact?max_length=" + num2;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function(e){
      var response_text = xhr.responseText;
      console.log('network response received = ' + xhr.responseText);
      updateCatFact(response_text);
  } // end of xhr.onload

  xhr.onerror = function(e){
      console.log('age api onerror triggered' + xhr.statusText);
  } // end of xhr.onerror

  xhr.send(null); 
} // end of makeNetworkCallToNumbersApi
*/


/*
function updateCatFact(response_text) {

  var response_json = JSON.parse(response_text);
  var cat_fact = response_json["fact"];
  console.log("cat fact: " + cat_fact);

  label_item = document.createElement("label"); // "label" is a class name
  label_item.setAttribute("id", "dynamic-label-1");
  label_item.setAttribute("style", "text-align: center");
  var item_text = document.createTextNode("\n" + cat_fact);
  label_item.appendChild(item_text);

  var response_div = document.getElementById("response-div");
  response_div.appendChild(label_item);
}
*/
