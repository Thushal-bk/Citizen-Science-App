import{Model} from './model.js'
import * as views from './views.js';


// ===== Main action function which defines what happens when page loads or hash value changes.

//Window Onload function

window.onload = function () {

    Model.update_users();
    Model.update_observations();
    window.location.hash = "";

};



//Hashchange function, calls the redraw which has the code that defines what action to perform with each hash value.

window.onhashchange = redraw;


//========= Start of code logic ===============

//Event listener for successful users and observation data recorded. It calls the redraw1 function to list 10 recent observations on the home page of the application
window.addEventListener("modelUpdated", function (e) {
        redraw1();

});


//Redraw1 function, Default home page, gives list of 10 recent observations. It then calls bindings1 to invoke functions observation click handler functions
function redraw1() {

    let observations = Model.get_observations();
    //Format timestamp
    for (let i = 0; i < observations.length; i++) {
        observations[i].timestamp = new Date(observations[i].timestamp);
    }
    observations.sort(converTime);
    //compare function to sort timestamp
    function converTime(a, b) {
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
    //Set observations to new sorted array
    Model.set_observations(observations);


    //To get the most recent observations

    let observationsLimited = Model.get_recent_observations(10);
    views.observation_table("target", observationsLimited);
    let def = document.getElementById("definition");
    def.innerHTML = "Ten most recent observations";
    bindings1();

}


//Binding function for individual observation view followed by observation click handler
function bindings1() {
    {
        let list = document.getElementsByClassName("observation-code");
        //console.log(list);

        for (let i = 0; i < list.length; i++) {

            list[i].onclick = observClickHandler;
        }
    }
}

//onclick handler for observations
function observClickHandler() {
    let id = this.dataset.id;
    let observation = Model.get_observation(id);
    views.individual_observation('target', observation);
    let def = document.getElementById("definition");
    def.innerHTML = "Detailed view of Observation";



}



//navigation bar api's, code defines what happens when the hash value changes when clicking different navigation buttons
function redraw() {

    if (window.location.hash == '#!/observations') {

        let observations = Model.get_observations();
        for (let i = 0; i < observations.length; i++) {
            observations[i].timestamp = new Date(observations[i].timestamp);
        }
        observations.sort(converTime);
        //compare function to sort timestamp
        function converTime(a, b) {
            return a.timestamp.getTime() - b.timestamp.getTime();
        }
        views.observation_table('target', observations);
        let def = document.getElementById("definition");
        def.innerHTML = "List of Observations";
        bindings1(); //calling the binding function which will invoke observation onclick handlers
    }
    else if (window.location.hash == '#!/users') {
        let users = Model.get_users();
        views.users_table('target', users);
        let def = document.getElementById("definition");
        def.innerHTML = "List of Users";
        bindings(); //calling the binding function which will invoke user onclick handlers

    }

    else if (window.location.hash == '#!/submit') {
        views.submissionForm('target');
        bindings2(); //calling binding function which will invoke form onclick handler
    }

    else if (window.location.hash == "") {
        window.onload();
    }
}


//Binding function for individual user view with observations
function bindings() {


    let list = document.getElementsByClassName("user-code");

    for (let i = 0; i < list.length; i++) {

        list[i].onclick = userClickHandler;
    }

}


//Onclick handler for the users
function userClickHandler() {
    let id = this.dataset.id;
    let user = Model.get_user(id);
    let observations = Model.get_user_observations(id);
    for (let i = 0; i < observations.length; i++) {
        observations[i].timestamp = new Date(observations[i].timestamp);
    }
    views.individualUsersAndObservations('target', user, observations);
    let def = document.getElementById("definition");
    def.innerHTML = "Detailed View Of User";
    bindings1(); //calling binding function for individual observation onclick handler
}



//Event listener for successful form submission it calls the redraw2 function for a succesful form submission
window.addEventListener("observationAdded", function (e1) {redraw2();});


//Bindings2 function which will be invoked when hash value is "#!submission" .i.e. when user clicks submit observation button
function bindings2() {
    let form = document.getElementById('submission-form');
    form.onsubmit = observation_form_handler;
}

//Form handler and binding function
function observation_form_handler() {
    let formData = new FormData(this);
    Model.add_observation(formData);
    return false;
}

// Redraw fucntion when the form is submitted 
function redraw2() {
    let observations = Model.get_observations();
    let N = observations.length;
    let def = document.getElementById("definition");
    def.innerHTML = "Observation Submitted successfully!";
    views.individual_observation('target', observations[N - 1]);
    window.onhashchange = redraw;
}







