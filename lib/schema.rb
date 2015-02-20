CREATE DATABASE allegro_app;

CREATE TABLE pieces (id serial primary key, composer text, title text, mood_id integer, info text, url text);
CREATE TABLE moods (id serial primary key, name text);
CREATE TABLE users (id serial primary key, username text, password text);
CREATE TABLE events (id serial primary key, event_name text, venue_name text, neighborhood text, street_address text, telephone integer, web_description text, postal_code integer, venue_detail_url text); 
CREATE TABLE favorites (id serial primary key, user_id integer, event_id integer);
ALTER TABLE events ADD COLUMN date_time_description text NOT NULL DEFAULT 'blah';
ALTER TABLE events ALTER COLUMN date_time_description DROP DEFAULT;
ALTER TABLE events ADD COLUMN event_api_id integer NOT NULL DEFAULT 1;
ALTER TABLE events ALTER COLUMN event_api_id DROP DEFAULT;


INSERT INTO moods (name) VALUES ('Uplifting');
INSERT INTO moods (name) VALUES ('Worry');
INSERT INTO moods (name) VALUES ('Inquisition');
INSERT INTO moods (name) VALUES ('Anger');
INSERT INTO moods (name) VALUES ('Glee');
INSERT INTO moods (name) VALUES ('Depression');
INSERT INTO moods (name) VALUES ('Death');

INSERT INTO pieces (composer, title, mood_id, info, url) VALUES ('Johannes Brahms', 'Symphony no. 4 (I)', 2, 'The Symphony No. 4 in E minor, Op. 98 by Johannes Brahms is the last of his symphonies. Brahms began working on the piece inMürzzuschlag, then in the Austro-Hungarian Empire, in 1884, just a year after completing his Symphony No. 3, and completed it in 1885.', 'http://www.youtube.com/embed/LY2BJYBw7TM?start=57&autoplay=1&autohide=1');
INSERT INTO pieces (composer, title, mood_id, info, url) VALUES ('Sergei Rachmaninoff', 'Piano Concerto no. 2 (I)', 1, 'At its 1897 premiere, Rachmaninoffs first symphony, though now considered a significant achievement, was derided by contemporary critics. Compounded by problems in his personal life, Rachmaninoff fell into a depression that lasted for several years. His second piano concerto confirmed his recovery from clinical depression and writers block, cured only by a course of hypnotherapy. The concerto was dedicated to Nikolai Dahl, a physician who had done much to restore Rachmaninoffs self-confidence.', 'http://www.youtube.com/embed/rEGOihjqO9w?start=8&autoplay=1&autohide=1');
INSERT INTO pieces (composer, title, mood_id, info, url) VALUES ('Dmitri Shostakovich', 'Piano Trio no. 2 op. 67', 4, 'The composition was dedicated to Shostakovichs good friend, Ivan Sollertinsky, a Russian polymath and avid musician, who had recently died at age 41. The work received its premiere in Leningrad on 14 November 1944. The piece consists of four movements, with a complete performance running 25 to 27 minutes.', 'http://www.youtube.com/embed/upNuCeu3nes?start=38&autoplay=1&autohide=1');
INSERT INTO pieces (composer, title, mood_id, info, url) VALUES ('Dmitri Shostakovich', 'String Quartet no. 8 (IV)', 7, 'The piece was written shortly after two traumatic events in the life of the composer: the first presentation of debilitating muscular weakness that would eventually be diagnosed asamyotrophic lateral sclerosis,and his reluctant joining of the Communist Party. According to the score, it is dedicated to the victims of fascism and war; his son, Maxim, interprets this as a reference to the victims of all totalitarianism, while his daughter Galina says that he dedicated it to himself, and that the published dedication was imposed by the Russian authorities. Shostakovichs friend, Lev Lebedinsky, said that Shostakovich thought of the work as his epitaph and that he planned to commit suicide around this time.', 'http://www.youtube.com/embed/hBp8gBYpUdM?start=1&autoplay=1&autohide=1');
INSERT INTO pieces (composer, title, mood_id, info, url) VALUES ('Franz Schubert', 'Symphony no. 8', 3, 'Franz Schuberts Symphony No. 8 in B minor, D.759 (sometimes renumbered as Symphony No. 7, in accordance with the revised Deutsch catalogue and the Neue Schubert-Ausgabe), commonly known as the Unfinished Symphony (German: Unvollendete), is a work that Schubert started in 1822 but left with only two movements—though Schubert lived for another six years. A scherzo, nearly completed in piano score but with only two pages orchestrated, also survives.', 'http://www.youtube.com/embed/hHfy1K8ClFc?start=27&autoplay=1&autohide=1');
INSERT INTO pieces(composer, title, mood_id, info, url) VALUES ('Ludwig Van Beethoven', 'Symphony no. 7 (II)', 6, 'The Symphony No. 7 in A major, Op. 92, is a symphony in four movements composed by Ludwig van Beethoven between 1811 and 1812, while improving his health in the Bohemian spa town of Teplice. The work is dedicated to Count Moritz von Fries. At its premiere, Beethoven was noted as remarking that it was one of his best works. The second movement, Allegretto, was the most popular movement and had to be encored. The instant popularity of the Allegretto resulted in its frequent performance separate from the complete symphony.', 'http://www.youtube.com/embed/KbNGklNz8Yk?start=19&autoplay=1&autohide=1');
INSERT INTO pieces (composer, title, mood_id, info, url) VALUES ('Joseph Haydn', 'Cello Concerto C Major (III)', 5, 'The Cello Concerto No. 1 in C Major, Hob. VIIb/1, by Joseph Haydn was composed around 1761-65 for longtime friend Joseph Franz Weigl, then the principal cellist of Prince Nicolaus Esterházy Orchestra. The work was presumed lost until 1961, when musicologist Oldřich Pulkert discovered a copy of the score at the Prague National Museum.Though some doubts have been raised about the authenticity of the work, most experts believe that Haydn did compose this concerto.', 'http://www.youtube.com/embed/ArOX-AGVMGM?start=2&autoplay=1&autohide=1');

