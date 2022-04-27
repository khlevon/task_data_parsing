CREATE TABLE IF NOT EXISTS `Gift` (
  id int auto_increment primary key,
  name varchar(255) not null,
  fromId int null,
  constraint Gift_id_uindex unique (id),
  constraint fromId foreign key (fromId) references User (id)
);
