create procedure create_trip(in _uid int, in _lid int, in _bio nvarchar(2048))
begin
	insert into Trip (lid, bio) values (_lid, _bio);
    insert into Member (uid, tid) values (_uid, (select max(t.tid) from Trip t));
end
