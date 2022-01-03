const inputText = document.querySelector(".input-text");
const addButton = document.querySelector(".add-button");
const list = document.querySelector(".list");

addButton.addEventListener("click",function(){

    const like =document.createElement("span");
    const likeIcon = document.createElement("i");
    like.classList.add("like");
    likeIcon.classList.add("material-icons");
    likeIcon.innerText = "favorite_border";
    like.appendChild(likeIcon);

    const item =document.createElement("span");
    item.classList.add("item")
    item.innerText = inputText.value;

    const manage = document.createElement("span");
    const checkIcon = document.createElement("i");
    const clearIcon = document.createElement("i");
    checkIcon.classList.add("check");
    clearIcon.classList.add("check");
    checkIcon.classList = "check";
    clearIcon.classList = "clear";
    manage.classList = "manage";
    manage.appendChild(checkIcon);
    manage.appendChild(clearIcon);

    const li = document.createElement("li");
    li.appendChild(item);
    li.appendChild(like);
    li.appendChild(manage);
    list.appendChild(li);
})
