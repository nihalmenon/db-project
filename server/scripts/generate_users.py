import pandas as pd
import random
from faker import Faker
import string

fake = Faker()

def random_gender():
    return random.choice(['m', 'f', 'x'])

# Function to generate a random email domain
def random_email_domain():
    return random.choice([
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com",
        "aol.com"
    ])

def generate_password():
    length = random.randint(10,20)
    characters = string.ascii_letters + string.digits
    result = ''.join(random.choice(characters) for _ in range(length))
    return result

def generate_socials(first_name, last_name):
    return f"@{first_name.lower()}.{last_name.lower()}{random.randint(10, 99)}"

def generate_phone_number():
    part1 = random.randint(100, 999)
    part2 = random.randint(100, 999)
    part3 = random.randint(1000, 9999)

    phone_number = f"{part1}-{part2}-{part3}"
    return phone_number

data = []
for i in range(1, 10001):
    gender = random_gender()
    first_name = fake.first_name()
    if gender == 'm': first_name = fake.first_name_male()
    if gender == 'f': first_name = fake.first_name_female()

    last_name = fake.last_name()
    dob = fake.date_of_birth(minimum_age=18, maximum_age=65)
    email = f"{first_name.lower()}.{last_name.lower()}@{random_email_domain()}"
    phone = generate_phone_number()
    socials = generate_socials(first_name, last_name)
    pwd = generate_password()
    data.append([i, first_name, last_name, dob, gender, email, phone, socials, pwd])

df = pd.DataFrame(data, columns=['uid', 'first_name', 'last_name', 'dob', 'gender', 'email', 'phone', 'socials', 'pwd'])

csv_path = "../data/prod/user.csv"
df.to_csv(csv_path, index=False)

