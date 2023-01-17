
# Spotify Genre Tracker
## About
This is a web app that utilizes the Spotify api, which will analyze the user's last 50 songs. The web app will analyze what genres that user has listened to. The web app is created with react JS, and for the UI I used

## Inital Idea
Using the Spotify API, it is possible to create a visual analyzer that allows users to see insights and statistics about their past 50 songs. This can include information such as the most common artist, genre, or decade of the songs in their history. The visual analyzer can also display this data in a graphical format, such as a pie chart or bar graph, making it easy for users to understand and interpret the data. This can be a useful tool for music lovers who want to learn more about their listening habits and discover new music based on their past listening history. Additionally, the visual analyzer can be customized to allow users to filter their song history by specific criteria, such as a specific time period or genre, to get a more detailed understanding of their music preferences.

## Features
* Connect to user's spotify profile using OAuth
* Track genre of the past 50 songs listened
* Display data in bar / line graph
* Has an in browser player to play songs

## Limitation
Although the spotify Api is really good and has a lot of functions, they were still limited. For instance, when trying to analyize the users past 50 songs, there wasn't an API call for the song genre. One way around this problem was using the Artists' set genre that they have on their profile page. This method limited since most Artists release differnt types of genres, this could represent the data.

## Video Demo
https://youtu.be/U2ZeakluUYc

## Images
![Example 1](./gitImages/1.jpg)
![Example 1](./gitImages/2.jpg)

## How to use
Clone the repository
```
yarn add
yarn start
```
