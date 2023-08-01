CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE destinations (
    destinationid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating FLOAT,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    back_url TEXT NOT NULL,
    region VARCHAR(2) NOT NULL,
    country VARCHAR(50) NOT NULL,
    airlines VARCHAR(10) NOT NULL,
    cost_level VARCHAR(4) NOT NULL
);

CREATE TABLE destination_info (
    destinationinfoid SERIAL PRIMARY KEY,
    destinationid INT,
    information TEXT NOT NULL,
    CONSTRAINT fk_destinations
        FOREIGN KEY(destinationid)
            REFERENCES destinations(destinationid)
);

CREATE TABLE favorites (
    favoriteid SERIAL PRIMARY KEY,
    userid INT,
    destinationid INT,
    name VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    rating FLOAT,
    region VARCHAR(2),
    country VARCHAR(25),
    CONSTRAINT fk_users
        FOREIGN KEY(userid)
            REFERENCES users(id)
);

CREATE TABLE activities (
    activityid SERIAL PRIMARY KEY,
    favoriteid INT,
    activityinfo TEXT NOT NULL,
    CONSTRAINT fk_activities
        FOREIGN KEY(favoriteid)
            REFERENCES favorites(favoriteid)
);