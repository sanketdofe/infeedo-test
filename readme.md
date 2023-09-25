# Infeedo Simple Task Tracking

### Stack Used
- NestJS framework running on top of NodeJS with Typescript
- PostgreSQL as Database

### How to Run
- First Create a DB and add the DB credentials to a `.env` file (create it under root directory and populate it in the following manner
```
	DB_HOST=localhost  
	DB_PORT=5432  
	DB_USER=postgres  
	DB_PASSWORD=postgres  
	DB_DBNAME=infeedo
```
- Create a table in the DB using following DDL
```
	create table public."Task" (
      id character varying(15) primary key not null,
      name character varying(1024) not null,
      "uniqueName" character varying(1024) not null,
      description text not null,
      status character varying(15) not null,
      "dateCreated" timestamp with time zone not null default now(),
      "dateUpdated" timestamp with time zone not null default now()
    );
    create index "Task_name_index" on "Task"(name);
    create index "Task_status_index" on "Task"(status);
    create index "Task_dateCreated_index" on "Task"("dateCreated");
```
- To start the NodeJS App, run the following commands
    - `npm install`
    - `npm run build`
    - `npm run start:prod`

- To test the APIs, you can use the following Postman Collection:
  https://documenter.getpostman.com/view/30029103/2s9YJXYQ4s
