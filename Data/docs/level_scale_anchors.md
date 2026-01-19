# Level Scale Anchors

* [Excel](/dictionary/30.1/excel/level_scale_anchors.html)
* [Text](/dictionary/30.1/text/level_scale_anchors.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/level_scale_anchors.html)
* [Oracle](/dictionary/30.1/oracle/level_scale_anchors.html)

| **Purpose:** | Provide descriptions of O*NET Level Scale Anchors. |
| **Table Name:** | level_scale_anchors |
| **Download:** | [06_level_scale_anchors.sql](/dl_files/database/db_30_1_mysql/06_level_scale_anchors.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| anchor_value | Decimal(3,0) | Anchor value associated with element |
| anchor_description | Character Varying(1000) | Detail description of anchor associated with element |

This file contains the scale anchors associated with the following four content areas – 1) Abilities, 2) Knowledge, 3) Skills, and 4) Work Activities. It includes all scale anchors utilized in the data collection survey where the scale anchors are variable and item specific. Scale anchors are not included for those survey items where the scale anchors are fixed. This includes the five-point importance scale and the seven-point task frequency scale. (Note: See [O*NET Data Questionnaires](https://www.onetcenter.org/ombclearance.html)).

The file is displayed in four tab delimited fields with the columns named Element ID, Scale ID, Anchor Value, and Anchor Description. The four fields are represented by one row. There are a total of 483 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.1 | Added as a new file |
| 6.0 | Added Scale ID column |
| 7.0 - 8.0 | No structure changes |
| 9.0 | The data for Education, Training, and Experience and Work Context were moved into their own files for data clarity purposes. |
| 10.0 - 30.1 | No structure changes |

### Data Example - level_scale_anchors:

| element_id | scale_id | anchor_value | anchor_description |
| --- | --- | --- | --- |
| 1.A.1.a.1 | LV | 2 | Understand a television commercial |
| 1.A.1.a.1 | LV | 4 | Understand a coach's oral instructions for a sport |
| 1.A.1.a.1 | LV | 6 | Understand a lecture on advanced physics |
| 1.A.1.a.2 | LV | 2 | Understand signs on the highway |
| 1.A.1.a.2 | LV | 4 | Understand an apartment lease |
| 1.A.1.a.2 | LV | 6 | Understand an instruction book on repairing Artificial Intelligence systems |
| 1.A.1.a.3 | LV | 2 | Place an order at a restaurant drive-thru |
| 1.A.1.a.3 | LV | 4 | Give instructions to a lost motorist |
| 1.A.1.a.3 | LV | 6 | Explain advanced principles of genetics to college freshmen |
| 1.A.1.a.4 | LV | 1 | Write a note to remind someone to take food out of the freezer |
| 1.A.1.a.4 | LV | 4 | Write a job recommendation for a subordinate |