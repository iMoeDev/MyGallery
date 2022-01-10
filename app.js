
const Auth = "563492ad6f91700001000001521ced4da4a94bd0a9b7cc9027cf7d97";
const gBig = document.querySelector(".Gallary");
const input = document.querySelector(".search");
const btn = document.querySelector(".btn");
const form = document.querySelector("form");
const more = document.querySelector(".more");
const lamp = document.querySelector(".lamp");
const body = document.querySelector("body");
const a = document.querySelector("a");

page_counter = 1 ;

let f = `https://api.pexels.com/v1/curated?per_page=15&page=${page_counter}`;
let search;




input.addEventListener("input", e=>{
    search = e.target.value;
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    f =`https://api.pexels.com/v1/search?query=${search}&per_page=15&page=${page_counter}`;
    if (search)
    {
    gBig.innerHTML="";
    
    Search (f);
    input.value="";

    }
})

more.addEventListener("click",e=>{
    page_counter++;
        if (search)
        {
            f =`https://api.pexels.com/v1/search?query=${search}&per_page=15&page=${page_counter}`;
            Search(f);
        }

        else{
            f =`https://api.pexels.com/v1/curated?per_page=15&page=${page_counter}`;
            Creat(f);
        }


        
})

gBig.addEventListener("click", e=>{
e.stopPropagation();
});

lamp.addEventListener("click",e=>{

    

    if(body.classList != "style"){
    body.classList.add("style");
    a.classList.add("style1");
    btn.classList.add("style2");
    more.classList.add("style2");
    for (let i = 0; i < gBig.children.length; i++) {
    gBig.children[i].childNodes[1].childNodes[1].classList.add("style1");
    gBig.children[i].childNodes[1].childNodes[3].classList.add("style1");
    }
}

    else{
    body.classList.remove("style");
    btn.classList.remove("style2");
    a.classList.remove("style1");
    more.classList.remove("style2");
    for (let i = 0; i < gBig.children.length; i++) {
  
        gBig.children[i].childNodes[1].childNodes[1].classList.remove("style1");
        gBig.children[i].childNodes[1].childNodes[3].classList.remove("style1");
    
    
        }

    }
})


Creat(f);

  async function Creat (f){ 
   const FetchData = await fetch(f
   ,
   {
       method: "GET",
       headers: {

       Accept: "application/json",
       Authorization: Auth
    }
   })

 
   .then(response => response.json())
   .then((data) => {
    console.log(data);
    const allPhotos = data.photos;
    allPhotos.map(item => {
    const gallary = document.createElement("div");
    gallary.classList.add("g-c");  
    if(body.classList == "style"){
   
    gallary.innerHTML = `
    <div class = "note">
    <a class = "style1" href ="${item.photographer_url}">${item.photographer}</a> <a  class = "style1" href="${item.src.original}">download</a> 
    </div>
    <img src=${item.src.large}>`;
    
    gBig.appendChild(gallary);
    }
else{

    gallary.innerHTML = `
    <div class = "note">
    <a href ="${item.photographer_url}">${item.photographer}</a> <a  href="${item.src.original}">download</a> 
    </div>
    <img src=${item.src.large}>`;
    
    gBig.appendChild(gallary);

}}
)
 }
)
}

async function Search (f){ 

    const FetchData = await fetch(f,
    {
        method: "GET",
        headers: {
 
        Accept: "application/json",
        Authorization: Auth
     }
    })
 
    .then(response => response.json())
    .then((data) => {
     console.log(data);
        const allPhotos = data.photos;

        allPhotos.map((item) => {
    const gallary = document.createElement("div");
    gallary.classList.add("g-c");     
    
 
 if(body.classList == "style"){
    gallary.innerHTML = `
    <div class = "note">
    <a class= "style1" href ="${item.photographer_url}">${item.photographer}</a> 
    <a class= "style1" href="${item.src.original}">download</a> 
    </div>
    <img    
    src=${item.src.large}>`;

 }

 else{
    gallary.innerHTML = `
    <div class = "note">
    <a  href ="${item.photographer_url}">${item.photographer}</a> 
    <a href="${item.src.original}">download</a> 
    </div>
    <img    
    src=${item.src.large}>
    `;
 }
 gBig.appendChild(gallary);
        })
    })
 }
 


 


