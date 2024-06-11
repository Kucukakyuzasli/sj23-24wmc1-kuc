// 1. APPLICATION STATE
// - Holds the state of the application
// - This is the single source of truth for the application state
let state ={
    tables: [],
    blogs: [],
    forum: []
}

var num = 1;
// 2. STATE ACCESSORS/MUTATORS FN'S
// - Functions that allow us to get and set the state
// - Here we will create functions to add and remove todos
function clear(){
    let state ={
        tables: [],
        blogs: [],
        forum: []
    }
    localStorage.setItem("state", JSON.stringify(state));
}

function getState(){
    let stateString = window.localStorage.getItem("state");
    state = JSON.parse(stateString);
}

function updateState(){
    localStorage.setItem("state", JSON.stringify(state));
}

// 3. DOM Node Refs
// - Static references to DOM nodes needed after the start of the application
const btForumPost = document.getElementById("forumButton");

// 4. DOM Node Creation Fn's
// - Dynamic creation of DOM nodes needed upon user interaction
// - Here we will create a function that will create a todo item

// 5. RENDER FN
// - These functions will render the application state to the DOM
// - Here we will use a very naive but simple approach to re-render the list
// - IMPORTANT TAKEAWAY: The state drives the UI, any state change should trigger a re-render of the UI
function blogOnLoad(){
    

    stateString = localStorage.getItem("state");
    state = JSON.parse(stateString);
    state.tables.forEach(element => {
        const tab = document.getElementById("logs");
        const trow = document.createElement("tr");
        const tdata = document.createElement("td");
        const tdata2 = document.createElement("td");
        const tdata3 = document.createElement("td");
        tdata.innerHTML = element.id;
        tdata2.innerHTML = element.date;
        var blogButton = document.createElement("button");
        blogButton.innerText = element.date;
        blogButton.setAttribute("onclick", "editContents("+element.id+")");
        
        tdata3.appendChild(blogButton);
        trow.append(tdata);
        trow.append(tdata2);
        trow.append(tdata3);
        tab.append(trow);
        num = element.id + 1;

    });

    


}

function onloadForum(){
    let stateString = window.localStorage.getItem("state");
    state = JSON.parse(stateString);
    let posts = document.getElementById("forumPosts");
    state.forum.forEach(element => {
        const h2 = document.createElement("h2");
        const address = document.createElement("address");
        const pre = document.createElement("pre");
        h2.innerText = element.title;
        address.innerText = "Post by"+element.username;
        pre.innerText = element.text;
        const div = document.createElement("div");
        div.appendChild(h2);
        div.appendChild(address);
        div.appendChild(pre);
        posts.appendChild(div);
    });
}

function render(){
    getState();
}

// 6. EVENT HANDLERS
// - These functions handle user interaction e.g. button clicks, key presses etc.
// - These functions will call the state mutators and then call the render function
// - The naming convention for the event handlers is `on<Event>`
// - Here we will create a function that will handle the add button click

function createLog(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const tab = document.getElementById("logs");
    const trow = document.createElement("tr");
    const tdata = document.createElement("td");
    const tdata2 = document.createElement("td");
    const tdata3 = document.createElement("td");

    tdata.innerHTML = num;
    
    tdata2.innerHTML = today;
    
    var blogButton = document.createElement("button");
    blogButton.innerText = today;
    blogButton.setAttribute("onclick", "editContents("+num+")");
    // blogButton.setAttribute("id", num);
    

    tdata3.appendChild(blogButton); 

    let obj = {
        id: num,
        date: today
    }
    state.tables.push(obj);
    localStorage.setItem("state", JSON.stringify(state));
    

    trow.append(tdata);
    trow.append(tdata2);
    trow.append(tdata3);
    tab.append(trow);
    num++;
}

function editContents(id){
    
    
    //top navigation
    let navtop = document.createElement("header");

    let uList = document.createElement("ul");

    let li1 = document.createElement("li");
    let navA = document.createElement("a");
    navA.setAttribute("href","index.html");
    navA.innerText = "Home";
    li1.appendChild(navA);

    let li2 = document.createElement("li");
    let navA2 = document.createElement("a");
    navA2.setAttribute("href","Blog.html");
    navA2.innerText= "Blog";
    li2.appendChild(navA2);

    let li3 = document.createElement("li");
    let navA3 = document.createElement("a");
    navA3.setAttribute("href","#");
    navA3.innerText = "Forum";
    li3.appendChild(navA3);

    let li4 = document.createElement("li");
    let navA4 = document.createElement("a");
    navA4.setAttribute("href","AboutMe.html");
    navA4.innerText = "About me";
    li4.appendChild(navA4);

    uList.appendChild(li1);
    uList.appendChild(li2);
    uList.appendChild(li3);
    uList.appendChild(li4);

    let logo = document.createElement("a");
    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", "img/sampleLogo.png");
    logoImg.setAttribute("alt", "logo");
    logo.appendChild(logoImg);

    navtop.appendChild(logo);
    navtop.appendChild(uList);

    //link
    let styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", "css/style.css");



    //div textarea

    let d = document.createElement("div");
    d.setAttribute("id", "textwritearea");
    let h = document.createElement("h1");
    h.setAttribute("id", "test");
    h.innerText = "Write your text";
    let d2 = document.createElement("div");
    d2.setAttribute("class", "flexColumn");
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "Title");
    inputTitle.setAttribute("id", "Title");
    inputTitle.style.display = 'none';
    let textArea = document.createElement("textarea");
    textArea.setAttribute("name", "blog");
    textArea.setAttribute("id", "txtarea");
    textArea.setAttribute("cols", "30");
    textArea.setAttribute("rows", "10");
    textArea.style.display = 'none';
    d.appendChild(h);
    d2.appendChild(inputTitle);
    d2.appendChild(textArea);
    d.appendChild(d2);

    //saved text div
    let divSavedText = document.createElement("div");
    let savedTitle = document.createElement("h1");
    savedTitle.setAttribute("id", "blogTitle");
    let savedText = document.createElement("pre");
    savedText.setAttribute("id", "blogtext");
    state.blogs.forEach(element => {
        if(element.id == id){
            savedTitle.innerText = element.title;
            savedText.innerText = element.text;
        }
    });
    divSavedText.appendChild(savedTitle);
    divSavedText.appendChild(savedText);

    //button
    let buttonSave = document.createElement("button");
    buttonSave.setAttribute("id", "buttontest");
    buttonSave.innerText = "Edit";
    buttonSave.setAttribute("onclick", "editText("+id+")"); 
    

    //main 
    let main = document.createElement("main");
    let divMain = document.createElement("div");
    divMain.appendChild(d);
    divMain.appendChild(divSavedText);
    main.appendChild(divMain);
    main.appendChild(buttonSave);

    //scripts
    let scriptBlog = document.createElement("script");
    scriptBlog.setAttribute("src", "js/script.js");

    let createdBlog = document.implementation.createHTMLDocument("blog");

    console.log(createdBlog);
    createdBlog.head.appendChild(styleLink);
    createdBlog.body.appendChild(navtop);
    createdBlog.body.appendChild(main);
    createdBlog.body.appendChild(scriptBlog);
    var opened = window.open("");
    opened.document.write(createdBlog.head.innerHTML);
    opened.document.write(createdBlog.body.innerHTML);

}

function save(id){
    getState();

    let title = document.getElementById("Title").value;
    let text = document.getElementById("txtarea").value;
    document.getElementById("Title").style.display = "none";
    document.getElementById("txtarea").style.display = "none";
    
    document.getElementById("blogTitle").textContent = title;
    document.getElementById("blogtext").textContent= text;
    let exists = false;
    for (let index = 0; index < state.blogs.length; index++) {
        const element = state.blogs[index];
        if(element.id == id){
            let obj = {
                id: id,
                title: title,
                text: text
            }
            state.blogs.splice(index, 1);
            state.blogs.push(obj);
            // localStorage.setItem('state',JSON.stringify(state));
            exists = true;
        }
    }
    if(exists == false){
        let obj = {
            id: id,
            title: title,
            text: text
        }
        state.blogs.push(obj);
        // localStorage.setItem('state',JSON.stringify(state));
    }

    
    let button = document.getElementById("buttontest");
    button.innerText = "Edit";
    button.setAttribute("onclick", "editText("+id+")");  
    
    updateState();
    
    document.getElementById("blogTitle").style.display = "block";
    document.getElementById("blogtext").style.display = "block";

    
}

function editText(id){
    document.getElementById("Title").style.display = "inline";
    document.getElementById("txtarea").style.display = "inline";
    document.getElementById("Title").innerHTML = document.getElementById("blogTitle").textContent;
    document.getElementById("txtarea").innerHTML = document.getElementById("blogtext").textContent;

    let button = document.getElementById("buttontest");
    button.innerText = "Save";
    button.setAttribute("onclick", "save("+id+")");

    document.getElementById("blogTitle").style.display = "none";
    document.getElementById("blogtext").style.display = "none";
}

function createBlogForum(){
    let obj = {
        title: document.getElementById("forumTitle").value,
        username: document.getElementById("forumUserName").value,
        text: document.getElementById("forumTextArea").value
    }
    console.log(obj);
    state.forum.push(obj);
    updateState();
    console.log(state);
    window.location.reload();
}


// 7. INIT BINDINGS
// - These are the initial bindings of the event handlers

btForumPost.addEventListener("click", createBlogForum);

// 8. INITIAL RENDER
// - Here will call the render function to render the initial state of the application

render();




