create table image
(
    id      integer not null
        constraint image_pk
            primary key autoincrement,
    title text not null,
    url text not null
);