import csv
import random
from datetime import datetime, timedelta

MAX_ACTIVITES = 10
NUM_TRIPS = 1000

adjectives = [
    'Adventurous', 'Serene', 'Picturesque', 'Tranquil', 'Majestic',
    'Vibrant', 'Lush', 'Enchanting', 'Quaint', 'Idyllic',
    'Magical', 'Breathtaking', 'Captivating', 'Exotic', 'Pristine',
    'Romantic', 'Rustic', 'Whimsical', 'Ethereal', 'Blissful',
    'Thrilling', 'Mystical', 'Charming', 'Secluded', 'Surreal',
    'Fascinating', 'Dazzling', 'Enigmatic', 'Epic', 'Hidden',
    'Spectacular', 'Tranquil', 'Wonderful', 'Unique', 'Legendary',
    'Ancient', 'Serendipitous', 'Secret', 'Wild', 'Harmonious',
    'Playful', 'Curious', 'Timeless', 'Dreamy', 'Peaceful',
    'Delightful', 'Spiritual', 'Glorious', 'Mysterious', 'Sparkling',
    'Enchanted', 'Alluring', 'Remote', 'Cultural', 'Joyful',
    'Magical', 'Mystic', 'Divine', 'Grand', 'Enlightening',
    'Solitary', 'Cosy', 'Vivid', 'Majestic', 'Glistening',
    'Gentle', 'Calm', 'Refreshing', 'Energetic', 'Dynamic',
    'Invigorating', 'Lively', 'Panoramic', 'Radiant', 'Heavenly',
    'Inspiring', 'Thrilling', 'Soothing', 'Fantastic', 'Cherished',
    'Historic', 'Sunny', 'Captivating', 'Epic', 'Spectacular',
    'Fascinating', 'Tranquil', 'Bustling', 'Exquisite', 'Vibrant'
]

nouns = [
    'Beach', 'Mountain', 'City', 'Forest', 'Lake',
    'Island', 'Valley', 'Countryside', 'Village', 'Desert',
    'Glacier', 'Waterfall', 'Canyon', 'Cave', 'Jungle',
    'Oasis', 'Vineyard', 'Ranch', 'Castle', 'Temple',
    'Ruins', 'Coast', 'Meadow', 'Reef', 'Safari',
    'Archipelago', 'Plateau', 'Estuary', 'Harbor', 'Fjord',
    'Highlands', 'Lowlands', 'Volcano', 'Lagoon', 'Marsh',
    'Pond', 'Resort', 'Reserve', 'Sanctuary', 'Falls',
    'Promenade', 'Garden', 'Park', 'Square', 'Plaza',
    'Boulevard', 'Market', 'Bazaar', 'Avenue', 'Pathway',
    'Trail', 'Walkway', 'Lane', 'Route', 'Thoroughfare',
    'Waters', 'Depths', 'Gulf', 'Sound', 'Strait',
    'Inlet', 'Bay', 'Cove', 'Creek', 'Stream',
    'River', 'Estuary', 'Delta', 'Brook', 'Pond',
    'Loch', 'Swamp', 'Quarry', 'Crag', 'Moor',
    'Dunes', 'Barrens', 'Tundra', 'Glade', 'Woodland',
    'Prairie', 'Plain', 'Savanna', 'Steppe', 'Taiga',
    'Rainforest', 'Ecosystem', 'Environment', 'Biosphere', 'Habitat'
]

activities = [
    'Exploring the {noun}',
    'Relaxing on the {noun}',
    'Hiking through the {noun}',
    'Visiting {noun} attractions',
    'Enjoying the {noun} scenery',
    'Dining in local {noun} restaurants',
    'Swimming in the {noun}',
    'Camping in the {noun}',
    'Skiing in the {noun}',
    'Sightseeing around the {noun}',
    'Cycling through the {noun}',
    'Kayaking in the {noun}',
    'Trekking through the {noun}',
    'Birdwatching in the {noun}',
    'Snorkeling in the {noun}',
    'Photography of {noun}',
    'Exploring the culture of {noun}',
    'Sampling {noun} cuisine',
    'Horseback riding in the {noun}',
    'Shopping in {noun}',
    'Discovering {noun} history',
    'Cruising along the {noun}',
    'Sailing in the {noun}',
    'Fishing in the {noun}',
    'Yoga retreat in the {noun}',
    'Relaxing at a {noun} spa',
    'Attending {noun} festivals',
    'Scuba diving in the {noun}',
    'Hot air ballooning over {noun}',
    'Rock climbing in the {noun}',
    'Paragliding above {noun}',
    'Watching wildlife in the {noun}',
    'Exploring ancient {noun}',
    'Wine tasting in {noun}',
    'Surfing in the {noun}',
    'Exploring local {noun} markets',
    'Stargazing in the {noun}',
    'Learning about {noun} traditions',
    'Rafting in the {noun}',
    'Enjoying {noun} sunsets',
    'Canyoning in {noun}',
    'Zip-lining through the {noun}',
    'Visiting artisan {noun}',
    'Participating in {noun} workshops',
    'Birdwatching in the {noun}',
    'Climbing {noun} peaks',
    'Whale watching in the {noun}',
    'Exploring hidden {noun}',
    'Visiting sacred {noun}',
    'Harvesting {noun}'
]

def generate_trip_bio():
    random_adjective = random.choice(adjectives)
    random_noun = random.choice(nouns)
    return f"{random_adjective} {random_noun} Trip"

def random_dates():
    min_date = datetime.strptime('2024-01-01', '%Y-%m-%d')
    max_date = datetime.strptime('2024-12-31', '%Y-%m-%d')
    delta = max_date - min_date
    random_start_offset = random.randint(0, delta.days)
    start_date = min_date + timedelta(days=random_start_offset)
    end_date = start_date + timedelta(days=random.randint(1,30))
    return (start_date, end_date)

def generate_data():
    trip_data = []
    activity_data = []
    locations = [lid for lid in range(1,100)] # only using the first 100 locations
    
    for tid in range(1,NUM_TRIPS+1):
        lid = random.choice(locations)
        bio = generate_trip_bio()
        start_date, end_date = random_dates()
        trip_data.append((tid, lid, bio, start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')))

        # generate activities
        for a_no in range(1,random.randint(1,MAX_ACTIVITES)):
            random_noun = random.choice(nouns)
            a_description = random.choice(activities).format(noun=random_noun)

            delta = end_date - start_date
            day_offset = random.randint(0, delta.days)
            dte = start_date + timedelta(days=day_offset)
            activity_data.append((tid, a_no, a_description, dte.strftime('%Y-%m-%d')))

    
    return (trip_data, activity_data)

def write_to_csv(filename, header, data):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(data)

trip_data, activity_data = generate_data()

csv_filename = '../data/prod/trips.csv'

write_to_csv('../data/prod/trips.csv', ['tid', 'lid', 'bio', 'start_date', 'end_date'], trip_data)
write_to_csv('../data/prod/activities.csv', ['tid', 'a_no', 'a_description', 'dte'], activity_data)
