CREATE DATABASE desafio;

DROP table IF Exists users;
create table users(
	  id 			SERIAL PRIMARY KEY,
  	nome 		TEXT NOT NULL,
  	email 		TEXT NOT NULL unique,
  	senha		TEXT NOT NULL,
    cpf TEXT default NULL,
    telefone TEXT default NULL
);

DROP table IF Exists clients;
create table clients(
	  id 			SERIAL PRIMARY KEY,
  	nome 		TEXT NOT NULL,
    email 		TEXT unique NOT NULL, 
    cpf 		TEXT unique NOT NULL,
    telefone 	TEXT NOT NULL,
    cep			TEXT,
    logradouro  TEXT,
    complemento TEXT,
    bairro 		TEXT,
    cidade		TEXT,
    estado		TEXT,
  	status      smallint default 0,
  	id_usuario 	int,
  	foreign key (id_usuario) references users (id)   	
);

DROP table IF Exists charges;
create table charges(
	  id SERIAL PRIMARY KEY,
    cliente_id integer NOT NULL references clients(id),
    nome text NOT NULL
    descricao text NOT NULL,
    vencimento DATE NOT NULL,
    valor text NOT NULL
    status text NOT NULL
);

