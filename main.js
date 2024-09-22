Apikey = '6zRFvHzyasbzDOgEvnzx184CWII9C4j0NkfHkbZ92G7mPs67Ne75rqVS'
let imgcontainer = document.querySelector(".images");
let loadMoreBtn = document.querySelector('#load-more-btn');
let search= document.querySelector('#searchInput');
let searchBtn = document.querySelector('.fa-magnifying-glass');

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const photographerName = document.getElementById('photographer-name');
const downloadLink = document.getElementById('download-link');
let searchTerm = null;
let page = 1;
let per_page = 20;

 const generatehtml = (photos) => {
    photos.forEach(photo => {
        // Create an image element
        const img = document.createElement('img');
        img.src = photo.src.large2x;
        img.alt = photo.alt;
        img.photographer = photo.photographer;
        img.classList.add('card');

        // Add an event listener
        img.addEventListener('click', () => {
            // Your click event logic here
            console.log(`Image clicked: ${photo.alt}`);
        });

        // Append the image to the container
        imgcontainer.appendChild(img);
    });
};


const getImages = async(apiurl)=>{
    try {
        loadMoreBtn.innerHTML="loading..."
        loadMoreBtn.classList.add("disabled");
        const response = await fetch(apiurl,{headers: {Authorization:Apikey}});
        const data =await response.json();
        generatehtml(data.photos);
        loadMoreBtn.innerHTML="loadMore"
        loadMoreBtn.classList.remove("disabled");
        console.log(data.photos);
    } catch (error) {
        console.error(error);
    }

}
getImages(`https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`);



loadMoreBtn.addEventListener('click', () => {
    page++;
    let apiurl;
    searchTerm ? apiurl = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${page}&per_page=${per_page}`:`https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`
    getImages(apiurl);
    
});




const searchImages = (e) =>{
 if (e.key === "Enter") {
    searchTerm = search.value.trim();
    if (searchTerm === null) {
        return 
    }
    page = 1;
    imgcontainer.innerHTML = "";
    let apiurl = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${page}&per_page=${per_page}`
    getImages(apiurl);

    
 }

}

search.addEventListener('keyup',searchImages);
searchBtn.addEventListener('click',()=>{
    searchTerm = search.value.trim();
    page = 1;
    imgcontainer.innerHTML = "";
    let apiurl = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${page}&per_page=${per_page}`
    getImages(apiurl);
})



imgcontainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const altText = event.target.alt;
        const photoSrc = event.target.src;
        const photographer = event.target.photographer; // Assuming you have this attribute

        // Set modal content
        modalImage.src = photoSrc;
        photographerName.innerText = `Photographer: ${photographer}`;
        downloadLink.href = photoSrc; // Set download link to image URL

        // Display the modal
        modal.style.display = 'block';
    }
});

// Close modal when the user clicks on <span> (x)
const closeModal = document.getElementsByClassName('close')[0];
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when the user clicks anywhere outside of the modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});