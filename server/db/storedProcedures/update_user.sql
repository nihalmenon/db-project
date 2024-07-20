create procedure update_user(
    in _uid int,
    in _first_name nvarchar(30), 
    in _last_name nvarchar(30), 
    in _dob date, 
    in _gender char(1), 
    in _email nvarchar(255), 
    in _phone nvarchar(15), 
    in _socials nvarchar(255), 
    in _pwd nvarchar(255)
)
begin
    update user
    set first_name = coalesce(_first_name, first_name), 
        last_name = coalesce(_last_name, last_name), 
        dob = coalesce(_dob, dob), 
        gender = coalesce(_gender, gender), 
        email = coalesce(_email, email), 
        phone = coalesce(_phone, phone), 
        socials = coalesce(_socials, socials), 
        pwd = coalesce(_pwd, pwd)
    where uid = _uid;
end