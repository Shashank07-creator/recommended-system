

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

d=[]
movie_user_likes =input("Enter user movie\t").rstrip().split(",")



def get_title_from_index(index):
	return df[df.index == index]["title"].values[0]

def get_index_from_title(title):
	return df[df.title == title]["index"].values[0]

df = pd.read_csv("C:\\Users\\Shashank\\Desktop\\project\\Introduction-to-Machine-Learning-cb5e9badfffb36e67b74e1a59f3e44d112ee6cdb\\Building a Movie Recommendation Engine\\movie_dataset.csv")
features = ['keywords','cast','genres','director']
for feature in features:
    df[feature] = df[feature].fillna('')

for i in movie_user_likes:
    if i in df['title'].values:
        d.append(i)
    else:
        print(i, " Error 404 \n")
    
    
def combine_features(row):
    try:
        return row['keywords'] +" "+row['cast']+" "+row["genres"]+" "+row["director"]
    except:
    	print("Error:", row	)

def predict_movies():
    l=[]    
    for j in d:
        
        
        
        df["combined_features"] = df.apply(combine_features,axis=1)
        cv = CountVectorizer()
        
        count_matrix = cv.fit_transform(df["combined_features"])
        cosine_sim = cosine_similarity(count_matrix) 
        
        movie_index = get_index_from_title(j)
        
        similar_movies =  list(enumerate(cosine_sim[movie_index]))
        
        sorted_similar_movies = sorted(similar_movies,key=lambda x:x[1],reverse=True)
        
        
        i=0
        for element in sorted_similar_movies:
        		l.append(get_title_from_index(element[0]))
        		i=i+1
        		if i>50:
        			break
        return l

print(predict_movies())
'''
for i in movie_user_likes:
    if i in df['keywords']:
        pass
    print(predict_movies(i))
'''    
