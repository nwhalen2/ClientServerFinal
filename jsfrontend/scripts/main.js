console.log("page loaded!");

// connect button listeners
var dormButton = document.getElementById('dorm');
dormButton.onmouseup = getName;

var allButton = document.getElementById('all');
allButton.onclick = function() {
    makeNetworkCallToDormApi('all');
}

var clearButton = document.getElementById('clear');
clearButton.onclick = function() {
    let clearDorms = '';
    let response_item = document.getElementById("dorm-names");
    response_item.innerHTML = clearDorms;
    let photo = document.getElementById('photo');
    photo.src = "img/dome.jpg";
}


function getName(){
    console.log('entered getName.');

    // get name from user
    var name = document.getElementById('name').value;
    console.log(name);
    name = name.trim();
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
        console.log("name: " + name);
        if(name == 'all'){ showAll(xhr.responseText);}
        else {getIDFromName(name, xhr.responseText);}
    } // end of xhr.onload

    xhr.onerror = function(e){
        console.log('age api onerror triggered' + xhr.statusText);
    } // end of xhr.onerror

    xhr.send(); // this actually sends the request
} // end of makeNetworkCallToAgeApi

function showAll(response_text) {
    console.log("entered showAll");
    var response_json = JSON.parse(response_text);
    
    let allDorms = '';
    allDorms = allDorms + response_json[1]['name'];
    for(let i = 2; i <= 33; i++) {
        allDorms = allDorms + " : " + response_json[i]['name'];
    }
    
    let response_item = document.getElementById("dorm-names"); 
    let text = document.createTextNode(allDorms);
    response_item.innerHTML = allDorms;

}

function getIDFromName(name, response_text){
    // extract dorm information from json response
    var response_json = JSON.parse(response_text);

    // find id given name of dorm
    for (let i = 1; i <= 33; i++) {
        if (response_json[i]['name'].toLowerCase() == name.toLowerCase()) {
            var d_id = i;
        }
    }

    // reset text areas
    let no_dorm_item = document.getElementById("not-a-dorm"); 
    no_dorm_item.innerHTML = '';
    let response_item = document.getElementById("response");
    response_item.innerHTML = '';


    if(d_id != null) {
        updateButton = document.getElementById("dorm");
        updateButton.innerHTML = "UPDATE";

        updatePhoto(d_id);

        // show options to user via buttons
        var yearButton = document.getElementById('year');
        var sexButton = document.getElementById('sex');
        var quadButton = document.getElementById('quad');
        var mascotButton = document.getElementById('mascot');
        showOptions(yearButton, sexButton, quadButton, mascotButton);

        var name = response_json[d_id]['name'];
        var year = response_json[d_id]['year'];
        var sex = response_json[d_id]['gender'];
        var quad = response_json[d_id]['quad'];
        var mascot = response_json[d_id]['mascot'];

        // display desired information to user based on button options
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
        var no_dorm_string = name + " is not a dorm at ND.";
        let text = document.createTextNode(no_dorm_string);
        no_dorm_item.appendChild(text);

        tryAgainButton = document.getElementById("dorm");
        tryAgainButton.innerHTML = "TRY AGAIN";
    }
 
}

function showOptions(year, sex, quad, mascot) {
    console.log("entered showOptions");
    year.innerHTML = "YEAR EST.";
    sex.innerHTML = "GENDER HOUSED";
    quad.innerHTML = "QUAD LOCATED";
    mascot.innerHTML = "MASCOT";
}

function updatePhoto(d_id){
    var photo = document.getElementById('photo');

    console.log("id = " + d_id);
    switch(d_id) {
        case 1: 
            photo.src = "img/alumni.jpeg"; 
            break;
        case 2: 
            photo.src="img/badin.jpeg";
            break;
        case 3:
            photo.src = "img/baumer.jpg";
            break;
        case 4: 
            photo.src = "img/bp.jpg";
            break;
        case 5:
            photo.src = "img/carroll.jpeg";
            break;
        case 6:
            photo.src = "img/cavanaugh.jpeg";
            break;
        case 7:
            photo.src = "img/dillon.jpeg";
            break;
        case 8:
            photo.src = "img/duncan.jpeg";
            break;
        case 9:
            photo.src = "img/dunne.jpeg";
            break;
        case 10:
            photo.src = "img/farley.jpeg";
            break;
        case 11:
            photo.src = "img/fisher.jpeg";
            break;
        case 12:
            photo.src = "img/flaherty.jpeg";
            break;
        case 13:
            photo.src = "img/howard.jpeg";
            break;
        case 14:
            photo.src = "img/jfam.jpg";
            break;
        case 15:
            photo.src = "img/keenan.jpeg";
            break;
        case 16: 
            photo.src = "img/keough.jpeg";
            break;
        case 17:
            photo.src = "img/knott.jpeg";
            break;
        case 18:
            photo.src = "img/lewis.jpeg";
            break;
        case 19:
            photo.src = "img/lyons.jpeg";
            break;
        case 20:
            photo.src = "img/mcglinn.jpeg";
            break;
        case 21:
            photo.src = "img/morrissey.jpeg";
            break;
        case 22:
            photo.src = "img/oneill.jpeg";
            break;
        case 23:
            photo.src = "img/pangborn.jpeg";
            break;
        case 24:
            photo.src = "img/pe.jpeg";
            break;
        case 25:
            photo.src = "img/pw.jpeg";
            break;
        case 26:
            photo.src = "img/ryan.jpeg";
            break;
        case 27:
            photo.src = "img/siegfried.jpeg";
            break;
        case 28:
            photo.src = "img/sorin.jpeg";
            break;
        case 29:
            photo.src = "img/stanford.jpeg";
            break;
        case 30:
            photo.src = "img/steds.jpeg";
            break;
        case 31:
            photo.src = "img/walsh.jpeg";
            break;
        case 32:
            photo.src = "img/welshfam.jpeg";
            break;
        case 33: 
            photo.src = "img/zahm.jpeg"; 
            break;
    }
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
