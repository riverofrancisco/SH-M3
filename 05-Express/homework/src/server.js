// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const { application } = require("express");
const express = require("express");

const STATUS_USER_ERROR = 422;
const STATUS_BODY_ERROR = 404;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

let id = 0;

server.post('/posts', (req,res) => {
    const {author, title, contents} = req.body;
    const post = {
        author, title, contents, id: id++
    };

    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: 'No se recibieron los parámetros necesarios para crear el Post'})
    }
   
    posts.push(post);
    res.json(post)
})  

server.post(`/posts/author/:author`, (req, res) => {//author lo recibe por params
    let {author} = req.params;
    let {title, contents} = req.body;


    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({
            error: 'No se recibieron los parámetros necesarios para crear el Post',
        })
    }

    const post = {
        author, title, contents, id: id++
    };
   
    posts.push(post);
    res.status(200).json(post);
});

/* function FilterPost (arg) {
    let FilteredARR = [];
    posts.map(post => {
        let titleARR = post.title.split(' ');
        let contentsARR = post.contents.split(' ');
        if(titleARR.find(arg)) {FilteredARR.push(post)};
        if(contentsARR.find(arg)) {FilteredARR.push(post)}
    })
    return FilteredARR;
} */

server.get('/posts', (req,res)=> {
   const {term} = req.query;
    if(term){
        const termPosts = posts.filter(post => post.title.includes(term) || post.contents.includes(term))   
        return res.send(termPosts);
    }
    else res.send(posts);
})

server.get('/posts/:author', (req,res)=> {
    const {author} = req.params;
    const termPosts = posts.filter(post => post.author.includes(author))   
    if(termPosts.length === 0){
        return res
        .status(STATUS_USER_ERROR)
        .json({
            error: 'No se recibieron los parámetros necesarios para crear el Post',
        })};
    res.send(termPosts);
 })
 

 server.get('/posts/:author/:title', (req,res)=> {
    const {author, title} = req.params;
    const termPosts = posts.filter(post => post.author.includes(author) && post.title.includes(title))   
    if(termPosts.length === 0){
        return res
        .status(STATUS_USER_ERROR)
        .json({
            error: 'No existe ningun post con dicho titulo y autor indicado',
        })};
    res.send(termPosts);
 })

 server.put('/posts', (req,res)=> {
    let {id, title, contents} = req.body;
    
    if(id && title && contents){
        let post = (posts.find(post => post.id === parseInt(id))); //toma la referencia del post existente -> Puedo reemplazar valores.
        if(post){
            post.title = title;
            post.contents = contents;
            res.json(post);
        } else {
            return res
            .status(STATUS_USER_ERROR)
            .json({error: 'No existe ningún Post con dicho ID'})
        }
    }
    else {
        return res
        .status(STATUS_USER_ERROR)
        .json({
            error: 'No se recibieron los parámetros necesarios para crear el Post',
        })
    }

 })

 server.delete('/posts', (req,res) => {
    let { id } = req.body;
    let post = posts.find(p => p.id === parseInt(id));
    console.log(post);
    if(!id || !post){
       return res.status(STATUS_USER_ERROR).json({ error: "Mensaje de error" })
    }

    posts = posts.filter(p => p.id !== parseInt(id));
    return res.json({ success: true });
 })

 server.delete('/author', (req,res) => {
    let { author } = req.body;
    const author_found = posts.find(p => p.author.includes(author));
    if(!author_found){
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }

    let postsdeleted = posts.filter(p => p.author.includes(author))
    posts = posts.filter(post => !post.author.includes(author));
    return res.json(postsdeleted);
 })

module.exports = { posts, server };
