\echo 'Delete and recreate exploreio.sql?'

\prompt 'Return for yes, CTRC+C for cancel' answer

DROP DATABASE exploreio;
CREATE DATABASE exploreio;
\connect exploreio;

\i exploreio-schema.sql