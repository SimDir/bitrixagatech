DELETE FROM b_user_option WHERE NAME like '~gadgets_sonet_group%';
DELETE FROM b_user_option WHERE NAME like '~gadgets_sonet_user%';
DROP TABLE if exists b_sonet_group_subject;
DROP TABLE if exists b_sonet_group_subject_site;
DROP TABLE if exists b_sonet_group;
DROP TABLE if exists b_sonet_group_site;
DROP TABLE if exists b_sonet_user2group;
DROP TABLE if exists b_sonet_features;
DROP TABLE if exists b_sonet_features2perms;
DROP TABLE if exists b_sonet_user_relations;
DROP TABLE if exists b_sonet_messages;
DROP TABLE if exists b_sonet_smile;
DROP TABLE if exists b_sonet_smile_lang;
DROP TABLE if exists b_sonet_user_perms;
DROP TABLE if exists b_sonet_user_events;
DROP TABLE if exists b_sonet_log;
DROP TABLE if exists b_sonet_log_site;
DROP TABLE if exists b_sonet_log_comment;
DROP TABLE if exists b_sonet_log_events;
DROP TABLE if exists b_sonet_event_user_view;
DROP TABLE if exists b_sonet_log_right;
DROP TABLE if exists b_sonet_log_page;
DROP TABLE if exists b_sonet_log_follow;
DROP TABLE if exists b_sonet_log_smartfilter;
DROP TABLE if exists b_sonet_log_counter;
DROP TABLE if exists b_sonet_log_favorites;
DROP TABLE if exists b_sonet_subscription;
DROP TABLE if exists b_sonet_log_view;
DROP TABLE if exists b_sonet_log_index;
DROP TABLE if exists b_sonet_user_content_view;
DROP TABLE if exists b_sonet_log_tag;
DROP TABLE if exists b_sonet_group_favorites;
DROP TABLE if exists b_sonet_group_view;
DROP TABLE if exists b_sonet_user_tag;
DROP TABLE if exists b_sonet_group_tag;