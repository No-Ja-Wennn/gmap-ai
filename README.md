# GMAP-AI project
- Developed by with 7 member: Quyen, Truong, Van, Tu, Tien, Dat, Phuc.
- This project used Django for Back-end, Reactjs for Front-end and Mongodb database.
- Algorithm: **hill-climbing search**.


## Below is step by step to download and run this project.
### 1. Download project.
```bash
git clone https://github.com/No-Ja-Wennn/gmap-ai.git
```

### 2. Setup database
You should install MongoDB Compass in this [link](https://www.mongodb.com/try/download/shell) and install.

You can watch [this video](https://youtu.be/cojUxpMXH7A?si=lf6hUelOz3XbEV_W) to setup environment.

Access model\tinh_thanh_viet_nam.json and copy content.

Back to MongoDB Compass and create database name "AI" and Collection Name "locations".

*Add data => insert document => paste content just copied.*
### 3. Run project
Back to vs code and open terminal.
```bash
cd controller

pip install django corsheaders  pymongo django-cors-headers 

python manage.py runserver
```

Try it!