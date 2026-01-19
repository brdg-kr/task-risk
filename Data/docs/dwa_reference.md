# DWA Reference

* [Excel](/dictionary/30.1/excel/dwa_reference.html)
* [Text](/dictionary/30.1/text/dwa_reference.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/dwa_reference.html)
* [Oracle](/dictionary/30.1/oracle/dwa_reference.html)

| **Purpose:** | Provide each Detailed Work Activity. |
| **Table Name:** | dwa_reference |
| **Download:** | [24_dwa_reference.sql](/dl_files/database/db_30_1_mysql/24_dwa_reference.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| iwa_id | Character Varying(20) | Identifies each Intermediate Work Activity *(see [*IWA Reference*](iwa_reference.html "IWA Reference"))* |
| dwa_id | Character Varying(20) | Identifies each Detailed Work Activity |
| dwa_title | Character Varying(150) | Detailed Work Activity statement |

This file contains each Detailed Work Activity and its corresponding GWA and IWA identifiers. Each DWA is linked to exactly one IWA, which in turn is linked to exactly one Work Activity from the O*NET Content Model. See [*Content Model Reference*](content_model_reference.html "Content Model Reference") and [*IWA Reference*](iwa_reference.html "IWA Reference") for information about these higher-level elements. Each DWA is linked to multiple task statements; see [*Tasks to DWAs*](tasks_to_dwas.html "Tasks to DWAs") for these links.

The file is displayed in four tab delimited fields with the columns named Element ID, IWA ID, DWA ID, and DWA Title. The four fields are represented by one row. There are a total of 2,087 rows of data in this file.

For more information, see:
* [O*NET Work Activities Project Technical Report](https://www.onetcenter.org/reports/DWA_2014.html)
* [Ranking Detailed Work Activities (DWAs) Within O*NET® Occupational Profiles](https://www.onetcenter.org/reports/DWA_Ranking.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 18.1 | Added as a new file |
| 19.0 - 30.1 | No structure changes |

### Data Example - dwa_reference:

| element_id | iwa_id | dwa_id | dwa_title |
| --- | --- | --- | --- |
| 4.A.1.a.1 | 4.A.1.a.1.I01 | 4.A.1.a.1.I01.D01 | Review art or design materials. |
| 4.A.1.a.1 | 4.A.1.a.1.I01 | 4.A.1.a.1.I01.D02 | Study details of musical compositions. |
| 4.A.2.b.2 | 4.A.2.b.2.I14 | 4.A.2.b.2.I14.D06 | Design control systems for mechanical or other equipment. |
| 4.A.4.b.6 | 4.A.4.b.6.I09 | 4.A.4.b.6.I09.D03 | Advise others on health and safety issues. |