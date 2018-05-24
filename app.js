window.addEventListener('load', ()=>{
  console.log(`ajax-blog-front-end: Ready to Ajaxx`);
  const blogpostTitlesListEl =document.querySelector('#blogpost-titles-list');
  const mainPanelEl = document.querySelector('#main-panel')
  const baseURL = 'http://localhost:3012/blogposts';

  const createBlogpost = event => {
    event.preventDefault();
    const title = document.querySelector('#input-title').value;
    const content = document.querySelector('#textarea-content').value;
    console.log({title, content});
    axios.post(baseURL, {title, content})
      .then( response => {
        loadTitles();
        showBlogpost(response.data);
      })
      .catch(error => console.error(error));
  }

const newBlogpost =()=>{
  mainPanelEl.innerHTML = `<h3>New Blogpost</h3>
  <form>
  <label for="title" id="title-label">Title</label>
  <input type="text" name="title" id="input-title"/>
  <br>
  <br>
  <br>
  <label for="content">Content</label>
  <textarea name="content" id="textarea-content"></textarea>
  <br>
  <br>
  <button id="create-button">Create</button>
  </form>`
  document.querySelector('#create-button').addEventListener('click', createBlogpost);
}



const updateBlogpost = () =>{
  const title = document.querySelector('#input-title').value;
  const content = document.querySelector('#textarea-content').value;
  axios.put(`${baseURL}/${blogpost.id}`, {title: id, })
    .then(response => {
      container.innerHTML =
      `<code>${JSON.stringify(result.data)}</code>`
    })
}

const editBlogpost = blogpost =>{
  mainPanelEl.innerHTML = `<h3>Edit Blog Post</h3>
  <form>
  <label for="title">Title</label>
  <input type="text" name="title" id="input-title-edit" /><br><br>
  <label for="content">Content</label>
  <textarea name="content" id="textarea-content-edit"></textarea>
  <br>
  <br>
  <button id="update-button">Update</button>
  </form>`
  document.querySelector('#input-title-edit').vaule = blogpost.title
  document.querySelector('#textarea-content-edit').value = blogpost.content;
  document.querySelector('#update-button').addEventListener('click', () => {
    updatedBlogpost(blogpost)
  });








}
const deleteBlogpost = Blogpost => {
  axios.delete(`${baseURL}/${blogpost.id}`)
  .then(response => {
    loadTitles();
    mainPanelEl.innerHTML = "";
  })
  .catch(error => console.error(error));
}

const updatedBlogpost = Blogpost => {
  const title = document.querySelector('#input-title-edit').value;
  const content = document.querySelector('#textarea-content-edit').value;
   axios.put(`${baseURL}/${blogpost.id}`, {title,content})
   .then(response => {
     console.log(response);
     showBlogpost(response.data);
   })
   .catch(error => console.error(error));
}


const showBlogpost = blogpost =>{
  mainPanelEl.innerHTML = '';
  const focusTitleEl = document.createElement('h3');
  const focusContentEl = document.createElement('p')
  focusTitleEl.innerHTML = blogpost.title;
  focusContentEl.innerHTML = blogpost.content;
  const editButtonEl = document.createElement('button');
  const deleteButtonEl = document.createElement('button');
  editButtonEl.id = 'edit-button';
  deleteButtonEl.id = 'delete-button';
  editButtonEl.innerHTML = 'Edit';
  deleteButtonEl.innerHTML = 'Delete'
  mainPanelEl.appendChild(focusTitleEl);
  mainPanelEl.appendChild(focusContentEl);
  mainPanelEl.appendChild(editButtonEl);
  mainPanelEl.appendChild(deleteButtonEl);
  document.querySelector('#edit-button').addEventListener('click', () => {editBlogpost(blogpost)});
  document.querySelector('#delete-button').addEventListener('click', () => {editBlogpost(blogpost)});
}


const loadTitles =() => {

  axios.get(baseURL)
    .then(response => {
        blogpostTitlesListEl.innerHTML ="";
      response.data.forEach(blogpost =>{
        const blogpostTitleEl = document.createElement('li');
        blogpostTitleEl.innerHTML = blogpost.title;
        blogpostTitlesListEl.appendChild(blogpostTitleEl);
        blogpostTitleEl.addEventListener('click', () => {showBlogpost(blogpost)});
      });
    })
    .catch(error => console.error(error));
  }
  loadTitles();
  document.querySelector('#new-blogpost').addEventListener('click', newBlogpost);

});
