# Survey Booklet Locations

* [Excel](/dictionary/30.1/excel/survey_booklet_locations.html)
* [Text](/dictionary/30.1/text/survey_booklet_locations.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/survey_booklet_locations.html)
* [Oracle](/dictionary/30.1/oracle/survey_booklet_locations.html)

| **Purpose:** | Provide survey item numbers for O*NET Content Model elements. |
| **Table Name:** | survey_booklet_locations |
| **Download:** | [08_survey_booklet_locations.sql](/dl_files/database/db_30_1_mysql/08_survey_booklet_locations.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| survey_item_number | Character Varying(5) | Survey Booklet Location Number |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |

This file contains the Content Model elements that have corresponding survey item numbers in the Survey Booklet. Each survey item number corresponds to a survey question in the [O*NET Questionnaires](https://www.onetcenter.org/ombclearance.html). The values for incumbent data categories are percentage ratings corresponding to survey question options. Match the element ID(s) from data files to a survey item number using this file.

The file is displayed in three tab delimited fields with the columns named Element ID, Survey Item Number, and Scale ID. The three fields are represented by one row. There are a total of 211 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Added as a new file |
| 5.1 - 12.0 | No structure changes |
| 13.0 | Added Scale ID column |
| 14.0 - 29.1 | No structure changes |
| 29.2 | Survey Item Number expanded from 4 characters to 5 |
| 29.3 - 30.1 | No structure changes |

### Data Example - survey_booklet_locations:

| element_id | survey_item_number | scale_id |
| --- | --- | --- |
| 2.C.1.a | KN01 | IM |
| 2.C.1.a | KN01b | LV |
| 2.C.1.b | KN02 | IM |
| 2.C.1.b | KN02b | LV |
| 2.C.1.c | KN03 | IM |
| 2.C.1.c | KN03b | LV |