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
