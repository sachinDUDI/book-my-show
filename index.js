const taskContainer = document.querySelector(".task__container"); //we can also use id as getElementById by defining id to row

let globalStorage = [] ;

const generateNewCard = (taskData) =>`
<div class="col-md-6 col-lg-4">
<div class="card text-center">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
        <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
    </div>
    <img src=${taskData.imageUrl} class="card-img-top" alt="url" />
    <div class="card-body">
      <h5 class="card-title">${taskData.taskTittle}</h5>
      <p class="card-text">${taskData.taskDescription}</p>
      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    <div class="card-footer text-muted ">
        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
    </div>
  </div>
</div>
`;

const loadInitialCardData = () => {
    // localStorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    //covert from string to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array of task object 
    cards.map((cardObject) => {   // instead map we can use forEach() also.

        // iject it to DOM
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

        // update our globalStore
        globalStorage.push(cardObject);
    })
};
const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // ``- for containg expression or variable in object, create unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTittle: document.getElementById("tasktittle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    globalStorage.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStorage}));

};

const deleteCard = (event) => {
    event = window.event;
    //id
    const targetId = event.target.id;
    const tagname = event.target.tagName;
    //match the id of the element with the id inside the globalStroge 
    // if match found remove

    globalStorage = globalStorage.filter((cardObject) => cardObject.id !== targetId);
    localStorage.setItem("tasky", JSON.stringify({cards:globalStorage}));
    
    // contact parent

     

    
   if (tagname == "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
       
   }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
   }
    // taskContainer.removeChild(document.getElementById(targetId));
}

//parent Object
//Browser -> window   --create alearts,notifications open or close new tabs
//DOM => document  -- for edit the content of the HTML