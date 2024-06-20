create procedure search_user_email(in _email nvarchar(255))
begin
    SELECT * FROM User WHERE email = _email;
end