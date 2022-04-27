CREATE TABLE IF NOT EXISTS `User` (
  id int auto_increment primary key,
  name varchar(255) not null,
  number varchar(20) not null,
  constraint User_id_uindex unique (id),
  constraint User_number_uindex unique (number)
);
