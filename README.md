# url_shortener
![img](https://drive.google.com/uc?export=view&id=1OgHfLByZ-r1T5DLX6AwPvthObBW4N5D_)

# Description
A simple URL shortener by hashing the original url using md5 then took the first 5 letter and store it on mysql

# Requirement
1. node.js & npm
2. mysql

# How to use
1. Clone repository  
``git clone https://github.com/W-ptra/url_shortener.git``
2. Edit ``.env`` file
![img](https://drive.google.com/uc?export=view&id=16fe0TmknoY6HZgIskv0OWh2W_afbPSnP)
replace ``host``,``port``,``user``,``password``,``database`` with your actual mysql credential  
3. Run  
``npm install`` on terminal
4. Run  
``node .`` on terminal
5. Open browser
& insert url   ``http://localhost:8080``