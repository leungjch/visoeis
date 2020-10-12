
# Visoeis | Integer Sequence Visualization
Fetches integer sequences from the Online Encyclopedia of Integer Sequences (OEIS) and plots them using D3.js. Options to view a specific sequence or fetch a random sequence, and to view in linear/logarithmic scale.

Most of the sequences look like linear, logarithmic, or exponential functions, but every now and then you'll get something exotic looking!

Each sequence entry in OEIS does have a "graph" feature, but I found that it loads rather slowly, and it generates a raster image. Visoeis lets you find interesting sequences instantly. 

A simple weekend project built with React. The OEIS website seems to not allow Ajax requests, so I had to go around it using [cors-anyhere](https://cors-anywhere.herokuapp.com/), which I cloned to run on a Heroku dyno. Because the Heroku server sleeps, **the app may take several seconds to load at first, so please wait.**