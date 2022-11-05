# BloggingAPI-Altschool-Exam-
This is an api for a blog management system

## Requirements
1.	Users can have a first_name, last_name, email, password
2.	A user can sign up and sign in into the blog app
3.  JWT strategy used for authentication and token expires after 1 hour
4.	A blog can be in two states; draft and published
5.	Logged in and not logged in users can get a list of published blogs created
6.	Logged in and not logged in users can get a published blog
7.	Logged in users can create a blog.
8.	When a blog is created, it is in draft state
9.	The owner of the blog can update the state of the blog to published
10.	 The owner of a can edit the blog in draft or published state
11.	 The owner of the blog can delete the blog in draft or published state
12.	The owner of the blog can get a list of their blogs. 
a.	The endpoint is paginated
b.	It is filterable by state
13.	Blogs created have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14.	The list of blogs endpoint that can be accessed by both logged in and not logged in users is paginated, 
a.	default it to 20 blogs per page. 
b.	It is searchable by author, title and tags.
c.	It is orderable by read_count, reading_time and timestamp
15. The owner of the blog should be logged in to perform actions


## Setup
- Install NodeJS, mongodb
- pull this repo
- update config/default.json with custom variables


## Base URL
https://blog-api-2005.herokuapp.com/

## Models

### User
| field      | data_type |  constraints |
| ----------- | ----------- | ----------- |
| id      | string       | required, unique |
| first_name   | string        | required |
| last_name   | string        | required |
| email   | string        | required, unique |
| password   | string        | required |

### Article
| field      | data_type |  constraints |
| ----------- | ----------- | ----------- |
| id      | string       | required, unique |
| created_at   | date        | required |
| updated_at | date | required |
| state  | string        | required, default: draft, enum: ['draft', 'published'] |
| email   | string        | required, unique |
| title  | string | required, unique |
| description | string | required |
| read_count  | number | required |
| reading_time.reading_time_in_words | string | required |
| reading_time.reading_time_in_minutes | string | required |
| tags | string[] | required, default: [] |
| body | string | required |
| author.id | string | required, unique |
| author.first_name | string | required |
| author.last_name | string | required |
| author.email | string | required |

## APIs


### Signup User
- Route: /signup
- Method: POST
- Body: 
```
{
  "first_name": "Ronaldd", 
  "last_name": "Dosunmu", 
  "email": "ronaldosunmu@gmail.com", 
  "password": "Mypasswordis12563"
}
```

- Responses

Success
```
{
  "message": "Sign up Successful!",
  "user": {
    "first_name": "Ronaldd",
    "last_name": "Dosunmu",
    "email": "ronaldosunmu1@gmail.com",
    "password": "$2b$10$LYHO5CA/kcOLDKBcQYea1u.i1n1lpVKaD6HKhemkwYBdkMdhqN.Xa",
    "_id": "6366942a4f82778fd3bd73ac",
    "__v": 0
  }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "email": "ronaldosunmu1@gmail.com", 
  "password": "Mypassword12563"
}
```

- Responses

Success
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjY5NDJhNGY4Mjc3OGZkM2JkNzNhYyIsImZpcnN0X25hbWUiOiJSb25hbGRkIiwibGFzdF9uYW1lIjoiRG9zdW5tdSIsImVtYWlsIjoicm9uYWxkb3N1bm11MUBnbWFpbC5jb20ifSwiaWF0IjoxNjY3NjY3MDQxLCJleHAiOjE2Njc2NzA2NDF9.caPLOXv-2KhwaFT-CCvE636I7pV1hpvNtSojJm4KR9I"
}
```

---
### Create Article

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "My name is ronald", 
  "body": "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot", 
  "description": "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g", 
  "tags": ["drama", "coding", "Netflix"]
}
```

- Responses

Success
```
{
  "article": {
    "state": "draft",
    "author": {
      "_id": "6366942a4f82778fd3bd73ac",
      "first_name": "Ronaldd",
      "last_name": "Dosunmu",
      "email": "ronaldosunmu1@gmail.com"
    },
    "title": "My name is rnafflffffffd",
    "description": "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
    "read_count": 0,
    "reading_time": {
      "reading_time_in_words": "1 min read",
      "reading_time_in_minutes": 0.6176470588235294,
      "_id": "636694b24f82778fd3bd73cb"
    },
    "tags": [
      "drama",
      "coding",
      "Netflix"
    ],
    "body": "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
    "_id": "636694b24f82778fd3bd73ca",
    "createdAt": "2022-11-05T16:52:02.156Z",
    "updatedAt": "2022-11-05T16:52:02.156Z",
    "__v": 0
  },
  "message": "Article created successfully!"
}
```

---
### Get an Article
(Article has to be published, else, 404 error!)
- Route: /article/:id
- Method: GET

- Responses

Success
```
{
  "_id": "636694974f82778fd3bd73b1",
  "state": "published",
  "author": {
    "_id": "6366942a4f82778fd3bd73ac",
    "first_name": "Ronaldd",
    "last_name": "Dosunmu",
    "email": "ronaldosunmu1@gmail.com"
  },
  "title": "My name is ronald",
  "description": "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
  "read_count": 1,
  "reading_time": {
    "reading_time_in_words": "1 min read",
    "reading_time_in_minutes": 0.6176470588235294,
    "_id": "636694974f82778fd3bd73b2"
  },
  "tags": [
    "drama",
    "coding",
    "Netflix"
  ],
  "body": "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
  "createdAt": "2022-11-05T16:51:35.325Z",
  "updatedAt": "2022-11-05T17:41:08.881Z",
  "__v": 0
}
```
---

---
### Get all Articles
(Article has to be published, else, 404 error!)
- Route: /article
- Method: GET
- Query params: 
    - page (default: 1)
    - author
    - title
    - tag
    - sortBy (createdAt | read_count | reading_time)
    - state
    - created_at
- Responses

Success
```
[{
  "_id": "636694974f82778fd3bd73b1",
  "state": "published",
  "author": {
    "_id": "6366942a4f82778fd3bd73ac",
    "first_name": "Ronaldd",
    "last_name": "Dosunmu",
    "email": "ronaldosunmu1@gmail.com"
  },
  "title": "My name is ronald",
  "description": "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
  "read_count": 1,
  "reading_time": {
    "reading_time_in_words": "1 min read",
    "reading_time_in_minutes": 0.6176470588235294,
    "_id": "636694974f82778fd3bd73b2"
  },
  "tags": [
    "drama",
    "coding",
    "Netflix"
  ],
  "body": "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
  "createdAt": "2022-11-05T16:51:35.325Z",
  "updatedAt": "2022-11-05T17:41:08.881Z",
  "__v": 0
}]
```
---

---
### Publish an Article
- Route: /article/:id/publish
- Method: POST
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "message": "Article published successfully!"
}
```
---


---
### Edit an Article
- Route: /article/:id/publish
- Method: PUT
- Header
    - Authorization: Bearer {token}

Body: 
```
{
  "title": "This is a new title", 
  "description": "This is a dummy description, yes!", 
  "body": "This is the body of the request", 
  "tags": ["Netflix"]
}
```
- Responses: 
Success
```
{
  "message": "The article has been updated successfully!",
  "article": {
    "_id": "636694974f82778fd3bd73b1",
    "state": "published",
    "author": {
      "_id": "6366942a4f82778fd3bd73ac",
      "first_name": "Ronaldd",
      "last_name": "Dosunmu",
      "email": "ronaldosunmu1@gmail.com"
    },
    "title": "This is a new title",
    "description": "This is a dummy description, yes!",
    "read_count": 1,
    "reading_time": {
      "reading_time_in_words": "1 min read",
      "reading_time_in_minutes": 0.6176470588235294,
      "_id": "636694974f82778fd3bd73b2"
    },
    "tags": [
      "drama",
      "coding",
      "Netflix"
    ],
    "body": "This is the body of the request",
    "createdAt": "2022-11-05T16:51:35.325Z",
    "updatedAt": "2022-11-05T17:54:20.168Z",
    "__v": 0
  }
}
```
---

### Delete an Article

- Route: /article/:id
- Method: DELETE
- Header:
    - Authorization: Bearer {token}
- Responses
Success 
```
{
  "message": "This article has been deleted successfully!",
  "deleted_article": {
    "_id": "636694974f82778fd3bd73b1",
    "state": "published",
    "author": {
      "_id": "6366942a4f82778fd3bd73ac",
      "first_name": "Ronaldd",
      "last_name": "Dosunmu",
      "email": "ronaldosunmu1@gmail.com"
    },
    "title": "This is a new title",
    "description": "This is a dummy description, yes!",
    "read_count": 1,
    "reading_time": {
      "reading_time_in_words": "1 min read",
      "reading_time_in_minutes": 0.6176470588235294,
      "_id": "636694974f82778fd3bd73b2"
    },
    "tags": [
      "drama",
      "coding",
      "Netflix"
    ],
    "body": "This is the body of the request",
    "createdAt": "2022-11-05T16:51:35.325Z",
    "updatedAt": "2022-11-05T17:54:20.168Z",
    "__v": 0
  }
}
```

### Get All articles by a user

- Route: /article/authors/my_articles
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - state (options: draft | published)
- Responses
Success 
```
{
  "articles": [
    {
      "_id": "636694b04f82778fd3bd73c5",
      "state": "draft",
      "author": {
        "_id": "6366942a4f82778fd3bd73ac",
        "first_name": "Ronaldd",
        "last_name": "Dosunmu",
        "email": "ronaldosunmu1@gmail.com"
      },
      "title": "My name is rnafflfffffd",
      "description": "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
      "read_count": 0,
      "reading_time": {
        "reading_time_in_words": "1 min read",
        "reading_time_in_minutes": 0.6176470588235294,
        "_id": "636694b04f82778fd3bd73c6"
      },
      "tags": [
        "drama",
        "coding",
        "Netflix"
      ],
      "body": "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
      "createdAt": "2022-11-05T16:52:00.414Z",
      "updatedAt": "2022-11-05T16:52:00.414Z",
      "__v": 0
    },
    {
      "_id": "636694b24f82778fd3bd73ca",
      "state": "draft",
      "author": {
        "_id": "6366942a4f82778fd3bd73ac",
        "first_name": "Ronaldd",
        "last_name": "Dosunmu",
        "email": "ronaldosunmu1@gmail.com"
      },
      "title": "My name is rnafflffffffd",
      "description": "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
      "read_count": 0,
      "reading_time": {
        "reading_time_in_words": "1 min read",
        "reading_time_in_minutes": 0.6176470588235294,
        "_id": "636694b24f82778fd3bd73cb"
      },
      "tags": [
        "drama",
        "coding",
        "Netflix"
      ],
      "body": "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
      "createdAt": "2022-11-05T16:52:02.156Z",
      "updatedAt": "2022-11-05T16:52:02.156Z",
      "__v": 0
    }
  ]
}
```
