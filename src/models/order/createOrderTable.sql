CREATE TABLE IF NOT EXISTS `Order` (
  id int auto_increment primary key,
  date datetime not null,
  description text null,
  userId int null,
  giftId int null,
  constraint Order_id_uindex unique (id),
  constraint giftId foreign key (giftId) references Gift (id),
  constraint userId foreign key (userId) references User (id)
);
