export {Model};
import * as views from './views.js';


/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users 
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {
            fetch(this.users_url)
            .then(
            function (response) {

            return response.json();
                    
        }
    )
    
    .then(
    
    (data) => {
    this.data.users = data;
    let event = new CustomEvent("modelUpdated");
    window.dispatchEvent(event);
    }

    )

},

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {

        fetch(this.observations_url)
            .then(
                function (response) {

                    return response.json();

                }
            )

            .then(

                (data) => {
                    this.data.observations = data;
                    let event = new CustomEvent("modelUpdated");
                    window.dispatchEvent(event);
                }

            )
        
    },




    // get_observations - return an array of observation objects
    get_observations: function() {
        return this.data.observations;
    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        let observations = Model.data.observations;
        for (let i = 0; i < observations.length; i++) {
            if (observations[i].id == observationid) {
            return observations[i];
                
            }
            
        }
        
        
    },

    
    set_observations: function(observations) {
        this.data.observations = observations;
    },


    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(formdata) {
        fetch('/api/observations', { 
            method: "POST",
            body: formdata 
        })
        
        .then((response) => { 
            return response.json(); 
        })

        .then((data) => { 
            let event1 = new CustomEvent("observationAdded");
            console.log(data.observation);
            let observations = this.data.observations;
            observations[observations.length] = data.observation;
            window.dispatchEvent(event1); 
            //views.individual_observation("content", data.observation);
                
        })
        
    },

    
    // get_user_observations - return just the observations for
    //   one user as an array
    get_user_observations: function(userid) {
        let observations = this.get_observations();
        let userObservations = [];
        for (let i=0; i<observations.length ; i++){
            if (observations[i].participant == userid){
                userObservations.push(observations[i]);
            }
        }
        return userObservations;

    },

    // get_recent_observations - return the N most recent
    //  observations, ordered by timestamp, most recent first
    get_recent_observations: function(N) {
    
        let observations = this.get_observations();
        let observationsX = [];
        for (let i = 0; i < observations.length; i++) {
            
                observationsX.push(observations[i]);
            }
                let observationsLimited = observationsX.splice(0 , N);
        
        return observationsLimited;
    },

    /* 
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given 
    //    the user id
    get_user: function(userid) {
        let users = this.get_users();
        for(let i=0; i<users.length; i++){
            if(users[i].id == userid){
                return users[i];
            }
        }

    }

};
