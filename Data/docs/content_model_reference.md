# Content Model Reference

* [Excel](/dictionary/30.1/excel/content_model_reference.html)
* [Text](/dictionary/30.1/text/content_model_reference.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/content_model_reference.html)
* [Oracle](/dictionary/30.1/oracle/content_model_reference.html)

| **Purpose:** | Provide O*NET Content Model elements. |
| **Table Name:** | content_model_reference |
| **Download:** | [01_content_model_reference.sql](/dl_files/database/db_30_1_mysql/01_content_model_reference.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position |
| element_name | Character Varying(150) | Content Model Element Name |
| description | Character Varying(1500) | Content Model Element Description |

This file contains the Content Model elements and descriptions. The file is displayed in three tab delimited fields with the columns named Element ID, Element Name, and Description. The three fields are represented by one row. There are a total of 630 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 - 30.1 | No structure changes |

### Data Example - content_model_reference:

| element_id | element_name | description |
| --- | --- | --- |
| 1 | Worker Characteristics | Worker Characteristics |
| 1.A | Abilities | Enduring attributes of the individual that influence performance |
| 1.A.1 | Cognitive Abilities | Abilities that influence the acquisition and application of knowledge in problem solving |
| 1.A.1.a | Verbal Abilities | Abilities that influence the acquisition and application of verbal information in problem solving |
| 1.A.1.a.1 | Oral Comprehension | The ability to listen to and understand information and ideas presented through spoken words and sentences. |