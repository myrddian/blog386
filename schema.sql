CREATE TABLE blog_comment
(
    comment_id INT PRIMARY KEY NOT NULL,
    post_id INT NOT NULL,
    comment VARCHAR NOT NULL,
    comment_date DATE NOT NULL
);
CREATE TABLE blog_comment_comment_id_seq
(
    sequence_name VARCHAR NOT NULL,
    last_value BIGINT NOT NULL,
    start_value BIGINT NOT NULL,
    increment_by BIGINT NOT NULL,
    max_value BIGINT NOT NULL,
    min_value BIGINT NOT NULL,
    cache_value BIGINT NOT NULL,
    log_cnt BIGINT NOT NULL,
    is_cycled BOOL NOT NULL,
    is_called BOOL NOT NULL
);
CREATE TABLE blog_config
(
    blog_name VARCHAR DEFAULT 'My Blog' NOT NULL,
    blog_theme VARCHAR DEFAULT 'twitter_386' NOT NULL,
    blog_date_format VARCHAR DEFAULT 'DD/MM/YYYY' NOT NULL,
    blog_display_amount INT DEFAULT 10 NOT NULL,
    blog_welcome_text VARCHAR DEFAULT 'Welcome to my blog' NOT NULL
);
CREATE TABLE blog_page
(
    page_id INT PRIMARY KEY NOT NULL,
    page_title VARCHAR DEFAULT 'Default Title' NOT NULL,
    page_content VARCHAR DEFAULT 'Kallisti!' NOT NULL,
    page_author VARCHAR DEFAULT 'Admin' NOT NULL,
    page_url VARCHAR DEFAULT 'about' NOT NULL
);
CREATE TABLE blog_page_page_id_seq
(
    sequence_name VARCHAR NOT NULL,
    last_value BIGINT NOT NULL,
    start_value BIGINT NOT NULL,
    increment_by BIGINT NOT NULL,
    max_value BIGINT NOT NULL,
    min_value BIGINT NOT NULL,
    cache_value BIGINT NOT NULL,
    log_cnt BIGINT NOT NULL,
    is_cycled BOOL NOT NULL,
    is_called BOOL NOT NULL
);
CREATE TABLE blog_post
(
    post_id INT PRIMARY KEY NOT NULL,
    post_content VARCHAR NOT NULL,
    user_post VARCHAR NOT NULL,
    post_date DATE NOT NULL,
    user_id INT NOT NULL,
    post_title VARCHAR DEFAULT 'Example Post' NOT NULL
);
CREATE TABLE blog_post_post_id_seq
(
    sequence_name VARCHAR NOT NULL,
    last_value BIGINT NOT NULL,
    start_value BIGINT NOT NULL,
    increment_by BIGINT NOT NULL,
    max_value BIGINT NOT NULL,
    min_value BIGINT NOT NULL,
    cache_value BIGINT NOT NULL,
    log_cnt BIGINT NOT NULL,
    is_cycled BOOL NOT NULL,
    is_called BOOL NOT NULL
);
CREATE TABLE blog_user
(
    user_id INT PRIMARY KEY NOT NULL,
    user_name VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    user_email VARCHAR NOT NULL,
    user_state INT NOT NULL,
    user_salt VARCHAR NOT NULL
);
CREATE TABLE blog_user_user_id_seq
(
    sequence_name VARCHAR NOT NULL,
    last_value BIGINT NOT NULL,
    start_value BIGINT NOT NULL,
    increment_by BIGINT NOT NULL,
    max_value BIGINT NOT NULL,
    min_value BIGINT NOT NULL,
    cache_value BIGINT NOT NULL,
    log_cnt BIGINT NOT NULL,
    is_cycled BOOL NOT NULL,
    is_called BOOL NOT NULL
);
CREATE TABLE session
(
    sid VARCHAR PRIMARY KEY NOT NULL,
    sess json NOT NULL,
    expire TIMESTAMP NOT NULL
);
CREATE UNIQUE INDEX unique_comment_id ON blog_comment ( comment_id );
CREATE UNIQUE INDEX unique_post_id ON blog_comment ( post_id );
CREATE UNIQUE INDEX unique_page_id ON blog_page ( page_id );
CREATE UNIQUE INDEX unique_page_url ON blog_page ( page_url );
CREATE UNIQUE INDEX unique_user_id ON blog_user ( user_id );


