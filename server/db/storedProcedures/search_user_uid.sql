create procedure search_user_uid(in _uid int)
begin
    SELECT * FROM User WHERE uid = _uid;
end
