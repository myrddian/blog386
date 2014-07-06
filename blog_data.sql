--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.0
-- Dumped by pg_dump version 9.3.1
-- Started on 2014-07-06 19:57:13 EST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 2285 (class 0 OID 24852)
-- Dependencies: 176
-- Data for Name: blog_comment; Type: TABLE DATA; Schema: public; Owner: myrddian
--



--
-- TOC entry 2313 (class 0 OID 0)
-- Dependencies: 175
-- Name: blog_comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myrddian
--

SELECT pg_catalog.setval('blog_comment_comment_id_seq', 1, false);


--
-- TOC entry 2288 (class 0 OID 24884)
-- Dependencies: 179
-- Data for Name: blog_config; Type: TABLE DATA; Schema: public; Owner: myrddian
--

INSERT INTO blog_config VALUES ('My Blog', '386', 'dd/mm/yyyy', 10, 'Welcome to my blog');


--
-- TOC entry 2292 (class 0 OID 82602)
-- Dependencies: 183
-- Data for Name: blog_page; Type: TABLE DATA; Schema: public; Owner: myrddian
--

INSERT INTO blog_page VALUES (1, 'About', 'This blog is a sample blog of what this engine can do', 'Admin', 'about');


--
-- TOC entry 2314 (class 0 OID 0)
-- Dependencies: 182
-- Name: blog_page_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myrddian
--

SELECT pg_catalog.setval('blog_page_page_id_seq', 1, false);


--
-- TOC entry 2283 (class 0 OID 24841)
-- Dependencies: 174
-- Data for Name: blog_post; Type: TABLE DATA; Schema: public; Owner: myrddian
--


INSERT INTO blog_post VALUES (1, 'First new actual Post', 'admin', '2014-07-05', 1, 'A New Post');


--
-- TOC entry 2315 (class 0 OID 0)
-- Dependencies: 173
-- Name: blog_post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myrddian
--

SELECT pg_catalog.setval('blog_post_post_id_seq', 4, true);


--
-- TOC entry 2287 (class 0 OID 24873)
-- Dependencies: 178
-- Data for Name: blog_user; Type: TABLE DATA; Schema: public; Owner: myrddian
--

INSERT INTO blog_user VALUES (1, 'admin', '704c5097fc0d5d1490c0fdba01ad8199c977857845886a2e43cb07cf23cab8f9', 'admin@test.com', 1, '1381283719372');

--
-- TOC entry 2316 (class 0 OID 0)
-- Dependencies: 177
-- Name: blog_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myrddian
--

SELECT pg_catalog.setval('blog_user_user_id_seq', 2, true);


--
-- TOC entry 2290 (class 0 OID 82585)
-- Dependencies: 181
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: myrddian
--

SET search_path = web, pg_catalog;

--
-- TOC entry 2289 (class 0 OID 82276)
-- Dependencies: 180
-- Data for Name: session; Type: TABLE DATA; Schema: web; Owner: myrddian
--



-- Completed on 2014-07-06 19:57:14 EST

--
-- PostgreSQL database dump complete
--

