import pandas as pd 

df1 = pd.read_csv('../data/kaggle_data/world_cities.csv')
df2 = pd.read_csv('../data/kaggle_data/country_codes.csv')

new_df1 = df1[['iso2', 'city']]
new_df2 = df2[['country-code','name']]

new_df1.to_csv('../data/prod/countries.csv', index=False)
new_df2.to_csv('../data/prod/locations.csv', index=True)
