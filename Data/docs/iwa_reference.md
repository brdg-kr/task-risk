# IWA Reference

* [Excel](/dictionary/30.1/excel/iwa_reference.html)
* [Text](/dictionary/30.1/text/iwa_reference.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/iwa_reference.html)
* [Oracle](/dictionary/30.1/oracle/iwa_reference.html)

| **Purpose:** | Provide each Intermediate Work Activity. |
| **Table Name:** | iwa_reference |
| **Download:** | [23_iwa_reference.sql](/dl_files/database/db_30_1_mysql/23_iwa_reference.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| iwa_id | Character Varying(20) | Identifies each Intermediate Work Activity |
| iwa_title | Character Varying(150) | Intermediate Work Activity statement |

This file contains each Intermediate Work Activity and its corresponding O*NET Work Activity element ID. Every IWA is linked to exactly one Work Activity from the O*NET Content Model. IWAs are linked to one or more DWAs; see the [*DWA Reference*](dwa_reference.html "DWA Reference") file for these links.

The file is displayed in three tab delimited fields with the columns named Element ID, IWA ID, and IWA Title. The three fields are represented by one row. There are a total of 332 rows of data in this file.

For more information, see:
* [O*NET Work Activities Project Technical Report](https://www.onetcenter.org/reports/DWA_2014.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 18.1 | Added as a new file |
| 19.0 - 30.1 | No structure changes |

### Data Example - iwa_reference:

| element_id | iwa_id | iwa_title |
| --- | --- | --- |
| 4.A.1.a.1 | 4.A.1.a.1.I01 | Study details of artistic productions. |
| 4.A.1.a.1 | 4.A.1.a.1.I02 | Read documents or materials to inform work processes. |
| 4.A.2.b.2 | 4.A.2.b.2.I14 | Design industrial systems or equipment. |
| 4.A.4.c.2 | 4.A.4.c.2.I01 | Perform recruiting or hiring activities. |