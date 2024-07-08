create procedure create_trip(in _uid int, in _lid int, in _bio nvarchar(2048), in _start_date date, in _end_date date)
begin
	insert into Trip (lid, bio, start_date, end_date) values (_lid, _bio, _start_date, _end_date);
    insert into Member (uid, tid) values (_uid, (select max(t.tid) from Trip t));
    select max(t.tid) as tid from Trip t;
end