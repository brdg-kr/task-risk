# Work Styles

* [Excel](/dictionary/30.1/excel/work_styles.html)
* [Text](/dictionary/30.1/text/work_styles.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/work_styles.html)
* [Oracle](/dictionary/30.1/oracle/work_styles.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Work Styles ratings. |
| **Table Name:** | work_styles |
| **Download:** | [21_work_styles.sql](/dl_files/database/db_30_1_mysql/21_work_styles.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the Work Styles Impact ratings and Distinctiveness Rank assignments for each O*NET-SOC occupation. Work Styles ratings are presented as two scales. WI reports the Impact rating of each Work Style on performance of an occupation’s work activities and in relevant work contexts, from -3.00 (very detrimental) to +3.00 (very beneficial). DR reports the “distinctiveness rank” of a Work Style for an occupation, which presents up to 10 beneficial Work Styles which distinguish an occupation from others. A DR rating of 0.00 indicates the Work Style is not part of the ranked list.

The file is displayed in six tab delimited fields with the columns named O*NET-SOC Code, Element ID, Scale ID, Data Value, Date, and Domain Source. The six fields are represented by one row. There are a total of 37,422 rows of data in this file.

For more information, see:
* [Updating Higher-order Work Style Dimensions in the O*NET Work Styles Taxonomy](https://www.onetcenter.org/reports/Higher_Order_Styles.html)
* [Revisiting the Work Styles Domain of the O*NET Content Model](https://www.onetcenter.org/reports/Work_Styles_New.html)
* [Using a Hybrid Artificial Intelligence-Expert Method to Develop Work Style Ratings for the O*NET Database](https://www.onetcenter.org/reports/Hybrid_AI_Ratings.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Added as a new file |
| 5.1 | Columns added for N, Standard Error, Lower CI Bound, Upper CI Bound, and Recommend Suppress |
| 6.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.0 | No structure changes |
| 30.1 | Columns removed for N, Standard Error, Lower CI Bound, Upper CI Bound, and Recommend Suppress |

### Data Example - work_styles:

| onetsoc_code | element_id | scale_id | data_value | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- |
| 29-1141.01 | 1.D.1.a | DR | 0.00 | 2025-12-01 | AI/Expert |
| 29-1141.01 | 1.D.1.a | WI | 1.10 | 2025-12-01 | AI/Expert |
| 29-1141.01 | 1.D.1.b | DR | 0.00 | 2025-12-01 | AI/Expert |
| 29-1141.01 | 1.D.1.b | WI | 1.98 | 2025-12-01 | AI/Expert |
| 29-1141.01 | 1.D.1.c | DR | 0.00 | 2025-12-01 | AI/Expert |