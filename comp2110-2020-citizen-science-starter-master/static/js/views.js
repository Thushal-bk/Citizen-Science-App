
export{users_table, observation_table, individual_users, individualUsersAndObservations , individual_observation , submissionForm};

/* Templates at the start*/


//template for navigation listing 
function apply_template(id, templateid, data) {

    let target = document.getElementById(id);
    let template = Handlebars.compile(document.getElementById(templateid).textContent);
    target.innerHTML = template(data);
    



}


//template to list individual user and observation
function apply_templateIndi(id, template1, template2, dataO, dataU) {
    let target = document.getElementById(id);
    let templateA = Handlebars.compile(document.getElementById(template1).textContent);
    target.innerHTML = templateA(dataU);
    let templateB = Handlebars.compile(document.getElementById(template2).textContent);
    target.innerHTML += templateB(dataO);

}

/*View functions */

//List observation from navigation
function observation_table(id, data) {


    apply_template(id, "tableh", { 'observationHB': data });

}

//list users from navigation
function users_table (id, data)
{
    apply_template(id, "userh", { 'usersHB': data });   
}


//list individual users, not used this yet
function individual_users (id, data)
{
    apply_template(id, "user-deets",data);
}

//list individual user and observation
function individualUsersAndObservations (id, dataU, dataO){
    apply_templateIndi(id, "user-deets", "tableh", { 'observationHB': dataO} , dataU);
}




//list individual observations
function individual_observation(id, data) {

    apply_template(id, "observ-deets", data);
}


//function for Submission form

function submissionForm(id){
    let target = document.getElementById(id);
    let def = document.getElementById("definition");
    def.innerHTML = "Submit a new observation";
    let content = "";
    
    content += "<form id='submission-form'> <fieldset><legend>New Observation:</legend> <label for='participant'>participant:</label> <select id='participant' name='participant'><option value ='0'>0</option ></select >";
    content += "<label for='temprature'>temprature:</label> <input name='temperature' ></input>"
    content +="<label for= 'weather'> weather: </label > <select id='weather' name='weather'><option value ='fine'>fine</option ><option value='raining'>raining</option><option value='sunny'>sunny</option><option value='stormy'>stormy</option></select > <label for= 'wind'> wind: </label ><select id='wind' name='wind'><option value = 'none' > none</option ><option value='light'>light</option><option value='medium'>medium</option><option value='strong'>strong</option></select>";

    content += '<label for="location"> location: </label> <input name = "location"></input ><label for="height"> height: </label><input name="height"></input><label for="girth"> girth: </label><input name="girth"></input><label for="leaf_size"> leaf_size: </label><select id="leaf_size" name="leaf_size"><option value ="small">small</option ><option value="medium">medium</option><option value="large">large</option></select > <label for="leaf_shape"> leaf_shape: </label><select id="leaf_shape" name="leaf_shape"><option value ="rounded">rounded</option ><option value="pointy">pointy</option><option value="divided">divided</option></select > <label for="bark_colour"> bark_colour: </label><select id="bark_colour" name="bark_colour"><option value ="grey">grey</option ><option value="red">red</option><option value="silver">silver</option><option value="brown">brown</option> </select ><label for="bark_texture"> bark_texture: </label><select id="bark_texture" name="bark_texture"><option value ="smooth">smooth</option ><option value="peeling">peeling</option><option value="crinkles">crinkles</option><option value="furry">furry</option> <option value="spotty">spotty</option> </select ><input type="submit" id="submitBtn"> </input> </fieldset></form>';

    target.innerHTML = content;
    
}





